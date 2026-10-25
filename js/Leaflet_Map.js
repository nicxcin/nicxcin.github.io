import { Ui } from '/js/Ui.js';	
import { DB } from '/js/DB.js';	
import { Router } from '/js/Router.js';


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
	className: 'custom-div-icon', 
	iconSize: [30, 30],
	iconAnchor: [15, 30],
});

var pkgIcon = L.divIcon({
	html: '<span class="d-inline-flex align-items-center justify-content-center bg-white border border-primary border-3 rounded-circle" style="width: 33px; height: 33px; font-size: 20px;">📦</span>',
	className: 'custom-div-icon', 
	iconSize: [30, 30],
	iconAnchor: [15, 30],
});


var pkgIconSelected = L.divIcon({
	html: '<span class="d-inline-flex align-items-center justify-content-center bg-primary border border-primary border-3 rounded-circle" style="width: 33px; height: 33px; font-size: 20px;">📦</span>',
	className: 'custom-div-icon', 
	iconSize: [30, 30],
	iconAnchor: [15, 30],
});


var pkgIconHighlighted = L.divIcon({
	html: '<span class="d-inline-flex align-items-center justify-content-center bg-white border border-danger border-3 rounded-circle" style="width: 33px; height: 33px; font-size: 20px;">📦</span>',
	className: 'custom-div-icon', 
	iconSize: [30, 30],
	iconAnchor: [15, 30],
});


var apoIcon = L.divIcon({
	html: '<span class="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle" style="width: 33px; height: 33px; font-size: 24px;">🏥</span>',
	className: 'custom-div-icon', 
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

	map.setView([pkg_marker.lat, pkg_marker.lon], 15);
	Ui.show_pkg_info_bar(pkg_marker.id);
	Router.set_map_pkg(pkg_marker.id);


	DB.select_pkg(Router.get_ride_id(), pkg_marker.id)
}


function addPackagesMarker(pkg, icon) {
	
	L.marker([pkg.lat, pkg.lon], {...{icon: icon}, ...pkg}).addTo(pkg_markers);
}


function _clear_pkg_markers() {
	pkg_markers.clearLayers();
}

function _render_pkg_markers(ride) {

	_clear_pkg_markers()

	// Object.entries(ride.packages).forEach(([key, value]) => {
	// 	addPackagesMarker(value);
	// });

	const packages = Object.entries(ride.packages);

	for (let i = 0; i < packages.length; i++) {
		const pkg = packages[i][1];

		let icon_to_use = pkgIcon
		if(pkg.highlighted) {icon_to_use = pkgIconHighlighted;console.log('What')}
		if(pkg.selected) {icon_to_use = pkgIconSelected}

		addPackagesMarker(pkg, icon_to_use);
	}

	// addPackagesMarker(packages[packages.length - 1][1], pkgIconSelected);

	// console.log(packages[packages.length - 1][1])

}


// Create a separate layer group for postcode boundary shapes so you can clear them easily
const postcode_boundaries = L.featureGroup().addTo(map);

async function drawPostcodeBoundary(postalCode, countryCode = 'nl') {
    // Clear previous postcode drawings if desired
    postcode_boundaries.clearLayers();

    // Nominatim structured search endpoint with GeoJSON polygon formatting enabled
    const url = `https://nominatim.openstreetmap.org/search?format=json&postalcode=${encodeURIComponent(postalCode)}&countrycodes=${countryCode}&polygon_geojson=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Look for a result that contains geojson polygon/multipolygon data
        const match = data.find(item => item.geojson && (item.geojson.type === 'Polygon' || item.geojson.type === 'MultiPolygon'));

        if (match) {
            // Use Leaflet's L.geoJSON layer to render the boundary shape onto the map
            const geoJsonLayer = L.geoJSON(match.geojson, {
                style: {
                    color: '#ff7800',      // Outline color
                    weight: 3,         // Outline thickness
                    fillColor: '#ff7800',  // Inside fill color
                    fillOpacity: 0.2   // Transparency of the fill
                }
            });

            // Add it to your boundary feature group and zoom the map to fit it
            geoJsonLayer.addTo(postcode_boundaries);
            map.fitBounds(geoJsonLayer.getBounds());

            console.log(`Successfully drew boundary for postcode: ${postalCode}`);
        } else {
            console.error(`No polygon boundary found for postcode: ${postalCode}`);
            alert(`Could not find a map boundary for postcode ${postalCode}`);
        }
    } catch (error) {
        console.error("Error fetching postcode boundary:", error);
    }
}