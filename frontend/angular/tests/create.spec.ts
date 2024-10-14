import { test, expect } from '@playwright/test';

test.describe('Create', () => {
  test('should be able navigate to create', async ({ page }) => {
    await page.goto('http://localhost:4200');
    await page.getByRole('button', { name: 'Cadastrar' }).click();

    await expect(page).toHaveURL('http://localhost:4200/create');
  });

  test('should be able error create, name is required', async ({ page }) => {
    await page.goto('http://localhost:4200');
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    await page.locator('[data-id="food-create-input-price"]').fill('10');
    await page
      .locator('[data-id="food-create-input-category"]')
      .fill('teste-cy');

    await page.locator('[data-id="food-create-btn-create"]').click();

    await expect(
      page.locator('[data-id="food-create-error-input-name"]')
    ).toHaveText('Name is required');
  });

  test('should be able error create, price is required', async ({ page }) => {
    await page.goto('http://localhost:4200');
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    await page.locator('[data-id="food-create-input-name"]').fill('teste-cy');
    await page
      .locator('[data-id="food-create-input-category"]')
      .fill('teste-cy');

    await page.locator('[data-id="food-create-btn-create"]').click();

    await expect(
      page.locator('[data-id="food-create-error-input-price"]')
    ).toHaveText('Price is required');
  });

  test('should be able error create, category is required', async ({
    page,
  }) => {
    await page.goto('http://localhost:4200');
    await page.getByRole('button', { name: 'Cadastrar' }).click();
    await page.locator('[data-id="food-create-input-name"]').fill('teste-cy');
    await page.locator('[data-id="food-create-input-price"]').fill('10');

    await page.locator('[data-id="food-create-btn-create"]').click();

    await expect(
      page.locator('[data-id="food-create-error-input-category"]')
    ).toHaveText('Category is required');
  });
});
