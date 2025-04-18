export function validatePayload(payload: any): {
  isValid: boolean;
  errorMessage?: string;
} {
  if (!payload || typeof payload !== "object") {
    return { isValid: false, errorMessage: "Invalid payload format" };
  }

  // Check if the payload contains exactly one property named 'url'
  const keys = Object.keys(payload);
  if (keys.length !== 1 || !keys.includes("url")) {
    const unexpectedProps = keys.filter((key) => key !== "url");
    return {
      isValid: false,
      errorMessage:
        unexpectedProps.length > 0
          ? `Unexpected property: ${unexpectedProps.join(", ")}`
          : 'Missing required "url" property',
    };
  }

  // Validate URL format
  if (typeof payload.url !== "string" || !payload.url.trim()) {
    return { isValid: false, errorMessage: "URL must be a non-empty string" };
  }

  try {
    new URL(payload.url); // This will throw if the URL is invalid
    return { isValid: true };
  } catch (error) {
    return { isValid: false, errorMessage: "Invalid URL format" };
  }
}
