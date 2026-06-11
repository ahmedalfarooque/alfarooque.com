from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]


def convert(src: Path, dest: Path, size=(1800, 1200), quality=84):
    dest.parent.mkdir(parents=True, exist_ok=True)
    image = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    image.thumbnail(size)
    image.save(dest, "WEBP", quality=quality, method=6)


def main():
    home = sorted((ROOT / "Photos for Website" / "Homepage Sliding").glob("*"))
    gallery = sorted((ROOT / "Photos for Website" / "Gallery").glob("*"))
    machines = sorted((ROOT / "Photos for Website" / "Machines" / "Download").glob("*"))

    for idx, src in enumerate([p for p in home if p.is_file()][:4], 1):
        convert(src, ROOT / "public" / "images" / "home" / f"slide-{idx}.webp", (1920, 1280), 84)

    for idx, src in enumerate([p for p in gallery if p.is_file()][:36], 1):
        convert(src, ROOT / "public" / "images" / "gallery" / f"gallery-{idx:02d}.webp", (1600, 1200), 82)

    for idx, src in enumerate([p for p in machines if p.is_file()][:12], 1):
        convert(src, ROOT / "public" / "images" / "machines" / f"machine-{idx:02d}.webp", (1200, 900), 82)


if __name__ == "__main__":
    main()
