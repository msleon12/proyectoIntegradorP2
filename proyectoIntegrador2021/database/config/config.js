module.exports = {
  "development": {
    "username": "root",
    "password": "root", // Para mac
    "database": "proyectoIntegrador", // Nombre de la base de datos
    "host": "127.0.0.1",
    "port": "8889", // Para Mac
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
} //Module.exports
