const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type: String ,
        required : true
    } , 
    email : {
        type : String ,
        required : true ,
        unique : true
    } ,
    password : {
        type : String ,
        required : true ,
    } , 
    role : {
        type : String , enum : ['author' , 'reader'] , default : 'reader'
    } ,
    bio : {
        type : String
    } , 
    books : [{
        type : mongoose.Schema.Types.ObjectId , ref : "Book"
    }]
} , {
    timestamps : true
})

module.exports = mongoose.model("User" , UserSchema)
