import { Link } from '@remix-run/react'
import React from 'react'

const HeaderLogo = () => {
    return (
        <div className={`text-3xl font-bold font-sans tracking-tight text-[rgb(131,39,39)]`}>
            <Link to={`/`} className='italic'>
                <span>
                    ash
                </span>
                <span className={`text-blue-600`}>
                    thor.
                </span>
            </Link>
        </div>
    )
}

export default HeaderLogo
