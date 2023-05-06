const selectedAmenities = {};

const checkApiStatus = async () => {
  try {
    const response = await fetch('http://0.0.0.0:5001/api/v1/status');
    const { status } = response;
    const data = await response.json();
    if (status === 200) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    } else {
      if ($('div#api_status').hasClass('available')) {
        $('div#api_status').removeClass('available');
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const handleAmenityChange = (e) => {
  if (e.target.checked) {
    if (!selectedAmenities.hasOwnProperty(e.target.getAttribute('data-name'))) {
      selectedAmenities[e.target.getAttribute('data-name')] = e.target.getAttribute('data-id');
    }
  } else {
    if (selectedAmenities.hasOwnProperty(e.target.getAttribute('data-name'))) {
      delete selectedAmenities[e.target.getAttribute('data-name')];
    }
  }
  if (Object.keys(selectedAmenities).length > 0) {
    $('.amenities h4').text(Object.keys(selectedAmenities).join(', '));
  } else {
    $('.amenities h4').html('&nbsp;');
  }
};

const renderPlaces = async () => {
  try {
    const response = await fetch('http://0.0.0.0:5001/api/v1/places_search/', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { status } = response;
    const data = await response.json();
    if (status === 200) {
      data.forEach((place) => {
        $('section.places').append(`
          <article>
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
          </article>
        `);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

$(document).ready(function () {
  checkApiStatus();

  $('.amenities input').each(function () {
    $(this).on('change', handleAmenityChange);
  });

  renderPlaces();
});
