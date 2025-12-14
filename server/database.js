const Pool = require("pg").Pool;
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let pool;

rl.question("Enter DB password: ", (password) => {
  pool = new Pool({
    user: "postgres",
    password: password,      // 👈 EI OLE enam hardcoded
    database: "WAD25HW4",
    host: "localhost",
    port: "5433",
  });

  rl.close();
});

module.exports = {
  pool: () => pool,
};