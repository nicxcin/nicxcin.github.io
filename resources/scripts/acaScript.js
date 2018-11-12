var h1 = `

<style>
	#nav {
		position: absolute;
		top: 0;
		left: 20px;
		z-index: 1000;
	}

	#nav #title {
		font-size: 26px;
		font-weight: 300;
	}

	#nav .page {
		margin-bottom: 10px;
		margin-top: 10px;
	}

	#nav .menu {
		list-style: none;
	}

	#nav .page a {
		margin-left: 18px;
		text-decoration: none;
	}

	#nav .toggle {
		font-stretch: 140%;
		margin-right: -18px;
		cursor: pointer; cursor: hand;
	}
            
            
        </style>

<div id="nav">
        <h1 id="title">GeoSlam Academy</h1>
        
        <ul id="pages" class="menu">
            <li class="page"> 
                <a href="#" >About GeoSLAM Academy </a>
            </li>
            
            <li class="page parent">
                <span class="toggle"> <i class="fas fa-chevron-up"></i> </span>  
                <a href="#" >Hardware </a>
                
                <ul class="submenu menu">
                    <li class="page"><a href="#" >REVO Standard </a></li>
                    <li class="page"><a href="#" >REVO Real-Time</a></li>
                    <li class="page parent">
                        <span class="toggle"> <i class="fas fa-chevron-up"></i> </span>
                        <a href="#" >ZEB-CAM</a>
                        
                        <ul class="submenu menu">
                            <li class="page"><a href="#" >ZEB-CAM prior July 2018</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            
            <li class="page parent"> 
                <span class="toggle"> <i class="fas fa-chevron-up"></i> </span>  
                <a href="#" >Survey Preperation </a>
                
                <ul class="submenu menu">
                    <li class="page"><a href="#">Route Planning</a></li>
                    <li class="page"><a href="#">Breaking Down Big Scans</a></li>
                    <li class="page"><a href="#">Loop Closures</a></li>
                    <li class="page"><a href="#">Transitioning Between Environments</a></li>
                    <li class="page"><a href="#">Scanning Corridors and Tunnels</a></li>
                    <li class="page"><a href="#">Main Challenges and Areas of Complication</a></li>
                    <li class="page"><a href="#">Scanning with Colour in Mind - Using the ZEB-CAM</a></li>
                    <li class="page"><a href="#">Capturing On-Trajectory Reference Points</a></li>
                </ul>
            </li>
            
            <li class="page parent"> 
                <span class="toggle"> <i class="fas fa-chevron-up"></i> </span>  
                <a href="#" >Software</a>  
                 
                 <ul class="submenu menu">
                    <li class="page"><a href="#">GeoSlam HUB</a>
                    <li class="page"><a href="#">GeoSLAM DRAW</a></li>
                    <li class="page parent">
                        <span class="toggle"> <i class="fas fa-chevron-up"></i> </span>
                        <a href="#">ContextCapture - for Reality Modelling</a>
                            
                        <ul class="submenu menu">
                            <li class="page"><a href="#" >ContextCapture Editor</a></li>
                        </ul>
                     </li>
                    <li class="page"><a href="#">ClearEdge Verity - for Construction Verification</a></li>
                    <li class="page"><a href="#">Topcon Magnet Collage</a></li>
                </ul>
            </li>
            
            <li class="page"><a href="#" >GeoSLAM Academy Webinars</a></li>
            <li class="page"><a href="#" >What is SLAM?</a></li>
            <li class="page"><a href="#" >Demo Datasets</a></li>
            
            <li class="page parent"> 
                <span class="toggle"> <i class="fas fa-chevron-up"></i> </span>  
                <a href="#" >Issue Resolution</a>
                
                <ul class="submenu menu">
                    <li class="page"><a href="#">How to change the time on the ZEB-REVO Datalogger</a></li>
                    <li class="page"><a href="#">How to remove and replace GeoSLAM Draw License file</a></li>
                    <li class="page"><a href="#">How to use the ZEB Uploader to upload and flag data sets</a></li>
                </ul>
            </li>
            
            <li class="page"> 
                <a href="#" >Contact Us </a>
            </li>
        </ul>
    </div>`

console.log("Form Script Loaded");

function create() {
	jQuery("body").append(h1);
}


jQuery(function() {
    create();
    
    jQuery( ".submenu" ).toggle();
    
    jQuery( ".toggle" ).click(function() {
        console.log("Click");
        jQuery( this ).children().toggleClass('fa-chevron-up');
        jQuery( this ).children().toggleClass('fa-chevron-down');
        jQuery( this ).next().next( ".submenu" ).slideToggle();
    });
});
