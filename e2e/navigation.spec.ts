import { test, expect } from '@playwright/test';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const tree = require('../src/tree.json');

test('Has title and description', async ({ page }) => {
  await page.goto('http://localhost:4321');

  // Title
  await expect(page).toHaveTitle(new RegExp(`${tree.title}.+ \| NoSQL Toolbox 2.0`));
  // Description
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', tree.description);
});

test('Start link', async ({ page }) => {
  await page.goto('http://localhost:4321');
  await page.getByRole('link', { name: 'Start' }).click();

  await expect(page).toHaveURL(/.+\/start/);
});

test('About link', async ({ page }) => {
  await page.goto('http://localhost:4321');
  await page.getByRole('link', { name: 'About' }).click();

  await expect(page).toHaveURL(/.+\/info/);
})

test('Dev link', async ({ page }) => {
  await page.goto('http://localhost:4321');
  await page.getByRole('link', { name: 'Dev' }).click();

  await expect(page).toHaveURL(/https:\/\/github.com\/kjell5317\/nosql-toolbox2/);
})
