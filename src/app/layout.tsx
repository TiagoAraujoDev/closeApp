import { Header } from '@/components/Header'
import { TrendingMoviesProvider } from '@/context/TredingMovies'
import { Metadata } from 'next'
import { ReactNode } from 'react'

import './globals.css'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

interface LayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="bg-neutral-900">
        <TrendingMoviesProvider>
          <Header />
          {children}
        </TrendingMoviesProvider>
      </body>
    </html>
  )
}
