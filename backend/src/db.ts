import * as sqlite3 from "sqlite3";
import path from "path";

const dbPath = path.join(__dirname, "..", "mydb.sqlite3");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS todos(id INTEGER PRIMARY Key AUTOINCREMENT, task TEXT NOT NULL"
  );
});

export default db;
