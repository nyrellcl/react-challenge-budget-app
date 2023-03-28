import React from 'react'
import Nav from './Nav'

function Layout({children}: any): JSX.Element {
  return (
    <>
      <Nav/>
      {children}
    </>
  )
}

export default Layout