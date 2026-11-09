import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
const catalog = JSON.parse(
  readFileSync(new URL('../src/catalog-manifest.json', import.meta.url), 'utf8'),
);
const uiNames: string[] = catalog.ui.map((entry: { name: string }) => entry.name);
const aiNames: string[] = catalog.ai.map((entry: { name: string }) => entry.name);
async function choose(page: import('@playwright/test').Page, name: string) {
  await page.locator('.component-nav').getByRole('button', { name, exact: true }).click();
  await expect(page.locator('#specimen-name')).toHaveText(name);
  await expect(page.getByText('Loading component…', { exact: true })).toHaveCount(0);
}
test('all core and AI demos mount without runtime failures', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  expect(uiNames.length).toBe(68);
  expect(aiNames.length).toBe(22);
  for (const name of uiNames) {
    await choose(page, name);
    await expect(page.getByText('Example failed to render:', { exact: false })).toHaveCount(0);
  }
  await page.getByRole('button', { name: /AI Elements 22/ }).click();
  for (const name of aiNames) {
    await choose(page, name);
    await expect(page.getByText('Example failed to render:', { exact: false })).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});
test('all theme expressions and accents propagate to controls and portaled dialogs', async ({
  page,
}) => {
  await page.goto('/');
  await choose(page, 'Dialog');
  for (const system of ['Forma', 'Minimal', 'Nocturne', 'Brutalism']) {
    await page.getByRole('button', { name: 'Use ' + system, exact: true }).click();
    for (const mode of ['light', 'dark']) {
      if ((await page.locator('html').getAttribute('data-mode')) !== mode)
        await page.getByRole('button', { name: 'Switch to ' + mode }).click();
      await expect(page.locator('html')).toHaveAttribute('data-system', system.toLowerCase());
      const count = system === 'Forma' ? 1 : 3;
      for (let accent = 0; accent < count; accent++) {
        if (count > 1) await page.getByLabel('Accent family').selectOption(String(accent));
        await page.getByRole('button', { name: 'Open project settings' }).click();
        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();
        await expect(dialog.getByLabel('Project name')).toHaveValue('Exploration 001');
        expect(await dialog.evaluate((el) => getComputedStyle(el).backgroundColor)).not.toBe(
          'rgba(0, 0, 0, 0)',
        );
        await page.keyboard.press('Escape');
        await expect(dialog).not.toBeVisible();
        await expect(page.getByRole('button', { name: 'Open project settings' })).toBeFocused();
      }
    }
  }
});
test('form recovery, tabs, data table, and local streaming chat work', async ({ page }) => {
  await page.goto('/');
  await choose(page, 'Field');
  await page.getByRole('button', { name: 'Validate email' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Enter a valid email' })).toBeVisible();
  await expect(page.getByLabel('Work email')).toBeFocused();
  await page.getByLabel('Work email').fill('designer@example.com');
  await page.getByRole('button', { name: 'Validate email' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Email accepted' })).toBeVisible();
  await choose(page, 'Tabs');
  await page.getByRole('tab', { name: 'Overview' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Activity' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await choose(page, 'Data Table');
  await page.getByLabel('Filter projects').fill('nothing-matches');
  await expect(page.getByRole('status').filter({ hasText: 'No matching projects' })).toBeVisible();
  await page.getByLabel('Filter projects').fill('Art');
  await expect(page.getByRole('cell', { name: 'Art direction', exact: true })).toBeVisible();
  await page.getByRole('button', { name: /AI Elements 22/ }).click();
  await choose(page, 'Chat');
  await page.getByLabel('Message to assistant').fill('Compare component anatomy');
  await page.getByRole('button', { name: 'Send', exact: true }).click();
  await expect(page.getByText(/Local preview for/)).toBeVisible();
  await expect(page.getByText('Preview only. No model is connected.')).toBeVisible();
  await page.getByLabel('Message to assistant').fill('Another local preview');
  await page.getByRole('button', { name: 'Send', exact: true }).click();
  await page.getByRole('button', { name: 'Stop response' }).click();
  await expect(page.getByRole('button', { name: 'Send', exact: true })).toBeVisible();
});
test('identity screenshots and narrow-layout/reduced-motion check', async ({ page }, testInfo) => {
  await page.goto('/');
  await choose(page, 'Card');
  for (const system of ['Forma', 'Minimal', 'Nocturne', 'Brutalism']) {
    await page.getByRole('button', { name: 'Use ' + system }).click();
    await page
      .locator('.specimen-section')
      .screenshot({ path: testInfo.outputPath(system.toLowerCase() + '.png') });
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.react-specimen')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.screenshot({ path: testInfo.outputPath('mobile.png'), fullPage: true });
});
