<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <img src="../assets/Red_Cow_CreativeBurger.jpg" alt=""> -->
    <div class="about-container">
      <div class="title">
        <p>Just friends out for lunch</p>
      </div>
      <div class="content">
        <p>The week later one of them emailed us a said we should do this next month.</p>
      </div>
    </div>
  </div>
</template>

<style>
.about{
  height: 100vh;
  background-image: url("../assets/Red_Cow_CreativeBurger.jpg");
}
.about-container{
  margin: 0 auto;
  padding: 20px;
  background: rgba(148, 119, 51, 0.397);
  color: black;
}
.title{
  font-size: 50px;
  background: rgba(207, 41, 41, 0.486);
  padding: 10px;
  margin: 0 auto;
}
.content{
  font-size: 2em;
  padding: 20px;
  margin: 0 auto;
}
</style>
