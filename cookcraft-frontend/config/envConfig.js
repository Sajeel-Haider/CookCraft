import developmentConfig from "../config.development";
import productionConfig from "../config.production";

let selectedConfig;

const environment = "development";

if (environment === "development") {
  selectedConfig = developmentConfig;
} else if (environment === "production") {
  selectedConfig = productionConfig;
}

export default selectedConfig;
