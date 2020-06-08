import { executeQuery } from "../util/helper"


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

export  {
    getBetController,
    getUserWalletBalance
};