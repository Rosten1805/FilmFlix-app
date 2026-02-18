'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/movies', label: 'Películas' },
  { href: '/tv', label: 'Series' },
  { href: '/genres', label: 'Géneros' },
  { href: '/milista', label: 'Mi Lista' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-black/95 backdrop-blur-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-[65px]">

        {/* Fila principal */}
        <div className="flex items-center h-14 sm:h-16 lg:h-[72px] gap-3">

          {/* Logo — siempre visible */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <Image
              src="/logo-filmflix.png"
              alt="VerFlix Logo"
              width={160}
              height={53}
              className="h-8 sm:h-10 lg:h-12 w-auto"
              priority
            />
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden md:flex flex-1 items-center gap-6 ml-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  isActive(href) ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Acciones derecha — desktop */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
            <SearchBar className="w-48 lg:w-[280px]" />
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors whitespace-nowrap"
            >
              <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Iniciar sesión</span>
            </Link>
          </div>

          {/* Hamburger — solo mobile */}
          <button
            className="md:hidden ml-auto flex items-center justify-center w-10 h-10 text-white rounded-md hover:bg-zinc-800/50 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Buscador en fila propia — solo mobile */}
        <div className="md:hidden pb-3">
          <SearchBar className="w-full" />
        </div>

        {/* Menú desplegable — solo mobile */}
        {menuOpen && (
          <nav className="md:hidden border-t border-zinc-800/50 py-4 flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`px-2 py-2.5 rounded-md text-sm font-medium transition-colors hover:bg-zinc-800/50 hover:text-white ${
                  isActive(href) ? 'text-white bg-zinc-800/30' : 'text-zinc-400'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-zinc-800/50">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-2 py-2.5 rounded-md text-sm font-medium text-zinc-400 hover:bg-zinc-800/50 hover:text-white transition-colors"
              >
                <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Iniciar sesión
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
