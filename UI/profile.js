let username = document.getElementById('user_name');
username.innerText = localStorage.getItem('username');

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
                     <div class="record_type">${post.type_of_incident}</div><br>
                     <div class="location_stamp">location: ${post.location}</div><br>
                     <div class="intervention_label">status: ${post.status}</div><br>
                     <div class="comment"><p>comment: ${post.comment}</p></div><br>
                     <div class="files">
                     <img class="images" src=${post.images}/>
                     <video class="videos" src=${post.videos}></video><br>
                     </div>
                     <div class="buttons">
                     <button class="edit_record_btn" id=${post.id}>Edit</button>
                     <button class="delete_record_btn" id=${post.id}><i class="fa fa-trash"></i>  Delete</button> 
                     </div>
                     </div>
                     `
                });
                document.getElementById('past_records').innerHTML = incidents;
            })
}
