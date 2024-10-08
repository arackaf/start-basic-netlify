import sqlite3Module from "sqlite3";
import { epics } from "./epics";

const sqlite3 = sqlite3Module.verbose();

export async function setup() {
  const db = new sqlite3.Database("backend/db.txt", sqlite3Module.OPEN_READWRITE, async (error) => {
    if (error) {
      console.error({ error });
      return;
    }

    await run("DROP TABLE IF EXISTS epics");
    await run("CREATE TABLE epics (id INT PRIMARY KEY, name TEXT, userId INT)");

    await run("DROP TABLE IF EXISTS tasks");
    await run("CREATE TABLE tasks (id INT PRIMARY KEY, name TEXT, userId INT, epicId INT)");

    for (const epic of epics) {
      await run("INSERT INTO epics VALUES (?, ?, ?)", [epic.id, epic.name, epic.userId]);
    }

    function run(command: string, params: unknown[] = []): Promise<void> {
      return new Promise((res, rej) => {
        db.run(command, params, (err) => {
          if (err) {
            rej(err);
          } else {
            res();
          }
        });
      });
    }
  });
}
