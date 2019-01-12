// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import VueQuillEditor from 'vue-quill-editor'
import 'iview/dist/styles/iview.css';
Vue.use(VueQuillEditor);
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import API from './api/api'
Vue.prototype.api=API
Vue.config.productionTip = false
Vue.use(iView);
/* eslint-disable no-new */
router.beforeEach((to,form,next)=>{
  let isLogin=sessionStorage.getItem('isLogin')||0
  if(to.path!='/'&&isLogin==0)
  {
    next({
      path:'/'
    })
  }else  if(to.path=='/')
  {
    next()
  }else if(isLogin==1){
    next()
  }
})


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
