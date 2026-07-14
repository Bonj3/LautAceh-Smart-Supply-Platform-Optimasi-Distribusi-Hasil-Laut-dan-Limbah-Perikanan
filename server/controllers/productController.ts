import { Product, ProductInput } from '@lautaceh/shared';
import { v4 as uuidv4 } from 'uuid';

/* ──────────────────────────────────────────────
   In-Memory Storage
   ────────────────────────────────────────────── */

const products = new Map<string, Product>();

// Mock penjual ID (nanti diganti auth session)
const MOCK_PENJUAL_ID = "penjual-001";

/* ──────────────────────────────────────────────
   Helper: check & expire timed-out products
   ────────────────────────────────────────────── */

function checkExpiry(product: Product): Product {
  if (product.status !== "dijual" || !product.waktuMulaiJual) return product;
  
  const start = new Date(product.waktuMulaiJual).getTime();
  const durasiMs = product.durasiJualJam * 60 * 60 * 1000;
  const now = Date.now();
  
  if (now >= start + durasiMs) {
    product.status = "selesai";
    products.set(product.id, product);
  }
  
  return product;
}

/* ──────────────────────────────────────────────
   Controllers
   ────────────────────────────────────────────── */

import { Request, Response } from 'express';

/** GET /api/products — List all products for a seller */
export function listProducts(req: Request, res: Response) {
  const penjualId = (req.query.penjualId as string) || MOCK_PENJUAL_ID;
  
  const result: Product[] = [];
  products.forEach((p) => {
    if (p.penjualId === penjualId) {
      result.push(checkExpiry(p));
    }
  });
  
  // Sort by createdAt descending
  result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  res.json({ data: result });
}

/** POST /api/products — Create a new product */
export function createProduct(req: Request, res: Response) {
  const input: ProductInput = req.body;
  
  if (!input.jenisIkan || !input.namaJudul || !input.hargaTiers || input.stokKilo == null) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  
  if (input.stokKilo < 0.25) {
    res.status(400).json({ error: "Stok minimum adalah 250 gram (0.25 kg)" });
    return;
  }
  
  const id = uuidv4();
  const now = new Date().toISOString();
  
  const product: Product = {
    id,
    jenisIkan: input.jenisIkan,
    namaJudul: input.namaJudul,
    hargaTiers: input.hargaTiers,
    stokKilo: input.stokKilo,
    beratMinimal: 0.25,
    gambarUrl: input.gambarUrl || "",
    status: input.status || "draft",
    waktuMulaiJual: input.status === "dijual" ? now : undefined,
    durasiJualJam: input.durasiJualJam || 5,
    penjualId: MOCK_PENJUAL_ID,
    createdAt: now,
  };
  
  products.set(id, product);
  res.status(201).json({ data: product });
}

/** PUT /api/products/:id — Update a product */
export function updateProduct(req: Request, res: Response) {
  const id = req.params.id as string;
  const existing = products.get(id);
  
  if (!existing) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  
  const input: Partial<ProductInput> = req.body;
  
  const updated: Product = {
    ...existing,
    jenisIkan: input.jenisIkan ?? existing.jenisIkan,
    namaJudul: input.namaJudul ?? existing.namaJudul,
    hargaTiers: input.hargaTiers ?? existing.hargaTiers,
    stokKilo: input.stokKilo ?? existing.stokKilo,
    gambarUrl: input.gambarUrl ?? existing.gambarUrl,
    durasiJualJam: input.durasiJualJam ?? existing.durasiJualJam,
  };
  
  // If status changed to "dijual", start the timer
  if (input.status === "dijual" && existing.status !== "dijual") {
    updated.status = "dijual";
    updated.waktuMulaiJual = new Date().toISOString();
  } else if (input.status === "draft") {
    updated.status = "draft";
    updated.waktuMulaiJual = undefined;
  }
  
  products.set(id, updated);
  res.json({ data: updated });
}

/** DELETE /api/products/:id — Delete a product */
export function deleteProduct(req: Request, res: Response) {
  const id = req.params.id as string;
  
  if (!products.has(id)) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  
  products.delete(id);
  res.json({ message: "Product deleted" });
}

/** PATCH /api/products/:id/publish — Publish (draft → dijual) */
export function publishProduct(req: Request, res: Response) {
  const id = req.params.id as string;
  const existing = products.get(id);
  
  if (!existing) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  
  existing.status = "dijual";
  existing.waktuMulaiJual = new Date().toISOString();
  products.set(id, existing);
  
  res.json({ data: existing });
}

/** PATCH /api/products/:id/withdraw — Withdraw (dijual → draft) */
export function withdrawProduct(req: Request, res: Response) {
  const id = req.params.id as string;
  const existing = products.get(id);
  
  if (!existing) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  
  existing.status = "draft";
  existing.waktuMulaiJual = undefined;
  products.set(id, existing);
  
  res.json({ data: existing });
}
