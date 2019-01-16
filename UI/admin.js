let username = document.getElementById('user_name');
username.innerText = localStorage.getItem('username');

// localStorage.removeItem('username');

let token = localStorage.getItem('token') 
let bearer = 'Bearer '+ token;

// populate user profile page whenever the page loads
window.addEventListener("load", populateProfilePage);

function populateProfilePage(event){
    event.preventDefault();

    fetch('https://ireporter-valerie.herokuapp.com/api/v2/incidents', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': bearer,
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                    'mode':'cors'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data['data'][0]['incidents'])
                let incidents = '<h2>INCIDENTS</h2>';
                data['data'][0]['incidents'].forEach(function(post){
                    incidents += 
                    `<div id="individual_record">
                     <div class="record_type">${post.type_of_incident}</div>
                     <div class="location_stamp">location: ${post.location}</div>
                     <div class="intervention_label">status: ${post.status}</div>
                     <div class="comment"><p>comment:<br>${post.comment}</p></div>
                     <button class="edit_record_btn" id=${post.id}>Edit</button>
                     <button class="delete_record_btn" id=${post.id}><i class="fa fa-trash"></i>Delete</button> 
                     </div>
                     `
                });
                document.getElementById('past_records').innerHTML = incidents;
                // window.location.replace('profile.html')
                // if(data.status === 201){
                //     console.log(data)
                //     window.location.replace('profile.html')
                // }else{
                //     console.log(data)
                //     window.alert(JSON.stringify(data['message']))
                // }
            })

    

}