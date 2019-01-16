window.addEventListener("load", populateEditFields);

let editForm = document.getElementById('editForm')

function populateEditFields(event){
    event.preventDefault();

    let location = document.getElementById('location');
    let comment = document.getElementById('comment');
    let status = document.getElementById('status');

    location.innerText = localStorage.getItem('location');
    comment.innerText = localStorage.getItem('comment');
    status.placeholder = localStorage.getItem('status');
    
}

editForm.addEventListener('submit', editFields);

function editFields(event){
    event.preventDefault();

    let id = localStorage.getItem('id')
    let token = localStorage.getItem('token') 
    let bearer = 'Bearer '+ token;

    let statusValue = document.getElementById('status').value;

    fetch(`https://ireporter-valerie.herokuapp.com/api/v2/incidents/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': bearer,
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                    'mode':'cors'
                },
                body: JSON.stringify({
                    status: statusValue
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
