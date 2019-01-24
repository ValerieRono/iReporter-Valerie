// create incident fetch method
document.getElementById('incidentForm').addEventListener('submit', createIntervention)

function createIntervention(event){
    event.preventDefault();

    let location2 = document.getElementById('add_location2').value;
    let images2 = document.getElementById('imagesIntervention').value;
    let videos2 = document.getElementById('videosIntervention').value;
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
	                images: images2,
	                videos: videos2,
                    comment: comment2
                })
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })       
}