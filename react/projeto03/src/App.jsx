const usuarios = [
  {id: 1, nome: 'maria'},
  {id: 2, nome: 'João'}
]
function Usuario({nome}){
  return(
  <li>{nome}</li>
  )
}

export default function ListaUsuarios(){
  return(
    <ul>
      {usuarios.map(u =>
        <Usuario key={u.id} nome={u.nome}/>
      )}
    </ul>
  )
}