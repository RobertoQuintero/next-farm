import { Sequelize } from 'sequelize';

const db = new Sequelize('hibyecom_farms', 'hibyecom_emilio', '3m1L10_gr4nj45', {
  host: 'hibye.com.mx',
  dialect:'mysql',  /* one of | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  dialectModule:require('mysql2'),
  benchmark:true
});
(async()=>{
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()

export default db