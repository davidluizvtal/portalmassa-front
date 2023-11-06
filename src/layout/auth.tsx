import { Logo } from '@components/Logo';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="flex h-screen">
      <aside className="flex flex-col justify-between gap-8 w-24 md:w-80 transition-all duration-150 bg-zinc-600 text-zinc-50 h-full shadow-lg">
        <div className="py-6 flex-1 flex flex-col gap-20">
          <Logo />
        </div>

        <footer className="w-full bg-zinc-400 text-zinc-800 p-2 border-t border-zinc-700">
          <p className="text-xs font-medium md:text-sm">
            © {new Date().getFullYear()} V.tal.{' '}
            <span className="hidden md:inline-block">
              Todos os direitos reservados.
            </span>
          </p>
        </footer>
      </aside>
      <div className="flex flex-col pl-4 py-6 pr-6 flex-1">
        <Outlet />
      </div>
    </div>
  );
};
