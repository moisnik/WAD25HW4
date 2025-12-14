const Pool = require("pg").Pool;
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let _pool;

let resolveReady;
const ready = new Promise((resolve) => {
  resolveReady = resolve;
});

rl.question("Enter DB password: ", (password) => {
  _pool = new Pool({
    user: "postgres",
    password: password,      // 👈 EI OLE enam hardcoded
    database: "WAD25HW4",
    host: "localhost",
    port: "5433",
  });

  rl.close();
  resolveReady(_pool);
});

module.exports = {
  pool: () => _pool,
  ready,
};
