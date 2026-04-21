import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const env = Object.fromEntries(
  readFileSync(resolve(ROOT, '.env'), 'utf8')
    .split('\n')
    .filter((l) => l.trim() && !l.startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const API_KEY = env.GEMINI_API_KEY;
if (!API_KEY) throw new Error('GEMINI_API_KEY missing in .env');

const MODEL = 'gemini-2.5-flash-image';
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const STYLE = [
  'Modern editorial photography, overhead flat-lay on a warm wooden surface.',
  'Soft golden-hour window light, shallow depth of field, subtle shadows.',
  'Muted color palette of deep navy, amber, cream, and warm wood tones.',
  'Clean minimalist composition, professional and calm mood, cinematic color grading.',
  'Photorealistic, high detail, magazine-quality.',
  'Absolutely no text, no words, no labels, no watermarks, no logos, no signs, no letters, no numbers, no characters on any surface, paper, or screen — all paper and screens are blank or show only abstract charts/lines without labels.',
  'Wide 3:2 aspect ratio, horizontal landscape orientation.',
].join(' ');

const IMAGES = [
  {
    out: 'service-fiscalite.webp',
    subject:
      'Subject: tax and fiscal planning. A sleek silver desk calculator, a neatly stacked pile of blank unlabelled tax documents with only abstract chart shapes, a leather-bound notebook, a fountain pen, a few Canadian silver coins, and a ceramic coffee cup. Suggests careful tax structuring for a Canadian financial advisor.',
  },
  {
    out: 'service-assurances.webp',
    subject:
      'Subject: insurance and family protection. A paper-cut silhouette of a family of three, sheltered beneath a softly glowing translucent shield or protective dome shape, a single small brass key resting on the wood, a closed leather portfolio to the side. Suggests life and disability insurance, stability, and continuity. Symbolic but tasteful — no stock cliches.',
  },
  {
    out: 'service-placements.webp',
    subject:
      'Subject: investments and portfolio growth. A modern tablet screen displaying a clean abstract upward-trending line chart and bar chart in navy and amber tones (no axis labels, no numbers, no ticker symbols), a small potted succulent, a brushed-metal pen, a leather notebook, a ceramic coffee cup. Suggests disciplined long-term investment strategy.',
  },
];

async function generate({ out, subject }) {
  const prompt = `${STYLE}\n\n${subject}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ['IMAGE'] },
  };

  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`HTTP ${res.status} for ${out}: ${t.slice(0, 500)}`);
  }

  const json = await res.json();
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  const imgPart = parts.find((p) => p.inlineData?.data);
  if (!imgPart) {
    throw new Error(`No image in response for ${out}: ${JSON.stringify(json).slice(0, 500)}`);
  }

  const pngBuf = Buffer.from(imgPart.inlineData.data, 'base64');
  const outDir = resolve(ROOT, 'public/images/generated');
  mkdirSync(outDir, { recursive: true });
  const outPath = resolve(outDir, out);

  await sharp(pngBuf).webp({ quality: 88 }).toFile(outPath);
  const stat = readFileSync(outPath).length;
  console.log(`✓ ${out} — ${Math.round(stat / 1024)} KB`);
}

for (const spec of IMAGES) {
  console.log(`Generating ${spec.out} …`);
  try {
    await generate(spec);
  } catch (e) {
    console.error(`✗ ${spec.out}: ${e.message}`);
    process.exitCode = 1;
  }
}
