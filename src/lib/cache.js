import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

export const getCache = async (key) => {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Cache get error:", err);
    return null;
  }
};

export const setCache = async (key, value, ttl) => {
  try {
    if (value === null) {
      await redis.del(key);
    } else {
      await redis.set(key, JSON.stringify(value), "EX", ttl);
    }
  } catch (err) {
    console.error("Cache set error:", err);
  }
};