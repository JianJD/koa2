<template>
  <div>
    <img src="@/assets/login-bg.jpg" class="bgimg">
     <Card style="width:320px" title='店铺管理后台'>
         <Form ref="formInline" :model="formInline" >
          <FormItem prop="user">
              <Input type="text" v-model="formInline.user" placeholder="Username">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <FormItem prop="password">
              <Input type="password" v-model="formInline.password" placeholder="Password">
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <FormItem class="mgb0">
              <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
          </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>

  export default {
    data () {
      return {
          formInline:{
            user:'',
            password:''
          }
      };
    },

    components: {},

    computed: {},
    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style  scoped>
.ivu-card{
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -156px;
  margin-left: -160px;
}
.mgb0{margin-bottom: 0;}
.bgimg{
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}
</style>