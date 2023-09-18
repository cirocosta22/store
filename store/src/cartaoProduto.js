
import { adicionarAoCarrinho } from "./menuCarrinho"
import { catalogo } from "./ultilidades"

export function renderizarCatalogo() { 
     

for(const produtoCatalogo of catalogo){
    const cartaoProduto = `<div class="card-produto-${produtoCatalogo.id} w-48 m-2 p-2 flex flex-col justify-between border-solid shadow-xl rounded-lg shadow-slate-500 group">

  <img src="./assets/img/${produtoCatalogo.imagem}" class="h-86 rounded-md my-3 group-hover:scale-110 duration-300"/>
    <p class="text-sm">${produtoCatalogo.nome}</p>
    <p class="text-sm">${produtoCatalogo.marca}</p>
   <p class="text-sm">${produtoCatalogo.preco}</p>
   <button id="adicionar${produtoCatalogo.id}" class='bg-slate-950 hover:bg-slate-700 text-slate-200'>
   <i class="fa-solid fa-cart-plus"></i></button>
    
 </div>`
   
  document.getElementById('container-produto').innerHTML += cartaoProduto

  
 
 }




 for(const produtoCatalogo of catalogo){ 
    document.getElementById(`adicionar${produtoCatalogo.id}`).addEventListener('click', () =>  adicionarAoCarrinho(produtoCatalogo.id))
    
 }
 

}