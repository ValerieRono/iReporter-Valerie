// create incident fetch method
let user2 = document.getElementById('user_name').innerText;
document.getElementById('incidentForm').addEventListener('submit', createIntervention)

let files2;
let img2Url, vid2Url;
function handleFileSelect2(event){
    var files2 = event.target.files;
    // loop through the FileList and render the images as thumbnails
    for (var i=0, f; f = files2[i]; i++){
        var reader2 = new FileReader();
        
        // img.src = URL.createObjectURL(this.files[0]);

        // capture file information
        reader2.onload = (function(theInterventionFile){
            return function(e){
                var span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theInterventionFile.name), '"/>'].join('');
                var x2 = document.getElementById(event.target.id).nextElementSibling;
                x2.insertBefore(span, null);
                console.log(theInterventionFile)
                // create a child directory called images, and place the file inside this directory
                const uploadTask2 = storageRef.child(`${user}/${theInterventionFile.name}`).put(theInterventionFile); 
                uploadTask2.on('state_changed', (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                }, (error) => {
                    // Handle unsuccessful uploads
                    console.log(error);
                }, () => {
                    // Do something once upload is complete
                    console.log('success');
                    storageRef.child(`${user}/${theInterventionFile.name}`).getDownloadURL().then(function(url){
                        if (event.target.id == 'imagesIntervention'){
                            img2Url = url;
                        } else if (event.target.id == 'videosIntervention'){
                            vid2Url = url;
                        }
                    });
                });
            }
        })(f);

        reader2.readAsDataURL(f);
      }
    };

document.getElementById('imagesIntervention').addEventListener('change', handleFileSelect2, false);
document.getElementById('videosIntervention').addEventListener('change', handleFileSelect2, false);

function createIntervention(event){
    event.preventDefault();

    let location2 = document.getElementById('add_location2').value;
    let comment2 = document.getElementById('intervention').value;    

    fetch('https://ireporter-valerie.herokuapp.com/api/v2/incidents', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Authorization': bearer,
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                    'mode':'cors'
                },
                body: JSON.stringify({
                    type_of_incident: "Intervention",
	                location: location2,
	                images: img2Url,
	                videos: vid2Url,
                    comment: comment2
                })
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })       
}

var intervention = document.getElementById("add_location2");

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
