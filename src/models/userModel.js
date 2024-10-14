import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true , "Please provide a username"],
        unique : true,
        lowercase : true,
        minlength : [5 , "username should be greater than or equal to 5"]
    },
    password:{
        type : String,
        required : [true , "Please provide a password"],
        minlength : [8 , "password should be greater than or equal to 8"]
    }
} , {
    timeStamps : true
})

const User = mongoose.models.users || mongoose.model("users" , userSchema);

export default User