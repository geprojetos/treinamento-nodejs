import { test, expect } from '@playwright/test';

test.describe('List', () => {
  test('should be able get button Cadastrar', async ({ page }) => {
    await page.goto('http://localhost:4200');
    await expect(page.getByRole('button', { name: 'Cadastrar' })).toBeVisible();
  });
});
