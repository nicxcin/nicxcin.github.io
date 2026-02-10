import { DB } from '/webmap/js/DB.js';	
import { Router } from '/webmap/js/Router.js';

export const Ride_Modal = {
	hide: function() {
	},
	show: function() {

		const myModal = new bootstrap.Modal(document.getElementById('create_ride_modal'));
		myModal.show();

		document.getElementById('rideName').value = getDate()
	},
	load: async function() {
		return inject_modal().then(() => {
			init();
		});
	}
};


function getDate() {
	const now = new Date();

	const formattedDate = new Intl.DateTimeFormat('en-GB', {
	  weekday: 'long',
	  day: 'numeric',
	  month: 'short',
	  year: 'numeric'
	}).format(now);

	return formattedDate
}

async function inject_modal() {
	try {
		const response = await fetch('/webmap/html/modal/ride_modal.html');
		const html = await response.text();
		
		// Inject at the end of the body
		document.body.insertAdjacentHTML('beforeend', html);

	} catch (err) {
		console.error('Error loading modal:', err);
	}
}


function init() {
	const myForm = document.getElementById('create_ride_modal');

	myForm.addEventListener('submit', function(event) {
		// STOP the page from reloading
		event.preventDefault();



		const rideName =  document.getElementById('rideName').value;
		const shiftType = document.getElementById('shiftType').value;
		const shiftCity = document.getElementById('shiftCity').value;


		

		const ride = DB.new_ride(rideName, shiftType, city)	

		
		Router.set_ride(ride.id)

	});
}

