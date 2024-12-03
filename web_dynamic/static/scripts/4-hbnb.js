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
  });
