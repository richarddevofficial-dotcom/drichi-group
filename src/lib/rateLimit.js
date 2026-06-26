const rateLimitMap = new Map();

export function rateLimit(
  identifier,
  maxAttempts = 5,
  windowMs = 15 * 60 * 1000,
) {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now - record.startTime > windowMs) {
    // Reset window
    rateLimitMap.set(identifier, { count: 1, startTime: now });
    return { allowed: true, remaining: maxAttempts - 1 };
  }

  if (record.count >= maxAttempts) {
    const retryAfter = Math.ceil((record.startTime + windowMs - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true, remaining: maxAttempts - record.count };
}
