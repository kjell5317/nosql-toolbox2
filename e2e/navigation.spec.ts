import { test, expect } from '@playwright/test';

test('Has title', async ({ page }) => {
  await page.goto('http://localhost:4321');

  await expect(page).toHaveTitle(/.+ \| NoSQL Toolbox 2.0/);
});

test('Get started link', async ({ page }) => {
  await page.goto('http://localhost:4321');

  // Click the get started link.
  await page.getByRole('link', { name: 'Start' }).click();

  await expect(page).toHaveURL(/.+\/start/);
});
