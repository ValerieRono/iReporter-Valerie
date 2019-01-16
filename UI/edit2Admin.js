window.addEventListener("load", populateEditFields);

let editForm = document.getElementById('editForm')
let id = localStorage.getItem('id')
let token = localStorage.getItem('token') 
let bearer = 'Bearer '+ token;

function populateEditFields(event){
    event.preventDefault();

    let location = document.getElementById('location');
    let comment = document.getElementById('comment');
    let status = document.getElementById('status');

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
            location.innerText = post.location
            comment.innerText = post.comment
            status.placeholder = post.status
        })
    
}

editForm.addEventListener('submit', editFields);

function editFields(event){
    event.preventDefault();

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
            })
}
