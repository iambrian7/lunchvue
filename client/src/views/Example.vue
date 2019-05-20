<template>
    <div id="example">
        <h1>{{msg}}</h1>
        <button class="map-button" @click="mapOn = !mapOn">Map</button>
        <div class="container">
          <div class="lunch-list" v-if="mapOn">
            <div class="lunch"><router-link :to="{ name: 'lunchdetail', params: {item: '', back: 'true' } }">add lunch..</router-link></div>
            <div class="lunch" v-for="(lunch, i, index) in lunches" :key="i">
              <!-- <h3 v-if="lunch.section">{{lunch.section}} </h3> -->
              {{ i+1}}.  Date: {{ lunch.date}} Name: {{ lunch.restaurant}} Owner: {{ lunch.owner }} 
              <p>{{lunch.addr}}</p>
              <p><router-link :to="{ name: 'lunchdetail', params: {item: lunch } }">more..</router-link></p>
             <!-- <p> <router-link :to="{path:'detail',params:{item:lunch}}">Detail</router-link></p> -->
             <!-- <p> <router-link :to="{name:'lunchdetail',props:{id:lunch._id,item:lunch}}">Detail</router-link></p> -->
              
            </div>
          </div>
          <!-- now map -->
          <div class="my-map">
              <google-map :locations="lunches" @clicked="onClickMap"></google-map>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import GoogleMap from '@/components/googlemaps'
 // import Nav from '@/components/navigation'
  export default {
    name: 'Example',
    components: {
      "google-map": GoogleMap
    },
    data () {
    return {
      msg: 'Example Page',
      mapOn: true

     // lunches: null
    }
  },
  methods: {
    onClickMap(){
      console.log("onclickMap--------------------------")
    }
  },
  computed: {
    lunches(){
      return this.$store.getters.lunches
    },
			products() {
        var p = this.$store.getters.products
    //    debugger
        var sortable = [];
        for (var lunch in p) {
            sortable.push(Object.assign({_id:lunch}, p[lunch]))
        }
      //  console.log(`array: ${JSON.stringify(sortable, null, 3)}`)
        sortable.reverse(function(a, b) {
            return a.date - b.date;
        });
        return sortable
        // var myLunches = Object.keys(p).sort(function(a,b){
        //  var datea = p[a].date
        //  var dateb = p[b].date
        //  // console.log(mydate)

        //   return dateb - datea
        //         })
				// return myLunches
			},
			loading() {
				console.log("isLoading", this.$store.getters.isProductLoading);
				return this.$store.getters.isProductLoading;
			}
    },
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
  .container{
    display: flex;
    flex-direction: column;
  }
  .lunch-list{
    width: 80%;
    max-width: 800px;
    padding: 30px;
    margin: 0 auto;
    max-height: 72vh;
    overflow-y: scroll;
  }
  .lunch{
    border: 1px solid black;
    padding: 5px;
    margin-bottom: 10px;
    background: yellow;
    text-align: left;
    width: 100%;
  }
  .lunch p{
    font-size: 0.8em;
    font-style: italic;
    font-weight: 800;
    text-align: right;
    padding: 0 20px 0 0;
  }
  .my-map{
    width: 100%;
    height: 80vh;
    background: #c44;
  }
  @media screen and (min-width: 768px) {
    .container{
      flex-direction: row;
    }
    .map-button{
      display: none;
    }
}
  </style>
  