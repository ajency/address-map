# address-map
Maps an address to a google map location giving you the latitude & longitude of the same. Also does a reverse mapping when you drag the map marker to a different location. When the marker is dragged to another point, that location's address is set to the address input and the lat lng values are updated.

### Dependency
jquery<br>
google maps api with key

### Useage
Very simple to use. Just follow demo.html. <br>
Gives you an area to enter your address and a map onto which it is plotted when you finish typing the address. <br>
You get the latitude & longitude in hidden fields which have class .lat and .lng <br>
If you already had the lat lng fields prepopulated, the map is set to that location.

### Initialization
$('.address-section').addressMap()
