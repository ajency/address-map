# address-map
Maps an address to a google map location giving you the latitude & longitude of the same. Also does a reverse mapping when you drag the map marker to a different location. When the marker is dragged to another point, that location's address is set to the address input and the lat lng values are updated.

### Dependency
jquery<br>
google maps api with key

### Initialization
    $('.address-section').addressMap() <br>
Note: if you use the callback $.initAddressMap for google api as given below in the js section you dont need to initialize the addressMap plugin. The callback does it for you. 
If you are using this initialization, you can remove the callback.


### Useage
Very simple to use. Just follow demo.html. <br>
Gives you an area to enter your address and a map onto which it is plotted when you finish typing the address. <br>
You get the latitude & longitude in hidden fields which have class .lat and .lng <br>
If you already had the lat lng fields prepopulated, the map is set to that location.

### HTML
    <div class="address-section">
      <textarea class="address" rows=5 >Mumbai India</textarea>
      <input type="hidden" class="lat" />
      <input type="hidden" class="lng" />
      <div class="map"></div>
    </div>
    
### CSS
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      .map {
        width: 100%;
        height: 400px ;
      }
      .address{
        width:100%;
      }
    </style>
    
### JS
    <!-- latest jquery from cdn -->
    <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>

    <!-- our awesome address map plugin -->
    <script src="address-map.js"></script>

    <!-- google maps with your google api key & callback function -->
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY&callback=$.initAddressMap">   
    </script>
    
### note
if you are initializing the plugin yourself using $('.address-section').addressMap() then no need for callback in google maps api
