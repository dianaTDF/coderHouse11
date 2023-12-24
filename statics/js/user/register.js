form = document.querySelector('form')

form?.addEventListener('submit', async event=>{
    event.preventDefault()
    
    const data = new URLSearchParams(new FormData(form))


    const response = await fetch('/users/', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
       /*  .then(response => response.json())
        .then(data => alert(JSON.stringify(data))) */
    
    if(response.status== 201){
        const {playload:usuario} = await response.json()
        window.location.href= '/login'
    }else{
         const error = await response.json()
         alert(error.message)
    }
})