<template>
    <div id="respnav">
        <body>
            <nav class="navbar">
                <!-- <div class='div' v-bind:class="[isActive ? 'red' : 'blue']" @click="toggleClass()"></div> -->
              <span class="navbar-toggle" id="js-navbar-toggle" @click="isActive = !isActive">
                      <i class="fas fa-bars"></i>
                  </span>
              <a href="#" class="logo">MonthlyLunch.com</a>
              <!-- <ul class="main-nav" id="js-menu" v-bind:class="[isActive ? 'active' : '']" @click="isActive = !isActive">
                <li>
                  <a href="#" class="nav-links">Home</a>
                </li>
                <li>
                  <a href="#" class="nav-links">Products</a>
                </li>
                <li>
                  <a href="#" class="nav-links">About Us</a>
                </li>
                <li>
                  <a href="#" class="nav-links">Contact Us</a>
                </li>
                <li>
                  <a href="#" class="nav-links">Blog</a>
                </li>
              </ul> -->
              <ul class="main-nav" id="js-menu" v-bind:class="[isActive ? 'active' : '']" @click="isActive = !isActive">
                  <li><router-link to="/">Home</router-link></li>
                  <li><router-link to="/example">Example</router-link></li>
                  <li> <router-link to="/groups">Groups</router-link></li>
                  <li><router-link to="/creategroup" v-if="isLoggedIn">Create Group</router-link></li>
                  <li><router-link to="/editall">Edit All </router-link></li>
                  <li><router-link to="/about">About</router-link></li>
                  <!-- <li><router-link to="/login">Login</router-link></li> -->
                  <router-link to="/login" v-if="!isLoggedIn"> Login</router-link>
         <!-- <router-link @click="logout" v-if="isLoggedIn">{{user}} Logout</router-link> -->
         <a @click="logout" v-if="isLoggedIn">
          <span>{{user}}</span>
            Logout</a>

              </ul>
            </nav>
            <!-- <div class="output">{{}}</div> -->
          </body>
    </div>
  </template>
      
      <script>
//         let mainNav = document.getElementById("js-menu");
// let navBarToggle = document.getElementById("js-navbar-toggle");
// let out = document.querySelector('.output')

// navBarToggle.addEventListener("click", function() {
//   mainNav.classList.toggle("active");
// });
// mainNav.addEventListener("click", function(e) {
//   out.innerText = "rand " + Math.random() + e.target.innerText;
//   mainNav.classList.toggle("active");
// });
     // import { mapActions } from 'vuex';
      export default {
        name: 'respnav',
        data () {
          return {
            menuopen: false,
            isActive: false
          }
        },
        computed: {
          user: function(){
            var x =this.$store.state.user 
            console.log(`state: ${JSON.stringify(x, null, 3)}`)

            return this.$store.state.user.email
          },
          isLoggedIn: function(){
            console.log("isLoggedIn is " + this.$store.state.isLoggedIn)
            return this.$store.state.isLoggedIn
          }
        },
        methods: {
          logout(){
          // this.$store.state.isLoggedIn = false
          this.$store.dispatch('logout')
        }
        },
      // created: {
      // }
    }
      </script>
      
      
<style scoped>

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: "Josefin Sans", sans-serif;
}

.navbar {
  font-size: 18px;
  background-image: linear-gradient(260deg, #2376ae 0%, #c16ecf 100%);
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 10px;
}

.main-nav {
  list-style-type: none;
  display: none;
}

a,
.nav-links,
.logo {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
}

.main-nav li {
  text-align: center;
  margin: 15px auto;
}

.logo {
  display: inline-block;
  font-size: 22px;
  margin-top: 10px;
  margin-left: 20px;
}

.navbar-toggle {
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-size: 24px;
}
a span{
  font-size: 12px;
  color: lightgreen;
  padding: 3px;
}
.active {
  display: block;
}

@media screen and (min-width: 768px) {
  .navbar {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0;
    height: 70px;
    align-items: center;
  }

  .main-nav {
    display: flex;
    margin-right: 30px;
    flex-direction: row;
    justify-content: flex-end;
  }

  .main-nav li {
    margin: 0;
  }

  a,
  .nav-links {
    margin-left: 40px;
  }

  .logo {
    margin-top: 0;
  }

  .navbar-toggle {
    display: none;
  }

  .logo:hover,
  a:hover,
  .nav-links:hover {
    color: rgba(255, 255, 255, 1);
  }
}

</style>
      
      