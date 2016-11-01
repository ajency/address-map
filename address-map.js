(function() {
  var delay, doneTypingInterval, geocodeAddress, map, marker, typingTimer;

  marker = null;

  map = null;

  typingTimer = null;

  doneTypingInterval = 2000;

  delay = (function() {
    var timer;
    timer = 0;
    return function(callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  $.fn.addressMap = function(opts) {
    var $address, ele, geocoder, lat, latlng, lng, options;
    ele = $(this);
    lat = $(ele).find('.lat').val();
    lng = $(ele).find('.lng').val();
    if (!lat) {
      lat = 19.0759837;
    }
    if (!lng) {
      lng = 72.87765590000004;
    }
    latlng = new google.maps.LatLng(lat, lng);
    options = {
      zoom: 6,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map($(ele).find('.map')[0], options);
    geocoder = new google.maps.Geocoder();
    marker = new google.maps.Marker({
      map: map,
      draggable: true,
      position: latlng
    });
    $address = $(ele).find('.address');
    $address.on('keyup', function(event) {
      return delay(function() {
        return setTimeout(function() {
          return geocodeAddress(geocoder, map, ele);
        }, doneTypingInterval);
      });
    });
    return google.maps.event.addListener(marker, 'dragend', function() {
      return geocoder.geocode({
        'latLng': marker.getPosition()
      }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results.length) {
            $(ele).find('.address').val(results[0].formatted_address);
            $(ele).find('.lat').val(results[0].geometry.location.lat());
            return $(ele).find('.lng').val(results[0].geometry.location.lng());
          }
        }
      });
    });
  };

  geocodeAddress = function(geocoder, resultsMap, ele) {
    var address;
    address = $(ele).find('.address').val();
    return geocoder.geocode({
      'address': address
    }, function(results, status) {
      var lat, lng, location;
      if (results.length) {
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        location = new google.maps.LatLng(lat, lng);
        marker.setPosition(location);
        map.setCenter(location);
        $(ele).find('.lat').val(lat);
        return $(ele).find('.lng').val(lng);
      }
    });
  };

  $.initAddressMap = function() {
    return $('.address-section').addressMap();
  };

}).call(this);
