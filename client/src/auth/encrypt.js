import bcrypt from 'bcryptjs';

export const EncryptPassword = async(plainPassword)=>{
    const saltround = 10;
    const hashpassword = await bcrypt.hash(plainPassword,saltround);
    return hashpassword;
};

