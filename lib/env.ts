import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),

  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),

  ADMIN_PASSWORD: z.string().min(8),
  JWT_SECRET: z.string().min(16),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(parsed.error.issues);
  );
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;