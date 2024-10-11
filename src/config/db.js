const mysql = require('mysql2');
const Sequelize = require('sequelize');
require('dotenv').config();


const connection = new Sequelize(process.env.DB_NAME, 
                                  'root', 
                                  process.env.DB_PASSWORD, 
                                  {
                                    host: 'localhost',
                                    dialect: 'mysql'
                                  }
                                );

connection.authenticate()
          .then(() => {
            console.log('Conexão realizada com sucesso!');
          })
          .catch((err) => {
            console.error('Erro ao tentar conectar-se com o database: ', err);
          });

module.exports = connection;