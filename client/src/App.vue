<template>
  <div id="app">
      <nav-lunch />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>
<script>
      import LunchService from '@/services/LunchService'
import Nav from '@/components/CssMenu'
import RespNav from '@/components/RespNav'
export default {
  name: 'App',
  components: {
    // 'nav-lunch': Nav,
    'nav-lunch': RespNav
  },
  methods: {
      // ...mapActions(['listenToProductList','listenToGroups'])
    },
    created() {
      this.$store.dispatch("loadLunches")
    //  let uid = this.$store.getters.currentUser.uid;
      // this.listenToProductList();
      // this.listenToGroups();
     // this.getShoppingCart({uid, currentCart: this.$store.getters.cartItemList});
    }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
