import Navbar from '@/app/_components/Navbar'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default Layout
