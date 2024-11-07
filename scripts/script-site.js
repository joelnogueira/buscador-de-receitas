/*
        Lógica de Programação

        [x] Pegar a informação do input quando o botão for clicado
        [x] Ir até a API e trazer as receitas
        [x] Colocar as receitas na tela
        [x] Saber quando o usuario clicou na receita
        [x] Buscar a info da receita individual na api
        [x] Colocar a receita individual na tela
        []

*/
const form = document.querySelector('.formPesquisar')
const receitaLista = document.querySelector('.receita-lista')
const receitaDetalhes = document.querySelector('.receita-detalhes')


//Pegar a informação do input quando o botão for clicado
form.addEventListener('submit', function(evento){
    evento.preventDefault() //para não recarregar a pagina
    const inputValor = evento.target[0].value //pegar o valor do input

    pesquisarReceitas(inputValor)
})

//Ir até a API e trazer as receitas
async function pesquisarReceitas(ingredientes){
    receitaLista.innerHTML= `<p>Carregando receitas...</p>`
    try{
        const resposta = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientes}`)
        const data = await resposta.json()

        if(data.meals){
            mostrarReceitas(data.meals)
            
        }
        else{
            receitaLista.innerHTML = `<p>Nenhuma receita encontrada.</p>`
        }
    }
    catch(err){
        receitaLista.innerHTML = `<p>Erro ao buscar receitas.</p>`
        console.error(err)
    }
}

//Colocar as receitas na tela
function mostrarReceitas(receitas){
    receitaLista.innerHTML = receitas.map(item => `
        <div class="receitaCard" onclick=" detalheReceita(${item.idMeal})">
            <img src="${item.strMealThumb}" alt="receita-img">
            <h1> ${item.strMeal} </h1>
        </div>
        `

).join('')
}

//Saber quando o usuario clicou na receita
async function detalheReceita(id){
    const resposta = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const data = await resposta.json()
    const receita = data.meals[0]
    
    let ingrediente = ''

    //Buscar a info da receita individual na api
    for(let i = 1; i <=20; i++){
        if(receita[`strIngredient${i}`]){
        ingrediente += `<li> ${receita[`strIngredient${i}`]} - ${receita[`strMeasure${i}`]} </li>`
            
        }
        else{
            break;
        }
    }

//Colocar a receita individual na tela
    receitaDetalhes.innerHTML = `

        <h2>${receita.strMeal}</h2>
        <img src="${receita.strMealThumb}" alt="receita-imagem" class="receita-Img" >
        <h3>Categoria: <span>${receita.strCategory}</span></h3>
        <h3>Origem: <span>${receita.strArea}</span></h3>
        <h3>Ingredientes:</h3>
        <ul>${ingrediente}</ul>
        <h3>Instruções: </h3>
        <p>${receita.strInstructions}</p>
        <p><span>Tags:</span> ${receita.strTags}</p>
        <p><span>Vídeo:</span> <a href="${receita.strYoutube}" target="_blank"> <abbr title="Assista no Youtube">Assista no Youtube</abbr> </a></p>
    
    `
}


//www.themealdb.com/api/json/v1/1/lookup.php?i=52772   #Search Por Id
//www.themealdb.com/api/json/v1/1/filter.php?i=banana  #Search Por Nome


// Função para rolar até o topo
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Função para verificar o scrollHeight e exibir/ocultar a seta
function checkScrollHeight() {
    var scrollTopBtn = document.getElementById('scrollTop');
    var totalHeight = window.scrollY;

    if (totalHeight >= 1000) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
}

// Adiciona um evento para verificar o scrollHeight quando a página é carregada e quando o usuário rola a página
window.onload = checkScrollHeight;
window.onscroll = checkScrollHeight;

document.getElementById('scrollImage').addEventListener('click', function() { window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth'})
})



function toggleBackgroundColor(){
    
    var main = document.querySelector('.container')
    var currentColor = main.style.backgroundColor;
    var icon = document.querySelector('.icon')
    var iconImage = icon.src

    if (currentColor === 'white' || currentColor === '' && (iconImage.includes('noite.png')) || iconImage === '' ) {
        main.style.backgroundColor = '#121212'; // Cor alternativa
        localStorage.setItem('backgroundColor', '#121212'); // Armazena a cor alternativa
        icon.src ='img/dia.png' //icon alternativo
        localStorage.setItem('src', 'img/dia.png'); // Armazena o icon alternativo
    } else {
        main.style.backgroundColor = 'white'; // Cor padrão
        localStorage.setItem('backgroundColor', 'white'); // Armazena a cor padrão
        icon.src='img/noite.png'
        localStorage.setItem('src', 'img/noite.png'); // Armazena o icon padrão
    }
}


    //Adiciona evento de clique ao botão 
    document.getElementById('toggleModeBtn').addEventListener('click', toggleBackgroundColor); 
    //Verifica e aplica a cor de fundo armazenada ao carregar a página 
    window.onload = function() { 
        var storedColor = localStorage.getItem('backgroundColor'); 
        var storedIcon = localStorage.getItem('src'); 
    if (storedColor && storedIcon) { 
        document.querySelector('.container').style.backgroundColor = storedColor;
        document.querySelector('.icon').src = storedIcon;
        

    }
}