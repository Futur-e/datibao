import requests from "@/utils/request.js";


export const toLogin = (userdata) => requests.post("/token/", userdata)
//注册接口"userName='admin'&pwd='admin'"
export const toRegister = (userdata) => requests.post("/appone/user/", userdata)
export const toRegister1 = () => requests.post("/token/refresh")

export const getre =(refresh)=> requests.post("/token/refresh/",{refresh})
