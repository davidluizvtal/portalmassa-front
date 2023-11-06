import { ChevronRight } from "lucide-react";
import { ElementType } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export interface NavItemProps {
  path: string;
  title: string;
  icon: ElementType;
  className?: string;
}

export function NavLink({ path, title, icon: Icon, className }: NavItemProps) {
  return (
    <Link
      className={twMerge(
        "group py-4 px-2 bg-zinc-800 text-center flex justify-center gap-8 hover:bg-yellow-400 transition-colors duration-150",
        className
      )}
      to={path}
    >
      <Icon className="h-5 w-5 text-zinc-400 group-hover:text-zinc-800" />
      <span className="font-medium text-zinc-100 transition-colors duration-150 group-hover:text-zinc-800 hidden md:block">
        {title}
      </span>
      <ChevronRight className="ml-auto h-5 w-5 text-zinc-400 group-hover:text-zinc-800 transition-colors hidden md:block duration-150" />
    </Link>
  );
}
