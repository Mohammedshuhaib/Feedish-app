import { KeyboardArrowUp, PersonOutlined } from '@mui/icons-material'
import React from 'react'
import './Widget.scss'

function Widget({type}) {

    let data;

    switch(type) {
        case 'user':
            data ={
                title:"USERS",
                isMoney: false,
                link:'See all users',
                icon: <PersonOutlined className='icon'/>
            }
    }
  return (
    <div className='widget'>
        <div className="left">
            <span className="title">USERS</span>
            <span className="counter">21222</span>
            <span className="link">See all user</span>
        </div>
        <div className="right">
            <div className="percentage positive">
                <KeyboardArrowUp/>
                20 %
            </div>
            <PersonOutlined className='icon'/>
        </div>
    </div>
  )
}

export default Widget