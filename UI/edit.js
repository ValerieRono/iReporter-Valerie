// edit record fetch method
let incidents = document.getElementById('past_records');

incidents.addEventListener("click", function(event) {
	// event.target is the clicked element!
	// If it was a button
	if (event.target.className != 'edit_record_btn') return;

    //let button = event.target.closest('.individual_record');
    event.preventDefault();
    
    fetch(`https://ireporter-valerie.herokuapp.com/api/v2/incidents/${event.target.id}`, {
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
                sessionStorage.setItem('location', post.location)
                sessionStorage.setItem('comment', post.comment)
                sessionStorage.setItem('id', post.id)
                sessionStorage.setItem('status', post.status)

            })
    let isAdmin = sessionStorage.getItem('isAdmin');
    // console.log(isAdmin)
    if ( isAdmin == "true") {
        window.location.replace('editAdmin.html')
    } else {
        window.location.replace('edit.html')
    }
    
})

// console.log(post);

//     

//     let location = document.getElementById('add_location3');
//     let comment = document.getElementById('redflag');
    
            
//     var editRecord = document.getElementById("add_location3");


//     function addLocation3() {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(showPosition);
//         } else { 
//             editRecord.value = "Geolocation is not supported by this browser.";
//         }
//     }

//     function showPosition(position) {
//         editRecord.value = position.coords.latitude +
//             ", " + position.coords.longitude;
//     }

//     editRecord.addEventListener("click", addLocation3, false);