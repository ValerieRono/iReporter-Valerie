let username = document.getElementById('user_name');
username.innerText = sessionStorage.getItem('username');

sessionStorage.removeItem('username');

let token = sessionStorage.getItem('token') 
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
                console.log(data)
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
