<template id="grid-template"></templateid>
  <table class="hoverTable">
    <thead>
      <tr class="table-header">
          <td v-if="back">Edit</td>
        <th v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }">
          {{ key | short_title | capitalize }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredHeroes">
        <td v-if="back"><router-link :to="{ name: 'lunchdetail', params: {item: entry, back: 'all' } }">more..</router-link></td>
        <td v-for="key in columns" 
        v-bind:class="{ zeroed: entry.new_balance == 0 && key == 'name',snow: entry.snowball && key == 'minimum'}" contenteditable='true'>
          {{entry[key]  | short_data | all }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
// module.exports = {
  props: {
    heroes: Array,
    columns: Array,
    filterKey: String,
    back: String
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredHeroes: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var heroes = this.heroes
      if (filterKey) {
        heroes = heroes.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        heroes = heroes.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return heroes
    }
  },
  filters: {
    short_title: function (str) {
      if (str == null){
          return ''
      }
      return str.substr(0,5)
    },
    short_data: function (str) {
      //console.log(`short_data = ${str}`)
      if (str == null){
          return ''
      }
      return str.substr(0,9)
    },
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    currency: function(value){
        if (!value) return 0;
        return (value * 1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      },
      all: function(value){
        if (value instanceof Date){
          return value.toLocaleDateString()
        }
        if (typeof value === 'number'){
          // console.log('filter all numbers : ' + value)
          if (value < 100){
            return value
          }
          var x = parseFloat(value / 100).toFixed(0)
          // console.log('filter all numbers : ' + x)
          var y = (x * 1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
          // console.log('filter all currency numbers : ' + y)
          return (x * 1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
          // return parseFloat(value / 100).toFixed(0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        }
        if (typeof value === 'string') {
          // console.log('filter all strings : ' + value)
          if (value.indexOf("2019-") == 0){
            // debugger
            return new Date(value).toDateString()
          }
         return value // .substr(0,10)
      }
    //  debugger
      return value
    },
  },
  methods: {
    clickTd(row){
      debugger;
      console.log(`row = ${JSON.stringify(row, null,3)}`)
    },
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },

  }
}
</script>
<style>
  .zeroed{
    background: #42b983;
  }
  .snow{
     background: rgb(236, 149, 149);
     font-size: 16px;
     line-height: 800;
     }
body {
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #444;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  /* min-width: 120px; */
  padding: 5px 10px;
}
tr:hover{
  background: red;
}
td{padding:0; border-spacing:0}
th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}
.table-header th:nth-child(1){
  background: red;
  width: 150px;
}
.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
  	.hoverTable{
		width:100%; 
		border-collapse:collapse; 
	}
	.hoverTable td{ 
		padding:2px; 
    border:#4e95f4 1px solid;
	}
	/* Define the default color for all the table rows */
	.hoverTable tr{
		background: #b8d1f3;
	}
	/* Define the hover highlight color for the table row */
    .hoverTable tr:hover td{
          background-color: #ffff99;
    }
</style>