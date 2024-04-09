const mongoose=require('mongoose')
const bcrypt =require("bcrypt")
const validator =require("validator");

const userSchema=mongoose.Schema({
    // username:{
    //     type:String,
    //     required:true
    // },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    recents:{
        type:Array,
        // default:['https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1']
    },
    designation:{
        type:String,
        required:true
    }
},
{
    timestamp:true
})

userSchema.statics.signup=async function(email,password,designation){
    if(!email || !password || !designation){
        throw Error("All fields are required")
    }
    const exists=await this.findOne({email})
    if(exists){
        throw Error("This email already exists")
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough")
    }
    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)
    const data={
        email:email,
        password:hash,
        designation:designation
    }
    const user=await this.create(data)
    return user
}

userSchema.statics.login=async function(email,password){
    if(!email || !password){
        throw Error("All fields are required")
    }
    const user=await this.findOne({email})
    if(!user){
        throw Error("User does not exist")
    }
    const match=await bcrypt.compare(password,user.password)
    if(!match){
        throw Error("Password is incorrect")
    }
    return user
}

module.exports=mongoose.model("user",userSchema)