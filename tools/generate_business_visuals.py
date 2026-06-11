from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import math
import random

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "generated"

GROUPS = {
    "paint": {
        "count": 24,
        "palette": [(13, 71, 161), (0, 137, 123), (245, 235, 220), (191, 159, 92), (120, 86, 160)],
        "labels": ["Interior Finish", "Exterior Coating", "Color Studio", "Decorative Texture"],
    },
    "salon": {
        "count": 22,
        "palette": [(16, 24, 40), (185, 138, 72), (245, 238, 226), (91, 64, 105), (212, 190, 158)],
        "labels": ["Barber Station", "VIP Lounge", "Reception", "Grooming Suite"],
    },
    "auto": {
        "count": 26,
        "palette": [(3, 10, 24), (35, 88, 166), (0, 188, 212), (190, 198, 210), (22, 28, 38)],
        "labels": ["Digital Cockpit", "Audio System", "Ambient Lighting", "Interior Upgrade"],
    },
}


def blend(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def gradient(size, colors, seed):
    w, h = size
    random.seed(seed)
    img = Image.new("RGB", size, colors[0])
    pix = img.load()
    c1, c2, c3 = colors[0], colors[1], colors[2]
    for y in range(h):
        for x in range(w):
            nx = x / max(w - 1, 1)
            ny = y / max(h - 1, 1)
            wave = (math.sin((nx * 3.5 + ny * 2.2 + seed) * math.pi) + 1) / 2
            base = blend(c1, c2, nx * 0.62 + ny * 0.28)
            col = blend(base, c3, wave * 0.22)
            pix[x, y] = col
    return img.filter(ImageFilter.GaussianBlur(0.4))


def rounded_rect(draw, xy, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def draw_paint(draw, w, h, colors, idx):
    # Architectural walls and product/color panels.
    rounded_rect(draw, (70, 120, w - 70, h - 96), 44, (255, 255, 255, 52), (255, 255, 255, 120), 3)
    for i in range(5):
        x = 130 + i * 142
        color = colors[i % len(colors)]
        rounded_rect(draw, (x, 210, x + 104, h - 180), 26, color + (190,), (255, 255, 255, 120), 2)
    draw.rectangle((80, h - 190, w - 80, h - 96), fill=(20, 35, 55, 74))
    for i in range(7):
        cx = 140 + i * 110
        cy = h - 145
        draw.ellipse((cx, cy, cx + 48, cy + 48), fill=colors[(i + idx) % len(colors)] + (220,))
    if idx % 3 == 0:
        draw.line((w * 0.62, 150, w * 0.82, h - 180), fill=(255, 255, 255, 150), width=12)
        draw.rounded_rectangle((w * 0.8, h - 210, w * 0.86, h - 110), 14, fill=(191, 159, 92, 210))


def draw_salon(draw, w, h, colors, idx):
    # Salon interior with mirrors, chairs, reception and lighting.
    rounded_rect(draw, (76, 96, w - 76, h - 80), 42, (255, 255, 255, 42), (255, 255, 255, 110), 3)
    for i in range(3):
        x = 150 + i * 230
        rounded_rect(draw, (x, 150, x + 130, 360), 36, (245, 238, 226, 130), (185, 138, 72, 190), 3)
        draw.ellipse((x + 26, 390, x + 104, 468), fill=(16, 24, 40, 210))
        rounded_rect(draw, (x + 2, 450, x + 128, 515), 22, (185, 138, 72, 170), None, 1)
    rounded_rect(draw, (w - 285, 430, w - 120, h - 140), 32, (16, 24, 40, 180), (255, 255, 255, 95), 2)
    for i in range(5):
        x = 110 + i * 160
        draw.line((x, 84, x + 72, 84), fill=(255, 220, 160, 170), width=6)
        draw.ellipse((x + 22, 112, x + 50, 140), fill=(255, 220, 160, 170))


def draw_auto(draw, w, h, colors, idx):
    # Luxury vehicle interior, cockpit screens, audio, ambient light.
    rounded_rect(draw, (62, 104, w - 62, h - 108), 48, (255, 255, 255, 28), (255, 255, 255, 92), 3)
    rounded_rect(draw, (130, 230, w - 130, 390), 46, (5, 14, 31, 215), (0, 188, 212, 140), 3)
    rounded_rect(draw, (185, 250, 430, 365), 24, (19, 70, 140, 210), (255, 255, 255, 110), 2)
    rounded_rect(draw, (460, 250, 710, 365), 24, (8, 24, 48, 230), (0, 188, 212, 150), 2)
    draw.arc((180, 410, 370, 600), 205, 520, fill=(190, 198, 210, 210), width=16)
    rounded_rect(draw, (w - 310, 415, w - 120, 570), 40, (22, 28, 38, 220), (255, 255, 255, 90), 2)
    for i in range(5):
        y = 440 + i * 22
        draw.line((w - 280, y, w - 145, y), fill=(0, 188, 212, 110 + i * 20), width=4)
    draw.line((96, h - 150, w - 96, h - 150), fill=(0, 188, 212, 190), width=7)
    draw.line((118, h - 122, w - 118, h - 122), fill=(35, 88, 166, 180), width=5)


def make_asset(group, idx, kind):
    cfg = GROUPS[group]
    colors = cfg["palette"]
    seed = hash((group, idx, kind)) & 0xFFFF
    final_size = (1440, 900) if kind == "gallery" else (1600, 980)
    gradient_size = (final_size[0] // 4, final_size[1] // 4)
    img = gradient(gradient_size, colors, seed).resize(final_size, Image.Resampling.BICUBIC).convert("RGBA")
    size = final_size
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer, "RGBA")
    w, h = size

    # Abstract premium light blooms.
    random.seed(seed)
    for _ in range(9):
        cx = random.randint(-100, w)
        cy = random.randint(-80, h)
        r = random.randint(120, 340)
        color = colors[random.randrange(len(colors))] + (70,)
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=color)

    if group == "paint":
        draw_paint(draw, w, h, colors, idx)
    elif group == "salon":
        draw_salon(draw, w, h, colors, idx)
    else:
        draw_auto(draw, w, h, colors, idx)

    # Foreground glass sheen and subtle vignette.
    draw.rounded_rectangle((34, 34, w - 34, h - 34), 54, outline=(255, 255, 255, 88), width=2)
    draw.line((0, h * 0.18, w, h * 0.04), fill=(255, 255, 255, 72), width=3)
    layer = layer.filter(ImageFilter.GaussianBlur(0.25))
    img = Image.alpha_composite(img, layer)
    w, h = final_size
    vignette = Image.new("RGBA", size, (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette, "RGBA")
    vd.rectangle((0, 0, w, h), outline=(0, 0, 0, 0))
    for i in range(80):
        alpha = int(i * 1.4)
        vd.rounded_rectangle((i, i, w - i, h - i), 52, outline=(0, 0, 0, alpha), width=2)
    img = Image.alpha_composite(img, vignette)
    return img.convert("RGB")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for group, cfg in GROUPS.items():
        folder = OUT / group
        folder.mkdir(parents=True, exist_ok=True)
        hero = make_asset(group, 0, "hero")
        hero.save(folder / "hero.webp", "WEBP", quality=88, method=6)
        for i in range(1, cfg["count"] + 1):
            img = make_asset(group, i, "gallery")
            img.save(folder / f"{group}-{i:02d}.webp", "WEBP", quality=84, method=6)
    print(f"Generated assets in {OUT}")


if __name__ == "__main__":
    main()
