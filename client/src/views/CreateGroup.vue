<template>
    <div id="create-group">
        <h1>{{msg}}</h1>
        <div v-if="mygroups" class="my-groups">
            Groups: {{ Object.keys(mygroups).length}}
            <p v-for="group in mygroups">
              <ul>
                <li>Your group name: {{group.name}}</li>
                <li>Owner: {{group.email}}</li>
                <!-- <li>Owner: <span class="owner-name">{{group.email}}</span></li> -->
                <li>Location: {{group.location}}</li>
                <li>Add Members: <input type="text"></li>
                <li>Invite all members to join.</li>
                <li>Add first lunch: </li>
                <li></li>
              </ul>
            </p>
        </div>
        <div v-else class="no-groups">
          No Groups found
        </div>
    <div class="error-message" v-if="error.length > 0">{{ error }}</div>
    <div class="add-group">
      <button @click="addForm = !addForm">Add a Group?</button>
      <div v-if="addForm" class="add-form">
          <ul>
              <li>Your group name: <input type="text" v-model="group.name"></li>
              <li>Owner email: <input type="text" v-model="group.email"></li>
              <li>Location: <input  class="location" type="text" v-model="group.location"></li>

              <li></li>
            </ul>
            <button @click='saveGroup'>Save</button>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  // import Nav from '@/components/navigation'
  import { mapActions } from 'vuex';
  export default {
    name: 'CreateGroup',
    data () {
    return {
      msg: 'Creating a Group',
      addForm: false,
      group: {
        name: 'Example',
        email: 'bkcgee@gmail.com',
        location: '55343'
      },
      error: ''
    }
  },
  methods:{
    saveGroup(){
      debugger
    // "created": {type: String, required: true},
    // "name": {type: String, required: true},
    // "owner": {type: String, required: true},
    // "members":{type:Array, required: true}


      //this.group = this.mygroups[0]
      console.log(`Save Group: ${JSON.stringify(this.group, null, 3)}`)
      if (this.group.location.length < 5){
        this.error = "location should be an address or zip code"
      } else {
        this.error = ''
        this.group.created = new Date()
        this.group.members = ["Brian","Mark","Ben","Chris"]
        this.$store.dispatch('addGroup', this.group)
      }
    }
  },
  computed: {
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
    defaultName(){
      if (this.isLoggedInLocal) {
          var name = this.$store.getters.currentUser.email
          name = name.split('@')[0]
       //   this.group.name = 'Group' +name.charAt(0).toUpperCase()
       console.log(`defaultName computed at: ${name}`)
       console.log(`defaultName returning: ${'Group' +name.charAt(0).toUpperCase() + name.slice(1)}`)
          return 'Group' +name.charAt(0).toUpperCase() + name.slice(1)
        } else {
         // this.group.name = 'GroupLunch'
          return 'GroupLunch';
      } 
    },
    isLoggedInLocal() {
        return this.$store.getters.isLoggedIn;
    },
    userEmail() {
                if (this.isLoggedInLocal) {
                //  this.group.email = this.$store.getters.currentUser.email;
                  return this.$store.getters.currentUser.email;
                } else {
               //   this.group.email = 'no email';
                    return 'get an email address';
                }
            },
  },
  created() {
    console.log("create CreateGroup.......................")
    // this.group.name = this.defaultName
    // this.group.email = this.userEmail
  }
  }
  </script>
  
  <style>
    ul {
      list-style: none;
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
      background: rgb(129, 221, 233);
      width: 80vw;
    margin: auto;
    padding: 20px;
    }
  </style>
  