// news-image-20261120 entry (Node 22, standard library only).
// The entry is the entry.png beside this file; the program copies it to
// /output/entry.png. Outside the grader's container, MAKEFUN_OUTPUT_DIR
// stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.png");
copyFileSync(new URL("./entry.png", import.meta.url), dest);
const srcBytes = statSync(new URL("./entry.png", import.meta.url)).size;
const destBytes = statSync(dest).size;
if (destBytes !== srcBytes) throw new Error(`size mismatch: ${destBytes} != ${srcBytes}`);
console.log(`Wrote ${destBytes} bytes to ${dest}`);
