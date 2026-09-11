export const Router = {

    is_hash_set: function() {
        const url_hash = window.location.hash
    },


    set_hash: function() {

        let new_url =  "#" + this.ride_id + "." + this.view

        if(this.view == "map") { new_url = new_url + this.map_pkg}

        if(this.view == "packages") { new_url = new_url + this.pkgs_tab}

        window.location.hash = new_url
    },

    read_hash: function() {
        let url_hash = window.location.hash.slice(1).split(".")


        this.ride_id = url_hash[0] || "";
        this.view = url_hash[1]  || "map";

        if(this.view == "map") {this.map_pkg = url_hash[2] || this.map_pkg } //add something here if url_hash[2] is null

        if(this.view == "packages") {this.pkgs_tab = url_hash[2] || this.pkgs_tab}
    },

    toString: function() {
        return "Ride Id: " + this.ride_id + "\nView: " + this.view + "\nMap pkg: " + this.map_pkg + "\npackages tab: " + this.pkgs_tab
    }, 

    set_ride(ride_id) {
        this.ride_id = ride_id
        this.reload()
    },

    reload: function() {
        this.update_url()
        window.location.reload();
    },
    update_url: function() {
        let new_url =  "#" + this.ride_id + "." + this.view

        if(this.view == "map") {
            if(this.map_pkg != "") {
                new_url = new_url + "." + this.map_pkg
            }
        }

        if(this.view == "packages") { new_url = new_url + "." + this.pkgs_tab}

        window.location.hash = new_url
    },

    get_ride_id: function() {
        return this.ride_id
    },

    set_view: function(view) {
        this.view = view
        this.update_url()
    },
    set_map_pkg: function(pkg_id) {
        this.map_pkg = pkg_id
        this.update_url()
    },

    ride_id: "",
    view: "map",
    map_pkg: "",
    pkgs_tab: "active",
}
