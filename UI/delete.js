// edit record fetch method
let deleteRecords = document.getElementsByClassName('delete_record_btn');
let ids = document.getElementsByClassName('record_id');

for(let i = 0; i < deleteRecords.length; i++) {
    deleteRecords[i].addEventListener("click", function deleteRecord(event){
    event.preventDefault();
    record_id = ids[i].innerText;
    
    fetch(`https://ireporter-valerie.herokuapp.com/api/v2/incidents/${record_id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': bearer,
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                    'mode':'cors'
                }
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.status === 201){
                    console.log(data)
                }else{
                    console.log(data)
                    window.alert(JSON.stringify(data['message']))
                }
            })
    
})
}

