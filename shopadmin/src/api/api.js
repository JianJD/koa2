import Vue from 'vue'
import axios from 'axios'
let api = process.env.NODE_ENV == 'development' ? '/api' : '';
let imgUrl = process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:3001' : '';
let upLoadUrl = process.env.NODE_ENV == 'development' ? '/api/uploadfiles' : '/uploadfiles';
Vue.prototype.upLoadUrl = upLoadUrl; //上传接口
Vue.prototype.imgUrl = imgUrl; //上传接口
// 发布商品
export default{
    createProduct(data){
        return axios.post(`${api}/addOrEditProduct`, data)
    },
    getClassList(data){
        return axios.post(`${api}/getClassList`, data)
    },
    // 获取商品详情
    getProductInfo(data){
        return axios.post(`${api}/findProductByProductId`, data)
    },
    getProductList(data){
        return axios.post(`${api}/getProductList`, data)  
    },
    // 删除商品
    delProduct(data){
        return axios.post(`${api}/delProduct`, data) 
    },
    upAndDown(data){
        return axios.post(`${api}/upAndDown`, data) 
    },
    
}