import React, {useState} from 'react'

function Footer() {
 
  return (
    <footer className="footer">
      <div className="copyright">
        © {new Date().getFullYear()} AI Based Data Entry Automation. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
