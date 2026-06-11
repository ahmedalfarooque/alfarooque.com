import html
import pathlib
import re
import zipfile

ROOT = pathlib.Path(__file__).resolve().parents[1]


def clean(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value)
    value = html.unescape(value)
    return re.sub(r"\s+", " ", value).strip()


def extract_docx(zfile: zipfile.ZipFile) -> str:
    output = []
    for name in zfile.namelist():
        if name.startswith("word/") and name.endswith(".xml"):
            xml = zfile.read(name).decode("utf-8", "ignore")
            output.extend(re.findall(r"<w:t[^>]*>(.*?)</w:t>", xml))
    return clean(" ".join(output))


def extract_pptx(zfile: zipfile.ZipFile) -> str:
    output = []
    for name in sorted(zfile.namelist()):
        if name.startswith("ppt/slides/slide") and name.endswith(".xml"):
            xml = zfile.read(name).decode("utf-8", "ignore")
            output.extend(re.findall(r"<a:t>(.*?)</a:t>", xml))
    return clean(" ".join(output))


def main() -> None:
    files = list(ROOT.rglob("*.docx")) + list(ROOT.rglob("*.pptx"))
    keywords = [
        "vision",
        "mission",
        "alfarooque",
        "ismail",
        "jotun",
        "rowad",
        "quality",
        "factory",
        "wood",
        "contact",
        "riyadh",
        "jeddah",
        "certificat",
        "project",
        "profile",
        "doors",
        "cabinets",
    ]
    for path in files:
        try:
            with zipfile.ZipFile(path) as zfile:
                text = extract_docx(zfile) if path.suffix.lower() == ".docx" else extract_pptx(zfile)
        except Exception as exc:
            print(f"ERR {path}: {exc}")
            continue
        if not text:
            continue
        lowered = text.lower()
        score = sum(lowered.count(keyword) for keyword in keywords)
        if score < 2 and len(text) < 500:
            continue
        print(f"\n==== {path.relative_to(ROOT)} | score {score} | chars {len(text)} ====")
        print(text[:5000])


if __name__ == "__main__":
    main()
