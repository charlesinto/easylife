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
    const token = jwt.sign(payload, key, {expiresIn:'7 days'})
    return token;
}

const verifyToken = (token, key=process.env.SECRET_KEY) => {
    try{
        const decoded = jwt.verify(token, key)
        return decoded;
    }catch(error){
        throw error;
    }
}

export {
    executeQuery,
    assignToken,
    verifyToken
}