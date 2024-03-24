import developmentConfig from "../config.development";
import productionConfig from "../config.production";

let selectedConfig;

// Here you can insert any logic to choose the config based on the environment
// For manual switching, just change this variable
const environment = "development"; // or 'production'

if (environment === "development") {
  selectedConfig = developmentConfig;
} else if (environment === "production") {
  selectedConfig = productionConfig;
}

export default selectedConfig;
