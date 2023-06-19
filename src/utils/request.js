

// 创建一个 Axios 实例
import axios from "axios";

const requests = axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 设置请求头部
requests.interceptors.request.use(
    (config) => {
        // 在请求发送前将预设的请求头部设置到 config.headers 中
        // config.headers['X-Requested-With'] = 'XMLHttpRequest';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 拦截响应
requests.interceptors.response.use(
    (response) => {
        // 响应成功时执行的回调函数
        return response;
    },
    (error) => {
        // 响应失败时执行的回调函数
        return Promise.reject(error);
    }
);
export default requests

