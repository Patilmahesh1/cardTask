import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
// import MenuComponent from '../components/MenuComponent'
import Cart from '../pages/Cart'
import Layout from './layout/Layout'


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      {/* <Route index element={<MenuComponent />} /> */}
      <Route path="cart" element={<Cart />} />
    </Route>
  )
)

