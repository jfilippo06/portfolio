'use client'

import dynamic from 'next/dynamic'

const Experience = dynamic(() => import('@/components/Experience'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#111',
      color: 'white',
      fontFamily: 'sans-serif'
    }}>
      <p>Cargando...</p>
    </div>
  )
})

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh' }}>
      <Experience />
    </main>
  )
}