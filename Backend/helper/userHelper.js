import bcrypt from "bcrypt";

const encryptPassword = async (plainPassword) => {
    const saltsRounds = 10;
    const encryptedPassword = await bcrypt.hash(plainPassword, saltsRounds);
    return encryptedPassword;
}

const matchPassword = async (userPassword, hashedPassword)=>{
    return await bcrypt.compare(userPassword,hashedPassword)
}
export { encryptPassword, matchPassword }