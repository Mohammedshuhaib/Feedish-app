import React from 'react'
import './AdminHome.scss'
import Chart from './chart/Chart'
import Featured from './featured/Featured'
import Widget from './widget/Widget'
function AdminHome() {
  return (
    <>
    <div className='widgets'>
      <Widget type='user'/>
      <Widget type='order'/>
      <Widget type='earning'/>
      <Widget type='balance'/>
    </div>
    <div className="charts">
      <Featured/>
      <Chart/>
    </div>
    </>
    
  )
}

export default AdminHome