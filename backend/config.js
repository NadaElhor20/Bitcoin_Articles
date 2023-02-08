require('dotenv').config();
const RequiredEnv=["JWT_SECRET","DB_URL","PORT"]

const missedEnv=RequiredEnv.filter(envName=>!process.env[envName])

if(missedEnv.length) throw new Error (`The Enviroment variables not found ${missedEnv}`)

module.exports={
    privateKey:process.env.JWT_SECRET,
    saltRounds:process.env.SALT_ROUNDS||7,
    mongoUrl:process.env.DB_URL,
    port:process.env.PORT
}