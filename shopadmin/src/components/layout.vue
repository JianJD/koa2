<template>
  <div>
    <Layout>
        <Header :style="{position: 'fixed', width: '100%',zIndex:'10'}">
            <Headernav />    
        </Header>
        <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
          <router-view></router-view>
        </Content>
    </Layout>
  </div>
</template>

<script>
import Headernav from '@/components/Header.vue'
export default {
  name: 'layout',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Headernav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
