// create incident fetch method
document.getElementById('redFlagForm').addEventListener('submit', createRedflag)

let location = document.getElementById('add_location').value;
let images = document.getElementById('images').value;
let videos = document.getElementById('videos').value;
let comment = document.getElementById('redflag').value;

let token = sessionStorage.getItem('token') 
let bearer = 'Bearer '+ token;
    
function createRedflag(event){
    event.preventDefault();

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
	                location: location,
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