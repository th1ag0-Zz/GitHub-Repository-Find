const container = document.querySelector('.container')
const textLoadingElement = document.createElement('p')
const ul = document.createElement('ul')
container.appendChild(textLoadingElement)

function getName() {

    container.appendChild(ul)
    const listLength = document.querySelectorAll('.container ul li')

    for (var i = 0; i < listLength.length; i++) {
        ul.removeChild(listLength[i])
    }

    var user = document.querySelector('#user').value
    textLoadingElement.innerText = 'Carregando...'

    // requisição
    axios.get('https://api.github.com/users/'+user+'/repos')
        .then( (response) => {
            textLoadingElement.innerText = ''
            
            for (var i = 0; i < response.data.length; i++) {
                var list = document.createElement('li')
                list.innerText = response.data[i].name
                ul.appendChild(list)
            }
        })
        .catch( (error) => {
            textLoadingElement.innerText = 'Algo deu errado ;-;'
            console.warn(error)
        })
}