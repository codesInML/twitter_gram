// require('dotenv').config()

// const password = process.env.DB_PASSWORD as string
// const username = process.env.DB_USERNAME as string
// const db_name = process.env.DB_NAME as string

module.exports = {
  "development": {
    "username": "root",
    "password": "neweins26",
    "database": "social_app",
    "host": "127.0.0.1",
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
}
