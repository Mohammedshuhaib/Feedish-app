import React from 'react'
import Navbar from '../../components/admin/Header/Navbar'
import Sidebar from '../../components/admin/Sidebar/Sidebar'
import UserList from '../../components/admin/UserList/UserList'

function Users() {
  return (
    <div className='userList'>
        <Sidebar/>
        <div className="listContainer">
            <Navbar/>
            <UserList/>
        </div>
    </div>
  )
}

export default Users