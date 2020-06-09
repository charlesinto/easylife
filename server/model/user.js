
import Joi from '@hapi/joi'

const userCreationSchema = Joi.object({
    phoneNumber: Joi.string().required(),
    lastName: Joi.string().required(),
    firstName: Joi.string().required(),
    emailAddress: Joi.string().email().required(),
    country: Joi.string(),
    countryCode: Joi.string(),
    password: Joi.string().required()
})

const userLoginSchema = Joi.object({
    emailAddress: Joi.string().email().required(),
    password: Joi.string().required()
})

const walletTopUpSchema = Joi.object({
    transactionRef: Joi.string().required(),
    amount: Joi.string().required()
})

const trasactionReportSchema = Joi.object({
    DateFrom: Joi.string().required(),
     DateTo: Joi.string().required()
})

const playGameSchema = Joi.object({
    stakes: Joi.array().required(),
     betId: Joi.number().required(), 
     amountStake: Joi.number().required(), 
     totalWinning: Joi.number().required()
})

export {
    userCreationSchema,
    userLoginSchema,
    walletTopUpSchema,
    trasactionReportSchema,
    playGameSchema
}