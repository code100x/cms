import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    ADMIN_SECRET: z.string(),
    JWT_SECRET: z.string(),
    DATABASE_URL: z.string(),
    NEXTAUTH_URL: z.string(),
    APPX_AUTH_KEY: z.string(),
    NEXTAUTH_SECRET: z.string(),
    APPX_CLIENT_SERVICE: z.string(),
    APPX_BASE_API: z.string(),
    LOCAL_CMS_PROVIDER: z.boolean(),
    CACHE_EXPIRE_S: z.number(),
    ADMINS: z.string(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL_LOCAL: z.string(),
    NEXT_PUBLIC_DISCORD_ACCESS_SECRET: z.string(),
    NEXT_PUBLIC_DISCORD_REDIRECT_URL: z.string(),
    NEXT_PUBLIC_BOT_TOKEN: z.string(),
    NEXT_PUBLIC_GUILD_ID: z.string(),
    NEXT_PUBLIC_DISCORD_ACCESS_KEY: z.string(),
  },
  runtimeEnv: {
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    APPX_AUTH_KEY: process.env.APPX_AUTH_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    ADMIN_SECRET: process.env.ADMIN_SECRET,
    APPX_CLIENT_SERVICE: process.env.APPX_CLIENT_SERVICE,
    APPX_BASE_API: process.env.APPX_BASE_API,
    NEXT_PUBLIC_DISCORD_ACCESS_KEY: process.env.NEXT_PUBLIC_DISCORD_ACCESS_KEY,
    NEXT_PUBLIC_DISCORD_ACCESS_SECRET:
      process.env.NEXT_PUBLIC_DISCORD_ACCESS_SECRET,
    NEXT_PUBLIC_DISCORD_REDIRECT_URL:
      process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URL,
    NEXT_PUBLIC_BOT_TOKEN: process.env.NEXT_PUBLIC_BOT_TOKEN,
    NEXT_PUBLIC_GUILD_ID: process.env.NEXT_PUBLIC_GUILD_ID,
    LOCAL_CMS_PROVIDER: Boolean(process.env.LOCAL_CMS_PROVIDER),
    CACHE_EXPIRE_S: parseInt(process.env.CACHE_EXPIRE_S || '100', 10),
    ADMINS: process.env.ADMINS,
    NEXT_PUBLIC_BASE_URL_LOCAL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL,
  },
});
