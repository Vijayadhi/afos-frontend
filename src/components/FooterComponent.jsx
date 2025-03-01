import React from 'react'

function FooterComponent() {
    return (
        <>
            <hr />
            <p className='text-center'>
                &copy; {new Date().getFullYear()} All rights reserved.<br />
                Site Brought to Live by <a href="https://portfolio-vigneshwaran.netlify.app" target="_blank" rel="noopener noreferrer" className='text-center' >Vigneshwaran</a ></p>
                
                </>
  )
}

export default FooterComponent