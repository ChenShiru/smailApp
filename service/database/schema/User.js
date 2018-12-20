const mongoose = require('mongoose')
const Schema = mongoose.Schema //声明Schema
let ObjectId = Schema.Types.ObjectId//声明Object 类型

//创建我的的用户Schema
const userSchema = new Schema({
    UserId: ObjectId,
    userName:{unique:true, type:String},
    password:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
})

//发布模型

mongoose.model('User',userSchema)