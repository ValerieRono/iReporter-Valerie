// edit record fetch method
let incidents = document.getElementById('past_records');

incidents.addEventListener("click", function(event) {
	// event.target is the clicked element!
	// If it was a button
	if (event.target.className != 'edit_record_btn') return;

    //let button = event.target.closest('.individual_record');
    event.preventDefault();
    
    localStorage.setItem('id', event.target.id)
    let isAdmin = localStorage.getItem('isAdmin');
    // console.log(isAdmin)
    if ( isAdmin == "true") {
        window.location.replace('editAdmin.html')
    } else {
        window.location.replace('edit.html')
    }
    
})