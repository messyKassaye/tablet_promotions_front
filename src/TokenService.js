import jwt from 'jsonwebtoken'
const TOKEN ='token'

export const set = (token_data)=>{
    localStorage.setItem(TOKEN,token_data)
}

export const get = () => {
    return localStorage.getItem(TOKEN)
}

export const isExpired = ()=>{
    const decodedToken=jwt.verify()
    const dateNow = new Date();
    if(decodedToken < dateNow.getTime()){
        return true
    }else {
        return  false
    }

}