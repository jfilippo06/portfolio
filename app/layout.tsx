import './globals.css'

export const metadata = {
  title: 'Portfolio 3D',
  description: 'Mi portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}