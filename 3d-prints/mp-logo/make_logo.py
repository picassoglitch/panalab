"""Trace mp_logo.png into a 2-color printable logo disc. Run: python3 make_logo.py"""
import cv2
import numpy as np
import trimesh
from shapely.geometry import Polygon, Point
from shapely.ops import unary_union

D, BASE, RAISE = 80.0, 3.0, 1.0   # diameter, disc thickness, raised script height (mm)

img = cv2.imread("mp_logo.png", cv2.IMREAD_GRAYSCALE)
_, dark = cv2.threshold(img, 128, 255, cv2.THRESH_BINARY_INV)
# black disc = largest dark contour
cs, _ = cv2.findContours(dark, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
(cx, cy), r = cv2.minEnclosingCircle(max(cs, key=cv2.contourArea))
s = D / (2 * r)

# white script = bright pixels inside the disc
mask = np.zeros_like(img); cv2.circle(mask, (int(cx), int(cy)), int(r * 0.97), 255, -1)
white = cv2.bitwise_and(cv2.threshold(img, 128, 255, cv2.THRESH_BINARY)[1], mask)
white = cv2.morphologyEx(white, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
cs, hier = cv2.findContours(white, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)

def to_mm(c):
    p = c[:, 0, :].astype(float)
    return np.column_stack([(p[:, 0] - cx) * s, -(p[:, 1] - cy) * s])

polys = []
for i, c in enumerate(cs):
    if hier[0][i][3] != -1 or cv2.contourArea(c) < 50:
        continue
    holes = [to_mm(cs[j]) for j in range(len(cs)) if hier[0][j][3] == i and len(cs[j]) >= 3]
    polys.append(Polygon(to_mm(c), holes).buffer(0).simplify(0.03))
script = unary_union(polys)

disc = Point(0, 0).buffer(D / 2, resolution=128)
base = trimesh.creation.extrude_polygon(disc, BASE)
parts = [trimesh.creation.extrude_polygon(g, RAISE) for g in getattr(script, "geoms", [script])]
text = trimesh.util.concatenate(parts); text.apply_translation([0, 0, BASE])

base.export("mp_logo_disc.stl")
text.export("mp_logo_script.stl")
trimesh.util.concatenate([base, text]).export("mp_logo.stl")
print(f"disc {D} mm, script parts: {len(parts)}, watertight: {base.is_watertight}, {text.is_watertight}")
