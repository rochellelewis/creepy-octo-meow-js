const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(proxy('/apis', {
      logLevel: 'debug',
      target: "YOUR_HOST_IP", //add your host IP here to connect with your backend
      changeOrigin: true,
    }
  ));
};