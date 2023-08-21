const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min:3,
        max : 20,
        unique : true
    },
    email: {
        type : String,
        required : true,
        max : 50,
        unique : true
    },
    password: {
        type : String,
        required : true,
        min : 8,
        unique : true
    },
    pic:{
        type : String,
    }
}
    ,{
        timestamps:true,
    }
);

userSchema.methods.matchPassword = async function (enteredPassord) {
    return await bcrypt.compare(enteredPassord, this.password);
}

userSchema.pre('save', async function (next){
    if(!this.isModified){
        next();
    }
    const salt = await bcrypt.genSalt(10); 
    this.password = await bcrypt.hash(this.password, salt);
})

module.exports = mongoose.model("Users",userSchema);