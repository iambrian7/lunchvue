/**
* Created by vouill on 11/13/17.
*/

<template>
  <div class="login-vue">

    <div id="login">
      <form class="login" @submit.prevent="login" v-if="!openRegister">
        <h1>Sign in</h1>
        <label>Email</label>
        <input required v-model="email" type="text" placeholder="aaa@gmail.com"/>
        <label>Password</label>
        <input required v-model="password" type="password" placeholder="Password"/>
        <hr/>
        <button type="submit">Login</button>
      </form>
    </div>
      <div id='register'>
        <hr/>
        <button @click="openRegister = !openRegister" v-if="!openRegister">Register</button>
          <form class="register" @submit.prevent="register" v-if="openRegister">
            <h1>Please Register </h1>
            <label>User name</label>
            <input required v-model="username" type="text" placeholder="Snoopy"/>
            <label>Email</label>
            <input required v-model="email" type="text" placeholder="email"/>
            <label>Password</label>
            <input required v-model="password" type="password" placeholder="Password"/>
            <label>Confirm Password</label>
            <input required v-model="confirmpassword" type="password" placeholder="Confirm Password"/>
            <hr/>
            <button type="submit">Register</button>
          </form>
    </div>
  </div>
  </template>
  
  <style>
    #register,
  #login{
    background: #bbb;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .register,
  .login {
    display: flex;
    flex-direction: column;
      /* align-items: center;
  justify-content: center; */
    width: 300px;
    padding: 10px;
  }
</style>

<script>
 // import {AUTH_REQUEST} from 'actions/auth'
module.exports = {
  // export default {
    name: 'login',
    data () {
      return {
        username: 'aaa',
        password: 'aaaa',
        email: "aaa@gmail.com",
        confirmpassword: 'aaaa',
        is_admin : null,
        openRegister: false
      }
    },
    methods: {
      register: function () {
                let data = {
                    name: this.username,
                    email: this.email,
                    password: this.password,
                    is_admin: this.is_admin
                }
                this.$store.dispatch('register', data)
               .then(() => this.$router.push('/'))
               .catch(err => console.log(err))
      },
      login: function () {
        const { email, password } = this
        console.log("login.vue method: login: " + email + "  " + password)
        this.$store.dispatch('login', { email, password })
		   		.then(() => {
						 this.$router.push('/')
						 
						 })
		   		.catch(err => console.log(err))
		   	}
        // this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
        //   this.$router.push('/')
        // })
      //}
    },
   created(){
      // debugger
      console.log("created login.vue")
 
    }
  }
</script>
