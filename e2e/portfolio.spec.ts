import { test, expect, type Page } from '@playwright/test';

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'OJT Experience', id: 'experience' },
  { label: 'Skills', id: 'skills' },
  { label: 'Credentials', id: 'credentials' },
  { label: 'Contact', id: 'contact' },
] as const;

async function expectImageLoaded(img: ReturnType<Page['locator']>) {
  await img.scrollIntoViewIfNeeded();
  await expect(img).toBeVisible();
  await expect
    .poll(async () => img.evaluate((el: HTMLImageElement) => el.naturalWidth))
    .toBeGreaterThan(0);
}

test.describe('Portfolio site', () => {
  test('nav links scroll to their sections', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main Navigation' });

    for (const { label, id } of NAV_ITEMS) {
      await nav.getByRole('link', { name: label, exact: true }).click();
      const section = page.locator(`section#${id}`);
      await expect(section).toBeInViewport({ timeout: 5000 });
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
    }
  });

  test('OJT Experience renders heading, 3 internship cards, department, skills chips', async ({
    page,
  }) => {
    await page.goto('/');
    const section = page.locator('section#experience');
    await section.scrollIntoViewIfNeeded();

    await expect(section.getByRole('heading', { name: 'OJT Experience' })).toBeVisible();

    const cards = section.locator('article');
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0)).toContainText('Nexvision Innovations Inc.');
    await expect(cards.nth(1)).toContainText('FlyRank AI');
    await expect(cards.nth(2)).toContainText('Mashup Garage');

    await expect(cards.nth(0)).toContainText('Software Development Dept.');

    await expect(
      cards.nth(0).getByText('Skills & Competencies Developed'),
    ).toBeVisible();
    await expect(cards.nth(0).getByText('Technical Leadership', { exact: true })).toBeVisible();
    await expect(cards.nth(0).getByText('CI/CD Engineering', { exact: true })).toBeVisible();
  });

  test('Sample Works cards render and redacted screenshot loads', async ({ page }) => {
    const failedResponses: string[] = [];
    page.on('response', (res) => {
      if (res.status() >= 400) failedResponses.push(`${res.status()} ${res.url()}`);
    });

    await page.goto('/');
    const section = page.locator('section#experience');

    await expect(
      section.getByRole('heading', { name: 'Sample Works on OJT' }),
    ).toBeVisible();
    await expect(section.getByText('Statutory Payroll & Timekeeping Engines')).toBeVisible();
    await expect(section.getByText('Multi-Tenant Data Security')).toBeVisible();
    await expect(section.getByText('CI/CD Mock Testing Daemon')).toBeVisible();

    const screenshot = section.locator('img[src*="hris-login-redacted"]');
    await expectImageLoaded(screenshot);

    expect(
      failedResponses.filter((r) => r.includes('hris-login-redacted')),
      `redacted screenshot request failed: ${failedResponses.join(', ')}`,
    ).toHaveLength(0);
  });

  test('Reflections render', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('section#experience');

    await expect(section.getByRole('heading', { name: 'Reflections' })).toBeVisible();
    await expect(section.getByText(/Twelve weeks at Nexvision/)).toBeVisible();
    await expect(section.getByText(/My proudest contribution/)).toBeVisible();
    await expect(section.getByText(/If I did it again/)).toBeVisible();
  });

  test('credentials section loads and a sample cert image resolves', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('section#credentials');
    await section.scrollIntoViewIfNeeded();

    await expect(
      section.getByRole('heading', { name: 'Honors, Certifications & Fellowships' }),
    ).toBeVisible();

    // Open the first credential proof and verify the cert image resolves.
    await section.getByRole('button', { name: 'Proof' }).first().click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expectImageLoaded(dialog.locator('img'));

    // Spot-check a few cert asset URLs return 200.
    for (const url of [
      '/assets/certificates/deans-list.webp',
      '/assets/certificates/bootdev_certificate.webp',
      '/assets/certificates/HTB-Certificate-Sergio984.webp',
    ]) {
      const res = await page.request.get(url);
      expect(res.status(), `${url} should return 200`).toBe(200);
    }
  });

  test('resume.pdf returns 200', async ({ page }) => {
    const res = await page.request.get('/resume.pdf');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('pdf');
  });

  test('mobile 375px: no horizontal overflow, nav usable', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, 'page should not overflow horizontally at 375px').toBeLessThanOrEqual(0);

    const nav = page.getByRole('navigation', { name: 'Main Navigation' });
    await expect(nav).toBeVisible();

    const experienceLink = nav.getByRole('link', { name: 'OJT Experience', exact: true });
    await experienceLink.scrollIntoViewIfNeeded();
    await experienceLink.click();
    await expect(page.locator('section#experience')).toBeInViewport({ timeout: 5000 });
    await expect(page).toHaveURL(/#experience$/);
  });

  test('no console errors on load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(String(err)));

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors, `console errors on load: ${errors.join(' | ')}`).toHaveLength(0);
  });

  test('llms.txt returns 200 and contains Mashup Garage', async ({ page }) => {
    const res = await page.request.get('/llms.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('Mashup Garage');
  });
});
