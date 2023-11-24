import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Generate PDF 🚀',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en">
        <body
          className={`${inter.className} bg-[#f5f9fd] text-[#202430] dark:bg-[#202430] dark:text-[#fff]`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </>
  )
}
