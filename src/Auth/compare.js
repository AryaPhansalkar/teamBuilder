import bcrypt from 'bcryptjs';

export const compare = async(plainPassword,hashedPassword) =>{
    const check = await bcrypt.compare(plainPassword,hashedPassword)
    return check;
}