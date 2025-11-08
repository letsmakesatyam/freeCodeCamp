import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

// Debug: Check if environment variables are loaded
console.log('Upstash URL:', process.env.UPSTASH_REDIS_REST_URL);
console.log('Token exists:', !!process.env.UPSTASH_REDIS_REST_TOKEN);

// Create Redis client explicitly
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// create a ratelimiter that allows 10 requests per 20 seconds
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "20 s"),
});

export default ratelimit;