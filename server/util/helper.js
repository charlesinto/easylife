import pool from "../database";
import 'dotenv/config';
import jwt from "jsonwebtoken";

const executeQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, rows, fields) => {
            if(err)
                return reject(err);
            return resolve(rows)
        })
    })
}

const assignToken = (payload, key=process.env.SECRET_KEY) => {
    const token = jwt.sign(payload, key)
    return token;
}

export {
    executeQuery,
    assignToken
}