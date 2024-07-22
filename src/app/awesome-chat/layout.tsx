import Link from 'next/link'
import React from 'react'

const layout = ({children}:{ children: React.ReactNode}) => {
  return (
    <div className='w-full h-full flex gap-0'>
      <aside className='min-w-0 max-w-[280px] h-full bg-gray-200 p-8'>
        <div className='w-[260px]'>
          <ul>
            <li><Link href="/home">Home</Link></li>
            <li><Link href="/instagrams">Daftar Instagram</Link></li>
            <li><Link href="/automations">Automations</Link></li>
            <li><Link href="/settings">Settings</Link></li>
          </ul>
        </div>
      </aside>
      <div className='flex flex-col gap-5 w-full'>
        <header className='bg-white p-5 w-full'>
          Header disini
        </header>
        <main className='flex grow w-full p-5'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default layout