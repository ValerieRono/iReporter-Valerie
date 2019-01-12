let username = document.getElementById('user_name');
username.innerText = sessionStorage.getItem('username');

sessionStorage.removeItem('username');

let token = sessionStorage.getItem('token') 
let bearer = 'Bearer '+ token;

// populate user profile page whenever the page loads
window.addEventListener("load", populateProfilePage);

function populateProfilePage(event){
    event.preventDefault();

    fetch('https://ireporter-valerie.herokuapp.com/api/v2/incidents', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': bearer,
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                    'mode':'cors'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                // window.location.replace('profile.html')
                // if(data.status === 201){
                //     console.log(data)
                //     window.location.replace('profile.html')
                // }else{
                //     console.log(data)
                //     window.alert(JSON.stringify(data['message']))
                // }
            })

}



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