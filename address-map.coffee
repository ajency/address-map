marker = null
map= null
typingTimer = null
doneTypingInterval = 2000

delay = do ->
  timer = 0
  (callback, ms) ->
    clearTimeout timer
    timer = setTimeout(callback, ms)
    return


$.fn.addressMap= (opts)->
	
	ele = $(this)

	lat=$(ele).find('.lat').val()
	lng=$(ele).find('.lng').val()

	lat = 19.0759837 if not lat
	lng = 72.87765590000004 if not lng

	latlng = new google.maps.LatLng(lat,lng);
	options = 
		zoom: 6,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	map = new google.maps.Map($(ele).find('.map')[0], options);
	geocoder = new google.maps.Geocoder();

	marker = new google.maps.Marker
		map: map,
		draggable: true,
		position: latlng

	$address = $(ele).find('.address')
	
	$address.on 'keyup', (event)->
		delay -> setTimeout -> 
						geocodeAddress(geocoder, map, ele)
					, doneTypingInterval

	google.maps.event.addListener marker, 'dragend', ->
			geocoder.geocode {'latLng': marker.getPosition()}, (results, status)->
				if (status == google.maps.GeocoderStatus.OK) 
					if results.length 
						$(ele).find('.address').val results[0].formatted_address 
						$(ele).find('.lat').val results[0].geometry.location.lat()
						$(ele).find('.lng').val results[0].geometry.location.lng()

geocodeAddress = (geocoder, resultsMap, ele)->
	address = $(ele).find('.address').val();
	geocoder.geocode {'address': address}, (results, status)-> 
		if results.length 
			lat= results[0].geometry.location.lat()
			lng= results[0].geometry.location.lng()
			location = new google.maps.LatLng(lat, lng);
			marker.setPosition(location);
			map.setCenter(location);
			$(ele).find('.lat').val lat
			$(ele).find('.lng').val lng
			
$.initAddressMap =->
	$('.address-section').addressMap()