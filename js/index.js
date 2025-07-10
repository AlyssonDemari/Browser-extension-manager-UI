const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (prefersDarkMode) {
    console.log("O usuário está no modo escuro.");
    // Você pode adicionar uma classe ao body para aplicar estilos específicos
    document.body.classList.add('dark-mode');
} else {
    console.log("O usuário está no modo claro.");
    document.body.classList.add('light-mode');
}


async function carregarDados() {

    const response = await fetch('data.json'); //removi ../
    const dados = await response.json();

    const container = document.querySelector('.container-cards');

    // Limpa o contêiner caso já tenha algo (opcional)
    container.innerHTML = ''; 

    // 2. Itere sobre cada item no array de dados
    dados.forEach(item => {
        // 3. Determine a classe do ícone com base no 'isActive'
        const toggleIconClass = item.isActive ? 'fa-toggle-on' : 'fa-toggle-off';

        const cardStatus  = item.isActive ? 'Active' : 'Inactive';

        // 4. Crie o HTML do novo card
        const cardHTML = `
            <div class="card" data-status="${cardStatus}">
                <div class="card__header">
                    <img src="${item.logo}" alt="Icon logo">
                    <div class="card__header__text">
                        <h2>${item.name}</h2>
                        <p>${item.description}</p>
                    </div>
                </div>
                <div class="card__footer">
                    <button class="btn-remove" aria-label="Remove card">Remove</button>
                    <button class="button-toggle" aria-label="Enable or disable extension"><i class="fa-solid ${toggleIconClass}"></i></button>
                </div>
            </div>
        `;
        // 5. Insira o HTML do novo card dentro do contêiner
        container.innerHTML += cardHTML;
    })

    // 6. responsável por remover o card
    const removeCard = document.querySelectorAll('.btn-remove');
    removeCard.forEach(removeCard => {
        removeCard.addEventListener('click', () => {
            const card = removeCard.closest('.card');
            card.remove();
        });
    })

    // 1. Adicione um único 'escutador' de eventos ao contêiner principal
    container.addEventListener('click', (event) => {

        console.log(event.target);
        
        // 2. Verifique se o elemento clicado (event.target) é um ícone de toggle
        if (event.target.classList.contains('fa-toggle-on') || event.target.classList.contains('fa-toggle-off')) {
            
            // 3. Se for, alterne as classes no elemento que foi clicado
            event.target.classList.toggle('fa-toggle-on');
            event.target.classList.toggle('fa-toggle-off');
        }

        const cardClicked = event.target.closest('.card');
        if (cardClicked) {
            const cardStatus = cardClicked.getAttribute('data-status');
            console.log(cardStatus);
            if (cardStatus === 'Active') {
                cardClicked.setAttribute('data-status', 'Inactive');
            } else {
                cardClicked.setAttribute('data-status', 'Active');
            }
        }
    });
}
carregarDados();


// --- LÓGICA PARA DEIXAR O BOTÃO ATIVO ---
const contButton = document.querySelector('.buttons');
contButton.addEventListener('click', (event) => {
    
    const clicked = event.target
    console.log(clicked);

    // caso o lugar na qual eu tenha clicado não seja um botão, sai da função
    if(clicked.tagName !== 'BUTTON'){
        return;
    }

    document.querySelector('.active').classList.remove('active');

    const button = event.target;    
    button.classList.add('active');

    const allCards = document.querySelectorAll('.card');

    let contCards = 0;
    const empty = document.querySelector('.empty');

    allCards.forEach(card => {
        const cardStatus = card.getAttribute('data-status');
        if(cardStatus === button.textContent || button.textContent === 'All'){
            card.style.display = 'flex';
            contCards++;
            console.log(contCards);
        } else {
            card.style.display = 'none';
        }
    })

    if(contCards === 0){
        empty.classList.add('active');
    }
    else {
        empty.classList.remove('active');
    }
})
