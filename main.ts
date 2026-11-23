import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One-Star Review of Something Essential — gravity.
// A deadpan one-star review: a real complaint filed in earnest against a
// thing that cannot be fixed, landing in a single line. The grievance is
// concrete (a phone dropped face-down on concrete), the turn arrives in
// the last few words: gravity has never once caught anything.
const REVIEW =
  "Gravity drops my phone face-down on concrete and then refuses to pick it up. One star. It has never once caught anything.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_LENGTH = 160;

function validate(review: string): void {
  // Count Unicode code points, not UTF-16 units, so the gate's
  // "1 to 160 characters" is measured the way a reader sees it.
  const length = [...review].length;
  if (length < 1 || length > MAX_LENGTH) {
    throw new Error(
      `review must be 1-${MAX_LENGTH} characters, got ${length}`,
    );
  }
  if (review.trim().length === 0) {
    throw new Error("review must not be only whitespace");
  }
  if (review.includes("\n") || review.includes("\r")) {
    throw new Error("review must be a single line");
  }
}

validate(REVIEW);
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, REVIEW, "utf8");
// Read the file back and prove what landed on disk is exactly the review.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== REVIEW) {
  throw new Error("verification failed: /output/entry.txt does not match the review");
}
console.log(`Wrote ${[...REVIEW].length} characters to ${OUTPUT_PATH} (verified)`);
