import { useEffect, useState } from 'react'
import Produto from './components/produto.jsx'
import "./App.css"

const API_URL = "https://crudcrud.com/api/b78cd09a63d94668a1829726ea44df91/tarefas";

function App() {
  const [produtos, setProdutos] = useState([

  ]);
  const [novoProduto, setNovoProduto] = useState('');
  const [novoPreco, setNovoPreco] = useState('');
  const [novaDescricao, setNovaDescricao] = useState('');

  useEffect(() => {
    fetch(API_URL)
    .then (res => res.json())
    .then (dados => setProdutos(dados))
    .catch (error => console.error('Erro ao buscar tarefas: ', error))
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();

    if (novoProduto.trim() === '') return;
    if (novoPreco === 0) return;
    if (novaDescricao.trim() === '') return;

    const nova = {
      texto: novoProduto.trim(),
      preco: novoPreco,
      descricao: novaDescricao
    }

    fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(nova)
    })
    .then (res => res.json())
    .then (produtoCriado => {
      setProdutos([...produtos, nova]);
      setNovoProduto('');
      setNovoPreco('');
      setNovaDescricao('');
    })
    .catch (error => console.error('Erro ao buscar tarefas: ', error))

  }
  return (
    <main>
      <h1>Lista de produtos</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Digite um novo produto'
          value={novoProduto}
          onChange={(e) => setNovoProduto(e.target.value)}
        />
        <br />
        <input type="number" placeholder='Digite o preço'
        value={novoPreco}
        onChange={(e) => setNovoPreco(e.target.value)} />
        <br />
        <input type="text" placeholder='Descreva o produto' 
        value={novaDescricao}
        onChange={(e => setNovaDescricao(e.target.value))}/>
        <br />
          <button type='submit'>Adicionar</button>
      </form>
      <div className='amostra'>
        {produtos.map(produto => <Produto key={produto._id} texto={produto.texto} preco={produto.preco} descricao={produto.descricao}/>)}
      </div>
    </main>
  )
}

export default App
