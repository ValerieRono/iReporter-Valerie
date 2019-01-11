

var redFlag = document.getElementById("add_location");
var intervention = document.getElementById("add_location2");

function addLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        redFlag.value = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    redFlag.value = "Latitude: " + position.coords.latitude + 
    " Longitude: " + position.coords.longitude;
}

redFlag.addEventListener("click", addLocation, false);



function addLocation2() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition2);
    } else { 
        intervention.value = "Geolocation is not supported by this browser.";
    }
}

function showPosition2(position) {
    intervention.value = "Latitude: " + position.coords.latitude + 
    " Longitude: " + position.coords.longitude;
}

intervention.addEventListener("click", addLocation2, false);