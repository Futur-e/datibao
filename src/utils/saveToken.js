export const saveToken = (token)=>{
    localStorage.setItem("userToken",token)
}

export const getToken = ()=>{
    const token =localStorage.getItem("userToken")
    return JSON.parse(token)
}

// 删除token
export const delToken = ()=>{
    localStorage.removeItem("userToken")
    localStorage.removeItem("username")
    localStorage.removeItem("refresh")
}
