import { expect, test } from '@playwright/test';

test('compiled CSS works without Tailwind or a global reset', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#styled-action')).toHaveCSS('display', 'inline-flex');
  await expect(page.locator('body')).toHaveCSS('margin-top', '13px');
  await expect(page.locator('#host-sentinel')).toHaveCSS('margin-top', '19px');
  await expect(page.locator('#styled-action')).toHaveCSS('background-color', 'rgb(57, 114, 195)');
});

test('all expressions and accents reach portaled components', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  for (const system of ['forma', 'minimal', 'nocturne', 'brutalism']) {
    await page.getByLabel('System', { exact: true }).selectOption(system);
    for (const mode of ['light', 'dark']) {
      await page.getByLabel('Mode', { exact: true }).selectOption(mode);
      for (let accent = 0; accent < (system === 'forma' ? 1 : 3); accent += 1) {
        await page.getByLabel('Accent', { exact: true }).selectOption(String(accent));
        await page.getByRole('button', { name: 'Open dialog', exact: true }).click();
        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();
        const rootCard = await page
          .locator('html')
          .evaluate((root) => getComputedStyle(root).getPropertyValue('--card').trim());
        const dialogColor = await dialog.evaluate((element) =>
          getComputedStyle(element).getPropertyValue('--card').trim(),
        );
        expect(dialogColor).toBe(rootCard);
        await expect(dialog).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
        await page.keyboard.press('Escape');
        await expect(page.getByRole('button', { name: 'Open dialog', exact: true })).toBeFocused();
      }
    }
  }
  expect(errors).toEqual([]);
});

test('installed form, switch, and keyboard tabs retain behavior', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('switch').click();
  await expect(page.getByRole('switch')).toHaveAttribute('data-state', 'unchecked');
  await page.getByRole('button', { name: 'Validate', exact: true }).click();
  await expect(page.getByLabel('Email', { exact: true })).toBeFocused();
  await expect(page.locator('#feedback')).toHaveText('Enter a valid email');
  await page.getByLabel('Email', { exact: true }).fill('person@example.com');
  await page.getByRole('button', { name: 'Validate', exact: true }).click();
  await expect(page.locator('#feedback')).toHaveText('Email accepted');
  await page.getByRole('tab', { name: 'Overview' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Activity' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
});

test('installed AI patterns support explicit confirmation and streaming stop', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Approve', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Approved locally' })).toBeVisible();
  await page.getByLabel('Message to assistant').fill('Check the packed components');
  await page.getByRole('button', { name: 'Send', exact: true }).click();
  await expect(page.getByText(/Packed component reply/)).toBeVisible();
  await expect(page.getByText('Preview only. No model is connected.')).toBeVisible();
  await page.getByLabel('Message to assistant').fill('Another longer local request');
  await page.getByRole('button', { name: 'Send', exact: true }).click();
  await page.getByRole('button', { name: 'Stop response' }).click();
  await expect(page.getByRole('button', { name: 'Send', exact: true })).toBeVisible();
});

test('packed consumer reflows with reduced motion', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({
    path: testInfo.outputPath('packed-consumer-mobile.png'),
    fullPage: true,
  });
});
