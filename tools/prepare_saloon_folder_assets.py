from pathlib import Path
import json

from PIL import Image, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "Photos for Website" / "Rowad Alfa Saloon"
OUT = ROOT / "public" / "images" / "rowad-alfa-saloon"
MANIFEST = ROOT / "content" / "saloon-folder-assets.json"

EXTS = {".jpg", ".jpeg", ".png", ".webp", ".avif"}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.webp"):
        old.unlink()
    files = [p for p in SOURCE.rglob("*") if p.is_file() and p.suffix.lower() in EXTS]
    assets = []
    for index, path in enumerate(files, start=1):
        with Image.open(path) as img:
            img = ImageOps.exif_transpose(img).convert("RGB")
            original = img.size
            img.thumbnail((1800, 1300), Image.Resampling.LANCZOS)
            out = OUT / f"saloon-{index:02d}.webp"
            img.save(out, "WEBP", quality=88, method=6)
            assets.append(
                {
                    "source": str(path),
                    "src": "/" + str(out.relative_to(ROOT / "public")).replace("\\", "/"),
                    "width": img.width,
                    "height": img.height,
                    "originalWidth": original[0],
                    "originalHeight": original[1],
                    "bytes": path.stat().st_size,
                }
            )

    # Build a contact sheet for quick QA.
    thumbs = []
    for asset in assets:
        with Image.open(ROOT / "public" / asset["src"].lstrip("/")) as img:
            thumb = ImageOps.fit(img, (240, 160), method=Image.Resampling.LANCZOS)
            thumbs.append((thumb, asset))
    cols = 3
    rows = (len(thumbs) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * 300, rows * 210), "white")
    draw = ImageDraw.Draw(sheet)
    for i, (thumb, asset) in enumerate(thumbs):
        x = (i % cols) * 300
        y = (i // cols) * 210
        sheet.paste(thumb, (x, y))
        draw.text((x + 8, y + 166), f"{i + 1:02d} {asset['width']}x{asset['height']}", fill=(0, 0, 0))
    sheet.save(OUT / "_contact-sheet.webp", "WEBP", quality=90, method=6)

    MANIFEST.write_text(json.dumps(assets, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"count": len(assets), "out": str(OUT)}, indent=2))


if __name__ == "__main__":
    main()
