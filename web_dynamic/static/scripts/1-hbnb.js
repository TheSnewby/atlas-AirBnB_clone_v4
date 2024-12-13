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

// Amenity filter logic
$('button').click(function () {
    const checkedAmenities = [];
    $('input[type="checkbox"]:checked').each(function () {
        checkedAmenities.push($(this).data('id'));
    });

    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ amenities: checkedAmenities }),
        success: function (response) {
            $('section.places').empty(); // Clear previous places
            // Add new places
            for (const place of response) {
                const article = `
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">
              ${place.description} 
            </div>
          </article>`;
                $('section.places').append(article);
            }
        },
        error: function (error) {
            console.error('Error fetching places:', error);
        }
    });
});
$('input[type="checkbox"]').change(function () {
    const selectedAmenities = [];
    $('input[type="checkbox"]:checked').each(function () {
        selectedAmenities.push($(this).data('name'));

    });

    // Update the displayed amenities
    const amenitiesContainer = $('div.amenities h4');
    amenitiesContainer.empty();

    if (selectedAmenities.length > 0) {
        amenitiesContainer.text(selectedAmenities.join(', '));
    } else {
        amenitiesContainer.text(''); // Reset to default if none selected
    }

});
