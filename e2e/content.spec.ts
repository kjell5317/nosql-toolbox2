import { test, expect } from '@playwright/test';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const tree = require('../src/tree.json');

test('Index Page', async ({ page }) => {
    await page.goto('http://localhost:4321');

    // Title
    await expect(page.locator("main > div > div > h1")).toHaveText(tree.title);
    // Description
    await expect(page.locator("main > div > div > p")).toHaveText(tree.description);
})

test("Start Page", async ({ page }) => {
    await page.goto('http://localhost:4321/start');

    await expect(page.locator("main astro-island > div:nth-child(1) > div:nth-child(1)")).toBeEmpty();
    await expect(page.locator("main astro-island > div:nth-child(1) > div:nth-child(2)")).toHaveText(/1 \/ \d+/);
    // More info
    if (tree.info) {
        await expect(page.locator("main astro-island > div:nth-child(1) > div > button")).toHaveText("More Info");
        expect(await page.locator("#more > div > p").innerHTML()).toBe(tree.info);
    }
    await expect(page.locator("main astro-island > h1")).toHaveText(tree.name);
    for (let i = 0;  i < tree.children.length; i++) {
        await expect(page.locator(`main astro-island > div > div:nth-child(${i + 1}) > button`)).toHaveText(tree.children[i].answer);
    }
})