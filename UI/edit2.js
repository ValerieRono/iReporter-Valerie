window.addEventListener("load", populateEditFields);

let editForm = document.getElementById('editForm')
let id = localStorage.getItem('id')
let token = localStorage.getItem('token') 
let bearer = 'Bearer '+ token;

function populateEditFields(event){
    event.preventDefault();

    let location = document.getElementById('add_location3');
    let comment = document.getElementById('redflag');

    fetch(`https://ireporter-valerie.herokuapp.com/api/v2/incidents/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': bearer,
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'mode':'cors'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        let post = data['data'][0]['incidents']
        location.placeholder = post.location
        comment.placeholder = post.comment
    })
    
}

editForm.addEventListener('submit', editFields);

function editFields(event){
    event.preventDefault();

    let locationValue = document.getElementById('add_location3').value;
    console.log(locationValue);
    let commentValue = document.getElementById('redflag').value;
    

    fetch(`https://ireporter-valerie.herokuapp.com/api/v2/incidents/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': bearer,
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                    'mode':'cors'
                },
                body: JSON.stringify({
                    location: locationValue,
                    comment: commentValue,
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.status === 200){
                    console.log(data)
                    window.alert(JSON.stringify(data['data'][0]['message']))
                    window.location.replace('profile.html')
                } else {
                    console.log(data)
                    window.alert(JSON.stringify(data['message']))
                    window.location.replace('profile.html')
                }
                
            })
}

function addLocation3() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        editLocation.value = "Geolocation is not supported by this browser.";
    }
}
    
function showPosition(position) {
    editLocation.value = position.coords.latitude +
        ", " + position.coords.longitude;
}

let editLocation = document.getElementById('add_location3');
    
editLocation.addEventListener("click", addLocation3, false);