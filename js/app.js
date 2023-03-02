// Variables
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let tweets = []

// Eventos
evenListeners()

function evenListeners(){
    formulario.addEventListener('submit', agregarTweet)
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []

        crearHTML()
    })
}

// Funciones
function agregarTweet(e){
    e.preventDefault()

    // Textarea
    const tweet = document.querySelector('#tweet').value

    // Validacion
    if(tweet === '' || tweet.trim() === ''){
        mostrarError('El mensaje no puede ir vacio')

        return
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadir al array de tweets
    tweets = [...tweets, tweetObj]

    // Crear el HTML
    crearHTML()

    // Reiniciar form
    formulario.reset()
}

function mostrarError(error){
    const mensajeError = document.createElement('P')
    mensajeError.textContent = error
    mensajeError.classList.add('error')

    // Insertar en el HTML
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError)

    setTimeout(() => {
        mensajeError.remove()
    }, 3000)
}

function crearHTML(){
    limpiarHTML()

    if(tweets.length > 0){
        tweets.forEach(tweet => {
            // Agregar btn de eliminar
            const btnEliminar = document.createElement('a')
            btnEliminar.classList.add('borrar-tweet')
            btnEliminar.textContent = 'X'

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id)
            }

            // Crear el html
            const li = document.createElement('LI')
            li.textContent = tweet.tweet
            li.appendChild(btnEliminar)

            listaTweets.appendChild(li)
        })
    }

    sincronozarStorage()
}

function sincronozarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id)

    crearHTML()
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}