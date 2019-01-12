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
    // 上下架
    upAndDown(data){
        return axios.post(`${api}/upAndDown`, data) 
    },
    // 删除分类
    del(data){
        return axios.post(`${api}/delClass`, data)  
    },
    addOrEditClass(data){
        return axios.post(`${api}/addOrEditClass`, data)
    },
    getOrderList(data){
        return axios.post(`${api}/orderListAdmin`, data)
    },
    delOrder(data){
        return axios.post(`${api}/delOrder`, data)
    },
    sendForOrder(data){
        return axios.post(`${api}/sendForOrder`, data)
    },
    // 管理员登录
    adminLogin(data){
        return axios.post(`${api}/adminLogin`, data)
    },
     // 管理员登录
     shopManger(data){
        return axios.post(`${api}/checkOrderAndMoney`, data)
    },
    // 有关文章
    getAboutUs(data){
        return axios.post(`${api}/findAboutUs`, data)
    },
    addOrEditAboutUs(data){
        return axios.post(`${api}/addOrEditAboutUs`, data)
    },
    addOrEditArticle(data){
        return axios.post(`${api}/addOrEditArticle`, data)
    },
    findArticleForPage(data){
        return axios.post(`${api}/findArticleForPage`, data)
    },
    delArticle(data){
        return axios.post(`${api}/delArticle`, data)
    },
    findArticleById(data){
        return axios.post(`${api}/findArticleById`, data)
    }
    
}