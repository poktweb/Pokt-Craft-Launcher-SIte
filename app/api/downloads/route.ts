import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const CLOUD_GET_URL = "https://abacus.jasoncameron.dev/get/poktcraft-launcher/downloads-v1";
const CLOUD_HIT_URL = "https://abacus.jasoncameron.dev/hit/poktcraft-launcher/downloads-v1";

async function getLocalCount() {
  try {
    const jsonPath = path.join(process.cwd(), "public", "downloads.json");
    const content = await readFile(jsonPath, "utf8");
    const parsed = JSON.parse(content) as { downloads?: number };
    return typeof parsed.downloads === "number" ? parsed.downloads : 0;
  } catch {
    return 0;
  }
}

function cors(res: NextResponse) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
}

export async function OPTIONS() {
  return cors(new NextResponse(null, { status: 200 }));
}

export async function GET() {
  const localCount = await getLocalCount();

  try {
    const response = await fetch(CLOUD_GET_URL, { next: { revalidate: 30 } });
    if (response.ok) {
      const data = (await response.json()) as { value?: number };
      if (typeof data.value === "number") {
        return cors(NextResponse.json({ downloads: data.value, source: "cloud" }));
      }
    } else if (response.status === 404) {
      return cors(NextResponse.json({ downloads: 0, source: "cloud_clean" }));
    }
  } catch (err) {
    console.error("Erro ao ler da nuvem:", err);
  }

  return cors(NextResponse.json({ downloads: localCount, source: "local_json" }));
}

export async function POST() {
  const localCount = await getLocalCount();

  try {
    const response = await fetch(CLOUD_HIT_URL, { cache: "no-store" });
    if (response.ok) {
      const data = (await response.json()) as { value?: number };
      return cors(
        NextResponse.json({
          downloads: typeof data.value === "number" ? data.value : localCount + 1,
          source: "cloud"
        })
      );
    }
  } catch (err) {
    console.error("Erro ao incrementar na nuvem:", err);
  }

  return cors(NextResponse.json({ downloads: localCount + 1, source: "local_fallback" }));
}
