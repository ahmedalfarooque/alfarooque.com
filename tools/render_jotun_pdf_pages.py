from pathlib import Path
import json

import pypdfium2 as pdfium
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "pdf-jotun"
MANIFEST = ROOT / "content" / "jotun-pdf-pages.json"

PDFS = [
    ("jotashield", Path(r"C:\Users\Arshad_IAAE\Downloads\Jotashield_colour_card_MY.pdf")),
    ("majestic", Path(r"C:\Users\Arshad_IAAE\Downloads\Jotun_Majestic_Colour_Card-Malaysia_2022.pdf")),
    ("gardex", Path(r"C:\Users\Arshad_IAAE\Downloads\Gardex_Colour_Card__Malaysia__Final_090414_2021.pdf")),
]


def render_pdf(slug: str, path: Path):
    doc = pdfium.PdfDocument(str(path))
    folder = OUT / slug
    folder.mkdir(parents=True, exist_ok=True)
    pages = []
    for i in range(len(doc)):
        page = doc[i]
        bitmap = page.render(scale=2.2, rotation=0)
        image = bitmap.to_pil().convert("RGB")
        image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
        out = folder / f"{slug}-page-{i + 1:02d}.webp"
        image.save(out, "WEBP", quality=88, method=6)
        pages.append({
            "page": i + 1,
            "src": "/" + str(out.relative_to(ROOT / "public")).replace("\\", "/"),
            "width": image.width,
            "height": image.height,
        })
    return {"slug": slug, "file": str(path), "pages": pages}


def main():
    if OUT.exists():
        for old in OUT.rglob("*.webp"):
            old.unlink()
    OUT.mkdir(parents=True, exist_ok=True)
    data = [render_pdf(slug, path) for slug, path in PDFS]
    MANIFEST.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps([{ "slug": d["slug"], "pages": len(d["pages"]) } for d in data], indent=2))


if __name__ == "__main__":
    main()
