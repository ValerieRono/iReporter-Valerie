// create incident fetch method
let user = document.getElementById('user_name').innerText;
document.getElementById('redFlagForm').addEventListener('submit', createRedflag)

let files;
function handleFileSelect(event){
    var files = event.target.files;
    // loop through the FileList and render the images as thumbnails
    for (var i=0, f; f = files[i]; i++){
        var reader = new FileReader();
        
        // img.src = URL.createObjectURL(this.files[0]);

        // capture file information
        reader.onload = (function(theFile){
            return function(e){
                var span = document.createElement('span');
                span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
                var x = document.getElementById(event.target.id).nextElementSibling;
                x.insertBefore(span, null);
                console.log(theFile)
                // create a child directory called images, and place the file inside this directory
                const uploadTask = storageRef.child(`${user[i]}/${theFile.name}`).put(theFile); 
                uploadTask.on('state_changed', (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                }, (error) => {
                    // Handle unsuccessful uploads
                    console.log(error);
                }, () => {
                    // Do something once upload is complete
                    console.log('success');
                });
            }
        })(f);

        reader.readAsDataURL(f);
      }
    };

      
document.getElementById('images').addEventListener('change', handleFileSelect, false);
document.getElementById('videos').addEventListener('change', handleFileSelect, false);

    
function createRedflag(event){
    event.preventDefault();

    let place = document.getElementById('add_location').value;
    let images = document.getElementById('images').value;
    let videos = document.getElementById('videos').value;
    let comment = document.getElementById('redflag').value;

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
                    type_of_incident: "Redflag",
	                location: place,
	                images: images,
	                videos: videos,
                    comment: comment
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.status === 201){
                    console.log(data)
                }else{
                    console.log(data)
                    window.alert(JSON.stringify(data['message']))
                }
            })
}

var redFlag = document.getElementById("add_location");

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


