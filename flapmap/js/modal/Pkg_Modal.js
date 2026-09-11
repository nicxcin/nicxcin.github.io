import { DB } from '/js/DB.js';	
import { Leaflet_Map } from '/js/Leaflet_Map.js';	
import { Router } from '/js/Router.js';

export const Pkg_Modal = {
	hide: function() {
	},
	bindTrigger: async function(element) {

		if (!element) return;
		
		element.addEventListener('click', () => {
			show()
		});

		return inject_modal().then(() => {
			init();
		});
	}
};




function show() {


	// reset form:
	const addressInput = document.getElementById('addressInput');
	addressInput.value = "";

	const resultsList = document.getElementById('resultsList');
	resultsList.innerHTML = "";

	document.getElementById('addPkgForm').reset();
	

	// document.getElementById('modal_close_pkg_modal').disabled = true;

	const myModal = new bootstrap.Modal(document.getElementById('add_pkg_modal'));

	document.getElementById('add_pkg_modal').addEventListener('shown.bs.modal', () => {
	  document.getElementById('addressInput').focus()
	})


	myModal.show();
}


function init() {
	const myForm = document.getElementById('add_pkg_modal');

	

	myForm.addEventListener('submit', function(event) {
		// STOP the page from reloading
		event.preventDefault();

		// 1. Collect the data
		const formData = {
			street: document.getElementById('data_street').value,
			housenumber: document.getElementById('data_housenumber').value,
			postcode:  document.getElementById('postcode').value,
			country: document.getElementById('data_country').value,
			lat: document.getElementById('data_lat').value,
			lon: document.getElementById('data_lon').value,
			koelkast: document.getElementById('koelkast-btn').checked,
			ophalen: document.getElementById('ophalen-btn').checked,
			boven: document.getElementById('boven-btn').checked,
			timePreference: document.querySelector('input[name="btnradio"]:checked')?.id || 'None',
			notes: document.querySelector('textarea').value,
		};

		// 2. Add your custom logic here
		console.log("Form submitted with data:", formData);

		document.getElementById('pkg_submit_btn').disabled = true;

		const ride_id = Router.get_ride_id()

		DB.new_package(ride_id, formData) 
		modal_close_pkg_modal()

		let ride = DB.load_ride(ride_id)
		Leaflet_Map.render_pkg_markers(ride)
	});

	const addressInput = document.getElementById('addressInput');
	const resultsList = document.getElementById('resultsList');

	addressInput.addEventListener('input', function() {
		const ride_id = Router.get_ride_id()
		let ride = DB.load_ride(ride_id)

		const query = this.value + " " + ride['city'];


		if (query.length < 3) {
			resultsList.style.display = 'none';
			return;
		}

		// Call Photon API
		console.log(query)

		fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&lat=50.833376&lon=5.663634&layer=house`)
			.then(response => response.json())
				.then(data => {
					renderResults(data.features);
				});
		});
}


function _select_location(street, housenumber, country, lat, lon, postcode) {
	console.log(street, housenumber, country, lat, lon)

	if (street === undefined || lat === undefined || lon === undefined || housenumber === undefined) {
		console.warn("Required location data is missing!");
		return; // Stop the function here
	}

	console.log("Valid Address")




	const submitBtn = document.getElementById('pkg_submit_btn');
	submitBtn.disabled = false;
	

	const addressInput = document.getElementById('addressInput');
	addressInput.value = street + " " + housenumber + " " + country

	const resultsList = document.getElementById('resultsList');
	resultsList.innerHTML = "";


	document.getElementById('data_housenumber').value = housenumber
	document.getElementById('data_street').value = street
	document.getElementById('data_country').value = country
	document.getElementById('data_lat').value = lat
	document.getElementById('data_lon').value = lon
	document.getElementById('postcode').value = postcode

}




function modal_close_pkg_modal() {
	const modalElement = document.getElementById('add_pkg_modal');
	const modalInstance = bootstrap.Modal.getInstance(modalElement);
	
	if (modalInstance) {
		modalInstance.hide();
	}
}





function renderResults(features) {
	resultsList.innerHTML = '';
	if (features.length === 0) {
		resultsList.style.display = 'none';
		return;
	}

	features.forEach(feature => {


		const { name, city, country, housenumber, street, postcode } = feature.properties;
		const [lon, lat] = feature.geometry.coordinates;
		
		const li = document.createElement('li');
		li.className = 'list-group-item list-group-item-action';
		li.style.cursor = 'pointer';
		li.innerHTML = `<strong>${street || ''} ${housenumber || ''}</strong> <small class="text-muted">${city || ''}  ${postcode || ''}</small>`;
		
		li.onclick = () => _select_location(street, housenumber, country, lat, lon, postcode);
		resultsList.appendChild(li);
	});

	resultsList.style.display = 'block';
}








async function inject_modal() {
	try {
		const response = await fetch('/html/modal/pkg_modal.html');
		const html = await response.text();
		
		// Inject at the end of the body
		document.body.insertAdjacentHTML('beforeend', html);
		

	} catch (err) {
		console.error('Error loading modal:', err);
	}
}


