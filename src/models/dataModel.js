import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    Day : {
        type : Date,
        required : [true , "provide a date"],
    },
    Age : {
        type : String,
        required : [true , "provide value of age"]
    },
    Gender : {
        type : String,
        required : [true , "provide value of gender"]
    },
    A:{
        type : Number,
        required : [true , "provide value of a"]
    },
    B:{
        type : Number,
        required : [true , "provide value of b"]
    },
    C:{
        type : Number,
        required : [true , "provide value of c"]
    },
    D:{
        type : Number,
        required : [true , "provide value of d"]
    },
    E:{
        type : Number,
        required : [true , "provide value of e"]
    },
    F:{
        type : Number,
        required : [true , "provide value of f"]
    },
} , {
    timeStamps : true
})

const Data = mongoose.models.data || mongoose.model("data" , dataSchema);

export default Data