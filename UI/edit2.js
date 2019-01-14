window.addEventListener("load", populateEditFields);

let editForm = document.getElementById('editForm')

function populateEditFields(event){
    event.preventDefault();

    let location = document.getElementById('add_location3');
    let comment = document.getElementById('redflag');

    location.placeholder = sessionStorage.getItem('location');
    comment.placeholder = sessionStorage.getItem('comment');
}

editForm.addEventListener('submit', editFields);

function editFields(event){
    event.preventDefault();

    let id = sessionStorage.getItem('id')
    let token = sessionStorage.getItem('token') 
    let bearer = 'Bearer '+ token;

    let locationValue = document.getElementById('add_location3').value;
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
                    comment: commentValue
                })
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                // if(data.status === 201){
                //     console.log(data)
                // }else{
                //     console.log(data)
                //     window.alert(JSON.stringify(data['message']))
                // }
            })
}