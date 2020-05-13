import bcrypt from "bcryptjs";
import { executeQuery, assignToken } from "../util/helper";

const createUser = async (req, res) => {
    try{
        const {emailAddress, phoneNumber, firstName, lastName, country, countryCode, password} = req.body;
        const hashPassword = bcrypt.hashSync(password);
        const response1 = await executeQuery('select * from users where emailAddress = ?', [emailAddress]);
        if(response1.length > 0)
            return res.status(400).send({message: 'Email Address already exist'})
        const response2 = await executeQuery(`insert into users(firstName, lastName, phoneNumber, countryCode, country,
                emailAddress, password) values(?,?,?,?,?,?,?)`, [firstName, lastName,phoneNumber, countryCode, country, emailAddress, hashPassword ])

         const token = assignToken({emailAddress, firstName, lastName, phoneNumber})
         return res.status(201).send({
             message: 'User created successfully',
             token,
             firstName,
             lastName,
             emailAddress
         })
        }catch(error){
        return res.status(500).send(error)
    }
}

export {
    createUser
}