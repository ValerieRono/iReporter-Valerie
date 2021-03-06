// sign up fetch method
document.getElementById('signUp').addEventListener('submit', signUpUser)

function signUpUser(event){
    event.preventDefault();

    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let othernames = document.getElementById('othernames').value;
    let email = document.getElementById('email').value;
    let phonenumber = document.getElementById('phonenumber').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    fetch('https://ireporter-valerie.herokuapp.com/api/v2/users', {
                method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-type':'application/json',
                    'mode':'cors'
                },
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    othernames: othernames,
                    email: email,
                    phoneNumber: phonenumber,
                    username: username,
                    password: password,
                    confirm_password: confirmPassword
                })
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.status === 201){
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
                        let token = data['access_token']
                        localStorage.setItem('token', token)
                    })
                    localStorage.setItem('username', username)
                    window.location.replace('profile.html')
                }else{
                    console.log(data)
                    window.alert(JSON.stringify(data['message']))
                }
            })
    
        
}