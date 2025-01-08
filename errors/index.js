const customAPIError = require('./custom-error')
const BadRequestError = require('./bad-request')
const UnauthenticatedError = require('./unauthenticated')

module.exports = {
    customAPIError,
    BadRequestError,
    UnauthenticatedError
}