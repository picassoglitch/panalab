"""Shirt-folding boards in 4 sizes, ready for a Bambu Lab printer.

Sizes (width x length):
  bebe    11 x 24.5 cm
  chica   16 x 27   cm
  mediana 20 x 30   cm
  grande  25 x 30   cm

Standard Bambu bed (X1/P1/A1) is 256 x 256 mm, so the 30 cm boards are also
exported split in two halves joined by dovetail tabs (glue them together).
Run: python3 make_boards.py
"""
import os
import numpy as np
import trimesh
from shapely.geometry import Polygon, Point, box
from shapely.ops import unary_union

T = 2.5            # thickness (mm)
BED = 256.0        # printable square on X1/P1/A1
CLEAR = 0.15       # gap per side in the dovetail joint

# name: (width, length, corner radius, handle width, handle height, gap above handle)
SIZES = {
    "bebe":    (110, 245, 14, 30, 20, 16),
    "chica":   (160, 270, 16, 65, 20, 18),
    "mediana": (200, 300, 18, 80, 22, 20),
    "grande":  (250, 300, 20, 100, 25, 22),
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

def upper_region(w, h, y, n_tabs, neck=12.0, head=20.0, depth=12.0):
    """Region above a cut line at height y, with dovetail tabs pointing down."""
    pts = [(-1, y)]
    for i in range(n_tabs):
        cx = w * (i + 1) / (n_tabs + 1)
        pts += [(cx - neck / 2, y), (cx - head / 2, y - depth),
                (cx + head / 2, y - depth), (cx + neck / 2, y)]
    pts += [(w + 1, y), (w + 1, h + 1), (-1, h + 1)]
    return Polygon(pts)

def save(poly, path):
    m = trimesh.creation.extrude_polygon(poly, T)
    m.apply_translation([-m.bounds[0][0], -m.bounds[0][1], 0])
    assert m.is_watertight, path
    m.export(path)
    return m.extents

os.makedirs("stl", exist_ok=True)
for name, (w, h, r, hw, hh, gap) in SIZES.items():
    b = board_2d(w, h, r, hw, hh, gap)
    ext = save(b, f"stl/{name}_full.stl")
    print(f"{name:8s} full  {ext[0]:.0f} x {ext[1]:.0f} x {ext[2]:.1f} mm",
          "" if max(ext[:2]) <= BED else "(needs H2D / large bed)")
    if max(w, h) > BED:
        cut = upper_region(w, h, h / 2, n_tabs=3 if w >= 200 else 2)
        top = b.intersection(cut)
        bottom = b.difference(cut.buffer(CLEAR, join_style=2))
        for part, poly in (("top", top), ("bottom", bottom)):
            ext = save(poly, f"stl/{name}_split_{part}.stl")
            print(f"{name:8s} {part:6s} {ext[0]:.0f} x {ext[1]:.0f} mm")

# preview of the set
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
fig, ax = plt.subplots(figsize=(9, 4))
x = 0
for name, (w, h, r, hw, hh, gap) in SIZES.items():
    b = board_2d(w, h, r, hw, hh, gap)
    ax.fill(*[np.asarray(c) + o for c, o in zip(b.exterior.xy, (x, 0))], color="#dfe3ea", ec="#555")
    for i in b.interiors:
        ax.fill(*[np.asarray(c) + o for c, o in zip(i.xy, (x, 0))], color="white", ec="#555")
    if max(w, h) > BED:
        cut = upper_region(w, h, h / 2, 3 if w >= 200 else 2).exterior.coords
        xs, ys = zip(*[(min(max(px, 0), w) + x, py) for px, py in cut if py < h])
        ax.plot(xs, ys, "--", color="#c44", lw=0.8)
    ax.text(x + w / 2, -18, f"{name}\n{w/10:g} x {h/10:g} cm", ha="center", va="top", fontsize=8)
    x += w + 25
ax.set_aspect("equal"); ax.axis("off")
plt.savefig("preview.png", dpi=140, bbox_inches="tight")
