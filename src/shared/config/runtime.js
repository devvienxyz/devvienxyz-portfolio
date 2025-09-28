function getEnv(key) {
  const value = import.meta.env[key];
  if (!value) throw new Error(`${key} is not defined in import.meta.env`);
  return value;
}

const isProd = import.meta.env.MODE === "production";

let cachedConfig = null;

function buildConfig() {
  return {
    isProd,
    isDev: import.meta.env.MODE === "development",
    isTest: import.meta.env.MODE === "test",
    mode: import.meta.env.MODE,

    // feature toggles
    isDebug: !isProd && import.meta.env.VITE_ENABLE_DEBUG !== "false",

    // public values
    // appBaseUrl: getEnv("VITE_APP_BASE_URL"),
    // pwaName: getEnv("VITE_PWA_NAME"),
  };
}

export function getConfig() {
  if (!cachedConfig) cachedConfig = buildConfig();
  return cachedConfig;
}
