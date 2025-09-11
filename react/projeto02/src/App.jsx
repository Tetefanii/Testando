import { useState } from 'react'

function Saudacao({nome}){
  return(
    <h1> Olá, {nome}</h1>
  )
}

export default function App(){
  const[usuario, setUsuario] = useState('EEEEEEEEEEEEEEEEEEEEEEEEE')
  return(
    <Saudacao nome={usuario}/>
  )
}