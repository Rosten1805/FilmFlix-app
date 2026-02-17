import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-800 bg-black/50 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Logo y Descripción */}
        <div className="space-y-4">
          <Image src="/logo-filmflix.png" alt="FilmFlix Logo" width={140} height={47} className="h-10 w-auto" />
          <p className="text-sm text-zinc-400 leading-relaxed">
            Tu plataforma de streaming para descubrir y explorar películas y series de TV.
          </p>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/in/cristina-gomez-limon" target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition-colors hover:text-red-500" aria-label="LinkedIn">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://github.com/Rosten1805" target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition-colors hover:text-red-500" aria-label="GitHub">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Navegación */}
        <div>
          <h3 className="mb-4 text-base font-semibold text-white">Navegación</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="cursor-pointer text-zinc-400 transition-colors hover:text-white">Inicio</Link></li>
            <li><Link href="/movies" className="cursor-pointer text-zinc-400 transition-colors hover:text-white">Películas</Link></li>
            <li><Link href="/tv" className="cursor-pointer text-zinc-400 transition-colors hover:text-white">Series</Link></li>
            <li><Link href="/genres" className="cursor-pointer text-zinc-400 transition-colors hover:text-white">Géneros</Link></li>
            <li><Link href="/milista" className="cursor-pointer text-zinc-400 transition-colors hover:text-white">Mi Lista</Link></li>
          </ul>
        </div>

        {/* Géneros Populares */}
        <div>
          <h3 className="mb-4 text-base font-semibold text-white">Géneros Populares</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/genres/878" className="cursor-pointer text-zinc-400 transition-colors hover:text-white">Ciencia Ficción</Link></li>
            <li><Link href="/genres/53" className="cursor-pointer text-zinc-400 transition-colors hover:text-white">Thriller</Link></li>
            <li><Link href="/genres/16" className="cursor-pointer text-zinc-400 transition-colors hover:text-white">Animación</Link></li>
            <li><Link href="/genres/10749" className="cursor-pointer text-zinc-400 transition-colors hover:text-white">Romance</Link></li>
          </ul>
        </div>

        {/* Géneros */}
        <div>
          <h3 className="mb-4 text-base font-semibold text-white">Géneros</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/genres/28" className="cursor-pointer text-zinc-400 transition-colors hover:text-white">Acción</Link></li>
            <li><Link href="/genres/35" className="cursor-pointer text-zinc-400 transition-colors hover:text-white">Comedia</Link></li>
            <li><Link href="/genres/18" className="cursor-pointer text-zinc-400 transition-colors hover:text-white">Drama</Link></li>
            <li><Link href="/genres/27" className="cursor-pointer text-zinc-400 transition-colors hover:text-white">Terror</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright y TMDB */}
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 text-sm md:flex-row">
        <p className="text-zinc-500">© 2026 FilmFlix. Todos los derechos reservados.</p>
        <p className="text-zinc-500">
          Datos proporcionados por{' '}
          <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className="text-red-500 transition-colors hover:text-red-400">TMDB</a>
        </p>
        <p className="text-zinc-500">
          Hecho con <span className="text-red-500">❤</span> por{' '}
          <a href="https://www.cristinagomez-limon.com/" target="_blank" rel="noopener noreferrer" className="text-red-500 transition-colors hover:text-red-400">
            Cristina Cañadas Gómez - Limón
          </a>
        </p>
      </div>
    </footer>
  );
}
