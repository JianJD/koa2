<template>
  <div class="pd20">
    <Tag
      v-for="(item,index) in classList"
      :key="item.classId"
      type="border"
      closable
      color="success"
      @on-close="del(item.classId,index)"
    >{{item.className}}</Tag>
    <Button icon="ios-add" type="primary" size="small" @click="isShow=true">添加分类</Button>
    <Modal
        v-model="isShow"
        :title="title"
        @on-ok="ok"
        @on-cancel="cancel">
        <Input v-model="className" size="large" placeholder="请输入分类名称" />
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      classList: [],
      isShow:false,
      title:'新增分类',
      className:'',
      Type:0
    };
  },

  components: {},

  computed: {},
  created () {
       this.getClassList();
  },
  mounted() {
   
  },

  methods: {
      ccc(){
          console.log(123)
      },
      handleAdd(){},
    // 获取分类
    getClassList() {
      this.api.getClassList("").then(res => {
        if (res.data.Code == 1) {
          res.data.Data.unshift({
            classId: 0,
            className: "全部"
          });
          this.classList = res.data.Data;
        }
      });
    },
    //   删除分类
    del(id, idx) {
      this.api.del({ classId: id }).then(res => {
        if (res.data.Code == 1) {
          this.classList.splice(idx, 1);
        }
      });
    },
    // 新增分类
    ok(){
        this.api.addOrEditClass({className:this.className,Type:this.Type}).then(res=>{
            if(res.data.Code==1)
            {
                this.getClassList()
                this.className=''
            }
        })
    },
    cancel(){
        this.isShow=false
    }
  },

  watch: {}
};
</script>
<style  scoped>
.pd20 {
  padding: 20px;
}
</style>