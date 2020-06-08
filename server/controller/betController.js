import { executeQuery } from "../util/helper"
import PayStack from "paystack";

const p_SECRET_KEY = process.env.p_SECRET_KEY

const paystack = PayStack(p_SECRET_KEY)

const getBetController = async (req, res) => {
    try{
        const response = await executeQuery('select * from bettingcategories;')
        return res.status(200).send({
            message: 'Operation Successful',
            response
        });
    }catch(error){
        console.error(error);
        return res.status(500).send({
            message: 'Some errors were encountered',
            error
        })
    }
}

const getBetCategoryById =  async (req, res) => {
    try{
        const id = req.params.id;
        const response = await executeQuery('select * from bettingcategories where id = ?', [id])
        return res.status(200).send({
            message: 'Operation Successful',
            response
        });
    }catch(error){
        console.error(error);
        return res.status(500).send({
            message: 'Some errors were encountered',
            error
        })
    }
}

const getUserWalletBalance = async (req, res) => {
    try{
        const response = await executeQuery('select * from userWalletBalance where userid = ?', [req.user.id])
        return res.status(200).send({
            message: 'Operation Successful',
            data: response[0]
        })
    }catch(error){
        console.error(error);
        return res.status(500).send({
            message: 'Some errors were encountered',
            error
        })
    }
}

const getUserWalletHistory = async (req, res) => {
    try{
        const response = await executeQuery('select * from userWalletHistory where userId = ?', [req.user.id])
        return res.status(200).send({
            message: 'Operation Successful',
            data: response
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            message: 'Some errors were encountered',
            error
        })
    }
}

const topUpWallet = async (req, res) => {
    try{
        const { transactionRef, amount: reqAmount} = req.body;
        paystack.transaction.verify(transactionRef, async function(error, body){
            if(error){
                console.log(error);
                return res.status(500).send({
                    message: 'Some error were encountered',
                    error
                })
            }
            const {data: { amount, }} = body;
            if(parseInt(reqAmount) != parseInt(amount)){
                return res.status(400).send({
                    message:'Payment mismatch',
                })
            }
            const response = await executeQuery('select * from userWalletBalance where userId = ?', [req.user.id])
            const balance = parseInt(response[0]['balance']);
            const newBalance = balance + amount;
            await executeQuery('update userWalletBalance set balance = ? where userId = ?', [newBalance, req.user.id])

            await executeQuery(`insert into userWalletHistory(walletId, userId, transactionType, paymentChannel, paymentReference, amount) 
                values (?,?,?,?,?,?);`, [response[0]['balance'],req.user.id, 'topup','paystack',transactionRef, reqAmount ])
            
            const response3 = await executeQuery('select * from userWalletBalance where userid = ?', [req.user.id])

            return res.status(201).send({
                message:'Operation Successful',
                data: response3[0]
            })
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            message: 'Some errors were encountered',
            error
        })
    }
}

export  {
    getBetController,
    getUserWalletBalance,
    getUserWalletHistory,
    topUpWallet,
    getBetCategoryById
};