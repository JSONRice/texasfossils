module.exports = {
  database: {
    uri: 'mongodb://localhost/texasfossils',
    options: {
      server: {
        socketOptions: {
          poolSize: 5,
          keepAlive: 1
        }
      }
    }
  }
};
