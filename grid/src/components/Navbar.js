import React from 'react'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">React task</a>
        
        <div className="collapse navbar-collapse" id="navbarNav" >
          <ul className="navbar-nav">
            
            <li className="nav-item">
              
              <a className="nav-link active" aria-current="page" href="/TextForm">form</a>
            </li>

            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/Grid">grid</a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}
