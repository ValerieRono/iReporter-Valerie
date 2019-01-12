// populate user profile page upon successful log in
document.getElementById('logIn').addEventListener('submit', logInUser)

function logInUser(event){
    event.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    fetch('https://ireporter-valerie.herokuapp.com/api/v2/users/login', {
                method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-type':'application/json',
                    'mode':'cors'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.status === 200){
                    console.log(data)
                    window.location.replace('profile.html')
                }else{
                    console.log(data)
                    window.alert(JSON.stringify(data['message']))
                }
            })
    
        
}