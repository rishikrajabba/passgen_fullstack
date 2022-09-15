import mongoose from  "mongoose";
import dotenv from "dotenv";
import encrypt from 'mongoose-encryption';

dotenv.config();
const stext = process.env.SECRET_TEXT;

const genpass = new mongoose.Schema({
    gen_username:String,
    gen_password:String
});

const user_schema = new mongoose.Schema(
    {
        username:String,
        password:String,
        generatedpasswords:[genpass]
    }
);

user_schema.plugin(encrypt,{secret:stext,
    encryptedFields:['password']
})

const Genpass = mongoose.model('Genpass',genpass);
const User  = mongoose.model('user',user_schema);

export default User;
export {Genpass};

