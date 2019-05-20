<template>
    <div id="edit-all">
        <h1>{{msg}}</h1>
        <div class="container">
            <grid-data 
            :heroes="lunches"
            :columns="gridColumns"
            :filter-key="searchQuery"
            back="all" />
        </div>
    </div>
  </template>
  
  <script>
  import GridData from '@/components/GridData'

  export default {
    name: 'editall',
    components: {
      "grid-data": GridData
    },
    data () {
    return {
      msg: 'Edit All Page',
      // gridAccounts: [],
            searchQuery: '',
            gridColumns: [],
      schema: {
      // "_id":"5c7d5aad1698e521951a79ff",
      "date":"1/17/2019",
      "restaurant":"Augustine's Bar and Bakery",
      "owner":"Mark",
      "rating":"3",
      "votes":"4",
      "result":"75%",
      "fivestar":"4",
      "markrecomend":"Yes",
      "benrecomend":"Yes",
      "brianrecomend":"Yes",
      "chrisrecomend":"No",
      "avetip":"$16.00",
      "style":"American, Pub",
      "notes":"Large drink list but few food options. Their special ketchup is great. Rick King recommended.",
      "address":"1668 Selby Ave, St Paul, MN 55104, USA",
      "website":"http://augustinesmn.com/",
      "lat":"44.94635239999999",
      "lng":"-93.1710956",
      // "__v":0
   },
     // lunches: null
    }
  },
  methods: {
    // onClickMap(){
    //   console.log("onclickMap--------------------------")
    // }
  },
  computed: {
    lunches(){
      return this.$store.getters.lunches
    },
			loading() {
				console.log("isLoading", this.$store.getters.isProductLoading);
				return this.$store.getters.isProductLoading;
			}
    },
    created(){
    //  debugger
      this.gridColumns = Object.keys(this.schema)
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
  .container{
    display: flex;
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
  </style>
  