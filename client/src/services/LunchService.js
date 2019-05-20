import Api from '@/services/Api'

export default {
  index (search) {
    console.log("LunchService.js index (getting all lunches*********")
    return Api().get('lunches', {
      params: {
        search: search
      }
    })
  },
  show (lunchId) {
    return Api().get(`lunches/${lunchId}`)
  },
  post (lunch) {
    console.log(`LunchService.js post (add lunch): ${JSON.stringify(lunch, null, 3)} `)
    // return lunch
   return Api().post('lunches', lunch)
  },
  put (payload) {
    return Api().put(`lunches/${payload.id}`, payload.lunch)
  }
}
