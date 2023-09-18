const botaoFechar = document.getElementById("fechar-carrinho");
const sectionCarrinho = document.getElementById("carrinho");
const buttonAbrir = document.getElementById("open-cart");
import { catalogo, saveLocalStorage, lerLocalStorage } from "./ultilidades";

const idsProdutoCarrinhoQuantidade = lerLocalStorage('carrinho') ?? {};
sectionCarrinho.style.display = "none";

export function openCart() {
  sectionCarrinho.style.display = "flex";
}
buttonAbrir.addEventListener("click", openCart);

export function closeCart() {
  sectionCarrinho.style.display = "none";
}
botaoFechar.addEventListener("click", closeCart);

function removerdoCarrinho(idProduto){
  delete idsProdutoCarrinhoQuantidade[idProduto] 
  saveLocalStorage('carrinho', idsProdutoCarrinhoQuantidade)
  atualizarPrecoCarrinho()
  renderizarProdutosCarrinho()
  console.log(idProduto)
  
}


function incrementarQuantidadedeProduto(idProduto) {
  idsProdutoCarrinhoQuantidade[idProduto]++;
  saveLocalStorage('carrinho', idsProdutoCarrinhoQuantidade)
  atualizarPrecoCarrinho()
  atualizarInfoqtd(idProduto);
}


function decrementarQuantidadedeProduto(idProduto) {
   

  if(idsProdutoCarrinhoQuantidade[idProduto] === 1){ 
     removerdoCarrinho(idProduto)

     return
  }

  idsProdutoCarrinhoQuantidade[idProduto]--;
  saveLocalStorage('carrinho', idsProdutoCarrinhoQuantidade)
  atualizarPrecoCarrinho()
  atualizarInfoqtd(idProduto);
}

function atualizarInfoqtd(idProduto) {
  document.getElementById(`quantidade-${idProduto}`).innerText =
    idsProdutoCarrinhoQuantidade[idProduto];
}

function desenharProdutoAoCarrinho(idProduto){ 
  const produto = catalogo.find( p => p.id === idProduto);

  const containerProdutosCarrinho =
    document.getElementById("produtos-carrinho");
    
    
    const elementoArticle = document.createElement('article')
    const articleClasses = ['flex','bg-slate-100','p-1','relative']

    for(const articleClass of articleClasses){ 
       elementoArticle.classList.add(articleClass)
    }
   
  const cartaoProdutoCarrinho = ` <button id="remover-item-${produto.id}"><i  class="fa-regular fa-circle-xmark text-slate-500 hover:text-slate-800 absolute right-0 top-0 p-2"></i></button>
                <img src="./assets/img/${
                  produto.imagem
                }" alt="Camisa Larga com bolsos" class="h-24 rounded-lg">
                <div class="p-2 flex flex-col">
                <p class="text-slate-800 text-sm">${produto.marca}</p>
                <p class="text-slate-400 text-sm">Tamanho: M</p>
                <p class="text-green-700 text-lg">${produto.preco}</p>
               </div>

               <div class="flex text-lg bg-slate-600 px-2 border rounded-md text-slate-950 items-end gap-2 absolute bottom-0 right-2"> 
                    <button id="decrementar-produto-${
                      produto.id
                    }" class="text-slate-100 bg-green-500 px-1">-</button>
                    <p id="quantidade-${produto.id}">${
    idsProdutoCarrinhoQuantidade[produto.id]
  }</p>
                    <button id="incrementar-produto-${
                      produto.id
                    }" class="text-slate-100 bg-green-500 px-1">+</button>
                </div>
              `;

  elementoArticle.innerHTML = cartaoProdutoCarrinho
  containerProdutosCarrinho.appendChild(elementoArticle)
  document
    .getElementById(`decrementar-produto-${produto.id}`)
    .addEventListener("click", () =>
      decrementarQuantidadedeProduto(produto.id)
    );

    document
    .getElementById(`incrementar-produto-${produto.id}`)
    .addEventListener("click", () =>
      incrementarQuantidadedeProduto(produto.id)
    );

    document
    .getElementById(`remover-item-${produto.id}`)
    .addEventListener("click", () =>
      removerdoCarrinho(produto.id)
    );
}

export function renderizarProdutosCarrinho(){ 
  const containerProdutosCarrinho =
  document.getElementById("produtos-carrinho");
  containerProdutosCarrinho.innerHTML = ''
   
  for(const idProduto in idsProdutoCarrinhoQuantidade){ 
      desenharProdutoAoCarrinho(idProduto)
  }
}

export function adicionarAoCarrinho(idProduto) {
  if (idProduto in idsProdutoCarrinhoQuantidade) {
    incrementarQuantidadedeProduto(idProduto);
    return;
  }
  idsProdutoCarrinhoQuantidade[idProduto] = 1;
  saveLocalStorage('carrinho', idsProdutoCarrinhoQuantidade)

  desenharProdutoAoCarrinho(idProduto)

  atualizarPrecoCarrinho()
 

  
 
}


function atualizarPrecoCarrinho(){ 
  const precoCarrinho = document.getElementById('preco-total')
  let precoTotalCarrinho = 0

  for(const idProdutoNoCarrinho in idsProdutoCarrinhoQuantidade){ 
     precoTotalCarrinho += catalogo.find(p => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoQuantidade[idProdutoNoCarrinho] 
  }
  precoCarrinho.innerText = `Total:$${precoTotalCarrinho}`
}