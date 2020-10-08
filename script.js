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

    // requisição dos repositórios
    axios.get('https://api.github.com/users/'+user+'/repos')
        .then( (response) => {
            var boxUser = document.querySelector('.box-user')
            boxUser.style.display = 'flex'
            textLoadingElement.innerText = ''
            
            for (var i = 0; i < response.data.length; i++) {
                var list = document.createElement('li')
                var linkList = document.createElement('a')
                linkList.setAttribute('href', response.data[i].svn_url)
                linkList.setAttribute('target', '__blank')
                linkList.innerText = response.data[i].name
                //list.innerText = response.data[i].name
                list.appendChild(linkList)
                ul.appendChild(list)
            }
            var numRepo = document.querySelectorAll('ul li').length

            axios.get('https://api.github.com/users/'+user)
                .then( (response) => {

                    console.log(response)
                    var imgBox = document.querySelector('.img-user')
                    imgBox.style.backgroundImage = "url("+response.data.avatar_url+")"
                    var name = document.querySelector('.name')
                    var repo = document.querySelector('.container-info .repo')
                    var seguidores = document.querySelector('.container-info .seguidores')
                    var seguindo = document.querySelector('.container-info .seguindo')
                    
                    name.innerText = response.data.name
                    repo.innerText = 'Repositórios: ' + numRepo
                    seguidores.innerText = 'Seguidores: ' + response.data.followers
                    seguindo.textContent = 'Seguindo: ' + response.data.following

                })
                .catch( (error) => {
                    console.log(error)
                })
            
        })
        .catch( (error) => {
            textLoadingElement.innerText = 'Algo deu errado ;-;'
            console.warn(error)
        })

    // requisição do perfil
    
}