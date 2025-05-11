export const environment = import.meta.env.MODE as "localhost" | "production";

const allConfigs = {
  localhost: {
    apiUrl: "http://localhost:8000",
  },
  production: {
    apiUrl: "https://api.prateeklab.com",
  },
};

const config = allConfigs[environment || "localhost"];
export default config;
