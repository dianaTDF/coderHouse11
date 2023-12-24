logoutForm = document.querySelector('form')

logoutForm?.addEventListener('submit', async event=>{
    event.preventDefault()
    
    const data = new URLSearchParams(new FormData(form))


    const response = await fetch('/api/sessions/current', {
        method: 'DELETE',
    })


    if(response.status== 204){//204 == salio bien, creeme please
        window.location.href= '/login'
    }else{
         const error = await response.json()
         alert(error.message)
    }
})