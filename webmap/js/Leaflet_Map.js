import { Ui } from './Ui.js';	
import { DB } from './DB.js';	
import { Router } from './Router.js';


export const Leaflet_Map = {
	load: function() {
		_load()
	},
	render_pkg_markers(ride) {
		_render_pkg_markers(ride)
	}
};


const pkg_markers = L.featureGroup();


const map = L.map('map').setView([50.833376, 5.663634], 13);
pkg_markers.addTo(map);


var userIcon = L.divIcon({
	html: '<span style="font-size: 24px;">🧿</span>',
	className: 'custom-div-icon', // Use this to remove default Leaflet styling
	iconSize: [30, 30],
	iconAnchor: [15, 30],
});

var pkgIcon = L.divIcon({
	html: '<span class="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle" style="width: 33px; height: 33px; font-size: 24px;">📦</span>',
	className: 'custom-div-icon', // Use this to remove default Leaflet styling
	iconSize: [30, 30],
	iconAnchor: [15, 30],
});


var apoIcon = L.divIcon({
	html: '<span class="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle" style="width: 33px; height: 33px; font-size: 24px;">🏥</span>',
	className: 'custom-div-icon', // Use this to remove default Leaflet styling
	iconSize: [30, 30],
	iconAnchor: [15, 30],
});

function _load() {

	

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		// attribution: '© OpenStreetMap contributors'
	}).addTo(map);


	document.getElementById('locate-btn').addEventListener('click', function(event) {
		console.log('Button was clicked!');


		locateUser()
	});
	

	map.on('locationfound', function(e) {
		const { lat, lng } = e.latlng;

		localStorage.setItem('user-lat', lat);
		localStorage.setItem('user-lng', lng);

		

		// Add a marker at the user's location
		L.marker(e.latlng, {icon: userIcon}).addTo(map);

		// Add a circle to show the accuracy area
		// L.circle(e.latlng, radius).addTo(map);
	});

	map.on('locationerror', function(e) {
		alert("Location access denied or unavailable.");
	});

	pkg_markers.on('click', function(e) {
		// 'e.layer' is the specific marker that was clicked
		const pkg_data = e.layer.options; 
		
		
		
		// Call your custom function
		// handleMarkerSelection(data.id);

		markerClicked(pkg_data)
	});

	document.addEventListener('ride_updated', (event) => {
		const ride_id = event.detail.ride_id

		_render_pkg_markers(DB.load_ride(ride_id))
	});
}



function createDynamicIcon(label) {
	
	return L.divIcon({
		className: 'custom-marker', // Remove default leaflet styles
		html: `
			<div class="marker-wrapper ${activeClass}" style="background-color: ${color};">
				<span class="marker-label">${label}</span>
				<div class="marker-pin"></div>
			</div>
		`,
		iconSize: [40, 40],
		iconAnchor: [20, 40]
	});
}



/**
 * Function to convert an address to a pin
 * @param {string} address - The full street address
 * @param {string} popupText - What the pin says when clicked
 */
async function addAddressPin(address) {
	const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
	
	try {
		const response = await fetch(url);
		const data = await response.json();
		
		if (data.length > 0) {
			const { lat, lon } = data[0];
			L.marker([lat, lon], { id: 'pizza-shop', address:address}).addTo(locationGroup);
		} else {
			console.error("Address not found:", address);
		}
	} catch (error) {
		console.error("Geocoding error:", error);
	}
}

// 3. Add your addresses here!
// 
// addAddressPin("Times Square, NY", "<b>Retail Store</b><br>Open 24/7.");


function locateUser() {
	map.locate({setView: true, maxZoom: 16});
}

// Event listener for when the location is successfully found



function centerUser() {
	const cachedLat = localStorage.getItem('user-lat');
	const cachedLng = localStorage.getItem('user-lng');
	map.setView([cachedLat, cachedLng], 13);

}




function markerClicked(pkg_marker) {

	map.setView([pkg_marker.lat, pkg_marker.lon]);
	Ui.show_pkg_info_bar(pkg_marker.id);
	Router.set_map_pkg(pkg_marker.id);
}


function addPackagesMarker(pkg) {
	
	L.marker([pkg.lat, pkg.lon], {...{icon: pkgIcon}, ...pkg}).addTo(pkg_markers);
}


function _clear_pkg_markers() {
	pkg_markers.clearLayers();
}

function _render_pkg_markers(ride) {

	_clear_pkg_markers()

	Object.entries(ride.packages).forEach(([key, value]) => {
		addPackagesMarker(value);
	});

}