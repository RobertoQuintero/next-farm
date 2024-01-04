
import sql,{config} from"mssql";

const dbSettings:config = {
  server: process.env.DB_HOST!,
  database: process.env.DB_NAME!,
  authentication:{
    type:'default',
    options:{
      userName:process.env.DB_USERNAME!,
      password: process.env.DB_PASSWORD!,
    }
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    cryptoCredentialsDetails:{
      minVersion: 'TLSv1'
    },
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
    
  },
  
};


class DB { 
  private dbSettings
  constructor(dbSettings:config) {
    this.dbSettings = dbSettings;
  }

  async query(consult:string) {
    const pool = await sql.connect(this.dbSettings);
    const result = await pool.request().query(consult);
    return result.recordset;
  }
}

const db = new DB(dbSettings);

export default db