/* const form =document.getElementById('cookieSetter')

form?.addEventListener('submit',event=>{
    console.log('dsadsa')
    event.preventDefault()
    
    const data = new URLSearchParams(new FormData(form))


    fetch('/test/cookieGet', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => response.json())
        .then(data => alert(JSON.stringify(data)))
    
})


const btn = document.getElementById('btnCookie')
btn?.addEventListener('click',e =>{
    alert(JSON.stringify(document.cookie))
}) */