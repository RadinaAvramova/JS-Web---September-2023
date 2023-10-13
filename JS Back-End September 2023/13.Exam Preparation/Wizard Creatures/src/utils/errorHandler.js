const { MongooseError } = require("mongoose")

exports.extractErrorMsgs = (error) => {
    const isIstanceOfMongoose = error instanceof MongooseError;
    
    if(isIstanceOfMongoose) { 
        const errors = Object.values(error.errors);
        const msgs = errors.map((e) => e.message);
        return msgs;
    }

    return [error.message];
}