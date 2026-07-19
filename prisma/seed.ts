import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  console.log("🧹 Clearing content data...");

  await prisma.reference.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.area.deleteMany();
  await prisma.type.deleteMany();

  console.log("🌱 Seeding Types...");

  const website = await prisma.type.create({
    data: { name: "Website", slug: "website" },
  });
  const designer = await prisma.type.create({
    data: { name: "Designer", slug: "designer" },
  });
  const studio = await prisma.type.create({
    data: { name: "Studio", slug: "studio" },
  });
  const brand = await prisma.type.create({
    data: { name: "Brand", slug: "brand" },
  });
  const tool = await prisma.type.create({
    data: { name: "Tool", slug: "tool" },
  });
  const book = await prisma.type.create({
    data: { name: "Book", slug: "book" },
  });
  const project = await prisma.type.create({
    data: { name: "Project", slug: "project" },
  });
  const product = await prisma.type.create({
    data: { name: "Product", slug: "product" },
  });
  const visualAsset = await prisma.type.create({
    data: { name: "Visual Asset", slug: "visual-asset" },
  });
  const font = await prisma.type.create({
    data: { name: "Font", slug: "font" },
  });

  console.log("🌱 Seeding Areas (scoped by Type)...");

  await prisma.area.createMany({
    data: [
      { name: "UI", slug: "ui", typeId: website.id },
      { name: "UX", slug: "ux", typeId: website.id },
      { name: "Landing Page", slug: "landing-page", typeId: website.id },
      { name: "E-commerce", slug: "ecommerce", typeId: website.id },
      { name: "Dashboard", slug: "dashboard", typeId: website.id },

      { name: "Branding", slug: "branding", typeId: designer.id },
      { name: "UI", slug: "ui", typeId: designer.id },
      { name: "Illustration", slug: "illustration", typeId: designer.id },

      { name: "Branding", slug: "branding", typeId: studio.id },
      { name: "Identity", slug: "identity", typeId: studio.id },
      { name: "Art Direction", slug: "art-direction", typeId: studio.id },

      { name: "Branding", slug: "branding", typeId: brand.id },
      { name: "Packaging", slug: "packaging", typeId: brand.id },

      { name: "Design", slug: "design", typeId: tool.id },
      { name: "Productivity", slug: "productivity", typeId: tool.id },

      { name: "Editorial", slug: "editorial", typeId: book.id },
      { name: "Typography", slug: "typography", typeId: book.id },

      { name: "Branding", slug: "branding", typeId: project.id },
      { name: "UI", slug: "ui", typeId: project.id },
      { name: "Editorial", slug: "editorial", typeId: project.id },

      {
        name: "Industrial Design",
        slug: "industrial-design",
        typeId: product.id,
      },
      { name: "Product Design", slug: "product-design", typeId: product.id },
      { name: "Packaging", slug: "packaging", typeId: product.id },

      { name: "Photography", slug: "photography", typeId: visualAsset.id },
      { name: "Illustration", slug: "illustration", typeId: visualAsset.id },
      { name: "3D", slug: "3d", typeId: visualAsset.id },
      { name: "Motion", slug: "motion", typeId: visualAsset.id },

      { name: "Typography", slug: "typography", typeId: font.id },
    ],
  });

  console.log("🌱 Seeding Tags...");

  await prisma.tag.createMany({
    data: [
      { name: "Minimal", slug: "minimal" },
      { name: "Experimental", slug: "experimental" },
      { name: "Swiss", slug: "swiss" },
      { name: "Bauhaus", slug: "bauhaus" },
      { name: "Brutalist", slug: "brutalist" },
      { name: "Y2K", slug: "y2k" },
      { name: "Retro", slug: "retro" },
      { name: "Dark Mode", slug: "dark-mode" },
      { name: "Light Mode", slug: "light-mode" },
      { name: "Responsive", slug: "responsive" },
      { name: "Accessibility", slug: "accessibility" },
      { name: "Design System", slug: "design-system" },
      { name: "Grid", slug: "grid" },
      { name: "Asymmetry", slug: "asymmetry" },
      { name: "Gradient", slug: "gradient" },
      { name: "Texture", slug: "texture" },
      { name: "Glassmorphism", slug: "glassmorphism" },
      { name: "Generative", slug: "generative" },
      { name: "AI", slug: "ai" },
      { name: "Open Source", slug: "open-source" },
      { name: "Award Winning", slug: "award-winning" },
      { name: "Case Study", slug: "case-study" },
      { name: "Concept", slug: "concept" },
      { name: "Icons", slug: "icons" },
      { name: "Portfolio", slug: "portfolio" },
      { name: "Mobile", slug: "mobile" },
      { name: "Desktop", slug: "desktop" },
    ],
  });

  console.log("🔐 Ensuring admin Settings exist...");

  const existingSettings = await prisma.settings.findFirst();

  if (!existingSettings) {
    const defaultPassword = process.env.ADMIN_PASSWORD;

    if (!defaultPassword) {
      throw new Error(
        "ADMIN_PASSWORD is not set in .env — cannot create initial Settings.",
      );
    }

    const passwordHash = await bcrypt.hash(defaultPassword, 10);
    await prisma.settings.create({ data: { passwordHash } });
    console.log("   → Settings created from ADMIN_PASSWORD.");
  } else {
    console.log("   → Settings already exist, skipping (password preserved).");
  }

  console.log("✅ Seed completed.");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
