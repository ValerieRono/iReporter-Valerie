// populate user profile page whenever the page loads
window.addEventListener("load", populateProfilePage);

function populateProfilePage(event){
    event.preventDefault();

    let username = document.getElementById('user_name');
    username.innerText = sessionStorage.getItem('username');

    // sessionStorage.removeItem('username');

}
