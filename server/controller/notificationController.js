import { executeQuery } from "../util/helper";


const getUserNotifications = async (req, res) => {
    try{
        const response = await executeQuery('select * from notifications where status=? and userid =?', ['new', req.user.id])
        return res.status(200).send({
            message:'Operation Successful',
            response
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            message: 'Some errors were encountered',
            error
        })
    }
}

const markNotificationRead = async (req, res) => {
    try{
        const id = req.params.id;
        if(id === null){
            return res.status(500).send({
                message: 'Bad request',
            })
        }
        await executeQuery('update notifications set status = ? where id = ?', ['read', id]);
        return res.status(200).send({
            message: 'Notification Marked as read successfully',
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            message: 'Some errors were encountered',
            error
        })
    }
}

export {
    getUserNotifications,
    markNotificationRead
}