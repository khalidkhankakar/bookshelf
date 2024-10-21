import { z, ZodError } from "zod";

const EnvSchema = z.object({
  POSTGRES_URL: z.string(),
  AUTH_GITHUB_ID: z.string(),
  AUTH_GITHUB_SECRET: z.string(),
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),
  AUTH_SECRET: z
    .string()
    .default("QK3GhEGDarNrIscb8uRNBkSBzQxBvXXyB3MD8A333so="),
  RESEND_API_KEY: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;

let env: Env;

try {
  env = EnvSchema.parse(process.env);
} catch (e) {
  const error = e as ZodError;
  console.error(error.flatten().fieldErrors);
  process.exit(1);
}

export default env;
