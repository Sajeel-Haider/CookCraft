const os = require("os");
const fs = require("fs");

function getCurrentIPAddress() {
  const networkInterfaces = os.networkInterfaces();
  for (const key in networkInterfaces) {
    const iface = networkInterfaces[key];
    for (let i = 0; i < iface.length; i++) {
      if (!iface[i].internal && iface[i].family === "IPv4") {
        return iface[i].address;
      }
    }
  }
  return null;
}

function updateIPAddressInConfig() {
  const newIP = getCurrentIPAddress();
  if (newIP) {
    const configPath = "../config.development.js";
    const configContent = `const config = {
  API_URL: "http://${newIP}:8080",
  // other development-specific variables
};
export default config;`;

    fs.writeFileSync(configPath, configContent);
    console.log("IP address updated successfully:", newIP);
  } else {
    console.log("Failed to retrieve current IP address.");
  }
}

updateIPAddressInConfig();
setInterval(updateIPAddressInConfig, 60000);
