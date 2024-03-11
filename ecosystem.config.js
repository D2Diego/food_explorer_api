const caminhoServer = require("./src/server");

module.exports = {
  apps : [{
    name: "app",
    script: caminhoServer,
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
