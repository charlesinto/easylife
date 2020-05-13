
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

export {
    userCreationSchema
}