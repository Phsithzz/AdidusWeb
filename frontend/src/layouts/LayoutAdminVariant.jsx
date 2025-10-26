import React from 'react'
import ConsoleAdmin from '../components/ConsoleAdmin'
import NavbarAdmin from '../components/NavbarAdmin'
const LayoutAdminVariant = () => {
  return (
    <>
     <div className="flex ">
        <div className="w-[20%] bg-black">
          <ConsoleAdmin />
        </div>
        <div className="flex flex-col space-4 w-[80%]">
          <NavbarAdmin 

          />

          
        </div>
      </div>
    </>
  )
}

export default LayoutAdminVariant