async function carregarDados() {

    const response = await fetch('../data.json');
    const dados = await response.json();

    const container = document.querySelector('.container-cards');

    // Limpa o contêiner caso já tenha algo (opcional)
    container.innerHTML = ''; 

    // 2. Itere sobre cada item no array de dados
    dados.forEach(item => {
        // 3. Determine a classe do ícone com base no 'isActive'
        const toggleIconClass = item.isActive ? 'fa-toggle-on' : 'fa-toggle-off';


        const cardHTML = `
            <div class="card">
                <header class="card__header">
                    <img src="${item.logo}" alt="">
                    <div class="card__header__text">
                        <h2>${item.name}</h2>
                        <p>${item.description}</p>
                    </div>
                </header>
                <footer class="card__footer">
                    <button class="btn-remove">Remove</button>
                    <i class="fa-solid ${toggleIconClass}"></i>
                </footer>
            </div>
        `;

        // 5. Insira o HTML do novo card dentro do contêiner
        container.innerHTML += cardHTML;
    })
}

carregarDados();


