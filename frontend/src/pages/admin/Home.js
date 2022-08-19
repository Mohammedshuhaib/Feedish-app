import React from 'react'
import AdminHome from '../../components/admin/AdminHome/AdminHome'
import Sidebar from '../../components/admin/Sidebar/Sidebar'
import Header from '../../components/admin/Header/Navbar'

function Home() {
  return (
    <div className='adminHome'>
      <Sidebar/>
      <div className='homeConatiner'>
        <Header/>
      <AdminHome/>
      </div>
      
      </div>
  )
}

export default Home