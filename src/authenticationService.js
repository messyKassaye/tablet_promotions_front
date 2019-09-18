 const JWT = 'token';
export const login = (token)=>{
    localStorage.setItem(JWT,token)
}

export const isLogin = ()=>{
    if(localStorage.getItem('token')){
        return true
    }
    return  false
}

export const role = ()=>{

 }
