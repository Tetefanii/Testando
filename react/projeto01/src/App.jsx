// // estado
 import { useState } from "react"

function Contador(){
  const [contador, setContador ] =useState(0)
  return(
    <>
      <p>Valor atual: {contador}</p>
      <button onClick={() => setContador(contador+1)}>encrementar</button>
    </>
  )
}

function Botao(){
  const[mensagem, setMensagem] = useState('aperta aqui')
  return(
    <>
    <p>{mensagem}</p>
    <button onClick={() => setMensagem('Tu clicou!')}>Clique here</button>
    </>
  )
}

function InputNome(){
  const [nome, setNome] = useState('')
  return(
    <div>
      <input
       type="text"
       value={nome}
       onChange={e => setNome(e.target.value)}
      />
      <p>Olá, {nome}</p>
    </div>
  )
}

export default function App(){
  return(
    <>
    <h1>Exemplos</h1>
    <Contador/>
    <hr />
    <Botao/>
    <hr />
    <InputNome/>
    </>
  )
}