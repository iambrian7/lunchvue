<template>
<div id="googlemaps">
     <!--<button @click="addMarker">Add Marker</button> <span>locations from prop len = {{Object.keys(locations).length}}</span>-->
     <div class="hide">{{Object.keys(locations).length}}</div>
    <div style="height:100%; width:100%;">
        <div id="my-map">

        </div>
       
    </div>
</div>
</template>
<script>
     import { Bus } from '../main'
export default {
    props: ['locations'],
	data() {
		return {
            map : null,
            markers: [],
            lastInfoWindow: null,
          //  selectedMeeting: this.$store.getters.getSelectedMeeting
    }
  },
  methods: {
      setMapCenter(meeting){
     //   debugger
     var self = this
            if (meeting){

                var m = this.markers.filter(function(x){
                    return x.title == meeting.location
                })[0]
                // console.log(`found marker for ${m.name}`)
                //      this.map.setCenter(m.getPosition());
                //  map.setCenter(new google.maps.LatLng(lat, lng));
                //    this.map.setZoom(10);
                if (m == undefined){
                  //  console.log("meeting undefined for " + m.location)
                    return;
                } 
                
                var bounds  = new google.maps.LatLngBounds();
                
                
                //Everytime you add a new marker:
                
                var loc = new google.maps.LatLng(m.position.lat(), m.position.lng());
                bounds.extend(loc);
                //After all markers have been added:
                
                this.map.fitBounds(bounds);  //     # auto-zoom
                this.map.panToBounds(bounds);  //   # auto-center
                
                
                // google.maps.event.trigger(this.map, "resize");
                // // this.map.setCenter(m.position)
                // this.map.panTo(m.position);
                 this.map.setZoom(14);


                if (self.lastInfoWindow){
                    self.lastInfoWindow.close();
                } else {
                    self.lastInfoWindow = new google.maps.InfoWindow();
                }
                var infowindow = new google.maps.InfoWindow({ maxWidth: 200});
                infowindow.setContent(m.content);
                infowindow.open(this.map, m);
                self.lastInfoWindow = infowindow;
            } else {
                // unselect lastInfoWindow
                if (self.lastInfoWindow){
                    self.lastInfoWindow.close();
                }
                this.map.setZoom(10);
                google.maps.event.trigger(this.map, "resize");
            }
                
                // store.dispatch('handleMyStateChange');
                //  }
            },
            initMap: function(){
                this.map = new google.maps.Map(document.getElementById('my-map'), {
                    center: {lat: 44.9169913, lng: -93.4435269},
            zoom: 16
            });
            var self = this;

            google.maps.event.addListener(self.map, 'click', function(event) {
               // console.log("map clicked................... at : lnglat " + event.latlng)
              //  google.maps.event.addListener(map, "click", function(event) {
                  console.log(`checking lastInfoWindow..${JSON.stringify(event, null, 3)}`)
               //   console.log(`checking lastInfoWindow.====.${JSON.stringify(self.lastInfoWindow, null, 3)}`)
                  if (self.lastInfoWindow){
                    self.lastInfoWindow.close();
                  }
               // });
                var mapZoom = self.map.getZoom();
                
                var startLocation = event.latLng;
               // console.log("zoom is " + mapZoom + " at " + startLocation)
            //   debugger
            //    var loc = {};

            // loc[0] = {
            //     location: 'hello location',
            //     address: '',
            //     city: '',
            //     state: '',
            //     postal_code: '',
            //     loc : {
            //         "type": "Point",
            //         "coordinates": [
            //         startLocation.lng(),
            //         startLocation.lat()
            //             ]
            //         }
            // }
         //   self.locations = loc
            self.$emit('clicked', startLocation)
               // setTimeout(placeMarker, 600);
            });

            function placeMarker() {
                if(mapZoom == self.map.getZoom()){
                    new google.maps.Marker({position: location, map: self.map});
                }
            }


        },
        newMarkerContent:function(meetings){
            var content = "";
            var days = ['Sun','Mon','Tue','Wed','Thr','Fri','Sat'];
            var day, dl;
            var meetingCount = 0;
        // add each meeting to the marker content
           for (var i=0; i<meetings.length; i++){
                var m = meetings[i]
                // add content for this meeting to this unique marker
                    if (m.day != day){
                        content = content.replace("%%cnt%%",meetingCount.toString())
                        meetingCount = 0;
                        if (day) content += "</dl>"
                        content += "<h5>" + days[m.day] + "  %%cnt%%" + " meetings </h5>";
                        content +="<dl>";// + "</dl>");
                        day = m.day;
                    }
                    content+="<dt>"+ m.time_formatted +"</dt>";
                    content+="<dd data-id=" + m.slug + ">"+ m.name +"</dd>";
                    meetingCount++;

            }
            content = content.replace("%%cnt%%",meetingCount.toString())
            if (day) content+="</dl>" // finish up last dl tag
        return content
        },
        makeNewMarkers:function(locations){
             // delete markers
           // debugger;
            // always delete all markers
            console.log("makeNewMarkers = " + locations)
            this.markers.forEach(function (m) {
                m.setMap(null);
            })
            this.markers = [];
            if (!locations) return; // no locations so remove all markers
            if (Object.keys(locations).length == 0) {
                console.log("no locations to mark")
                return;
            }
            console.log("locations for markers len = " + Object.keys(locations).length)
            this.markers.forEach(function (m) {
                m.setMap(null);
            })
    // "_id":"5c7d5aad1698e521951a79ff",
    //   "date":"1/17/2019",
    //   "restaurant":"Augustine's Bar and Bakery",
    //   "owner":"Mark",
    //   "rating":"3",
    //   "votes":"4",
    //   "result":"75%",
    //   "fivestar":"4",
    //   "markrecomend":"Yes",
    //   "benrecomend":"Yes",
    //   "brianrecomend":"Yes",
    //   "chrisrecomend":"No",
    //   "avetip":"$16.00",
    //   "style":"American, Pub",
    //   "notes":"Large drink list but few food options. Their special ketchup is great. Rick King recommended.",
    //   "address":"1668 Selby Ave, St Paul, MN 55104, USA",
    //   "website":"http://augustinesmn.com/",
    //   "lat":"44.94635239999999",
    //   "lng":"-93.1710956",

            this.markers = [];
            var self = this
            for(var key in locations){
                var m = locations[key]
                var lat = m.lat // loc.coordinates[1]
                var lng = m.lng // loc.coordinates[0]
                console.log(`googlemaps: locations: lat = ${lat}`)
                console.log(`googlemaps: locations: lng = ${lng}`)
                if (lat == 0 || lng == 0){
                   lat = 44.9170
                   lng = -93.4443
                }
                var  myLatLng = { lat: lat * 1, lng: lng * 1}
                var latlng = new google.maps.LatLng(lat, lng);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: this.map,
                    id: m._id, // location_id,
                    animation: google.maps.Animation.DROP,
                    title: m.restaurant // location
                });
                marker.content = '<h3>' + m.restaurant + '</h3>' + "<div class='infoWin'>" +  m.address +
                // '<br /> ' + m.city + ', MN ' + m.postal_code + 
                '</div>';
                marker.content = m.restaurant
                // marker.content = marker.content + this.newMarkerContent(m.meetings);
                marker.content = "<div class='top-info-window'>" + marker.content + "</div>";
                google.maps.event.addListener(marker, 'click', (function (mark) {
                return function () {
                   // debugger
                    if (self.lastInfoWindow)
                    self.lastInfoWindow.close();
                    else
                    self.lastInfoWindow = new google.maps.InfoWindow();
                    var infowindow = new google.maps.InfoWindow({ maxWidth: 200});
                    infowindow.setContent(mark.content);
                    infowindow.open(this.map, mark);
                    self.lastInfoWindow = infowindow;
                    }
                    })(marker));
        //    bounds.extend(latlng);
            this.markers.push(marker)
        }// end of locations
       
         var self = this;
         if (self.markers.length == 1){
            self.map.setCenter(this.markers[0].getPosition());
         } else {
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < self.markers.length; i++) {
            bounds.extend(self.markers[i].getPosition());
            }
            self.map.fitBounds(bounds);
         }
          
         // must async this because the always goes into a loop if we don't
     //   setTimeout(function(){
            // var bounds = new google.maps.LatLngBounds();
            // for (var i = 0; i < self.markers.length; i++) {
            // bounds.extend(self.markers[i].getPosition());
            // }
            // self.map.fitBounds(bounds);
      //  },100)
        },
   },
   watch: {
    locations: {
       handler(val){
       // do stuff
        console.log("locations changed..........")
        console.log("googlemaps.vue " + Object.keys(val).length + " locations found")
       // console.log(JSON.stringify(val, null, 4))
        this.makeNewMarkers(val);
        },
        deep: true
    },
    // selectedMeeting: {
    // handler (meeting) {
    //     debugger
    //       var m = this.markers.filter(function(x){
    //           x.id == meeting.id
    //       })
    //      // console.log(`found marker for ${m.name}`)
    //         this.map.setCenter(m)
    //        // store.dispatch('handleMyStateChange');
    //     }
    // },
   },
  computed: {
    //   selectedMeeting: function(){
    //       var meeting = this.$store.getters.getSelectedMeeting
    //       if (!meeting) { return null}
    //       // find the selectedMeeting marker
          
    //   }
  },
  mounted: function(){
      var self = this;
      this.initMap();
      this.makeNewMarkers(this.locations);
      this.$store.watch(
            function (state) {
                return state.selectedMeeting;
            },
            function (val) {
                //do something on data change
                if (val){
                    console.log(`googlemaps.vue watch store: new selectedMeeting: name=${val.name}`)
                    self.setMapCenter(val)
                } else {
                    console.log(` unselect meeting................`)
                    self.setMapCenter(val)
                }
            },
            {
                deep: true //add this if u need to watch object properties change etc.
            }
        );
  },
  updated:function(){
      this.makeNewMarkers(this.locations);
  }
}

</script>
<style>
    #googlemaps {width: 100%; height: 100%;}    
    #my-map {
        height: 100%; width: 100%;
        }
    .hide { display: none;}
        /* Optional: Makes the sample page fill the window. */
    dt {
        float: left;
        clear: left;
        margin-right: 5px;
        font-weight: bold;
        }
    dd {
        margin-left: 0px;
        }
    h5 { font-size: 1.2em; text-align: left;}
    .top-info-window {
        padding: 5px;
        background: #eee;
    }
    .gm-style-iw {
  width: 300px; 
  min-height: 150px;
}
    .gm-style-iw {padding: 0; margin: 0; border: 1px solid grey; background: #eee;}
    .infowin { background: yellow;}
</style>