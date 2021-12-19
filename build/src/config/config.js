"use strict";
module.exports = {
    "development": {
        "username": "",
        "password": "",
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
        "use_env_variable": "DATABASE_URL",
        "dialectOptions": {
            "ssl": {
            "require": true, // This will help you. But you will see nwe error
            "rejectUnauthorized": false // This line will fix new error
            }
        },
    }
};
