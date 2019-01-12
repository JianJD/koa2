<template>
  <div>
     <Table border  :columns="columns" :data="list" :stripe='true' size='small' >
         <template slot-scope="{ row ,index }" slot="edit">
           <Button type="error" size='small' icon='ios-trash-outline'  @click='delArticle(index)'>删除</Button>
           <Button type="primary" size='small' icon='md-create' @click="edit(index)">编辑</Button>
        </template>
     </Table>
      <div class="mgt20 txt-center"><Page :total="total" :page-size="10" @on-change='changePage'/></div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
          columns: [
            {
                title: '文章标题',
                key: 'title',
            },
            {
                title: '创建时间',
                key: 'createAt',
            },
           
            {
                title: '操作',
                slot:'edit',
            }

        ],
        pageIndex:1,
        list:[],
        total:0
      };
    },

    components: {},
    created () {
      this.getList()  
    },
    methods: {
        delArticle(idx){
            this.api.delArticle({articleId:this.list[idx].articleId}).then(res=>{
                if(res.data.Code==1)
                {
                    this.list.splice(idx,1)
                    if(this.list.length==0)
                    {
                        this.getList()
                    }
                }
            })
        },
        edit(idx){
            let id=this.list[idx].articleId
            this.$router.push({
                path:'/addArticle',
                query:{
                    id
                }
            })
        },
        getList(){
            this.api.findArticleForPage({pageIndex:this.pageIndex,pageSize:10}).then(res=>{
                if(res.data.Code==1)
                {
                    this.list=res.data.Data.List
                    this.total=res.data.Data.totalPages*10
                }
            })
        },
        changePage(res){
            this.pageIndex=res;
            this.getList()
        }
    },

    watch: {}

  }

</script>
<style lang='' scoped>

</style>