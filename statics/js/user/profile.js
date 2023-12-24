logoutForm = document.querySelector('form')

logoutForm?.addEventListener('submit', async event=>{
    event.preventDefault()
    

    const response = await fetch('/sessions/current', {
        method: 'DELETE',
    })


    if(response.status== 204){//204 == salio bien, creeme please
        window.location.href= '/login'
    }else{
         const error = await response.json()
         alert(error.message)
    }
})