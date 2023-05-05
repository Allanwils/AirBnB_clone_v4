$(document).ready(function () {
  let amenityDict = {};

  // Update amenityDict when checkbox is changed
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenityDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityDict[$(this).data('id')];
    }

    // Update the amenities header with the selected amenities
    const amenityNames = Object.values(amenityDict).join(', ');
    $('.amenities h4').text(amenityNames);
  });

  // Check API status and update the page accordingly
  $.getJSON('http://127.0.0.1:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
