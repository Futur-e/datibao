import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    define: {
        'process.env': {},
    },
    server: {
        port:5173,
        proxy: {
            '/api': {
                target: 'http://112.126.68.59',
                ws:true,//代理websocked
                changeOrigin:true,//虚拟的站点需要更管origin
                secure: true,                   //是否https接口
                pathRewrite:{
                    '^/api':''//重写路径
                }
            }
        },
        hmr:true
    },
    resolve: {
        // 配置路径别名
        alias: {
            '@': resolve(__dirname, './src'),
        },
        extensions: ['.js', '.json', '.ts'] // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
})
