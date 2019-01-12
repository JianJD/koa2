<template>
  <div>
    <Row  :gutter="16">
        <Col span="6" v-for="(item,index) in shopData" :key='index'>
            <Card >
                <div class="txt-center">{{item.name}}</div>
                 <div>{{item.value==null?0:item.value}}</div>
            </Card>
        </Col>
    </Row>
  </div>
</template>

<script>

  export default {
    data () {
      return {
          shopData:[]
      };
    },

    components: {},

    computed: {},
    mounted() {},
    created() {
        this.api.shopManger('').then(res=>{
            if(res.data.Code==1)
            {
                console.log(res)
                this.shopData=res.data.Data
            }
        })
    },
    methods: {},

    watch: {}

  }

</script>
<style scoped>
.ivu-row .ivu-col .ivu-card{font-size: 26px;color: #fff;}
.ivu-row .ivu-col .ivu-card .ivu-card-body>div:nth-child(2){font-size: 30px;}
.ivu-row .ivu-col:nth-child(1) .ivu-card{background: rgb(241, 97, 97)}
.ivu-row .ivu-col:nth-child(2) .ivu-card{background: rgb(29, 163, 69)}
.ivu-row .ivu-col:nth-child(3) .ivu-card{background: #ff5101}
.ivu-row .ivu-col:nth-child(4) .ivu-card{background: #ff973b;}
</style>