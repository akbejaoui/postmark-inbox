import { check } from "express-validator"

export const SendEmailValidationMiddleware = () => [
    check("from")
        .exists()
        .withMessage(() => "Missing from value")
        .isString()
        .withMessage(() => "Invalid from type")
        .isEmail()
        .withMessage(() => "From should be an email"),
    check("to")
        .exists()
        .withMessage(() => "Missing to value")
        .isString()
        .withMessage(() => "Invalid to type")
        .isEmail()
        .withMessage(() => "to should be an email"),
    check("subject")
        .exists()
        .withMessage(() => "Missing subject")
        .isString()
        .withMessage(() => "Invalid subject type"),
    check("textContent")
        .exists()
        .withMessage(() => "Missing text content")
        .isString()
        .withMessage(() => "Invalid text content")
]
