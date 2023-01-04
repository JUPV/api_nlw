const path = require("path");


  module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host : 'env-5987957.jelastic.saveincloud.net',
        user : 'root',
        password: 'GZVSwvDyDC',
        database : 'gutemberg'
      },
      migrations: {
        directory: path.resolve(__dirname, "src", "database", "migrations")
      },
      seeds: {
        directory: path.resolve(__dirname, "src", "database", "seeds")
        
      },
      useNullAsDefault: true
    }
  };


/*

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds")
    },
    useNullAsDefault: true
  }
};




host : '192.168.0.195',
        user : 'root',
        password: 'GZVSwvDyDC',
        database : 'gutemberg'
*/