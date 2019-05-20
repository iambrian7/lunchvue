import Api from '@/services/Api'

export default {
  index (search) { // get all groups
    console.log("GroupService.js index (getting all groupes*********")
    return Api().get('group', {
      params: {
        search: search
      }
    })
  },
  show (groupId) { // get one group
    return Api().get(`group/${groupId}`)
  },
  post (group) { // create the group
    console.log(`GroupService.js post (add group): ${JSON.stringify(group, null, 3)} `)
   // return group
   return Api().post('group', group)
  },
  put (payload) { // update the id
    return Api().put(`group/${payload.id}`, payload.group)
  }
}
