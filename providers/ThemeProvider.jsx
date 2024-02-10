"use client"

import { ThemeContext } from "@/context/ThemContext"
import { useContext, useEffect, useState } from "react"

const ThemeProvider = ({ children }) => {

    const { theme } = useContext(ThemeContext)

    // if you are using some other browesers you have some problem you can open up your team provider ad create usestate to check if the componenet is mounted or not
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

    }, [])
    if (mounted) {

        return (
            <div className={theme}>
                {children}
            </div>
        )
    }

}

export default ThemeProvider