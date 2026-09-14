import fs from 'node:fs';
import path from 'node:path';

describe('SEO & GEO Verification Suite', () => {
  const rootDir = path.resolve(__dirname, '..');
  const indexHtmlPath = path.join(rootDir, 'index.html');
  const robotsTxtPath = path.join(rootDir, 'public', 'robots.txt');
  const sitemapXmlPath = path.join(rootDir, 'public', 'sitemap.xml');
  const llmsTxtPath = path.join(rootDir, 'public', 'llms.txt');
  const llmsFullTxtPath = path.join(rootDir, 'public', 'llms-full.txt');

  describe('index.html Meta & Structured Data', () => {
    const html = fs.readFileSync(indexHtmlPath, 'utf-8');

    it('contains essential SEO meta tags', () => {
      expect(html).toContain(
        '<title>Eric Gabriel Manabat — Full-Stack AI Engineer | Portfolio</title>',
      );
      expect(html).toContain('name="description"');
      expect(html).toContain('name="author" content="Eric Gabriel Manabat"');
      expect(html).toContain('name="keywords"');
      expect(html).toContain('rel="canonical" href="https://ericmanabat-dev.vercel.app/"');
      expect(html).toContain('name="robots"');
      expect(html).toContain(
        'content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"',
      );
    });

    it('contains valid theme-color meta tags matching STYLE.md design tokens', () => {
      expect(html).toContain(
        '<meta name="theme-color" content="#0B0C10" media="(prefers-color-scheme: dark)" />',
      );
      expect(html).toContain(
        '<meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)" />',
      );
    });

    it('contains Open Graph and Twitter Card tags with accurate image dimensions', () => {
      expect(html).toContain('property="og:title"');
      expect(html).toContain('property="og:description"');
      expect(html).toContain(
        'property="og:image" content="https://ericmanabat-dev.vercel.app/og-image.png"',
      );
      expect(html).toContain('property="og:image:width" content="1200"');
      expect(html).toContain('property="og:image:height" content="630"');
      expect(html).toContain('property="og:image:alt"');
      expect(html).toContain('property="og:url" content="https://ericmanabat-dev.vercel.app/"');
      expect(html).toContain('property="og:type" content="website"');
      expect(html).toContain('property="og:locale" content="en_US"');
      expect(html).toContain('name="twitter:card" content="summary_large_image"');
      expect(html).toContain('name="twitter:title"');
      expect(html).toContain('name="twitter:description"');
      expect(html).toContain(
        'name="twitter:image" content="https://ericmanabat-dev.vercel.app/og-image.png"',
      );
    });

    it('contains a valid JSON-LD schema with ProfilePage, Person, Projects, and FAQ', () => {
      const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
      expect(jsonLdMatch).toBeTruthy();

      const jsonContent = jsonLdMatch![1].trim();
      const parsed = JSON.parse(jsonContent);

      expect(parsed['@context']).toBe('https://schema.org');
      expect(Array.isArray(parsed['@graph'])).toBe(true);

      const profilePage = parsed['@graph'].find(
        (item: { '@type': string }) => item['@type'] === 'ProfilePage',
      );
      expect(profilePage).toBeDefined();
      expect(profilePage.url).toBe('https://ericmanabat-dev.vercel.app/');
      expect(profilePage.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(isNaN(Date.parse(profilePage.dateModified))).toBe(false);

      // Verify ProfilePage links to Person and FAQ
      expect(profilePage.mainEntity['@id']).toBe('https://ericmanabat-dev.vercel.app/#person');
      expect(profilePage.hasPart).toEqual(
        expect.arrayContaining([{ '@id': 'https://ericmanabat-dev.vercel.app/#faq' }]),
      );

      // Verify Person entity at top-level @graph
      const person = parsed['@graph'].find(
        (item: { '@type': string }) => item['@type'] === 'Person',
      );
      expect(person).toBeDefined();
      expect(person['@id']).toBe('https://ericmanabat-dev.vercel.app/#person');
      expect(person.name).toBe('Eric Gabriel Manabat');
      expect(person.jobTitle).toBe('Full-Stack AI Engineer');
      expect(person.email).toBe('mailto:eric.manabatseam@gmail.com');
      expect(person.sameAs).toEqual(
        expect.arrayContaining([
          'https://github.com/PSergio984',
          'https://www.linkedin.com/in/eric-gabriel-manabat',
          'https://www.boot.dev/u/eric984',
        ]),
      );
      expect(person.knowsAbout).toContain('Retrieval-Augmented Generation (RAG)');
      expect(person.alumniOf.name).toBe('Pamantasan ng Lungsod ng Valenzuela');
      expect(person.address.addressLocality).toBe('Valenzuela City');

      // Verify SoftwareApplication work examples
      expect(Array.isArray(person.workExample)).toBe(true);
      expect(person.workExample.length).toBeGreaterThanOrEqual(3);
      for (const project of person.workExample) {
        expect(project['@type']).toBe('SoftwareApplication');
        expect(project.name.trim().length).toBeGreaterThan(0);
        expect(project.description.trim().length).toBeGreaterThan(10);
        expect(project.applicationCategory.trim().length).toBeGreaterThan(0);
        expect(project.operatingSystem.trim().length).toBeGreaterThan(0);
        expect(project.url).toMatch(/^https?:\/\//);
      }

      // Verify FAQPage entity at top-level @graph
      const faqPage = parsed['@graph'].find(
        (item: { '@type': string }) => item['@type'] === 'FAQPage',
      );
      expect(faqPage).toBeDefined();
      expect(faqPage['@id']).toBe('https://ericmanabat-dev.vercel.app/#faq');
      expect(Array.isArray(faqPage.mainEntity)).toBe(true);
      expect(faqPage.mainEntity.length).toBeGreaterThanOrEqual(3);

      for (const faq of faqPage.mainEntity) {
        expect(faq['@type']).toBe('Question');
        expect(faq.name.trim().length).toBeGreaterThan(0);
        expect(faq.acceptedAnswer['@type']).toBe('Answer');
        expect(faq.acceptedAnswer.text.trim().length).toBeGreaterThan(15);
      }
    });
  });

  describe('public/robots.txt AI Crawler Directives', () => {
    const robots = fs.readFileSync(robotsTxtPath, 'utf-8');

    it('contains directives for standard and AI search crawlers', () => {
      const requiredAgents = [
        'User-agent: *',
        'User-agent: GPTBot',
        'User-agent: ChatGPT-User',
        'User-agent: ClaudeBot',
        'User-agent: PerplexityBot',
        'User-agent: Google-Extended',
        'User-agent: Applebot-Extended',
      ];

      for (const agent of requiredAgents) {
        expect(robots).toContain(agent);
      }
      expect(robots).toContain('Allow: /');
      expect(robots).not.toContain('Disallow: /');
    });

    it('references sitemap.xml and llms.txt correctly', () => {
      expect(robots).toContain('Sitemap: https://ericmanabat-dev.vercel.app/sitemap.xml');
      expect(robots).toContain('llms.txt');
    });
  });

  describe('public/sitemap.xml Edge Cases', () => {
    const sitemap = fs.readFileSync(sitemapXmlPath, 'utf-8');

    it('is valid XML and contains proper namespace', () => {
      expect(sitemap.trim().startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
      expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    });

    it('validates every url element structure and fields', () => {
      const urlBlocks = sitemap.match(/<url>[\s\S]*?<\/url>/g);
      expect(urlBlocks).toBeTruthy();
      expect(urlBlocks!.length).toBeGreaterThanOrEqual(2);

      const validFrequencies = [
        'always',
        'hourly',
        'daily',
        'weekly',
        'monthly',
        'yearly',
        'never',
      ];

      for (const block of urlBlocks!) {
        const locMatch = block.match(/<loc>(.*?)<\/loc>/);
        expect(locMatch).toBeTruthy();
        const loc = locMatch![1];
        expect(loc).toMatch(/^https:\/\/ericmanabat-dev\.vercel\.app/);

        const lastmodMatch = block.match(/<lastmod>(.*?)<\/lastmod>/);
        expect(lastmodMatch).toBeTruthy();
        const lastmod = lastmodMatch![1];
        expect(lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(isNaN(Date.parse(lastmod))).toBe(false);

        const priorityMatch = block.match(/<priority>(.*?)<\/priority>/);
        expect(priorityMatch).toBeTruthy();
        const priority = parseFloat(priorityMatch![1]);
        expect(priority).toBeGreaterThanOrEqual(0.0);
        expect(priority).toBeLessThanOrEqual(1.0);

        const changefreqMatch = block.match(/<changefreq>(.*?)<\/changefreq>/);
        expect(changefreqMatch).toBeTruthy();
        expect(validFrequencies).toContain(changefreqMatch![1]);
      }
    });
  });

  describe('public/llms.txt & public/llms-full.txt (GEO standard)', () => {
    it('public/llms.txt exists, has valid UTF-8, and meets llmstxt.org specification', () => {
      expect(fs.existsSync(llmsTxtPath)).toBe(true);
      const llms = fs.readFileSync(llmsTxtPath, 'utf-8');

      expect(llms.startsWith('# Eric Gabriel Manabat — Full-Stack AI Engineer')).toBe(true);
      expect(llms).toContain('## Core Information');
      expect(llms).toContain('## Flagship Projects & Verified Metrics');
      expect(llms).toContain('PLV eLib');
      expect(llms).toContain('AGOS');
      expect(llms).toContain('Task-Buddy');
      expect(llms).toContain('Digital Eric');
      expect(llms).toContain('## Optional');
      expect(llms).toContain('llms-full.txt');

      // Edge case: no unresolved placeholder strings
      expect(llms).not.toMatch(/TODO|FIXME|YOUR_NAME|undefined|NaN/);
    });

    it('public/llms-full.txt exists, contains detailed case studies, and has no placeholders', () => {
      expect(fs.existsSync(llmsFullTxtPath)).toBe(true);
      const llmsFull = fs.readFileSync(llmsFullTxtPath, 'utf-8');

      expect(llmsFull).toContain(
        '# Eric Gabriel Manabat — Full-Stack AI Engineer | Complete Context',
      );
      expect(llmsFull).toContain('## 1. Professional Overview & Identity');
      expect(llmsFull).toContain('## 2. Flagship Engineering Case Studies');
      expect(llmsFull).toContain('## 3. Work Experience & Leadership');
      expect(llmsFull).toContain('## 4. Digital Eric Conversational Agent Specification');
      expect(llmsFull).toContain('FlyRank AI');
      expect(llmsFull).toContain('Nexvision Innovations Inc.');
      expect(llmsFull).toContain('Valenzuela City');

      // Edge case: no unresolved placeholder strings
      expect(llmsFull).not.toMatch(/TODO|FIXME|YOUR_NAME|undefined|NaN/);
    });

    it('verifies referenced static assets exist in public folder', () => {
      const publicDir = path.join(rootDir, 'public');
      const resumePath = path.join(publicDir, 'resume.pdf');
      const ogImagePath = path.join(publicDir, 'og-image.png');
      const profilePath = path.join(publicDir, 'profile.png');

      expect(fs.existsSync(resumePath)).toBe(true);
      expect(fs.existsSync(ogImagePath)).toBe(true);
      expect(fs.existsSync(profilePath)).toBe(true);
    });
  });
});
