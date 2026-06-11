const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const pages = [
  "index.html",
  "wooden-industries.html",
  "jotun-paint-shop.html",
  "rowad-alfa-saloon.html",
  "car-accessories.html"
];

let failures = 0;
for (const page of pages) {
  const file = path.join(root, page);
  const html = fs.readFileSync(file, "utf8");
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((ref) => !ref.startsWith("http") && !ref.startsWith("mailto:") && !ref.startsWith("tel:") && !ref.startsWith("#"));
  for (const ref of refs) {
    const clean = ref.split("#")[0];
    if (!clean) continue;
    const target = path.join(root, clean);
    if (!fs.existsSync(target)) {
      failures += 1;
      console.error(`Missing reference in ${page}: ${ref}`);
    }
  }
}

if (failures) process.exit(1);
console.log(`Validated ${pages.length} pages and local references.`);
