<template>
  <div>
      <div class="mgt20 mgb20">关于我们</div>
     <editor :contentp='content' @success="editorSuccess"></editor>
     <Button type="success" :style="{display:'block',margin:'20px auto'}" @click="save">保存</Button>
  </div>
</template>

<script>
  import editor from '../components/editor';
  export default {
    data () {
      return {
        content:'',
        isEdit:0
      };
    },

    components: {
      editor  
    },
    created() {
        this.getAboutUs()
    },
    methods: {
       editorSuccess(res){
         this.content=res  
       } ,
       getAboutUs(){
           this.api.getAboutUs('').then(res=>{
               console.log(res)
               if(res.data.Code==1&&res.data.Data.length!=0)
               {
                   this.content=res.data.Data[0].content
                   this.isEdit=1
               }
           })
       },
    //    保存
    save(){
        
        this.api.addOrEditAboutUs({Type:this.isEdit,content:this.content}).then(res=>{
            if(res.data.Code==1)
            {
                 this.$Message.success('保存成功');
            }
        })
    }
    },
    watch: {}

  }

</script>
<style lang='' scoped>

</style>