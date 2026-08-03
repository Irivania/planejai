import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-lg font-semibold text-slate-900">
          Planejai
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-600">
          <Link to="/" className="transition hover:text-slate-900">
            Simulação
          </Link>
          <Link to="/results" className="transition hover:text-slate-900">
            Resultados
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
