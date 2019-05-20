import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import LunchService from '@/services/LunchService'
import GroupService from '@/services/GroupService'

export default new Vuex.Store({
  state: {
    lunches: [],
    groups: [],
    isLoggedIn: false,
    token: localStorage.getItem('token') || '',
    user : {},
    users: []
  },
  getters: {
    lunches: state => {
      return state.lunches
    },
    groups: state => {
      return state.groups
    },
    myLunches: (state) => (email) => {
        console.log(`myLunches: getter: param = ${email}`)
      return state.lunches.filter(thing => thing.group === email)
    },
    // someMethod: (state) => (id) => {
    //   return state.things.find(thing => thing.id === id)
    // },
    // myLunches: state => param => {
    //  var found =  state.lunches.filter(el => el === param)
    //  console.log(`found mylunches=${JSON.stringify(found, null, 3)}`)
    //  return found
    // }
  //  myLunches(state, email) => {
      // var found = state.lunches.filter(a => a.group == email)
      // return found
   // }
  },
  mutations: {
    loadLunches (state,lunches){
      state.lunches = lunches
    },
    addLunch (state,lunch){
      console.log(`mutations: addLunch: ${JSON.stringify(lunch, null, 3)}`)
      state.lunches.push(lunch)
    },
    addGroup (state,group){
      console.log("addGroup " + JSON.stringify(group, null, 3))
      state.groups.push(group)
    },
    loadGroups (state,payload){
      state.groups = payload
    },
    updateLunch (state,lunch){
      console.log("mutation: updateLunch " + JSON.stringify(lunch, null, 3))
      //state.groups.push(group)
    },
    // auth functions
    auth_users(state, {token, users}){
			state.users = users
		},
		auth_request(state){
	    	state.status = 'loading'
	  	},
    auth_success(state, payload){
    // auth_success(state, {token, user}){
      state.status = 'success'
      state.token = payload.token
      console.log(`saving state user to ${JSON.stringify(payload, null, 3)}`)
      state.user = payload.myuser
      state.isLoggedIn = true
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.isLoggedIn = false
    },
  },
  actions: {
    async actionA ({ commit }) {
      commit('gotData', await getData())
    },
    async loadLunches ({ commit }) {
      console.log(`loadLunches*********************************************************`)
     // var lunches = (await LunchService.index()).data
     // console.log(` got all lunches cnt=${this.lunches.length}`)
      commit('loadLunches',  (await LunchService.index()).data)
    },
    async addLunch ({ commit },lunch) {
     // var lunches = (await LunchService.index()).data
     // console.log(` got all lunches cnt=${this.lunches.length}`)
      commit('addLunch',  (await LunchService.post(lunch)).data)
    },
    async updateLunch ({ commit },payload) {
     // var lunches = (await LunchService.index()).data
     console.log(` updateLunch (store.js)=${JSON.stringify(payload, null, 3)}`)
      commit('updateLunch',  (await LunchService.put(payload)).data)
    },
    async loadGroups ({ commit }) {
    //  var lunches = (await LunchService.index()).data
      console.log(` loading all groups******************`)
      commit('loadGroups',  (await GroupService.index()).data)
     },
    async addGroup ({ commit}, group) {
      var group = (await GroupService.post(group)).data
     
      commit('addGroup',  group)
    },
     //////////////////////
    //////////////////////

    // user
    async login({commit}, data){
      console.log(` adding user ${JSON.stringify(data, null, 3)}`)
      commit('auth_request')
      const response = await fetch('http://localhost:3000/user/login', {
          body: JSON.stringify(data), // must match 'Content-Type' header
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
        })
        const json = await response.json();
        // console.log(json);
        // commit('user added',  json)
        console.log(` response from fetch user ${JSON.stringify(json, null, 3)}`)
        const token = json.token
        const myuser = json.user
        //	debugger
        localStorage.setItem('token', token)
      // Add the following line:
    //  axios.defaults.headers.common['Authorization'] = token
      commit('auth_success', {token, myuser})
  },
    async register({commit}, data){
      console.log(` register user ${JSON.stringify(data, null, 3)}`)
      commit('auth_request')
      const response = await fetch('http://localhost:3000/user/signup', {
          body: JSON.stringify(data), // must match 'Content-Type' header
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
        })
        const json = await response.json();
        // console.log(json);
        // commit('user added',  json)
        console.log(` response from fetch user ${JSON.stringify(json, null, 3)}`)
        const token = json.token
        const myuser = json.user
        //	debugger
        localStorage.setItem('token', token)
      // Add the following line:
    //  axios.defaults.headers.common['Authorization'] = token
      commit('auth_success', {token, myuser})
  },
       // accounts
  logout({commit}){
    return new Promise((resolve, reject) => {
      console.log(`mystore: actions: logout........`)
        commit('logout')
        localStorage.removeItem('token')
       // delete axios.defaults.headers.common['Authorization']
        resolve()
    })
  },
  }
})
