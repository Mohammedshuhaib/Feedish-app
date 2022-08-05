import React from 'react'

function MenuContainer({link,icon}) {
  return (
    <li>
        <a href={link}>
            <span className='Icon'>{icon}</span>
        </a>
    </li>
  )
}

export default MenuContainer
