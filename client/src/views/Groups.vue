<template>
    <div id="groups">
        <h1>{{msg}}</h1>
        <h3>Groups are just a list of friends that have agreed to have lunch once a month.</h3>
       <p>We make it easy to regularly schedule a lunch with some friends on a regular basis.</p>
       <p>Just have each one in the group select a place for lunch once a month. A good idea is to 
         have have a regular sequence so each member choozes in his turn. In the beginning each member 
         will be assigned a month. They should chooze before hand on a place, date, and time. We have found
         that a 11:30am time is best to avoid lunch crowds.
       </p> 
       <p>Each group should have a owner and this owner must be signed in to the website. The owner will
         invite all other members. Those members should list their email so they can be contacted. If 
         phone messaging is needed you should list your phone numbers when you accept the invitation.
       </p>
       <div class="invite"v-if="isLoggedIn">
         <h3 > You are loggin in as {{user}}</h3>
         <p>You may start a group with {{user}} as the owner.</p>
         <form>
            <label>Group Name: <input type="text"  v-model="group.name"></label> 
            <label>Owner: <input type="text"  v-model="group.email"></label> 
            <label>Location: <input type="text" v-model="group.location" ></label> 
          </form>
       </div>


       <h3>Sample group signup</h3>
       <p>Here's a sample form to get started with:</p>
       <div class="example-group">
         <form>
           <input type="text" placeholder="owner">
         </form>
       </div>
       <div v-if="mygroups.length > 0" class="my-groups">
            <!-- Groups found: {{ Object.keys(mygroups).length}} -->
            <p v-for="group in mygroups">
              <ul>
                <li>Your group name: {{group.name}}</li>
                <li>Owner: {{group.email}}</li>
                <!-- <li>Owner: <span class="owner-name">{{group.email}}</span></li> -->
                <li>Location: {{group.location}}</li>
                <!-- <li>Add Members: <input type="text"></li>
                <li>Invite all members to join.</li> -->
                <!-- <li class="show-lunch" @click="addLunch">Add first lunch: </li> -->
                <li class="show-lunch" @click="showLunches = !showLunches">View Lunches</li>
              </ul>
            </p>
            <div class="group-lunches">
              <my-lunches :lunches="myLunches" />
  
            </div>
            <!-- <div class="lunches-container" v-if="showLunches">
              <lunch-list />
            </div> -->
            <div class="lunches-container" v-if="showDetail">
              <lunch-detail :item="newLunch" back="really" />
            </div>
        </div>
        <div v-else class="no-groups">
          No Groups found
        </div>
       
    <!-- <div class="error-message" v-if="error.length > 0">{{ error }}</div>
    <div class="add-group">
      <button @click="addForm = !addForm">Add a Group?</button>
      <div v-if="addForm" class="add-form">
          <ul>
              <li>Your group name: <input type="text" v-model="group.name"></li>
              <li>Owner: <input type="text" v-model="group.email"></li>
              <li>Location: <input  class="location" type="text" v-model="group.location"></li>

              <li></li>
            </ul>
            <button @click='saveGroup'>Save</button>
      </div>
    </div> -->
   
    </div>
  </template>
  
  <script>
  import groupLunches from '@/components/myLunches'
  import MakeLunch from '@/components/MakeLunch'
  import LunchDetail from '@/views/LunchDetail'
  import Example from '@/views/Example'

  import { mapActions } from 'vuex';
  export default {
    name: 'Groups',
    components: {
      'make-lunch': MakeLunch,
      'my-lunches': groupLunches,
      'lunch-detail': LunchDetail
    },
    data () {
    return {
      msg: 'Listing all groups',
      addForm: false,
      showLunches: false,
      showDetail: false,
      group: {
        name: 'MyGroup',
        email: 'myemail@gmail.com',
        location: '55343'
      },
      newLunch: {
        restaurant: "",
        address: "",
        date: "",
        owner: "",
        time: ""
      },
     // myLunches: [],
      error: ''
    }
  },
  methods:{
    addLunch(){
      console.log("addlunch..............")
      this.showLunches = false
      this.showDetail = true;
    },
    cancelAddLunch(){
      this.showLunches = true
      this.showDetail = false;
    },
    saveGroup(){
      //this.group = this.mygroups[0]
      console.log(`Save Group: ${JSON.stringify(this.group, null, 3)}`)
      if (this.group.location.length < 5){
        this.error = "location should be an address or zip code"
      } else {
        this.error = ''
        this.$store.dispatch('addGroup', this.group)
      }
    }
  },
  computed: {
      user: function(){
        var x =this.$store.state.user 
        console.log(`state: ${JSON.stringify(x, null, 3)}`)
        this.group.email = x.email
        return this.$store.state.user.email
      },
      isLoggedIn: function(){
        console.log("isLoggedIn is " + this.$store.state.isLoggedIn)
        return this.$store.state.isLoggedIn
      },
      myLunches: function(){
        var mine =  this.$store.getters.myLunches(this.group.email)
        return mine
      },
    mygroups(){
     // debugger
      // if (this.isLoggedInLocal) {
          var groups = this.$store.getters.groups
          console.log(`mygroups: ${JSON.stringify(groups, null, 3)}`)
          return groups

      //   } else {
      //    // this.group.name = 'GroupLunch'
      //     return [] // 'GroupLunch';
      // }
    },
    
  },
  // created() {
    
  // }
  }
  </script>
  
  <style>
    ul {
      list-style: none;
      width: 200px;

    }
    .my-groups ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
    .show-lunch{
      cursor: pointer;
      /* width: 50px;
      height: 40px; */
      border: 1px solid black;
      background: red;
      border-radius: 5px;
    }
    .error-message{
      background: yellow;
      margin: 20px;
      border: 1px solid black;
      border-radius: 5px;
      font-size: 2em;
    }
    .my-groups{
      border: 1px solid black;
      background: #aa0;
      width: 80vw;
    margin: auto;
    padding: 20px;
    }
  </style>
  