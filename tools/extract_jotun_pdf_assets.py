from __future__ import annotations

import json
import re
from pathlib import Path

from PIL import Image
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "pdf-jotun"
TEXT_OUT = ROOT / "content" / "jotun-pdf-extract.json"

PDFS = [
    ("jotashield", Path(r"C:\Users\Arshad_IAAE\Downloads\Jotashield_colour_card_MY.pdf")),
    ("majestic", Path(r"C:\Users\Arshad_IAAE\Downloads\Jotun_Majestic_Colour_Card-Malaysia_2022.pdf")),
    ("gardex", Path(r"C:\Users\Arshad_IAAE\Downloads\Gardex_Colour_Card__Malaysia__Final_090414_2021.pdf")),
]


def safe_text(text: str) -> str:
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def image_to_webp(image: Image.Image, out: Path) -> bool:
    if image.width < 180 or image.height < 120:
        return False
    if image.mode not in ("RGB", "RGBA"):
        image = image.convert("RGB")
    # Light enhancement for web use without changing branding/content.
    max_edge = 1600
    ratio = min(max_edge / max(image.width, image.height), 1)
    if ratio < 1:
        image = image.resize((int(image.width * ratio), int(image.height * ratio)), Image.Resampling.LANCZOS)
    out.parent.mkdir(parents=True, exist_ok=True)
    image.save(out, "WEBP", quality=88, method=6)
    return True


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    data = []
    for slug, path in PDFS:
        reader = PdfReader(str(path))
        pdf_record = {"slug": slug, "file": str(path), "pages": len(reader.pages), "text": [], "images": []}
        img_index = 1
        for page_index, page in enumerate(reader.pages, start=1):
            text = safe_text(page.extract_text() or "")
            if text:
                pdf_record["text"].append({"page": page_index, "text": text})
            for image_file_object in page.images:
                try:
                    image = Image.open(image_file_object.data)
                    out = OUT / slug / f"{slug}-p{page_index:02d}-{img_index:03d}.webp"
                    if image_to_webp(image, out):
                        pdf_record["images"].append(
                            {
                                "page": page_index,
                                "src": "/" + str(out.relative_to(ROOT / "public")).replace("\\", "/"),
                                "width": image.width,
                                "height": image.height,
                            }
                        )
                        img_index += 1
                except Exception as exc:
                    pdf_record["images"].append({"page": page_index, "error": str(exc)})
        data.append(pdf_record)
    TEXT_OUT.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps([{ "slug": d["slug"], "pages": d["pages"], "textPages": len(d["text"]), "images": len([i for i in d["images"] if "src" in i]) } for d in data], indent=2))


if __name__ == "__main__":
    main()
