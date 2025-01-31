import React from 'react'

const Footer = () => {
  return (
    <footer className=' border-t-2  p-2 border-orange-400 w-full'>
      <div className=' flex justify-center'>
<ul className='flex text-orange-600 gap-4'>
    <li>facebook</li>
    <li>instagram</li>
    <li>linkedin</li>
</ul>
      </div>
      <div className='flex justify-center'>
        <div className=''>
             <small>&copy; all right reserved</small>
    <small className='ps-6'>Created by Narmin Mammadova</small>
</div>
    
      </div>
    </footer>
  )
}

export default Footer
