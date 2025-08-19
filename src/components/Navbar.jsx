import React, { useState } from 'react'

export const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState('Home')

    const links = [
        { name: 'Home', href: '#' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <a href="#" className="text-xl font-semibold tracking-tight">AlgoWeb</a>

                    <div className="hidden md:flex items-center gap-6">
                        <ul className="flex items-center gap-1">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={() => setActive(link.name)}
                                        className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${active === link.name
                                                ? 'bg-black text-white'
                                                : 'text-gray-700 hover:text-black hover:bg-gray-100'
                                            }`}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <a
                            href="#get-started"
                            className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Get Started
                        </a>
                    </div>

                    <button
                        type="button"
                        aria-label="Toggle menu"
                        aria-expanded={open}
                        onClick={() => setOpen((o) => !o)}
                        className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        <svg className={`h-6 w-6 ${open ? 'hidden' : 'block'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg className={`h-6 w-6 ${open ? 'block' : 'hidden'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </nav>

            <div className={`md:hidden ${open ? 'block' : 'hidden'} border-t border-black/5 bg-white/90 backdrop-blur`}>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
                    <ul className="space-y-1">
                        {links.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    onClick={() => {
                                        setActive(link.name)
                                        setOpen(false)
                                    }}
                                    className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${active === link.name
                                            ? 'bg-black text-white'
                                            : 'text-gray-700 hover:text-black hover:bg-gray-100'
                                        }`}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a
                        href="#get-started"
                        className="mt-3 block text-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
                    >
                        Get Started
                    </a>
                </div>
            </div>
        </header>
    )
}