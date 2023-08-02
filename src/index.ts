import puppeteer from "@cloudflare/puppeteer";
import { Buffer } from "node:buffer";

/*
 * Without this, pupeeter throws error
 *
 */
// globalThis.Buffer = Buffer;
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler deploy src/index.ts --name my-worker` to deploy your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
  BROWSER: Fetcher;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const browser = await puppeteer.launch(env.BROWSER);
    const page = await browser.newPage();

    await page.goto("https://example.com");

    const img = await page.screenshot({ fullPage: true });

    await browser.close();

    return new Response(img, { headers: { "content-type": "image/png" } });
  },
};
