import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({searchItem,setSearchItem}) => {
  return (
    <div>
        <form onSubmit={(e)=>e.preventDefault()}>
            <label htmlFor='search'>search</label>
            <input type='text' id='search' placeholder='search' value={searchItem} onChange={(e)=>setSearchItem(e.target.value)}/>
            <button type='submit'>search</button>
        </form>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/post'>Newpost</Link></li>
        </ul>
    </div>
  )
}

export default Nav