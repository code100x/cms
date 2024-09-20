import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    ADMIN_SECRET: z.string().default('ADMIN_SECRET'),
    JWT_SECRET: z.string().default('JWT_SECRET'),
    DATABASE_URL: z
      .string()
      .url()
      .default('postgresql://postgres:postgres@db:5432/cms?schema=public'),
    NEXTAUTH_URL: z.string().default('http://localhost:3000'),
    APPX_AUTH_KEY: z.string().default('AUTH_SECRET'),
    NEXTAUTH_SECRET: z.string().default('NEXTAUTH_SECRET'),
    APPX_CLIENT_SERVICE: z.string().default(''),
    APPX_BASE_API: z.string().default(''),
    DISCORD_ACCESS_KEY: z.string().default('123'),
    DISCORD_ACCESS_SECRET: z.string().default('123'),
    DISCORD_REDIRECT_URL: z
      .string()
      .default('https://app.100xdevs.com/discord/redirect'),
    BOT_TOKEN: z.string().default(''),
    GUILD_ID: z.string().default(''),
    LOCAL_CMS_PROVIDER: z.boolean().default(false),
    CACHE_EXPIRE_S: z.string().default('10'),
    ADMINS: z.string().default('Random,example@gmail.com'),
    REDIS_URL: z.string().default(''),
    COHORT3_DISCORD_ACCESS_KEY: z.string().default(''),
    COHORT3_DISCORD_ACCESS_SECRET: z.string().default(''),
    COHORT3_DISCORD_REDIRECT_URI: z.string().default(''),
    COHORT3_BOT_TOKEN: z.string().default(''),
    SUBTITLE_SECRET: z.string().default('SubSecret'),
    GITHUB_ID: z.string().default(''),
    GITHUB_SECRET: z.string().default(''),
    JOB_BOARD_AUTH_SECRET: z.string().default(''),
    FETCHER_URL: z.string().default(''),
    NODE_ENV: z.string().default('development'),
    VIZOLV_SECRET: z.string().default(''),
    DISCORD_REDIRECT_URI: z.string().default(''),
  },
  client: {
    NEXT_PUBLIC_BASE_URL_LOCAL: z.string().default('http://127.0.0.1:3000'),
    NEXT_PUBLIC_DISABLE_FEATURES: z
      .string()
      .default('featurea,featureb,featurec'),
    NEXT_PUBLIC_DISCORD_WEBHOOK_URL: z.string().default(''),
  },
  runtimeEnv: {
    ADMIN_SECRET: process.env.ADMIN_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    APPX_AUTH_KEY: process.env.APPX,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    APPX_CLIENT_SERVICE: process.env.APPX_CLIENT_SERVICE,
    APPX_BASE_API: process.env.APPX_BASE_API_URL,
    DISCORD_ACCESS_KEY: process.env.DISCORD_ACCESS_KEY,
    DISCORD_ACCESS_SECRET: process.env.DISCORD_ACCESS_SECRET,
    DISCORD_REDIRECT_URL: process.env.DISCORD_REDIRECT_URL,
    BOT_TOKEN: process.env.BOT_TOKEN,
    GUILD_ID: process.env.GUILD_ID,
    LOCAL_CMS_PROVIDER: process.env.LOCAL_CMS_PROVIDER
      ? process.env.LOCAL_CMS_PROVIDER.toLowerCase().trim() === 'true'
      : false,
    CACHE_EXPIRE_S: process.env.CACHE_EXPIRE_S,
    ADMINS: process.env.ADMINS,
    REDIS_URL: process.env.REDIS_URL,
    COHORT3_DISCORD_ACCESS_KEY: process.env.COHORT3_DISCORD_ACCESS_KEY,
    COHORT3_DISCORD_ACCESS_SECRET: process.env.COHORT3_DISCORD_ACCESS_SECRET,
    COHORT3_DISCORD_REDIRECT_URI: process.env.COHORT3_DISCORD_REDIRECT_URI,
    COHORT3_BOT_TOKEN: process.env.COHORT3_BOT_TOKEN,

    SUBTITLE_SECRET: process.env.SUBTITLE_SECRET,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    JOB_BOARD_AUTH_SECRET: process.env.JOB_BOARD_AUTH_SECRET,

    FETCHER_URL: process.env.FETCHER_URL,
    VIZOLV_SECRET: process.env.VIZOLV_SECRET,
    DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_DISCORD_WEBHOOK_URL:
      process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL,
    NEXT_PUBLIC_DISABLE_FEATURES: process.env.NEXT_PUBLIC_DISABLE_FEATURES,
    NEXT_PUBLIC_BASE_URL_LOCAL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL,
  },
});
