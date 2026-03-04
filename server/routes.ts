import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

let muxCache: { data: Record<string, any>; ts: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000;

async function fetchMuxAssets(): Promise<Record<string, { title?: string; director?: string; client?: string }>> {
  if (muxCache && Date.now() - muxCache.ts < CACHE_TTL) {
    return muxCache.data;
  }

  const tokenId = process.env.MUX_TOKEN_ID;
  const tokenSecret = process.env.MUX_TOKEN_SECRET;
  if (!tokenId || !tokenSecret) throw new Error("Mux credentials not configured");

  const auth = Buffer.from(`${tokenId}:${tokenSecret}`).toString("base64");
  const results: Record<string, { title?: string; director?: string; client?: string }> = {};

  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const resp = await fetch(`https://api.mux.com/video/v1/assets?page=${page}&limit=100`, {
      headers: { Authorization: `Basic ${auth}` },
    });

    if (!resp.ok) {
      console.error(`Mux API error: ${resp.status} ${resp.statusText}`);
      break;
    }

    const body = await resp.json();
    const assets = body.data || [];

    for (const asset of assets) {
      if (asset.playback_ids) {
        for (const pb of asset.playback_ids) {
          results[pb.id] = {
            title: asset.meta?.title || undefined,
            director: asset.meta?.creator_id || undefined,
            client: asset.meta?.external_id || undefined,
          };
        }
      }
    }

    if (assets.length < 100) {
      hasMore = false;
    } else {
      page++;
    }
  }

  muxCache = { data: results, ts: Date.now() };
  return results;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/mux/metadata", async (_req, res) => {
    try {
      const data = await fetchMuxAssets();
      return res.json(data);
    } catch (err: any) {
      console.error("Mux metadata error:", err);
      return res.status(500).json({ error: err.message || "Failed to fetch Mux metadata" });
    }
  });

  return httpServer;
}
