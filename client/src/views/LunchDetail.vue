<template>
    <div id="lunchdetail">
  <div class="top-nav">
      <router-link to="/example" v-if="!back">Back</router-link>
      <a href="javascript:history.back()" v-else>Back</a>
  </div>
        <div class="detailed-container" v-if="!back">
        <!-- <div class="detailed-container" v-if="!openEdit"> -->
          <h1>{{msg}}</h1> 

          <h2>Name: {{item.restaurant}}</h2>
          <p>{{item.address}}   {{item.date}}</p>
          <p>{{item.owner}}   {{item.time}}</p>
        </div>
        <div class="tools-container" v-if="!openEdit">
          <div class="edit-button btn" @click="openEdit = !openEdit">Edit</div>
          <div class="delete-button btn" @click="deleteLunch">Delete</div>
        </div>
        <div class="edit-container" v-if="back">
          <h1>Edit {{ editItem.restaurant}}</h1>
          <!-- <div class="edit-inputs">
            <labeL>Restaurant <input type="text" v-model="editItem.restaurant"></labeL>
            <labeL>Address <input type="text" v-model="editItem.address"></labeL>
            <labeL>Owner <input type="text" v-model="editItem.owner"></labeL>
            <labeL>Date <input type="text" v-model="editItem.date"></labeL>
            <labeL>Time <input type="text" v-model="editItem.time"></labeL>
            <button @click="editLunch">Submit</button>
            <button @click="cancelLunch">Cancel</button>
          </div> -->
          <form class="form-style-4" action="" method="post">
            <div class="container-two">
              <label for="field1">
                <span>Restaurant</span><input type="text" v-model="editItem.restaurant"/>
              </label>
              <label for="field2">
                <span>Address</span><input type="text" v-model="editItem.address" />
              </label>
              <label for="field3">
                <span>Owner</span><input type="text" v-model="editItem.owner"/>
              </label>
            </div>
            <div class="container-two">
              <label for="field4">
              <span>Date</span><input type="text" v-model="editItem.date"/>
              </label>
              <label for="field5">
              <span>Time</span><input type="text" v-model="editItem.time"/>
              </label>
              <label>
              <span> </span><input type="submit" value="Submit Changes" />
              </label>
            </div>
          </form>
        </div>
        <div class="map-container">
          <google-map :locations="lunches"></google-map>
        </div>
        <!-- <google-map :locations="lunches" @clicked="onClickMap"></google-map> -->
    </div>
  </template>

  <script>
  // "date": {type: String, required: true},
  // "restaurant": {type: String, required: true},
  // "owner": {type: String, required: true},
  // "time": {type: String, required: false},
  // "rating": {type: String, required: false},
  // "votes": {type: String, required: false},
  // "result": {type: String, required: false},
  // "fivestar": {type: String, required: false},
  // "markrecomend": {type: String, required: false},
  // "benrecomend": {type: String, required: false},
  // "brianrecomend": {type: String, required: false},
  // "chrisrecomend": {type: String, required: false},
  // "avetip": {type: String, required: false},
  // "style": {type: String, required: false},
  // "notes": {type: String, required: false},
  // "address": {type: String, required: true},
  // "website": {type: String, required: false},
  // "lat": {type: String, required: false},
  // "lng": {type: String, required: false}, 
import GoogleMap from '@/components/googlemaps'
 // import Nav from '@/components/navigation'
  export default {
    name: 'lunchdetail',
    props: ["item","back"],
    components: {
      "google-map": GoogleMap
    },
    data () {
    return {
      msg: 'Lunch Detail Page',
      editItem: null,
      lunches: [this.item],
      openEdit: true
    }
  },
  methods: {
    login(){
      console.log("onclickLogin-------------------------")
    },
    cancelLunch(){
      console.log("cancelLunch-------------------------")
      this.editItem = JSON.parse(JSON.stringify(this.item))
      this.openEdit = false
    },
    editLunch(){
      console.log('edit')
      // var newLunch = {
      //   restaurant: this.item.restaurant,
      //   address: this.item.address,
      //   date: this.item.date,
      //   owner: this.item.owner,
      //   time: this.item.time
      // }

   //   console.log("LunchDetail: updateLunch " + JSON.stringify(this.item, null, 3))
   //   console.log("LunchDetail: newLunch " + JSON.stringify(newLunch, null, 3))
      var payload = {
        id: this.item._id,
        lunch: this.editItem
      }
      this.$store.dispatch("updateLunch", payload)
    },
    deleteLunch(){
      console.log('delete')
    },
  },
  computed: {
    // newItem(){

    // var newLunch = {
    //     restaurant: "",
    //     address: "",
    //     date: new Date().toDateString(),
    //     owner: '',
    //     time: "11:30am"
    //   }

    //   return this.item ? this.item : newLunch 
    // }
  },
  created() {
    if (this.item){
      console.log('created LunchDetail.vue' + JSON.stringify(this.item, null, 3))
      this.editItem = JSON.parse(JSON.stringify(this.item))
      this.editItem.time = "11:30"
      console.log('created this.editLunch' + JSON.stringify(this.editItem, null, 3))

    } else {
      console.log('created new lunch LunchDetail.vue --- this.item prop was null')
      this.editItem = {
        restaurant: "",
        address: "",
        date: new Date().toDateString(),
        owner: '',
        time: "11:30am"
      }

      console.log('created this.editLunch' + JSON.stringify(this.editItem, null, 3))
    }
    }
  //   async mounted () {
  //   this.lunches = (await LunchService.index()).data
  //   console.log(` got all lunches cnt=${this.lunches.length}`)
  // }
  // products() {
	// 			return this.$store.getters.products;
	// 		},
  }
  </script>
  
  <style>
  body, html {
      height: 100%;
  }
  .edit-inputs{
    display: flex;
    flex-wrap: wrap;
  }
  .edit-inputs label{
    padding: 5px 10px;
    flex: 1 0 auto;
    text-align: right;
    color: white
  }
  .edit-inputs input{
    /* width: 130px; */
  }
  .edit-container{
    background: #888;
    margin: 10px;
    padding: 5px;
    border: 1px solid black;
    border-radius: 5px;
  }
  .tools-container{
    display: flex;
    justify-content: space-around;
  }
  .btn{
    flex: 0 0 50px;
    cursor: pointer;
    margin: 5px;
    padding: 5px;
    border: 1px solid black;
    background: #ccc;

  }
  .map-container{
    width: 400px;
    height: 500px;
    margin: 0 auto;
    box-shadow: 5px 10px #888888;
    border-radius: 10px;
  }
  .top-nav{
    clear: right;
    background: orange;
    width: 100px;
    border: 1px solid black;
    cursor: pointer;
    margin: 20px;
    padding: 10px;
    font-size: 2em;
    border-radius: 10px;
  }
  .top-nav:hover{
    background: red;
  }
  .detailed-container{
    display: flex;
    flex-wrap: wrap;
    /* flex-direction: column; */
    border: 1px solid black;
    background: rgb(236, 213, 170);
    margin: 10px 30px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 5px 10px #888888;
  }
  .container-two{
    flex: 1 1 400px;
  }
  .form-style-4{
    display: flex;
    flex-wrap: wrap;
	width: 90%;
	font-size: 16px;
	background: #495C70;
	/* padding: 30px 30px 15px 30px; */
	padding: 10px;
  margin: 5px auto;
	border: 5px solid #53687E;
}
.form-style-4 input[type=submit],
.form-style-4 input[type=button],
.form-style-4 input[type=text],
.form-style-4 input[type=email],
.form-style-4 textarea,
.form-style-4 label
{
	font-family: Georgia, "Times New Roman", Times, serif;
	font-size: 16px;
	color: #fff;

}
.form-style-4 label {
	display:block;
	margin-bottom: 10px;
}
.form-style-4 label > span{
	display: inline-block;
	float: left;
	width: 150px;
}
.form-style-4 input[type=text],
.form-style-4 input[type=email] 
{
	background: transparent;
	border: none;
	border-bottom: 1px dashed #83A4C5;
	width: 275px;
	outline: none;
	padding: 0px 0px 0px 0px;
	font-style: italic;
}
.form-style-4 textarea{
	font-style: italic;
	padding: 0px 0px 0px 0px;
	background: transparent;
	outline: none;
	border: none;
	border-bottom: 1px dashed #83A4C5;
	width: 275px;
	overflow: hidden;
	resize:none;
	height:20px;
}

.form-style-4 textarea:focus, 
.form-style-4 input[type=text]:focus,
.form-style-4 input[type=email]:focus,
.form-style-4 input[type=email] :focus
{
	border-bottom: 1px dashed #D9FFA9;
}

.form-style-4 input[type=submit],
.form-style-4 input[type=button]{
	background: #576E86;
	border: none;
	padding: 8px 10px 8px 10px;
	border-radius: 5px;
	color: #A8BACE;
}
.form-style-4 input[type=submit]:hover,
.form-style-4 input[type=button]:hover{
background: #394D61;
}
  </style>
  