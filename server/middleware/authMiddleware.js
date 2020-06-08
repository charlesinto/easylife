import { userCreationSchema, userLoginSchema, walletTopUpSchema } from "../model/user"

const validateUserCreateParams = (req, res, next) => {
    try{
        const {error} = userCreationSchema.validate(req.body);

        if(error)
            return res.status(400).send(error)
        return next()
    }catch(error){
        return res.status(500).send(error)
    }
}

const validateUserLoginParams = (req, res, next) => {
    try{
        const {error} = userLoginSchema.validate(req.body);
        if(error)
            return res.status(400).send(error)
        return next()
    }catch(error){
        return res.status(500).send(error)
    }
}

const verifyTopUpParams = (req, res, next) => {
    try{
        const {error} = walletTopUpSchema.validate(req.body);
        if(error)
            return res.status(400).send(error)

        next()
    }catch(error){
        return res.status(500).send(error)
    }
}

export {
    validateUserCreateParams,
    validateUserLoginParams,
    verifyTopUpParams
}