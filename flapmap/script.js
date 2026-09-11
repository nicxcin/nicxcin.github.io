import { Pkg_Modal } from '/js/modal/Pkg_Modal.js';
import { Ride_Modal } from '/js/modal/Ride_Modal.js';	
import { Leaflet_Map } from '/js/Leaflet_Map.js';	
import { DB } from '/js/DB.js';	
import { Ui } from '/js/Ui.js';
import { Router } from '/js/Router.js';


const mapTab = document.querySelector('#map-tab');

mapTab.addEventListener('shown.bs.tab', function () {
  // If using Leaflet:
//   map.invalidateSize();
  
  // If using Google Maps, it usually handles resize better, 
  // but a trigger might be needed for older versions.
});




Leaflet_Map.load()
await Pkg_Modal.bindTrigger(document.getElementById('add-pkg-btn'));
await Ride_Modal.load()
onLoad()




function onLoad() {

	Router.read_hash()

	const ride_id = Router.get_ride_id()

	if(ride_id == "") {
		Ride_Modal.show()
	} else {

		if(Router.view == "map") {
			new bootstrap.Tab(document.getElementById('map-tab')).show();



			if(Router.map_pkg != "") {
				Ui.show_pkg_info_bar(Router.map_pkg)
			}
		}

		if(Router.view == "packages") {
			new bootstrap.Tab(document.getElementById('packages-tab')).show();
		}
		 
		if(Router.view == "ride") {
			new bootstrap.Tab(document.getElementById('ride-tab')).show();
		}
		


		let ride = DB.load_ride(ride_id)
		Leaflet_Map.render_pkg_markers(ride)

		

		let num_pkgs = Object.values(ride.packages).length
		document.getElementById('num_pkgs').innerHTML = num_pkgs

		Ui.render_package_list(ride)



	}
}


