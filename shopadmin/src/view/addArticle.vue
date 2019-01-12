<template>
  <div>
       <Form ref="formInline" >
           <FormItem label="文章标题">
              <Input v-model="title" placeholder="请输入标题" style="width: 300px" />
          </FormItem>
          <FormItem label="文章内容">
          </FormItem>
           <editor :contentp='content' @success="editorSuccess"></editor>
       </Form>
    
     <Button type="success" :style="{display:'block',margin:'20px auto'}" @click="save">保存</Button>

  </div>
</template>

<script>
  import editor from '../components/editor';
  export default {
    data () {
      return {
        title:'',
        content:'',
        isEdit:0,
        articleId:0
      };
    },

    components: {
      editor
    },

   created() {
      if(this.$route.query.id)
      {
        this.api.findArticleById({articleId:this.$route.query.id}).then(res=>{
          if(res.data.Code==1)
          {
            this.content=res.data.Data[0].content
            this.title=res.data.Data[0].title
          }
        })
        this.isEdit=1;
        this.articleId=this.$route.query.id
      }
   },
    methods: {
      editorSuccess(res){
        this.content=res
      },
      save(){
        let obj={
          title:this.title,
          content:this.content,
          Type:this.isEdit
        }
        if(this.isEdit==1)
        {
          obj.articleId=this.articleId
        }
        if(this.title=='')
        {
          return  this.$Message.error('请输入文章标题');
        }
        if(this.content=='')
        {
          return  this.$Message.error('请输入文章内容');
        }
        this.api.addOrEditArticle(obj).then(res=>{
          if(res.data.Code==1)
          {
            this.$Message.success('保存成功');
            this.content='';
            this.title=''
          }
        })
      }
    },

    watch: {}

  }

</script>
<style lang='' scoped>

</style>