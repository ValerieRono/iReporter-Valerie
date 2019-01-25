// delete record fetch method
let records = document.getElementById('past_records');

records.addEventListener("click", function(event) {
	// event.target is the clicked element!
	// If it was a button
	if (event.target.className != 'delete_record_btn') return;

    //let button = event.target.closest('.individual_record');
    event.preventDefault();

    fetch(`https://ireporter-valerie.herokuapp.com/api/v2/incidents/${event.target.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': bearer,
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                    'mode':'cors'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.status === 200){
                    console.log(data)
                    window.alert(JSON.stringify(data['data'][0]['message']))
                    window.location.replace('profile.html')
                }else{
                    console.log(data)
                    window.alert(JSON.stringify(data['message']))
                }
            })
		
})