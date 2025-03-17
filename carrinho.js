let carrinho = [];

function atualizarCarrinho() {
    const tabelaCarrinho = document.getElementById('tabelaCarrinho').getElementsByTagName('tbody')[0];
    tabelaCarrinho.innerHTML = '';
  
    let total = 0;
  
    if (carrinho.length === 0) {
        document.getElementById('tabelaCarrinho').style.display = 'none';
        document.getElementById('totalCarrinho').style.display = 'none';
        document.getElementById('finalizarCompra').style.display = 'none';
        document.getElementById('mensagemCarrinhoVazio').style.display = 'block';
    } else {
        document.getElementById('tabelaCarrinho').style.display = 'table';
        document.getElementById('totalCarrinho').style.display = 'block';
        document.getElementById('finalizarCompra').style.display = 'block';
        document.getElementById('mensagemCarrinhoVazio').style.display = 'none';
  
        carrinho.forEach((item, index) => {
            const row = tabelaCarrinho.insertRow();
            row.insertCell(0).textContent = item.nome;
            row.insertCell(1).textContent = `R$ ${item.preco.toFixed(2)}`;
            
            const tdQuantidade = row.insertCell(2);
            const btnDiminuir = document.createElement('button');
            btnDiminuir.textContent = '-';
            btnDiminuir.classList.add('btn', 'btn-warning', 'btn-sm');
            btnDiminuir.onclick = () => ajustarQuantidade(index, -1);
            
            const spanQuantidade = document.createElement('span');
            if (item.quantidade > 0) {
                spanQuantidade.textContent = item.quantidade;
                spanQuantidade.style.margin = '0 10px';
                tdQuantidade.appendChild(spanQuantidade);
            }
            
            const btnAumentar = document.createElement('button');
            btnAumentar.textContent = '+';
            btnAumentar.classList.add('btn', 'btn-warning', 'btn-sm');
            btnAumentar.onclick = () => ajustarQuantidade(index, 1);
    
            tdQuantidade.appendChild(btnDiminuir);
            tdQuantidade.appendChild(spanQuantidade);
            tdQuantidade.appendChild(btnAumentar);
            
            row.insertCell(3).textContent = `R$ ${(item.preco * item.quantidade).toFixed(2)}`;
            
            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.classList.add('btn', 'btn-danger');
            btnRemover.onclick = () => removerItem(index);
            row.insertCell(4).appendChild(btnRemover);
    
            total += item.preco * item.quantidade;
        });
  
        document.getElementById('totalCarrinho').textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    document.getElementById('quantidadeCarrinho').textContent = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));  
}


document.addEventListener("DOMContentLoaded", function() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo); 
    }
    atualizarCarrinho(); 
});


function ajustarQuantidade(index, delta) {
    const item = carrinho[index];
    item.quantidade += delta;
  
    if (item.quantidade < 1) {
        const mensagemCaixa = document.getElementById('mensagemRemoverItem');
        mensagemCaixa.style.display = 'block';
        mensagemCaixa.innerHTML = `
            <p>Você tem certeza que deseja remover o produto "${item.nome}" do carrinho?</p>
            <button class="btn btn-danger" onclick="removerItem(${index})">Sim, remover</button>
            <button class="btn btn-secondary" onclick="fecharCaixaMensagem()">Cancelar</button>
        `;
    } else {
        atualizarCarrinho();
    }
}

function fecharCaixaMensagem() {
    document.getElementById('mensagemRemoverItem').style.display = 'none';
}

function adicionarAoCarrinho(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);
  
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    atualizarCarrinho();

    const mensagem = document.getElementById('mensagemAdicionado');
    mensagem.style.display = 'block';

    setTimeout(() => {
        mensagem.style.display = 'none';
    }, 3000);
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
    fecharCaixaMensagem();
}

function finalizarCompra() {
    alert("Compra finalizada! (Isso pode ser integrado com uma API de pagamento)");
    carrinho = [];
    atualizarCarrinho();
}


