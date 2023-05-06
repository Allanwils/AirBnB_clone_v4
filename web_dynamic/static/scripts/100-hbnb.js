const selectedStatesOrCities = {};

$(document).ready(function () {
  $.get('http://0.0.0.0:5001/api/v1/status', function (res, status) {
    if (status === 'success') {
      if (res.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    } else {
      if ($('div#api_status').hasClass('available')) {
        $('div#api_status').removeClass('available');
      }
    }
  });

  $('.locations input[type="checkbox"]').each(function () {
    $(this).bind('change', function (e) {
      if (e.target.checked) {
        selectedStatesOrCities[e.target.getAttribute('data-id')] = e.target.getAttribute('data-name');
      } else {
        delete selectedStatesOrCities[e.target.getAttribute('data-id')];
      }
      if (Object.keys(selectedStatesOrCities).length > 0) {
        const locationsList = Object.values(selectedStatesOrCities).join(', ');
        $('.locations h4').text(locationsList);
      } else {
        $('.locations h4').html('&nbsp;');
      }
    });
  });

  function getPlaces (data = {}) {
    /* To render all Places */
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data, status) {
        if (status === 'success') {
          $('section.places').html('');
          data.forEach((place) => $('section.places').append(`<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guests</div>
            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
          </div>
          <div class="user">
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`));
        }
      }
    });
  }

  getPlaces();

  $('.filters button').click(function () {
    const amenitiesList = Object.values(selectedAmenities);
    const statesOrCitiesList = Object.keys(selectedStatesOrCities);
    const data = {};
    if (amenitiesList.length > 0) {
      data.amenities = amenitiesList;
    }
    if (statesOrCitiesList.length > 0) {
      data.states = statesOrCitiesList;
    }
    getPlaces(data);
  });
});
