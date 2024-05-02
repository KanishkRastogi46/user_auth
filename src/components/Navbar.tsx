import React from 'react'
import Link from 'next/link';

function Navbar() {
  return (
    <>
        <nav className='w-full h-[10vh] flex justify-center items-center gap-5 bg-zinc-900'>
            <li className='list-none text-lg uppercase font-normal text-slate-200'><Link href={'/'}>home</Link></li>
            <li className='list-none text-lg uppercase font-normal text-slate-200'><Link href={'/signin'}>signin</Link></li>
            <li className='list-none text-lg uppercase font-normal text-slate-200'><Link href={'/login'}>login</Link></li>
        </nav>
    </>
  )
}

export default Navbar;