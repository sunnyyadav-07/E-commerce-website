import "dotenv/config";

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is undefined in the environment variable");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is undefined in the environment variable");
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "GOOGLE_CLIENT_SECRET is undefined in the environment variable",
  );
}
if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID is undefined in the environment variable");
}
if (!process.env.IMAGEKIT_PRIVATE_KEY) {
  throw new Error(
    "IMAGEKIT_PRIVATE_KEY is undefined in the environment variable",
  );
}
if (!process.env.REDIS_HOST) {
  throw new Error("REDIS_HOST is undefined in the environment variable");
}
if (!process.env.REDIS_PORT) {
  throw new Error("REDIS_PORT is undefined in the environment variable");
}
if (!process.env.REDIS_PASSWORD) {
  throw new Error("REDIS_PASSWORD is undefined in the environment variable");
}
if (!process.env.GOOGLE_REFRESH_TOKEN) {
  throw new Error(
    "GOOGLE_REFRESH_TOKEN is undefined in the environment variable",
  );
}
if (!process.env.GOOGLE_USER) {
  throw new Error("GOOGLE_USER is undefined in the environment variable");
}
if (!process.env.GOOGLE_MAILER_CLIENT_SECRET) {
  throw new Error(
    "GOOGLE_MAILER_CLIENT_SECRET is undefined in the environment variable",
  );
}
if (!process.env.GOOGLE_MAILER_CLIENT_ID) {
  throw new Error(
    "GOOGLE_MAILER_CLIENT_ID is undefined in the environment variable",
  );
}
if (!process.env.RAZORPAY_KEY_ID) {
  throw new Error("RAZORPAY_KEY_ID is undefined in the environment variable");
}
if (!process.env.RAZORPAY_KEY_SECRET) {
  throw new Error(
    "RAZORPAY_KEY_SECRET is undefined in the environment variable",
  );
}
if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
  throw new Error(
    "RAZORPAY_WEBHOOK_SECRET is undefined in the environment variable",
  );
}
export const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_HOST: process.env.REDIS_HOST,
  GOOGLE_MAILER_CLIENT_ID: process.env.GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET: process.env.GOOGLE_MAILER_CLIENT_SECRET,
  GOOGLE_USER: process.env.GOOGLE_USER,
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET,
};
