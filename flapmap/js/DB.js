
const STORAGE_KEY = 'ride_';



export const DB = {
	new_ride: function(name, shift, city) {
		const new_ride = {
			id: 'ride_' + Date.now().toString(),
			name: name,
			shift: shift,
			city: city,
			packages: {},
		};
		_save_ride(new_ride)
		return new_ride
	},
	load_ride: function(ride_id) {
		return _load_ride(ride_id)
	},
	new_package: function(rideId, formData) {
		_new_package(rideId, formData)
	},
	delete_package: function(ride_id, package_id) {
		_delete_package(ride_id, package_id)
	},
	get_pkg(ride_id, pkg_id) {
		return this.load_ride(ride_id).packages[pkg_id]
		
	}
};

function _delete_package(ride_id, package_id) {
	const ride = _load_ride(ride_id)

	delete ride.packages[package_id]

	document.dispatchEvent( new CustomEvent('package_deleted', { detail: { ride_id: ride.id }} ));
	_save_ride(ride)	
}

// 2. Retrieve all rides
function getAllRides() {
	const data = localStorage.getItem(STORAGE_KEY);
	return data ? JSON.parse(data) : [];
}

function _load_ride(ride_id) {
	return JSON.parse(localStorage.getItem(ride_id));
}

function _new_package(ride_id, pkg_data) {

	let ride = _load_ride(ride_id)

	const pkg_id = pkg_data.street.toLowerCase() + pkg_data.housenumber
	pkg_data['id'] = pkg_id

	if (ride) {
		ride.packages[pkg_id] = pkg_data
	}

	_save_ride(ride)
}

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


function addRide() {
	const myModal = new bootstrap.Modal(document.getElementById('rideModal'));
	myModal.show();

	document.getElementById('rideName').value = getDate()
}


function deleteRides() {
	localStorage.setItem(STORAGE_KEY, []);
}


function deleteAllPackages(ride_id) {
	const ride = loadRide(ride_ride)
}



function _save_ride(ride) {
	localStorage.setItem(ride.id, JSON.stringify(ride));

	document.dispatchEvent( new CustomEvent('ride_updated', { detail: { ride_id: ride.id }} ));


	return ride.id
}




export const selectRide	 = {
	load: function() {
		load_map()
	},
};

// ride_get_packages(ride) {
// 	return Object.entries(ride.packages)
// }

// ride_get_packages(ride_id) {
// 	return Object.entries(db_load_ride(ride_id).packages)
// }

