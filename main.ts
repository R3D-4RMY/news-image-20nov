// News image 20 Nov 2026 — copies the finished infographic to the output dir.
// Stdlib only, deterministic: the same input bytes always produce the same output.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";
mkdirSync(outDir, { recursive: true });

const dest = join(outDir, "entry.png");
copyFileSync(source, dest);

const inBytes = statSync(source).size;
const outBytes = statSync(dest).size;
// A short write would silently corrupt the judged image, so refuse loudly.
if (inBytes !== outBytes) {
  throw new Error(`size mismatch: source ${inBytes} bytes, wrote ${outBytes} bytes`);
}

console.log(`Wrote entry.png (${outBytes} bytes) to ${dest}`);
