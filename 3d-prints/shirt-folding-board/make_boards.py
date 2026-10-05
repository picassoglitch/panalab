"""Shirt-folding boards in 4 sizes, ready for a Bambu Lab printer.

Sizes (width x length):
  bebe    11 x 24.5 cm
  chica   16 x 27   cm
  mediana 20 x 30   cm
  grande  25 x 30   cm

Each board has the 'mp' logo set flush into the center of its top surface:
  *_board.stl  board color (the 'mp' letters are part of it)
  *_logo.stl   black disc around the letters (second color)
  3mf/*.3mf    both parts together, ready for the AMS

Standard Bambu bed (X1/P1/A1) is 256 x 256 mm, so the boards over 256 mm are also
exported split in two halves joined by dovetail tabs (glue them together).
The joint is placed above the logo so it never cuts through it.
Run: python3 make_boards.py
"""
import os
import sys
import numpy as np
import trimesh
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "mp-logo"))
from make_logo import logo_shapes
from shapely import affinity
from shapely.geometry import Polygon, Point, box
from shapely.ops import unary_union

T = 2.5            # thickness (mm)
BED = 256.0        # printable square on X1/P1/A1
CLEAR = 0.15       # gap per side in the dovetail joint
INLAY = 0.6        # logo inlay depth (3 layers at 0.2 mm)
TAB_DEPTH = 12.0   # dovetail tab length

# name: (width, length, corner radius, handle width, handle height, gap above handle, logo diameter)
SIZES = {
    "bebe":    (110, 245, 14, 30, 20, 16, 70),
    "chica":   (160, 270, 16, 65, 20, 18, 100),
    "mediana": (200, 300, 18, 80, 22, 20, 120),
    "grande":  (250, 300, 20, 100, 25, 22, 140),
}

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

def logo_2d(w, h, d):
    """Logo disc and script, centered on the board."""
    disc, script = logo_shapes(d)
    return affinity.translate(disc, w / 2, h / 2), affinity.translate(script, w / 2, h / 2)

def cut_y(h, d):
    """Joint height: just above the logo, so the tabs clear it."""
    return h / 2 + d / 2 + TAB_DEPTH + 6

def extrude(poly, height, z=0.0):
    m = trimesh.util.concatenate([trimesh.creation.extrude_polygon(g, height)
                                  for g in getattr(poly, "geoms", [poly])])
    m.apply_translation([0, 0, z])
    return m

def save(poly, ring, path):
    """Board with a flush inlay pocket for `ring` (disc minus letters) + the inlay part."""
    pocket = poly.intersection(ring)
    board = extrude(poly, T)
    parts = [board]
    if not pocket.is_empty:
        board = trimesh.boolean.difference([board, extrude(pocket, INLAY + 1, T - INLAY)], engine="manifold")
        parts = [board, extrude(pocket, INLAY, T - INLAY)]
        parts[1].export(f"stl/{path}_logo.stl")
        scene = trimesh.Scene()
        scene.add_geometry(parts[0], geom_name="board")
        scene.add_geometry(parts[1], geom_name="logo (black)")
        scene.export(f"3mf/{path}.3mf")
    assert all(p.is_watertight for p in parts), path
    board.export(f"stl/{path}_board.stl")
    return board.extents

os.makedirs("stl", exist_ok=True)
os.makedirs("3mf", exist_ok=True)
for name, (w, h, r, hw, hh, gap, d) in SIZES.items():
    b = board_2d(w, h, r, hw, hh, gap)
    disc, script = logo_2d(w, h, d)
    ring = disc.difference(script)
    ext = save(b, ring, f"{name}_full")
    print(f"{name:8s} full  {ext[0]:.0f} x {ext[1]:.0f} x {ext[2]:.1f} mm",
          "" if max(ext[:2]) <= BED else "(needs H2D / large bed)")
    if max(w, h) > BED:
        cut = upper_region(w, h, cut_y(h, d), n_tabs=3 if w >= 200 else 2)
        top = b.intersection(cut)
        bottom = b.difference(cut.buffer(CLEAR, join_style=2))
        assert top.intersection(disc).is_empty, name
        for part, poly in (("top", top), ("bottom", bottom)):
            ext = save(poly, ring, f"{name}_split_{part}")
            print(f"{name:8s} {part:6s} {ext[0]:.0f} x {ext[1]:.0f} mm")
            assert max(ext[:2]) <= BED, (name, part)

# preview of the set
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
fig, ax = plt.subplots(figsize=(9, 4))
x = 0
for name, (w, h, r, hw, hh, gap, d) in SIZES.items():
    b = board_2d(w, h, r, hw, hh, gap)
    ax.fill(*[np.asarray(c) + o for c, o in zip(b.exterior.xy, (x, 0))], color="#dfe3ea", ec="#555")
    for i in b.interiors:
        ax.fill(*[np.asarray(c) + o for c, o in zip(i.xy, (x, 0))], color="white", ec="#555")
    disc, script = logo_2d(w, h, d)
    ax.fill(*[np.asarray(c) + o for c, o in zip(disc.exterior.xy, (x, 0))], color="#111")
    for p in getattr(script, "geoms", [script]):
        ax.fill(*[np.asarray(c) + o for c, o in zip(p.exterior.xy, (x, 0))], color="#dfe3ea")
        for i in p.interiors:
            ax.fill(*[np.asarray(c) + o for c, o in zip(i.xy, (x, 0))], color="#111")
    if max(w, h) > BED:
        cut = upper_region(w, h, cut_y(h, d), 3 if w >= 200 else 2).exterior.coords
        xs, ys = zip(*[(min(max(px, 0), w) + x, py) for px, py in cut if py < h])
        ax.plot(xs, ys, "--", color="#c44", lw=0.8)
    ax.text(x + w / 2, -18, f"{name}\n{w/10:g} x {h/10:g} cm", ha="center", va="top", fontsize=8)
    x += w + 25
ax.set_aspect("equal"); ax.axis("off")
plt.savefig("preview.png", dpi=140, bbox_inches="tight")
