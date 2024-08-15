const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: 'all', // Allow all hosts
    host: '0.0.0.0', // Listen on all network interfaces
    port: 8080, // Ensure this matches the port Ngrok is forwarding
    client: {
      webSocketURL: {
        protocol: 'wss', // Use secure WebSocket protocol
        hostname: 'a863-45-128-38-171.ngrok-free.app', // Your Ngrok hostname
        port: 443, // Standard HTTPS port
        pathname: '/ws', // Pathname for the WebSocket
      },
    },
  },
});