// var jwtDecode = require('jwt-decode');
// and import via
// import * as JWT from 'jwt-decode';

// use JWT() for decode. Not jwt-decode() !!
// let t = JWT(token);

// populate user profile page upon successful log in
document.getElementById('signIn').addEventListener('submit', logInUser)

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
                // console.log(data['access_token'])
                let token = data['access_token']
                let payload =jwt_decode(token)
                let user = payload['user']
                
                console.log(user)
                sessionStorage.setItem('username', username)
                sessionStorage.setItem('token', token)
                sessionStorage.setItem('isAdmin', user['is_admin'])
                
                if ( user['is_admin']) {
                    window.location.replace('admin.html')
                } else {
                    window.location.replace('profile.html')
                }
                //window.location.replace('profile.html')



                
                // if(data.status === 200){
                //     console.log(data)
                //     sessionStorage.setItem('username', username)
                //     window.location.replace('profile.html')
                // }else{
                //     console.log(data)
                //     window.alert(JSON.stringify(data['message']))
                // }
            })
    
        
}