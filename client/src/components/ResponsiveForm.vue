<template>
<div id="cssnav">
    <h2>Responsive Form</h2>
    <p>Resize the browser window to see the effect. When the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other.</p>
    
    <div class="container">
      <form @submit.prevent="checkForm">
          <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
          </p>
        <div class="row">
          <div class="col-25">
            <label for="fname">First Name</label>
          </div>
          <div class="col-75">
            <input type="text" id="fname" v-model="firstname" placeholder="Your name..">
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="lname">Last Name</label>
          </div>
          <div class="col-75">
            <input type="text" id="lname" v-model="lastname" placeholder="Your last name..">
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="country">Country</label>
          </div>
          <div class="col-75">
            <select id="country" name="country">
              <option value="australia">Australia</option>
              <option value="canada">Canada</option>
              <option value="usa">USA</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-25">
            <label for="subject">Subject</label>
          </div>
          <div class="col-75">
            <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>
          </div>
        </div>
        <div class="row">
          <input type="submit" value="Submit">
        </div>
      </form>
    </div>    
</div>
</template>
      
      <script>
     // import { mapActions } from 'vuex';
      export default {
        name: 'cssmenu',
        data () {
          return {
            menuopen: false,
            errors: [],
            firstname: null,
            lastname: null,
            age: null,
            movie: null
          }
        },
        computed: {
        },
        methods: {
          checkForm: function (e) {
            this.errors = [];
            if (this.firstname && this.lastname) {
              return true;
            }
            if (!this.firstname) {
              this.errors.push('Firstname required.');
            }
            if (!this.lastname) {
              this.errors.push('Lastname required.');
            }
          }
      },
      // created: {
      // }
    }
  </script>
      
      
<style scoped>
      * {
        box-sizing: border-box;
      }

      input[type=text], select, textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical;
      }

      label {
        padding: 12px 12px 12px 0;
        display: inline-block;
      }

      input[type=submit] {
        background-color: #4CAF50;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        float: right;
      }

      input[type=submit]:hover {
        background-color: #45a049;
      }

      .container {
        border-radius: 5px;
        background-color: #f2f2f2;
        padding: 20px;
      }

      .col-25 {
        float: left;
        width: 25%;
        margin-top: 6px;
      }

      .col-75 {
        float: left;
        width: 75%;
        margin-top: 6px;
      }

      /* Clear floats after the columns */
      .row:after {
        content: "";
        display: table;
        clear: both;
      }

      /* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
      @media screen and (max-width: 600px) {
        .col-25, .col-75, input[type=submit] {
          width: 100%;
          margin-top: 0;
        }
      }
</style>
      
      