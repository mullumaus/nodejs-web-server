
console.log('Client side javascript file is loaded')


// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

function fetchWeatch(address=''){
    const url = '/weather?address='+address
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
    })
}
//select first form/input/p
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = searchElement.value
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''
    fetchWeatch(location)
    
})
