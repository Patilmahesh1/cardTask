import React from 'react'
import { Outlet } from 'react-router-dom'
import MenuComponent from '../../components/MenuComponent'

function Layout() {
  return (
    <div>
        <MenuComponent/>
        <Outlet/>
    </div>
  )
}

export default Layout