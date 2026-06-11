from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "Photos for Website" / "Rowad Alfa Car Accessories"
OUT = ROOT / "public" / "images" / "rowad-alfa-car-accessories"
MANIFEST = ROOT / "content" / "car-accessories-folder-assets.json"
SUPPORTED = {".jpg", ".jpeg", ".png", ".webp", ".avif"}


def fit_image(path: Path, max_width: int = 1800) -> Image.Image:
    image = Image.open(path)
    image = ImageOps.exif_transpose(image).convert("RGB")
    if image.width > max_width:
        ratio = max_width / image.width
        image = image.resize((max_width, int(image.height * ratio)), Image.Resampling.LANCZOS)
    return image


def make_contact_sheet(items: list[dict[str, str]], thumb_width: int = 260) -> None:
    if not items:
        return
    thumbs = []
    for item in items:
        image = Image.open(ROOT / "public" / item["publicPath"].lstrip("/")).convert("RGB")
        ratio = thumb_width / image.width
        thumb = image.resize((thumb_width, int(image.height * ratio)), Image.Resampling.LANCZOS)
        canvas = Image.new("RGB", (thumb_width, 220), (14, 23, 42))
        crop = ImageOps.fit(thumb, (thumb_width, 180), method=Image.Resampling.LANCZOS)
        canvas.paste(crop, (0, 0))
        thumbs.append((canvas, item["fileName"]))

    cols = 4
    label_height = 34
    rows = (len(thumbs) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * thumb_width, rows * (220 + label_height)), (8, 15, 28))
    for index, (thumb, label) in enumerate(thumbs):
        x = (index % cols) * thumb_width
        y = (index // cols) * (220 + label_height)
        sheet.paste(thumb, (x, y))
        # Labels are omitted intentionally; the manifest is the source of truth.
    sheet.save(OUT / "_contact-sheet.webp", "WEBP", quality=88, method=6)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    files = sorted(
        [path for path in SOURCE.rglob("*") if path.is_file() and path.suffix.lower() in SUPPORTED],
        key=lambda path: path.name.lower(),
    )
    items: list[dict[str, str]] = []
    for index, path in enumerate(files, start=1):
        target_name = f"car-accessories-{index:02d}.webp"
        target = OUT / target_name
        image = fit_image(path)
        image.save(target, "WEBP", quality=84, method=6)
        items.append(
            {
                "index": index,
                "sourceName": path.name,
                "fileName": target_name,
                "publicPath": f"/images/rowad-alfa-car-accessories/{target_name}",
                "width": image.width,
                "height": image.height,
            }
        )

    MANIFEST.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
    make_contact_sheet(items)
    print(f"Prepared {len(items)} car accessories assets in {OUT}")


if __name__ == "__main__":
    main()
