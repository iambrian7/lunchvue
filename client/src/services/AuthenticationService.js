import Api from '@/services/Api'

export default {
  register (credentials) {
    return console.log(`registered...........${credentials}`)
    // return Api().post('register', credentials)
  },
  login (credentials) {
    return console.log(`registered...........${JSON.stringify(credentials, null, 3)}`)
    // return Api().post('login', credentials)
  }
}
