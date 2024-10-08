import sqlite3Module from 'sqlite3'
const sqlite3 = sqlite3Module.verbose()

export function query(query: string, params: any[] = []) {
  return new Promise((res, rej) => {
    const db = new sqlite3.Database(
      'backend/db.txt',
      sqlite3Module.OPEN_READWRITE,
      async (error) => {
        if (error) {
          return rej(error)
        }

        db.all(query, params, (err, rows) => {
          if (err) {
            return rej(err)
          }

          return res(rows)
        })
      },
    )
  })
}
