const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    messageOne.textContent = 'loading...'
    messagetwo.textContent = ''

    const location = search.value

    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        }
        else {
            messageOne.textContent = data.location
            messagetwo.textContent = data.forecast
        }
    }) 
})
})