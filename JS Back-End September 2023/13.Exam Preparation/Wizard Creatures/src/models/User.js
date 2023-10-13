const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique : true
        //value : true,
        //message: "Email already exists! FROM SCHEMA",
        //}, 
    },
    password: { type: String, required: true },
});

//userSchema.path("email").validate(function (emailInput) {
    //if (error.name === "MongoError" && error.code === 11000) {
        //next(new Error("email must be unique"));
    //} else {
        //next(error);
    //};    

    //const email = mongoose.model("User").findOne({ email: emailInput });
    //return !!email;
//}, "Email already exists!");


userSchema.virtual("repeatPassword").set(function (value) {
    if(value !== this.password) {
        throw new Error("Password missmatch!");
    }
});

userSchema.pre("save", async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

const User = mongoose.model("User", userSchema);
module.exports = User;