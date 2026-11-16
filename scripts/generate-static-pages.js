import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const routes = [
  {
    path: 'pricing',
    title: 'Pricing & Plans — Curezy Clinic Care Automation OS',
    description: 'Transparent pricing for AI-powered clinic automation, WhatsApp patient follow-ups, and voice receptionists. Choose the plan that scales with your clinic.',
    canonical: 'https://www.curezy.in/pricing',
  },
  {
    path: 'about-us',
    title: 'About Curezy — Building the Future of Autonomous Clinics',
    description: 'Learn about Curezy\'s mission to empower healthcare providers with autonomous AI care operations, empathetic patient engagement, and smart clinic workflows.',
    canonical: 'https://www.curezy.in/about-us',
  },
  {
    path: 'download',
    title: 'Download Curezy App — AI Health Assistant on Google Play',
    description: 'Download the Curezy Android app on Google Play. AI symptom checker, online doctor consultations, medicine delivery, and 24/7 emergency assistance. Free.',
    canonical: 'https://www.curezy.in/download',
  },
  {
    path: 'privacy-policy',
    title: 'Privacy Policy — Curezy Healthcare Technologies',
    description: 'Curezy Privacy Policy — what data we collect, how we use it, who we share it with, and how long we retain it. Curezy LLP, India.',
    canonical: 'https://www.curezy.in/privacy-policy',
  },
  {
    path: 'terms-of-service',
    title: 'Terms of Service — Curezy',
    description: 'Terms and conditions governing the use of Curezy healthcare platforms, services, and applications.',
    canonical: 'https://www.curezy.in/terms-of-service',
  },
  {
    path: 'refund-policy',
    title: 'Refund & Cancellation Policy — Curezy',
    description: 'Clear and transparent refund and cancellation policies for Curezy appointments, orders, and healthcare services.',
    canonical: 'https://www.curezy.in/refund-policy',
  },
  {
    path: 'shipping-policy',
    title: 'Shipping & Delivery Policy — Curezy',
    description: 'Information regarding shipping, delivery timelines, coverage zones, and handling for Curezy medicine and wellness deliveries.',
    canonical: 'https://www.curezy.in/shipping-policy',
  },
  {
    path: '404',
    title: '404 — Page Not Found | Curezy',
    description: 'The page you were looking for does not exist. Explore Curezy AI Care OS, pricing plans, solutions, and downloads.',
    canonical: 'https://www.curezy.in/404',
    writeRootHtml: '404.html',
  },
];

function generateStaticPages() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  for (const route of routes) {
    let customHtml = baseHtml;

    // Replace <title>
    customHtml = customHtml.replace(
      /<title>.*?<\/title>/i,
      `<title>${route.title}</title>`
    );

    // Replace canonical tag
    customHtml = customHtml.replace(
      /<link rel="canonical" href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${route.canonical}" />`
    );

    // Replace meta description
    customHtml = customHtml.replace(
      /<meta name="description" content=".*?"\s*\/?>/i,
      `<meta name="description" content="${route.description}">`
    );

    // Replace og:title
    customHtml = customHtml.replace(
      /<meta property="og:title" content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${route.title}">`
    );

    // Replace og:description
    customHtml = customHtml.replace(
      /<meta property="og:description" content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${route.description}">`
    );

    // Replace og:url
    customHtml = customHtml.replace(
      /<meta property="og:url" content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${route.canonical}" />`
    );

    // Replace twitter:title
    customHtml = customHtml.replace(
      /<meta name="twitter:title" content=".*?"\s*\/?>/i,
      `<meta name="twitter:title" content="${route.title}">`
    );

    // Replace twitter:description
    customHtml = customHtml.replace(
      /<meta name="twitter:description" content=".*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${route.description}">`
    );

    const targetDir = path.join(distDir, route.path);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetPath = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetPath, customHtml, 'utf-8');
    console.log(`[SEO prerender] Generated ${targetPath} with self-referencing canonical: ${route.canonical}`);

    if (route.writeRootHtml) {
      const rootPath = path.join(distDir, route.writeRootHtml);
      fs.writeFileSync(rootPath, customHtml, 'utf-8');
      console.log(`[SEO prerender] Generated root fallback ${rootPath}`);
    }
  }

  console.log(`[SEO prerender] Successfully generated ${routes.length} static route entrypoints.`);
}

generateStaticPages();
