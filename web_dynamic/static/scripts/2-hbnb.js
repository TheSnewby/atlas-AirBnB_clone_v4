$(function () {
    let amens = {};  // dictionary to store amenity id-name pairs
  $('div.amenities input[type="checkbox"]').change(function () {
    if ($(this).is(":checked")) {
        amens[$(this).data('id')] = $(this).data('name'); // adds pair to dict
    } else {
        delete amens[$(this).data('id')]; //removes pair from dict
    }
    if (Object.keys(amens) > 0) {
        $('div.amenities h4').text(Object.values(amens).join(', ')); //csv text
    } else {
        $('div.amenities h4').text('');
    }
  });
});

$(function () {
  $.get('http://0.0.0.0:5001/api/v1/status/', (data, status) => {
    if (status === 'OK') {
        $('div#api_status').addClass('available');
    } else {
        $('div$api_status').removeClass('available');
    }
  });
});
