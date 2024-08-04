export const createUserValidationSchema = {
    email:{
        in:['body'],
        isEmail:{
            errorMessage: "Not a valid email"
        },
        notEmpty: {
            errorMessage: "Email is required"
        }
    },
    password: {
        in: ['body'],
        isString: {
            errorMessage: 'Name must be a string'
        },
        notEmpty: {
            errorMessage: 'Name must not be empty'
        },
        isLength: {
            options: { min: 8 },
            errorMessage: 'Name must be at least 8 characters long'
        }
    },
    firstname: {
        in: ['body'],
        isString: {
            errorMessage: 'First name must be a string'
        },
        notEmpty: {
            errorMessage: 'First Name must not be empty'
        }
    },
    lastname: {
        in: ['body'],
        isString: {
            errorMessage: 'Last name must be a string'
        },
        optional: true
    },
    location: {
        in: ['body'],
        isString: {
            errorMessage: 'Last name must be a string'
        },
        notEmpty: {
            errorMessage: 'Please enter location'
        }
    },
}