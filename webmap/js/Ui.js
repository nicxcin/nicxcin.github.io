import { Confirm_Del_Pkg_Modal } from '/webmap/js/modal/Confirm_Del_Pkg_Modal.js';	
import { Router } from '/webmap/js/Router.js';
import { DB } from '/webmap/js/DB.js';

await Confirm_Del_Pkg_Modal.load()
document.addEventListener('package_deleted', (event) => {
	_hide_pkg_info_bar()	
});



document.addEventListener('shown.bs.tab', function (event) {
    const tab_level = event.target.getAttribute('data-level');
	const tab_target = event.target.getAttribute('data-bs-target').replace('#', '').replace('-pane', '')

	if(tab_level == 0) {
		Router.set_view(tab_target)
	}
});




export const Ui = {
	show_pkg_info_bar: function(package_id) {
		_show_pkg_info_bar(package_id)
	},
	hide_pkg_info_bar: function() {
		_hide_pkg_info_bar()
	},
	show: function() {

		const myModal = new bootstrap.Modal(document.getElementById('create_ride_modal'));
		myModal.show();

		document.getElementById('rideName').value = getDate()
	},
	render_package_list: function(ride) {
		_render_packages_list(ride)
	},
};



function _render_packages_list(ride) {

	let packages = ride.packages

	const listContainer = document.getElementById('packageList');
	const countBadge = document.getElementById('packageCount');
	
	// Clear existing list and update count
	listContainer.innerHTML = '';
	// countBadge.innerText = packages.length;

	Object.entries(packages).forEach(([pkg_id, pkg]) => {

		// Build the Extra Info Icons (Using your dash-logic concepts)
		let iconsHTML = '';
		if (pkg.koelkast) iconsHTML += '<span class="me-2" title="Koelkast">❄️</span>';
		if (pkg.boven)    iconsHTML += '<span class="me-2" title="Boven">👆</span>';
		if (pkg.ophalen)  iconsHTML += '<span class="me-2" title="Ophalen">🔄</span>';

		const item = document.createElement('div');
		item.className = `list-group-item list-group-item-action d-flex justify-content-between align-items-center p-1 ${pkg.delivered ? 'bg-light opacity-75' : ''}`;
		
		item.innerHTML = `
			<div class="ms-2 me-auto text-truncate" onclick="centerMapOnPackage('${pkg_id}')" style="cursor:pointer;">
				<div class="fw-bold text-dark">${pkg.street} ${pkg.housenumber} <span class="small text-muted">${iconsHTML}</span></div>
			</div>
			<div class="d-flex ms-3 align-items-stretch gap-2">
				<button id="btnMaps" class="btn btn-outline-secondary d-flex align-items-center fs-3">
					<span class="d-none d-md-inline me-1">See on Map</span> 📍
				</button>
				<button id="btnMaps" class="btn btn-outline-secondary d-flex align-items-center fs-3">
					<span class="d-none d-md-inline me-1">Mark as Delivered</span> ✅
				</button>
				<button id="btnMaps" class="btn btn-outline-danger d-flex align-items-center fs-3" onclick="deletePackage(${ride.id},${pkg_id})">
					<span class="d-none d-md-inline me-1">Delete</span> 🗑️
				</button>
			</div>
		`;
		listContainer.appendChild(item);
	});
}

function _show_pkg_info_bar(package_id) {

	const ride_id = Router.get_ride_id()
	const pkg = DB.get_pkg(ride_id, package_id)

	if(pkg) {
		const address = pkg.street + " " + pkg.housenumber + " - " + pkg.postcode
		let extraInfo = "";

		const tags = [];

		if (pkg.koelkast) tags.push("Koelkast");
		if (pkg.boven)    tags.push("Boven");
		if (pkg.ophalen)  tags.push("Ophalen");

		extraInfo += tags.join('-');

		document.getElementById('packageInfoBar').classList.remove('d-none');

		document.getElementById('displayAddress').innerHTML = address;
		document.getElementById('displayInfo').innerHTML = extraInfo;
		document.getElementById('displayExtraInfo').innerHTML = pkg.notes;


		Confirm_Del_Pkg_Modal.bindTrigger(document.getElementById('btnDelete'), ride_id, pkg.id)
	} else {
		Router.set_map_pkg("")
	}
	
}

function _hide_pkg_info_bar() {
	document.getElementById('packageInfoBar').classList.add('d-none');
}

