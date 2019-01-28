window.addEventListener("load", populateEditFields);

let files;
let imgUrl, vidUrl;
function handleFileSelect(event){
    var files = event.target.files;

    // loop through the FileList and render the images as thumbnails
    for (var i=0, f; f = files[i]; i++){
        var reader = new FileReader();

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
                const uploadTask = storageRef.child(`editFiles/${theFile.name}`).put(theFile); 
                uploadTask.on('state_changed', (snapshot) => {

                // Observe state change events such as progress, pause, and resume
                }, (error) => {

                    // Handle unsuccessful uploads
                    console.log(error);
                }, () => {

                    // Do something once upload is complete
                    console.log('success');
                    storageRef.child(`editFiles/${theFile.name}`).getDownloadURL().then(function(url){
                        console.log(event.target.id)
                        if (event.target.id == 'images'){
                            imgUrl = url;
                        } else if (event.target.id == 'videos'){
                            vidUrl = url;
                        }
                    }); 
                });
            }
        })(f);

        reader.readAsDataURL(f);
      }
    };

      
document.getElementById('images').addEventListener('change', handleFileSelect, false);
document.getElementById('videos').addEventListener('change', handleFileSelect, false);


let editForm = document.getElementById('editForm')
let id = localStorage.getItem('id')
let token = localStorage.getItem('token') 
let bearer = 'Bearer '+ token;

function populateEditFields(event){
    event.preventDefault();

    let location = document.getElementById('add_location3');
    let comment = document.getElementById('redflag');
    let images = document.getElementById('previewImages');
    let videos = document.getElementById('previewVideos');

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
        images.innerHTML = `<img src=${post.images} class="images"/>`
        videos.innerHTML = `<video src=${post.videos} class="videos"></video>`
    })
    
}

editForm.addEventListener('submit', editFields);

function editFields(event){
    event.preventDefault();

    let locationValue = document.getElementById('add_location3').value;
    console.log(locationValue);
    let commentValue = document.getElementById('redflag').value;
    console.log(imgUrl);

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
                    images: imgUrl,
                    videos: vidUrl
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