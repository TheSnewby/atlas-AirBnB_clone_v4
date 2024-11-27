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
