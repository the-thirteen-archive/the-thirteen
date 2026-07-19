"use server";

import { z } from "zod";
import { changePasswordInDb } from "@/lib/auth-password";

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, "New password must be at least 8 characters."),
});

export async function changePassword(input: {
  currentPassword: string;
  newPassword: string;
}) {
  const parsed = schema.safeParse(input);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  await changePasswordInDb(
    parsed.data.currentPassword,
    parsed.data.newPassword,
  );
}
