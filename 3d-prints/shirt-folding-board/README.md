# Shirt folding boards (tablas para doblar ropa)

Boards with a handle cutout, 2.5 mm thick, in 4 sizes. Every board has the same layout:
**COACH DEL ORDEN**, the mp logo, the size name and the measurements. The text and
logo are inlaid flush in black (0.6 mm deep). Sizes and positions match the reference
design and are identical on every board. Distances are from the top edge:

| Element | From top | Size |
|---|---|---|
| COACH DEL ORDEN | 83.0 – 91.7 mm | 89.2 mm wide, 8.7 mm tall |
| mp logo | center at 108.9 mm | 30 mm disc |
| BEBE / CHICA / MEDIANA / GRANDE | 127.9 – 134.1 mm | 6.2 mm tall |
| 11 X 24.5 cm, etc. | 138.2 – 143.3 mm | 5.1 mm tall |

## Files

| Size | Board | Regular bed (X1/P1/A1, 256 mm) | H2D |
|---|---|---|---|
| Bebé | 11 × 24.5 cm | `3mf/bebe_full.3mf` | same |
| Chica | 16 × 27 cm | `3mf/chica_split_top.3mf` + `stl/chica_split_bottom_board.stl` | `3mf/chica_full.3mf` |
| Mediana | 20 × 30 cm | `3mf/mediana_split_top.3mf` + `stl/mediana_split_bottom_board.stl` | `3mf/mediana_full.3mf` |
| Grande | 25 × 30 cm | `3mf/grande_split_top.3mf` + `stl/grande_split_bottom_board.stl` | `3mf/grande_full.3mf` |

## Colors (AMS)
- **board** part → white. The "mp" letters inside the logo are part of it.
- **text and logo** part → black.

Open the `.3mf` in Bambu Studio. If it asks, choose **Yes** to load it as one object
with multiple parts. Then set black on the text/logo part. The same parts are in
`stl/` (`*_board.stl` + `*_black.stl`). Select both together when importing.

## Split boards
Boards over 256 mm come in two halves with dovetail tabs (0.15 mm gap). The joint is
150 mm from the top, below all the text, so nothing is cut. Press the halves together
and glue with CA glue.

**Settings:** PETG or PLA, 0.2 mm layers, 3 walls. Lay the board flat with the text
facing up.

To change anything, edit `SIZES` or the layout constants in `make_boards.py` and run
`python3 make_boards.py`. It needs `trimesh`, `manifold3d`, `shapely`, `opencv-python`,
`matplotlib` and `numpy`. The logo is traced from `../mp-logo/mp_logo.png`.
