let username = document.getElementById('user_name');
username.innerText = localStorage.getItem('username');

let token = localStorage.getItem('token') 
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
                console.log(data['data'][0]['incidents'])
                let incidents = '<h2>INCIDENTS</h2>';
                data['data'][0]['incidents'].forEach(function(post){
                    incidents += 
                    `<div id="individual_record">
                     <div class="record_type">${post.type_of_incident}</div>
                     <div class="location_stamp">location: ${post.location}</div>
                     <div class="intervention_label">status: ${post.status}</div>
                     <div class="comment"><p>comment:<br>${post.comment}</p></div>
                     <button class="edit_record_btn" id=${post.id}>Edit</button>
                     <button class="delete_record_btn" id=${post.id}><i class="fa fa-trash"></i>Delete</button> 
                     </div>
                     `
                });
                document.getElementById('past_records').innerHTML = incidents;
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
    redFlag.value = position.coords.latitude +
    ", " + position.coords.longitude;
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
    intervention.value = position.coords.latitude +
    ", " + position.coords.longitude;
}

intervention.addEventListener("click", addLocation2, false);