# Shirt folding boards (tablas para doblar ropa)

Plain boards with a handle cutout, in 4 sizes. They are 2.5 mm thick.

| Size | Size (cm) | Full STL | Fits the 256 mm bed (X1/P1/A1)? |
|---|---|---|---|
| Bebé | 11 × 24.5 | `stl/bebe_full.stl` | Yes |
| Chica | 16 × 27 | `stl/chica_full.stl` | No, use `chica_split_top/bottom` |
| Mediana | 20 × 30 | `stl/mediana_full.stl` | No, use `mediana_split_top/bottom` |
| Grande | 25 × 30 | `stl/grande_full.stl` | No, use `grande_split_top/bottom` |

The `_full` files print in one piece on an H2D (325 × 320 mm bed).
Each split version has two halves that join with dovetail tabs (0.15 mm gap).
Press them together and glue with CA glue.

**Suggested settings:** PETG (bends without snapping) or PLA, 0.2 mm layers,
3 walls, 100% infill or top/bottom only. For a smooth top, print on the
textured PEI plate or use ironing.

To change the dimensions, edit `SIZES` / `T` in `make_boards.py` and run
`python3 make_boards.py`. It needs `trimesh`, `shapely`, `matplotlib` and `numpy`.
