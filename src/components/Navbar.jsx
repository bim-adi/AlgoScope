import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// 1. Import motion and AnimatePresence
import { motion, AnimatePresence } from 'framer-motion'
import githubIcon from '../assets/github-mark-white.svg'
import logo from '../assets/logo2.png'

// 2. Define the bounce transition
const bounceTransition = {
    type: 'spring',
    stiffness: 260,
    damping: 15,
}

// 3. Define variants for the icon lines
const topVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 6 }, // Move down 6px
}
const middleVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
}
const bottomVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -6 }, // Move up 6px
}

// 4. Define variants for the mobile menu panel
const menuVariants = {
    closed: {
        opacity: 0,
        y: -10, // Start 10px up
        transition: {
            duration: 0.2,
        },
    },
    open: {
        opacity: 1,
        y: 0, // Animate to 0
        transition: {
            type: 'spring',
            stiffness: 260,
            damping: 20,
            staggerChildren: 0.05, // Animate links one by one
        },
    },
}

// Variant for the links inside the mobile menu
const menuItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
}

export const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState('Home')

    const links = [
        { name: 'Search', href: '/search' },
        { name: 'Shortest Path', href: '/spath' },
        { name: 'Sort', href: '/sort' },
        { name: 'About', href: '/about' },
    ]

    // Helper component for the icon lines
    const Line = ({ variants }) => (
        <motion.div
            className="h-0.5 w-5 bg-slate-300"
            variants={variants}
            transition={bounceTransition}
        />
    )

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/50 backdrop-blur supports-[backdrop-filter]:bg-slate-950/40 rounded-xl shadow-2xl">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link
                        to="/"
                        className="flex flex-row text-xl font-semibold tracking-tight group"
                    >
                        <div className="w-10 h-10 m-auto rounded flex items-center justify-center mr-3 transition-transform group-hover:scale-110">
                            <img src={logo} alt="" className="w-8 h-8" />
                        </div>
                        <span className="mt-1 text-2xl text-white font-bold tracking-tighter">AlgoScope</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <ul className="flex items-center gap-1">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        onClick={() => setActive(link.name)}
                                        className={`block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${active === link.name
                                            ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link
                            to="https://github.com/bim-adi/AlgoScope"
                            className="inline-flex items-center rounded-xl bg-white px-5 py-2 text-sm font-bold text-black shadow-lg hover:bg-slate-200 transition-all duration-200 active:scale-95"
                        >
                            <img
                                src={githubIcon}
                                alt="github"
                                className="w-7 h-5 pr-2 invert"
                            />
                            <span>Github</span>
                        </Link>
                    </div>

                    {/*           <button */}
                    {/*             type="button" */}
                    {/*             aria-label="Toggle menu" */}
                    {/*             aria-expanded={open} */}
                    {/*             onClick={() => setOpen((o) => !o)} */}
                    {/*             className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black" */}
                    {/*           > */}
                    {/*             <svg */}
                    {/*               className={`h-6 w-6 ${open ? 'hidden' : 'block'}`} */}
                    {/*               viewBox="0 0 24 24" */}
                    {/*               fill="none" */}
                    {/*               stroke="currentColor" */}
                    {/*               strokeWidth="2" */}
                    {/*             > */}
                    {/*               <path */}
                    {/*                 strokeLinecap="round" */}
                    {/*                 strokeLinejoin="round" */}
                    {/*                 d="M4 6h16M4 12h16M4 18h16" */}
                    {/*               /> */}
                    {/*             </svg> */}
                    {/*             <svg */}
                    {/*               className={`h-6 w-6 ${open ? 'block' : 'hidden'}`} */}
                    {/*               viewBox="0 0 24 24" */}
                    {/*               fill="none" */}
                    {/*               stroke="currentColor" */}
                    {/*               strokeWidth="2" */}
                    {/*             > */}
                    {/*               <path */}
                    {/*                 strokeLinecap="round" */}
                    {/*                 strokeLinejoin="round" */}
                    {/*                 d="M6 18L18 6M6 6l12 12" */}
                    {/*               /> */}
                    {/*             </svg> */}
                    {/*           </button> */}
                    {/*         </div> */}
                    {/*       </nav> */}
                    {/**/}
                    {/*       <div */}
                    {/*         className={`md:hidden ${ */}
                    {/*           open ? 'block' : 'hidden' */}
                    {/*         } border-t border-black/5 bg-white/90 backdrop-blur shadow-lg rounded-lg`} */}
                    {/*       > */}
                    {/*         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3"> */}
                    {/*           <ul className="space-y-1"> */}
                    {/*             {links.map((link) => ( */}
                    {/*               <li key={link.name}> */}
                    {/*                 <Link */}
                    {/*                   to={link.href} */}
                    {/*                   onClick={() => { */}
                    {/*                     setActive(link.name) */}
                    {/*                     setOpen(false) */}
                    {/*                   }} */}
                    {/*                   className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${ */}
                    {/*                     active === link.name */}
                    {/*                       ? 'bg-black text-white' */}
                    {/*                       : 'text-gray-700 hover:text-black hover:bg-gray-100' */}
                    {/*                   }`} */}
                    {/*                 > */}
                    {/*                   {link.name} */}
                    {/*                 </Link> */}
                    {/*               </li> */}
                    {/*             ))} */}
                    {/*           </ul> */}
                    {/*           <Link */}
                    {/*             to="#get-started" */}
                    {/*             className="mt-3 block text-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800" */}
                    {/*           > */}
                    {/*             Get Started */}
                    {/*           </Link> */}
                    {/*         </div> */}
                    {/*       </div> */}
                    {/*     </header> */}
                    {/*   ) */}
                    {/* } */}

                    {/* 5. Apply the animation to the button */}
                    <motion.button
                        type="button"
                        aria-label="Toggle menu"
                        aria-expanded={open}
                        onClick={() => setOpen((o) => !o)}
                        // Animate between 'open' and 'closed' states
                        animate={open ? 'open' : 'closed'}
                        className="md:hidden inline-flex flex-col items-center justify-center gap-1 rounded-lg p-2 text-slate-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 transition-colors"
                    >
                        {/* 6. Remove old SVGs and add animated lines */}
                        <Line variants={topVariants} />
                        <Line variants={middleVariants} />
                        <Line variants={bottomVariants} />
                    </motion.button>
                </div>
            </nav>

            {/* 7. Animate the mobile menu dropdown */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="mobile-menu"
                        // Remove Tailwind's show/hide, let framer-motion handle it
                        className="md:hidden border-t border-white/5 bg-slate-950/90 backdrop-blur-xl shadow-2xl rounded-b-2xl overflow-hidden"
                        // Apply variants
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    // Animate each link
                                    <motion.li key={link.name} variants={menuItemVariants}>
                                        <Link
                                            to={link.href}
                                            onClick={() => {
                                                setActive(link.name)
                                                setOpen(false)
                                            }}
                                            className={`block rounded-xl px-4 py-3 text-base font-medium transition-all ${active === link.name
                                                ? 'bg-white/10 text-white'
                                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                            <motion.div variants={menuItemVariants} className="mt-6">
                                <Link
                                    to="https://github.com/bim-adi/AlgoScope"
                                    onClick={() => setOpen(false)}
                                    className="block w-full text-center rounded-xl bg-white px-4 py-3 text-base font-bold text-black shadow-lg hover:bg-slate-200 transition-all"
                                >
                                    Github
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
