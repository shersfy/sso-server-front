import _axios from "axios";
import Qs from "qs";
// let oldBase = "http://10.32.15.71:9090"; // nginx配置后的测试url
let oldBase = ""; // nginx配置后的生产url

export {
    oldBase
};

let config = {
    headers: {
        "Content-Type": "multipart/form-data"
    }
};

// 用户信息
export const appUserinfo = params => {
    return axios.get(`${oldBase}/user/current`, {
        params: params
    });
};

// 修改用户信息
export const modifyUser = params => {
    return axios.post(`${oldBase}/user/current/edit`, Qs.stringify(params));
};


// __用户
// 获取k
export const gainK = params => {
    return axios.post(`${oldBase}/login/k`, Qs.stringify(params));
};
// 登录
export const entry = params => {
    return axios.post(`${oldBase}/sign/in`, Qs.stringify(params));
};
// 获取短信验证码
export const getValidation = params => {
    return axios.post(`${oldBase}/login/send`, Qs.stringify(params));
};
// 修改密码
export const revisePaw = params => {
    return axios.post(`${oldBase}/login/pwd/edit`, Qs.stringify(params));
};
// 忘记密码
export const forgetPaw = params => {
    return axios.post(`${oldBase}/login/pwd/forget`, Qs.stringify(params));
};

// 应用列表
export const appList = params => {
    return axios.get(`${oldBase}/resource/tenant/all`, {
        params: params
    });
};
