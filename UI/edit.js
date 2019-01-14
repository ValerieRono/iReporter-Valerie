// edit record fetch method
let editRecord = document.getElementsByClassName('button');
// let ids = document.getElementsByClassName('record_id');
for(let i = 0; i < editRecord.length; i++) {
    editRecord[i].addEventListener("click", editRecords)
}


function editRecords(event){
    event.preventDefault();
    window.location = "edit.html"
}