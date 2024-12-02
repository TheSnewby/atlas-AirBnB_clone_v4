$(document).ready(function () {
    // API status check
    $.get('http://0.0.0.0:5001/api/v1/status/', (data, status) => {
        if (status === 'OK') {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    });

    // Fetch initial places
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (response) {
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

    // Amenity filter logic just moved from previous version
    let amens = {};
    $('div.amenities input[type="checkbox"]').change(function () {
        if ($(this).is(":checked")) {
            amens[$(this).data('id')] = $(this).data('name');
        } else {
            delete amens[$(this).data('id')];
        }
        if (Object.keys(amens).length > 0) {
            $('div.amenities h4').text(Object.values(amens).join(', '));
        } else {
            $('div.amenities h4').text('');
        }
    });
});
//merged your two separate $(function(){ ... }); blocks into a single $(document).ready(function(){ 
//minor fix: changed object.key(amens) to object.keys(amens).length
//Also just rearranged for readibility. 