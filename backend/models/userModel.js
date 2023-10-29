const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    }
})

userSchema.statics.signup = async function(email, password, categories){
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email not valid');
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash, categories});

    return user;
}

userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({email});

    if(!user){
        throw Error('Email is not valid');
    }

    const match = bcrypt.compare(password, user.password);

    if(!match){
        throw Error('Incorrect password');
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);