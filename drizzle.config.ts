import type { Config } from "drizzle-kit";
import env from "./env";

export default {
    schema: './lib/db/schema.ts',
    out:'./lib/db/migrations',
    dialect:'postgresql',
    dbCredentials:{
        url:env.POSTGRES_URL!,
    }
} satisfies Config;