import test, { expect } from "@playwright/test";
const require = createRequire(import.meta.url);
// @ts-ignore
const json = require('../src/tree.json');
import { Tree } from "../src/Tree";
import { createRequire } from "module";

test("Reach Leaf", async ({ page }) => {
    await page.goto("http://localhost:4321/start");

    var tree = new Tree(json);
    var t = tree.children[0];
    var selector = "main astro-island > div:nth-child(3) > div:nth-child(1) > button"

    while (true) {
        if (await page.locator(selector).count() == 0) {
            await expect(page.locator("main astro-island > div:nth-child(1) > div:nth-child(2)")).toHaveText(/(\d+)\s\/\s\1/);
            break;
        }
        await expect(page.locator(selector)).toHaveText(t.answer);
        await page.locator(selector).click();
        t = t.children[0];
    }
});