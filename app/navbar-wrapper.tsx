'use client'

import Navbar from './navbar'

interface NavbarWrapperProps {
  user: any
}

export default function NavbarWrapper({ user }: NavbarWrapperProps) {
  return <Navbar />
} 