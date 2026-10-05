"""Shirt-folding boards in 4 sizes, ready for a Bambu Lab printer.

Sizes (width x length):
  bebe    11 x 24.5 cm
  chica   16 x 27   cm
  mediana 20 x 30   cm
  grande  25 x 30   cm

Every board carries the same layout, measured from the reference design
(distances from the top edge of the board, all boards identical):
  "COACH DEL ORDEN"   83.0 - 91.7 mm, 89.2 mm wide
  mp logo             30 mm disc centered at 108.9 mm
  size name (BEBE)    127.9 - 134.1 mm
  size (11 X 24.5 cm) 138.2 - 143.3 mm
Text and the logo disc are inlaid flush into the top 0.6 mm in black;
the 'mp' letters stay board color.
  stl/*_board.stl  board color
  stl/*_black.stl  text + logo disc (second color)
  3mf/*.3mf        both parts together, ready for the AMS

Boards over 256 mm (the X1/P1/A1 bed) are also exported in two halves joined
by dovetail tabs, cut below the text so nothing is split. Glue them together.
Run: python3 make_boards.py
"""
import os
import sys
import numpy as np
import trimesh
from matplotlib.font_manager import FontProperties
from matplotlib.textpath import TextPath
from shapely import affinity
from shapely.geometry import Polygon, Point, box
from shapely.ops import unary_union

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "mp-logo"))
from make_logo import logo_shapes

T = 2.5            # thickness (mm)
BED = 256.0        # printable square on X1/P1/A1
CLEAR = 0.15       # gap per side in the dovetail joint
INLAY = 0.6        # inlay depth for text + logo (3 layers at 0.2 mm)
TAB_DEPTH = 12.0   # dovetail tab length

# name: (width, length, corner radius, handle width, handle height, gap above handle)
SIZES = {
    "bebe":    (110, 245, 14, 30, 20, 16),
    "chica":   (160, 270, 16, 65, 20, 18),
    "mediana": (200, 300, 18, 80, 22, 20),
    "grande":  (250, 300, 20, 100, 25, 22),
}

# layout, in mm from the top edge (measured on the bebe reference design)
TITLE = "COACH DEL ORDEN"
TITLE_TOP, TITLE_H, TITLE_W = 83.0, 8.7, 89.2
LOGO_CY, LOGO_D = 108.9, 30.0
NAME_TOP, NAME_H, NAME_CHAR_W = 127.9, 6.2, 20.5 / 4     # "BEBE" is 20.5 mm wide
DIMS_TOP, DIMS_H, DIMS_CHAR_W = 138.2, 5.1, 49.7 / 12    # "11 X 24.5 cm" is 49.7 mm wide
CUT_FROM_TOP = 150.0   # joint for split boards, below all text

FONT = FontProperties(family="DejaVu Sans Mono", weight="bold")

def rounded_rect(w, h, r):
    return box(r, r, w - r, h - r).buffer(r, resolution=48)

def slot(cx, cy, w, h):
    r = h / 2
    return unary_union([box(cx - w / 2 + r, cy - r, cx + w / 2 - r, cy + r),
                        Point(cx - w / 2 + r, cy).buffer(r, resolution=48),
                        Point(cx + w / 2 - r, cy).buffer(r, resolution=48)])

def board_2d(w, h, r, hw, hh, gap):
    return rounded_rect(w, h, r).difference(slot(w / 2, h - gap - hh / 2, hw, hh))

def upper_region(w, h, y, n_tabs, neck=12.0, head=20.0, depth=TAB_DEPTH):
    """Region above a cut line at height y, with dovetail tabs pointing down."""
    pts = [(-1, y)]
    for i in range(n_tabs):
        cx = w * (i + 1) / (n_tabs + 1)
        pts += [(cx - neck / 2, y), (cx - head / 2, y - depth),
                (cx + head / 2, y - depth), (cx + neck / 2, y)]
    pts += [(w + 1, y), (w + 1, h + 1), (-1, h + 1)]
    return Polygon(pts)

def text_2d(s, cx, top_y, height, width):
    """Text polygon scaled to exactly `width` x `height` (cap height), top edge at top_y."""
    shape = Polygon()
    for p in TextPath((0, 0), s, size=10, prop=FONT).to_polygons():
        if len(p) >= 3:
            shape = shape.symmetric_difference(Polygon(p).buffer(0))  # even-odd: letter holes
    x0, y0, x1, y1 = shape.bounds
    shape = affinity.scale(shape, width / (x1 - x0), height / (y1 - y0), origin=(x0, y0))
    x0, y0, x1, y1 = shape.bounds
    return affinity.translate(shape, cx - (x0 + x1) / 2, top_y - y1)

def char_width(s, per_char):
    """Width of a line set in the same letter width as the reference line."""
    return per_char * len(s)

def graphics_2d(name, w, h):
    """Black inlay: title, logo disc (minus 'mp' letters), size name and dimensions."""
    cx = w / 2
    y = lambda from_top: h - from_top
    disc, script = logo_shapes(LOGO_D)
    logo = affinity.translate(disc.difference(script), cx, y(LOGO_CY))
    label = name.upper()
    dims = f"{w / 10:g} X {h / 10:g} cm"
    return unary_union([
        text_2d(TITLE, cx, y(TITLE_TOP), TITLE_H, TITLE_W),
        logo,
        text_2d(label, cx, y(NAME_TOP), NAME_H, char_width(label, NAME_CHAR_W)),
        text_2d(dims, cx, y(DIMS_TOP), DIMS_H, char_width(dims, DIMS_CHAR_W)),
    ])

def extrude(poly, height, z=0.0):
    m = trimesh.util.concatenate([trimesh.creation.extrude_polygon(g, height)
                                  for g in getattr(poly, "geoms", [poly]) if not g.is_empty])
    m.apply_translation([0, 0, z])
    return m

def save(poly, graphics, path):
    """Board with a flush pocket for the black graphics + the black inlay part."""
    pocket = poly.intersection(graphics)
    board = extrude(poly, T)
    if not pocket.is_empty:
        board = trimesh.boolean.difference([board, extrude(pocket, INLAY + 1, T - INLAY)], engine="manifold")
        black = extrude(pocket, INLAY, T - INLAY)
        assert black.is_volume, path
        black.export(f"stl/{path}_black.stl")
        scene = trimesh.Scene()
        scene.add_geometry(board, geom_name="board")
        scene.add_geometry(black, geom_name="text and logo (black)")
        scene.export(f"3mf/{path}.3mf")
    assert board.is_watertight, path
    board.export(f"stl/{path}_board.stl")
    return board.extents

os.makedirs("stl", exist_ok=True)
os.makedirs("3mf", exist_ok=True)
for name, (w, h, r, hw, hh, gap) in SIZES.items():
    b = board_2d(w, h, r, hw, hh, gap)
    gfx = graphics_2d(name, w, h)
    assert b.contains(gfx), name
    ext = save(b, gfx, f"{name}_full")
    print(f"{name:8s} full  {ext[0]:.0f} x {ext[1]:.0f} x {ext[2]:.1f} mm",
          "" if max(ext[:2]) <= BED else "(needs H2D / large bed)")
    if max(w, h) > BED:
        cut = upper_region(w, h, h - CUT_FROM_TOP, n_tabs=3 if w >= 200 else 2)
        assert cut.contains(gfx), name
        top = b.intersection(cut)
        bottom = b.difference(cut.buffer(CLEAR, join_style=2))
        for part, poly in (("top", top), ("bottom", bottom)):
            ext = save(poly, gfx, f"{name}_split_{part}")
            print(f"{name:8s} {part:6s} {ext[0]:.0f} x {ext[1]:.0f} mm")
            assert max(ext[:2]) <= BED, (name, part)

# preview of the set
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt

def fill(ax, geom, dx, color, hole_color):
    for p in getattr(geom, "geoms", [geom]):
        ax.fill(np.asarray(p.exterior.xy[0]) + dx, p.exterior.xy[1], color=color, ec="#555" if color == "#f2f2f2" else None, lw=0.6)
        for i in p.interiors:
            ax.fill(np.asarray(i.xy[0]) + dx, i.xy[1], color=hole_color, lw=0)

fig, ax = plt.subplots(figsize=(12, 5))
x = 0
for name, (w, h, r, hw, hh, gap) in SIZES.items():
    fill(ax, board_2d(w, h, r, hw, hh, gap), x, "#f2f2f2", "white")
    fill(ax, graphics_2d(name, w, h), x, "#111", "#f2f2f2")
    if max(w, h) > BED:
        cut = upper_region(w, h, h - CUT_FROM_TOP, 3 if w >= 200 else 2).exterior.coords
        xs, ys = zip(*[(min(max(px, 0), w) + x, py) for px, py in cut if py < h])
        ax.plot(xs, ys, "--", color="#c44", lw=0.8)
    x += w + 25
ax.set_aspect("equal"); ax.axis("off")
plt.savefig("preview.png", dpi=150, bbox_inches="tight")
