import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Resolve clean pSEO URLs to their pre-rendered HTML before serving assets.
  // The guard keeps the resolved file inside the build directory.
  app.get("/{*path}", (req, res, next) => {
    const cleanPath = req.path.replace(/^\/+|\/+$/g, "");
    if (!cleanPath) return next();

    const htmlPath = path.resolve(distPath, `${cleanPath}.html`);
    const isInsideBuild = htmlPath.startsWith(`${distPath}${path.sep}`);
    if (isInsideBuild && fs.existsSync(htmlPath)) {
      return res.sendFile(htmlPath);
    }

    return next();
  });

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("/{*path}", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
