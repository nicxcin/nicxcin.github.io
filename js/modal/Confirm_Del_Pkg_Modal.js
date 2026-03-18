import { DB } from '/js/DB.js';


export const Confirm_Del_Pkg_Modal = {
	load: async function() {
		return _inject_modal().then(() => {
			// init();
		});
	},
	bindTrigger: function(element, ride_id, pkg_id) {

		if (!element) return;
		
		element.addEventListener('click', () => {
			_show(ride_id, pkg_id)
		});
	},

	target_ride: '',
	target_pkg: '',

	set_target: function(ride_id, pkg_id) {
		self.target_ride = ride_id
		self.target_pkg = pkg_id
	}
};


function _show(ride_id, package_id) {

	const modal = new bootstrap.Modal(document.getElementById('del_pkg_modal'));
	modal.show();

	document.getElementById('confirmDeleteBtn').addEventListener('click', () => {

		const modalElement = document.getElementById('del_pkg_modal');
		const modalInstance = bootstrap.Modal.getInstance(modalElement);
		
		if (modalInstance) {
			console.log("Hising Del Pkg Modal")
			modalInstance.hide();
		}

		bootstrap.Modal.getInstance(document.getElementById('del_pkg_modal')).hide();

		DB.delete_package(self.target_ride, self.target_pkg)
		
	});

	console.log(document.getElementById('del_pkg_modal'))

	// modal.addEventListener('hidden.bs.modal', function (event) {
	// 	console.log('Modal is fully closed. Now I can refresh the map!');
	// 	document.querySelector('.modal-backdrop').remove();
	// });
	
}


async function _inject_modal() {
	try {
		const response = await fetch('/html/modal/confirm_del_pkg_modal.html');
		const html = await response.text();
		
		// Inject at the end of the body
		document.body.insertAdjacentHTML('beforeend', html);
		this.bindTrigger(document.getElementById('btnDelete'))
		

	} catch (err) {
		console.error('Error loading modal:', err);
	}
}