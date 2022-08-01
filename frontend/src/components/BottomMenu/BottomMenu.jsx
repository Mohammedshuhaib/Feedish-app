import { AccountBalanceWalletRounded, Chat, Favorite, HomeRounded, Settings, SummarizeRounded } from '@mui/icons-material'
import React, { useEffect } from 'react'
import MenuContainer from './MenuContainer'

function BottomMenu() {
    useEffect(() => {
        const menuLi = document.querySelectorAll('#menu li')

        function setMenuActive() {
             menuLi.forEach(n => n.classList.remove('active'))
             this.classList.add('active')
        }
        menuLi.forEach(n => n.addEventListener('click',setMenuActive))
    },[])
  return (
    <div className='bottomMenu'>
        <ul id='menu'>
            {/* prettier-ignore */}
            <MenuContainer link={'#'} icon = {<HomeRounded/>}/>
            {/* prettier-ignore */}
            <MenuContainer link={'#'} icon = {<Chat/>}/>
            {/* prettier-ignore */}
            <MenuContainer link={'#'} icon = {<AccountBalanceWalletRounded/>}/>
            {/* prettier-ignore */}
            <MenuContainer link={'#'} icon = {<Favorite/>}/>
            {/* prettier-ignore */}
            <MenuContainer link={'#'} icon = {<SummarizeRounded/>}/>
            {/* prettier-ignore */}
            <MenuContainer link={'#'} icon = {<Settings/>}/>
            
            <div className='indicator'></div>
        </ul>
    </div>
  )
}

export default BottomMenu
