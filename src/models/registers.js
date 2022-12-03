const mongoose = require("mongoose");
const validator = require("validator");


// Cratng a mongoose Schema
const UserSchema = new mongoose.Schema( {
        
    /*1.*/fullname : {
            type:String,
            required:true,
            minlength:3
        },
    /*2.*/email: {
            type:String,
            required:true,
            unique:[true, "Email is already Used"],
            validate(value) {
                if(!validator.isEmail(value)) {
                    throw new Error("Invalid Email")
                }
            }
        },
    /*3.*/phone: {
            type:Number,
            min:10,
            required:true,
            unique:[true, "mobile Number is Used"]
        },
    /*4.*/password: {
            type:String,
            required:true
    },
    /*5.*/confirmpassword: {
            type:String,
            required:true
    }
})

// we are creating a mongoose Collection
const Register = new mongoose.model('New-Registeration', UserSchema);

module.exports = Register;