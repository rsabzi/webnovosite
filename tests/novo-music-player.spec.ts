import { expect, test } from "playwright/test";
import { PROJECTS, PROJECT_CATEGORIES, getProject } from "../src/data/projects";
import novo from "../src/data/novo-music-player.json";

// The browser override is only for restricted CI/sandbox environments.
// A normal Playwright installation uses its own Chromium by default.
test.use({
  baseURL: process.env.PORTFOLIO_BASE_URL ?? "http://localhost:3000",
  colorScheme: "dark",
  launchOptions: {
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    args: ["--no-sandbox"],
  },
});

const projectPath = `/projects/${novo.slug}`;
const coverPath = "/images/works/novo/03-home-widget.webp";
const coverAlt = "ویجت صفحهٔ اصلی اپ نوو با کاور آهنگ، تایم‌لاین و دکمه‌های کنترل";

const galleryAlts = [
  "فهرست آهنگ‌ها در اپ نوو با تب‌های همه آهنگ‌ها، علاقه‌مندی‌ها، پربازدیدترین و اخیراً",
  "صفحهٔ پخش اپ نوو با کاور آهنگ و پیش‌نمایش آهنگ بعدی هنگام کشیدن",
  coverAlt,
  "اکولایزر پنج‌باندی گرافیکی اپ نوو",
  "صفحهٔ تنظیمات اپ نوو با انتخاب زبان و رنگ تم",
  "بخش «بیشتر از نوین‌وب» در تنظیمات اپ نوو",
];

test("the supplied Persian content is mapped without rewriting or invented metrics", () => {
  const project = getProject(novo.slug)!;
  expect(PROJECTS.filter((entry) => entry.slug === novo.slug)).toHaveLength(1);
  expect(project.title).toBe(novo.title_fa);
  expect(project.subtitle).toBe(novo.summary_fa);
  expect(project.summary).toBe(novo.summary_fa);
  expect(project.year).toBe(novo.year);
  expect(project.client).toBe(novo.client_fa);
  expect(project.liveNote).toBe(novo.status_fa);
  expect(project.stack).toEqual(novo.stack);
  expect(project.highlights).toEqual(novo.highlights_fa);
  expect(project.results).toEqual(novo.metrics_fa);
  expect(project.image).toBe(coverPath);
  expect(project.imageAlt).toBe(coverAlt);
  expect(project.caseStudy!.role).toBe(novo.role_fa);
  expect([
    project.caseStudy!.intro,
    project.solution,
    project.challenge,
    ...project.caseStudy!.sections.map((section) => section.text),
  ]).toEqual(novo.body_fa);
  expect(project.caseStudy!.gallery.map((item) => item.alt)).toEqual(galleryAlts);
  expect(project.caseStudy!.gallery.map((item) => item.image)).toEqual(
    novo.gallery.map((filename) => `/images/works/novo/${filename.replace(/\.png$/, ".webp")}`),
  );
  expect(project.caseStudy!.links.map((link) => link.href)).toEqual(Object.values(novo.links));
  expect(PROJECT_CATEGORIES.find((category) => category.id === project.category)?.label).toBe(novo.category_fa);
  expect(PROJECTS.slice(0, 6).map((entry) => entry.slug)).not.toContain(novo.slug);
});

test("the dedicated metadata and automatic sitemap include Novo", async ({ page, request }) => {
  const response = await page.goto(projectPath);
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(`${novo.title_fa} | نمونه‌کار نوین وب`);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", novo.summary_fa);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", `${novo.title_fa} | نمونه‌کار نوین وب`);
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", novo.summary_fa);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", new RegExp(`${coverPath}$`));
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", coverAlt);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", new RegExp(`${coverPath}$`));
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${projectPath}$`));
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain(`${projectPath}</loc>`);
});

test("all real gallery assets are served as WebP and next/image negotiates a modern format", async ({ request }) => {
  for (const image of getProject(novo.slug)!.caseStudy!.gallery) {
    const response = await request.get(image.image);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/webp");
  }
  const optimized = await request.get(`/_next/image?url=${encodeURIComponent(coverPath)}&w=640&q=75`, {
    headers: { accept: "image/avif,image/webp,image/*" },
  });
  expect(optimized.status()).toBe(200);
  expect(optimized.headers()["content-type"]).toMatch(/^image\/(avif|webp)/);
});

for (const [device, viewport] of [
  ["desktop", { width: 1440, height: 1000 }],
  ["mobile", { width: 390, height: 844 }],
] as const) {
  test.describe(device, () => {
    test.use({ viewport });

    test("shows the complete story, factual specifications, six full screenshots and safe links", async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(projectPath);
      await expect(page.locator("html")).toHaveAttribute("lang", "fa");
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
      const main = page.locator("main");
      await expect(main.getByRole("heading", { level: 1 })).toHaveText(novo.title_fa);
      await expect(main.getByText(novo.summary_fa, { exact: true })).toBeVisible();
      await expect(main.getByText(novo.status_fa, { exact: true })).toBeVisible();
      await expect(main).toContainText(novo.role_fa);
      for (const paragraph of novo.body_fa) {
        await expect(main.getByText(paragraph, { exact: true })).toHaveCount(1);
        await expect(main.getByText(paragraph, { exact: true })).toBeVisible();
      }
      for (const highlight of novo.highlights_fa) {
        await expect(main.getByText(highlight, { exact: true })).toBeVisible();
      }
      for (const metric of novo.metrics_fa) {
        await expect(main.getByText(metric.label, { exact: true })).toBeVisible();
        await expect(main.getByText(metric.value, { exact: true }).first()).toBeVisible();
      }
      for (const technology of novo.stack) await expect(main).toContainText(technology);
      await expect(main.getByRole("heading", { name: "سخت‌ترین بخش کار" })).toBeVisible();
      await expect(main.getByRole("heading", { name: "مشخصات نوو" })).toBeVisible();
      await expect(main.getByRole("heading", { name: "نتیجه قابل اندازه‌گیری" })).toHaveCount(0);
      const figures = main.locator("figure");
      await expect(figures).toHaveCount(6);
      for (const [index, image] of getProject(novo.slug)!.caseStudy!.gallery.entries()) {
        const figure = figures.nth(index);
        await figure.scrollIntoViewIfNeeded();
        await expect(figure.locator("img")).toHaveAttribute("alt", image.alt);
        await expect(figure.locator("a")).toHaveAttribute("href", image.image);
        await expect(figure.locator("img")).toBeVisible();
        await expect.poll(() => figure.locator("img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
      }
      for (const link of getProject(novo.slug)!.caseStudy!.links) {
        const anchor = main.getByRole("link", { name: link.label, exact: true });
        await expect(anchor).toHaveAttribute("href", link.href);
        await expect(anchor).toHaveAttribute("target", "_blank");
        await expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
      }
      await expect(main.locator('a[href*="/releases/download/"], a[href$=".apk"], a[href$=".aab"]')).toHaveCount(0);
      expect(errors).toEqual([]);
    });

    test("the existing project grid filters to Android and opens the new page", async ({ page }) => {
      await page.goto("/projects");
      const grid = page.locator("main section").filter({ has: page.getByRole("button", { name: /همه پروژه‌ها/ }) });
      const links = grid.locator('a[href^="/projects/"]');
      await expect(links).toHaveCount(PROJECTS.length);
      await expect(grid.locator(`a[href="${projectPath}"] img`)).toHaveAttribute("alt", coverAlt);
      await page.getByRole("button", { name: /اپلیکیشن اندروید/ }).click();
      await expect(links).toHaveCount(1);
      await expect(links.first()).toContainText(novo.title_fa);
      await expect(links.first()).toContainText(novo.status_fa);
      await expect(grid.locator(`a[href="${projectPath}"]`)).toHaveCount(0);
      await page.getByRole("button", { name: /همه پروژه‌ها/ }).click();
      await expect(links).toHaveCount(PROJECTS.length);
      await grid.locator(`a[href="${projectPath}"]`).click();
      await expect(page).toHaveURL(new RegExp(`${projectPath}$`));
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(novo.title_fa);
    });

    test("the new page fits the viewport in both existing themes", async ({ page }) => {
      for (const theme of ["dark", "light"]) {
        await page.goto(projectPath);
        await page.evaluate((value) => localStorage.setItem("webnovo-theme", value), theme);
        await page.reload();
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        expect(await page.locator("html").evaluate((element) => element.classList.contains("light"))).toBe(theme === "light");
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      }
    });
  });
}

test("legacy project content, the unfeatured home grid and not-found handling remain intact", async ({ page }) => {
  await page.goto(`/projects/${PROJECTS[0].slug}`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(PROJECTS[0].title);
  await expect(page.getByRole("heading", { name: "مسئله‌ای که وجود داشت" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "راه‌حلی که پیاده شد" })).toBeVisible();
  await expect(page.locator("main figure")).toHaveCount(0);
  await page.goto("/");
  const homeCards = page.locator('#projects a[href^="/projects/"]');
  await expect(homeCards).toHaveCount(PROJECTS.length);
  await expect(page.locator(`#projects a[href="${projectPath}"]`)).toHaveCount(0);
  const missing = await page.goto("/projects/not-a-real-project");
  expect(missing?.status()).toBe(404);
});
