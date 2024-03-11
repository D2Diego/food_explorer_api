module.exports = {
  apps : [{
    name: "app",
    script: "./src/server",
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}

const teste = require("./src/server")