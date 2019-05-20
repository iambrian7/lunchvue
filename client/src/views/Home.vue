<template>
  <div class="home">
    <!-- <h1>{{ msg }}</h1>
    <div class="user-item" v-for="user in users" :key="user.id">
      {{user.name}}
    </div> -->
    <main>
        <!-- Landing Area -->
        <div id="landing">
          <div id="landing-text">
            <div id="landing-text-inner">
              <h1>MonthlyLunch.com</h1>
              <h2>Encourage long-term relationships</h2>
              <h2>Let's Keep In Touch</h2>
              <a href="#images" class="btn" id="view-work">
                How it all began - Our Story
              </a>
              <a href="#images" class="btn" id="view-work">
                  Create a Group Now!
              </a>
              <!-- <a href="#images" class="btn" id="view-work">
                See Example
              </a> -->
              <router-link to="/example" class="btn">See Example</router-link>
              <!-- <form action="/" enctype="multipart/form-data" method="post">
                <input type="file" name="file-to-upload">
                <input type="submit" value="Upload">
              </form> -->
            </div>
          </div>
          <div id="landing-image">
            <img src="../assets/eat.jpg" alt="">
            
            <!-- <img src="../assets/lunch01.jpg" alt=""> -->
          </div>
        </div>
      
      </main>
      
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js Vue-Lunch App'
    }
  },
  methods:{
    loadGroups(){
      this.$store.dispatch('loadGroups')
    }
  },
  computed: {
    users() {
      return this.$store.state.users
    }
  },
  created() {
    console.log("created home................. loadingGroups")
    this.loadGroups()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.user-item{
  padding: 10px;
  margin: 0 auto;
  margin-bottom: 10px;
  width: 300px;
  background: #42b983;
  color: white;
  border: 1px solid black;

}
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

body {
  font-family: 'Roboto Condensed', sans-serif;
  margin: 0;
  background: #eee;
  height: auto;
}

h1 {
  /* font-weight: 400;
  font-size: 2.5rem; */
  text-transform: uppercase;
  margin: 0;
}

h2 {
  font-weight: 400;
  font-size: 1.2rem;
  text-transform: capitalize;
  margin: 0;
}

img {
  display: block;
  width: 100%;
  max-width: 400px;
}

main {
  max-width: 900px;
  margin: auto;
  box-shadow: 30px 0px 40px rgba(0, 0, 0, 0.1),
    -30px 0px 40px rgba(0, 0, 0, 0.1);
}

#landing {
  background: #fff;
}

#landing-text {
  display: flex;
  flex: 0 1 40vw;
  height: 50vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-right: 1rem;
  padding-left: 1rem;
}

#landing-text h2 {
  color: #888;
}

#landing-image {
  /* background: url(../images/ben-white-148435-unsplash-smaller.jpg); */
  /* background: url(https://source.unsplash.com/De8wMYoSSBc); */
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 50vh;
  flex: 0 1 60vw;
  margin: 0;
}

.btn {
  padding: 0.5rem 2rem;
  border: 1px #ccc solid;
  display: inline-block;
  margin: 2rem 0 0;
  border-radius: 50px;
  text-decoration: none;
  color: #333;
  transition: background 500ms ease;
}

.btn:hover {
  background: #f4f4f4;
}

#header {
  padding: 1.5rem;
  text-align: center;
  background: #333;
  color: #fff;
}

#header h2 {
  border-left: dotted 1px #fff;
  border-right: dotted 1px #fff;
  display: inline-block;
  padding-right: 1rem;
  padding-left: 1rem;
}

.caption {
  padding: 0.8rem;
  text-align: center;
}

footer {
  text-align: center;
  padding: 2rem 1rem;
  margin: auto;
  color: #333;
}

footer h3 {
  font-size: 3rem;
  margin-bottom: 0;
}

/* Screen Sizes 500px and Up */
@media (min-width: 500px) {
  #landing {
    display: flex;
    height: 100%;
  }

  #landing-text {
    height: 100vh;
  }

  #landing-image {
    height: 100vh;
  }
}

/* Screen Sizes 700px and Up */
@media (min-width: 700px) {
  .btn {
    padding: 1rem 3rem;
  }
}

</style>
