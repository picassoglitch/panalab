# Shirt folding boards (tablas para doblar ropa)

Boards with a handle cutout, 2.5 mm thick, in 4 sizes. The black "mp" logo is set
flush into the center of the top surface (0.6 mm deep).

| Size | Board (cm) | Logo | Regular bed (X1/P1/A1, 256 mm) | H2D |
|---|---|---|---|---|
| Bebé | 11 × 24.5 | 7 cm | `3mf/bebe_full.3mf` | same |
| Chica | 16 × 27 | 10 cm | `3mf/chica_split_bottom.3mf` + `stl/chica_split_top_board.stl` | `3mf/chica_full.3mf` |
| Mediana | 20 × 30 | 12 cm | `3mf/mediana_split_bottom.3mf` + `stl/mediana_split_top_board.stl` | `3mf/mediana_full.3mf` |
| Grande | 25 × 30 | 14 cm | `3mf/grande_split_bottom.3mf` + `stl/grande_split_top_board.stl` | `3mf/grande_full.3mf` |

## Colors (AMS)
- **board** part → white (or the board color). The "mp" letters are part of it.
- **logo** part → black (the disc around the letters).

Open the `.3mf` in Bambu Studio. If it asks, choose **Yes** to load it as one object
with multiple parts. Then set the filament for each part. The same parts are also
in `stl/` (`*_board.stl` + `*_logo.stl`). Select both together when importing.

## Split boards
Boards over 256 mm come in two halves joined by dovetail tabs (0.15 mm gap). The joint
sits above the logo, so it never crosses it. Press the halves together and glue with
CA glue.

**Settings:** PETG (bends without snapping) or PLA, 0.2 mm layers, 3 walls. Lay the
board flat with the logo facing up.

To change sizes or logo diameter, edit `SIZES` in `make_boards.py` and run
`python3 make_boards.py`. It needs `trimesh`, `manifold3d`, `shapely`, `opencv-python`,
`matplotlib` and `numpy`. The logo is traced from `../mp-logo/mp_logo.png`.
