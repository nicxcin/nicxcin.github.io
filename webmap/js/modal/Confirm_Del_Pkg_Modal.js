import { DB } from '/webmap/js/DB.js';


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
	}
};



function _show(ride_id, package_id) {

	const modal = new bootstrap.Modal(document.getElementById('del_pkg_modal'));
	

	document.getElementById('confirmDeleteBtn').addEventListener('click', () => {

		const modalElement = document.getElementById('del_pkg_modal');
		const modalInstance = bootstrap.Modal.getInstance(modalElement);
		
		if (modalInstance) {
			console.log("Hising Del Pkg Modal")
			modalInstance.hide();
		}

		bootstrap.Modal.getInstance(document.getElementById('del_pkg_modal')).hide();

		DB.delete_package(ride_id, package_id)
		
	});

	modal.addEventListener('hidden.bs.modal', function (event) {
		console.log('Modal is fully closed. Now I can refresh the map!');
		document.querySelector('.modal-backdrop').remove();
	});

	modal.show();
}


async function _inject_modal() {
	try {
		const response = await fetch('/webmap/html/modal/confirm_del_pkg_modal.html');
		const html = await response.text();
		
		// Inject at the end of the body
		document.body.insertAdjacentHTML('beforeend', html);
		

	} catch (err) {
		console.error('Error loading modal:', err);
	}
}