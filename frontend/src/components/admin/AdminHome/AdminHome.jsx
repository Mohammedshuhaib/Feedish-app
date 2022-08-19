import React from 'react'
import './AdminHome.scss'
import Widget from './widget/Widget'
function AdminHome() {
  return (
    <div className='widgets'>
      <Widget type='user'/>
      <Widget type='order'/>
      <Widget type='earning'/>
      <Widget type='balance'/>
    </div>
  )
}

export default AdminHome