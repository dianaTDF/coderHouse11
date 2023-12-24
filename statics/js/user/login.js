form = document.querySelector('form')

form?.addEventListener('submit', async event=>{
    event.preventDefault()
    
    const data = new URLSearchParams(new FormData(form))


    const response = await fetch('/sessions/', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    
    if(response.status== 201){
        const session = await response.json()
        window.location.href= '/profile'
    }else{
         const error = await response.json()
         alert(error.message)
    }
})