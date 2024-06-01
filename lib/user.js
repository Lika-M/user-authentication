import db from "./db.js";
import { hashUserPassword } from "./hash.js";

export function createUser(email, password) {

const hashPassword = hashUserPassword(password)

    const result = db
        .prepare('INSERT INTO users(email, password) VALUES(?, ?)')
        .run(email, hashPassword);
    return result.lastInsertRowid;
}