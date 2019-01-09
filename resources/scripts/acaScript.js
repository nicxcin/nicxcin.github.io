var h1 = `

<style>
	#nav {
		position: absolute;
		top: 0;
		left: 10px;
		z-index: 1000;
	}

	#nav #title {
		font-size: 26px;
		font-weight: 300;
    		margin-top: 0;
	}

	#nav .page {
		margin-bottom: 10px;
		margin-top: 10px;
		max-width: 200px;
		padding-left: 18px;
		position: relative;
	}

	#nav #return a {
		font-size: 80%:
	}

	#nav .menu {
		list-style: none;
		margin-left: 0;
	}

	#nav .page a {
		text-decoration: none;
		color: #f39200;
	}
	
	#nav .page a:hover {
		color: #00954d;
	}


	#nav .toggle {
		font-stretch: 140%;
		margin-right: -18px;
		cursor: pointer; cursor: hand;
		position: absolute;
		left: 0px;
	}
	
	#nav .fas {
		font-family: fontawesome;
    		font-style: initial;
	}
            
            
        </style>

<div id="nav">

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<h6 id="return"><a href="https://geoslam.com/"> Back to Homepage</a></h6>
        <h1 id="title">GeoSlam Academy</h1>
        
        <ul id="pages" class="menu">
            <li class="page"><a href="https://geoslam.com/academy/" >About GeoSLAM Academy </a></li>
            
            <li class="page parent">
                <span class="toggle"> <i class="fas fa-chevron-down"></i> </span>  
                <a href="https://geoslam.com/academy/hardware/" >Hardware </a>
                
                <ul class="submenu menu">
                    <li class="page"><a href="https://geoslam.com/academy/hardware/revo-standard-system/" >REVO Standard </a></li>
                    <li class="page"><a href="https://geoslam.com/academy/hardware/revo-real-time-system/" >REVO Real-Time</a></li>
                    <li class="page parent">
                        <span class="toggle"> <i class="fas fa-chevron-down"></i> </span>
                        <a href="https://geoslam.com/academy/hardware/zeb-cam/" >ZEB-CAM</a>
                        
                        <ul class="submenu menu">
                            <li class="page"><a href="https://geoslam.com/academy/hardware/zeb-cam/zeb-cam-pre-july-2018/" >ZEB-CAM prior July 2018</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            
            <li class="page parent"> 
                <span class="toggle"> <i class="fas fa-chevron-down"></i> </span>  
                <a href="https://geoslam.com/academy/survey-preparation/" >Survey Preperation </a>
                
                <ul class="submenu menu">
                    <li class="page"><a href="https://geoslam.com/academy/survey-preparation/route-planning/">Route Planning</a></li>
                    <li class="page"><a href="https://geoslam.com/academy/survey-preparation/breaking-down-big-scans/">Breaking Down Big Scans</a></li>
                    <li class="page"><a href="https://geoslam.com/academy/survey-preparation/loop-closures/">Loop Closures</a></li>
                    <li class="page"><a href="https://geoslam.com/academy/survey-preparation/transitioning-between-environments/">Transitioning Between Environments</a></li>
                    <li class="page"><a href="https://geoslam.com/academy/survey-preparation/scanning-corridors-and-tunnels/">Scanning Corridors and Tunnels</a></li>
                    <li class="page"><a href="https://geoslam.com/academy/survey-preparation/main-challenges-and-areas-of-complication/">Main Challenges and Areas of Complication</a></li>
                    <li class="page"><a href="https://geoslam.com/academy/survey-preparation/scanning-with-colour-in-mind-using-the-zeb-cam/">Scanning with Colour in Mind - Using the ZEB-CAM</a></li>
                    <li class="page"><a href="https://geoslam.com/academy/survey-preparation/capturing-on-trajectory-reference-points/">Capturing On-Trajectory Reference Points</a></li>
                </ul>
            </li>
            
            <li class="page parent"> 
                <span class="toggle"> <i class="fas fa-chevron-down"></i> </span>  
                <a href="https://geoslam.com/academy/software/" >Software</a>  
                 
                 <ul class="submenu menu">
                    <li class="page"><a href="https://geoslam.com/academy/software/geoslam-hub/">GeoSlam HUB</a>
                    <li class="page"><a href="https://geoslam.com/academy/software/geoslam-draw/">GeoSLAM DRAW</a></li>
                    <li class="page parent">
                        <span class="toggle"> <i class="fas fa-chevron-down"></i> </span>
                        <a href="https://geoslam.com/academy/software/contextcapture/">ContextCapture - for Reality Modelling</a>
                            
                        <ul class="submenu menu">
                            <li class="page"><a href="https://geoslam.com/academy/software/contextcapture/contextcapture-editor/" >ContextCapture Editor</a></li>
                        </ul>
                     </li>
                    <li class="page"><a href="#">ClearEdge Verity - for Construction Verification</a></li>
                    <li class="page"><a href="https://geoslam.com/academy/software/topcon-magnet-collage/">Topcon Magnet Collage</a></li>
                </ul>
            </li>
            
            <li class="page"><a href="https://geoslam.com/academy/what-is-slam/" >What is SLAM?</a></li>
            <li class="page"><a href="https://geoslam.com/academy/demo-datasets/" >Demo Datasets</a></li>
            
            <li class="page parent"> 
                <span class="toggle"> <i class="fas fa-chevron-down"></i> </span>  
                <a href="https://geoslam.com/academy/issue-resolution/" >Issue Resolution</a>
                
                <ul class="submenu menu">
                    <li class="page"><a href="https://geoslam.com/academy/issue-resolution/how-to-change-the-time-on-the-zeb-revo-datalogger/">How to change the time on the ZEB-REVO Datalogger</a></li>
                    <li class="page"><a href="https://geoslam.com/academy/issue-resolution/how-to-remove-and-replace-geoslam-draw-license-file/">How to remove and replace GeoSLAM Draw License file</a></li>
                    <li class="page"><a href="https://geoslam.com/academy/issue-resolution/how-to-use-the-zeb-uploader-to-upload-and-flag-data-sets/">How to use the ZEB Uploader to upload and flag data sets</a></li>
                </ul>
            </li>
            
            <li class="page"> 
                <a href="https://geoslam.com/academy/contact-us/" >Contact Us </a>
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
