from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1] / "assets" / "img"

for path in ROOT.iterdir():
    if path.name == "alfarooque-logo.png" or path.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
        continue
    image = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    image.thumbnail((1600, 1200))
    output = path.with_suffix(".webp")
    image.save(output, "WEBP", quality=82, method=6)
    print(f"{output.name}: {output.stat().st_size}")
