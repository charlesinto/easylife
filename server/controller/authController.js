import bcrypt from "bcryptjs";
import { executeQuery, assignToken } from "../util/helper";

const createUser = async (req, res) => {
    try{
        const {emailAddress, phoneNumber, firstName, lastName, country, countryCode, password} = req.body;
        const hashPassword = bcrypt.hashSync(password);
        const response1 = await executeQuery('select * from users where emailAddress = ?', [emailAddress]);
        if(response1.length > 0)
            return res.status(400).send({message: 'Email Address already exist'})
        await executeQuery(`insert into users(firstName, lastName, phoneNumber, countryCode, country,
                emailAddress, password, role) values(?,?,?,?,?,?,?,?)`, [firstName, lastName,phoneNumber, countryCode, country, emailAddress, hashPassword,'user' ])
        const response3= await executeQuery('select * from users where emailAddress = ?', [emailAddress]);
        await executeQuery('insert into userWalletBalance(userid, balance) values(?,?);', [response3[0].id, 0])
         const token = assignToken({emailAddress, firstName,id: response3[0][id], lastName, phoneNumber})
         await executeQuery('insert into notifications(message, userId)values(?,?)', ['You are welcome to easy, we hope to make the platform as rewarding as possible',response3[0].id ])
         return res.status(201).send({
             message: 'User created successfully',
             token,
             firstName,
             lastName,
             emailAddress,
             role: user
         })
        }catch(error){
        return res.status(500).send(error)
    }
}

const loginUser = async (req, res) => {
    try{
        const {emailAddress, password} = req.body;
        const response = await executeQuery('select * from users where emailAddress = ?', [emailAddress]);
        if(response.length <= 0)
            return res.status(404).send({message:'Email or password does not exist'})
        const isPasswordEqualToHash = bcrypt.compareSync(password, response[0].password)
        if(!isPasswordEqualToHash)
            return res.status(404).send({message:'Email or password does not exist'})

        const token = assignToken({emailAddress, firstName: response[0]['firstName'], 
        lastName: response[0]['lastName'],id: response[0]['id'], phoneNumber: response[0]['phoneNumber'], role: response[0]['role']})
        return res.status(200).send({
            message: 'Login success',
            token,
            firstName: response[0]['firstName'],
            lastName: response[0]['lastName'],
            emailAddress,
            role: response[0]['role']
        })
    }catch(error){
        return res.status(500).send(error);
    }
}

const getUserProfile = async (req, res) => {
    try{
        const response = await executeQuery('select * from users where id = ?', [req.user.id]);
        return res.status(200).send({
            message: 'Operation Successful', 
            response
        })
    }catch(error){
        console.log(error)
        return res.status(500).send(error);
    }
}

export {
    createUser,
    loginUser, getUserProfile
}