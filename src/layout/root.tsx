import { ChatGPT } from "@components/ChatGPT";
import { Logo } from "@components/Logo";
import { NavLink } from "@components/NavItem";
import * as Accordion from "@radix-ui/react-accordion";
import {
  ChevronRight,
  CircuitBoard,
  Factory,
  Home,
  LogOut,
  LucideIcon,
  ScrollText,
  User2,
} from "lucide-react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import userDefaultImg from "../assets/user-default.png";
import { useAuth } from "../store/contexts/auth";

type Children = Pick<ILink, "name" | "path" | "icon">;
interface ILink {
  name: string;
  path: string;
  icon: LucideIcon;
  permission: string[];
  children: Children[];
}
const links: ILink[] = [
  {
    name: "Home",
    path: "/",
    icon: Home,
    permission: [],
    children: [] as Children[],
  },
  {
    name: "Usuários",
    path: "/user",
    icon: User2,
    permission: ["administrator"],
    children: [] as Children[],
  },
  {
    name: "Criar Testes",
    path: "/test",
    icon: CircuitBoard,
    permission: ["administrator"],
    children: [] as Children[],
  },
  {
    name: "Fábrica Testes",
    path: "/generate",
    icon: Factory,
    permission: [],
    children: [
      {
        name: "FTTH-BITSTREAM",
        path: "generate/FTTH-BITSTREAM",
        icon: ScrollText,
      },
      {
        name: "FTTH-WHITELABEL",
        path: "/generate/FTTH-WHITELABEL",
        icon: ScrollText /*  */,
      },
      /*       { name: "FTTH-VOIP", path: "/generate/FTTH-VOIP", icon: ScrollText },
      { name: "NETWIN", path: "/generate/NETWIN", icon: ScrollText },
      { name: "NETQ", path: "/generate/NETQ", icon: ScrollText },
      { name: "BSS", path: "/generate/BSS", icon: ScrollText }, */
    ] as Children[],
  },
];

export const RootLayout = () => {
  const { signOut, token, user } = useAuth();

  useEffect(() => {
    if (!token) {
      signOut(user?.id);
    }
  });

  const handleLogout = () => {
    signOut(user?.id);
  };

  const linksSegurity = links.filter(
    (link) =>
      !link.permission?.length ||
      link.permission?.includes(user?.role.toLowerCase())
  );
  return (
    <>
      <div className="flex h-screen relative">
        <aside className="flex flex-col justify-between gap-8 w-24 md:w-80 transition-all duration-150 bg-zinc-600 text-zinc-50 h-full shadow-lg">
          <div className="py-6 flex-1 flex flex-col gap-20">
            <Logo />

            <nav className="space-y-1">
              {linksSegurity.map((link, index) => {
                if (link.children.length) {
                  return (
                    <Accordion.Root
                      key={link.name + index}
                      type="single"
                      defaultValue="item-1"
                      collapsible
                    >
                      <Accordion.Item value={link.name}>
                        <Accordion.Trigger className="data-[state=open]:bg-yellow-500 group py-4 px-2 bg-zinc-800 text-center flex w-full justify-center gap-8 hover:bg-yellow-400 transition-colors duration-150">
                          <link.icon className="group-data-[state=open]:text-zinc-800 h-5 w-5 text-zinc-400 group-hover:text-zinc-800" />
                          <span className="group-data-[state=open]:text-zinc-800 font-medium text-zinc-100 transition-colors duration-150 group-hover:text-zinc-800 hidden md:block">
                            {link.name}
                          </span>
                          <ChevronRight className="group-data-[state=open]:text-zinc-800 group-data-[state=open]:rotate-90 ml-auto h-5 w-5 text-zinc-400 group-hover:text-zinc-800 transition-all hidden md:block duration-200" />
                        </Accordion.Trigger>
                        <Accordion.Content>
                          {link.children.map((child) => (
                            <NavLink
                              className="pl-10 bg-zinc-700"
                              key={child.path}
                              path={child.path}
                              title={child.name}
                              icon={child.icon}
                            />
                          ))}
                        </Accordion.Content>
                      </Accordion.Item>
                    </Accordion.Root>
                  );
                }
                return (
                  <NavLink
                    key={link.path}
                    path={link.path}
                    title={link.name}
                    icon={link.icon}
                  />
                );
              })}
            </nav>
          </div>

          <div className="rounded-sm bg-zinc-600 w-full px-2 py-4">
            <div className="text-zinc-50 text-center flex items-center md:items-start flex-col md:flex-row gap-3">
              <div className="text-base flex items-center gap-2 flex-1">
                <img src={userDefaultImg} className="rounded-full w-10 h-10" />
                {user && (
                  <span className="text-zinc-200 text-sm hidden md:block">
                    {user.username}
                  </span>
                )}{" "}
              </div>
              <button
                className="flex items-center justify-between gap-2 text-sm p-2 hover:bg-zinc-100/10 rounded-md transition-all duration-200 active:scale-95"
                onClick={handleLogout}
              >
                Sair
                <LogOut className="h-4 w-4 text-current" />
              </button>
            </div>
          </div>

          <footer className="w-full bg-zinc-400 text-zinc-800 p-2 border-t border-zinc-700">
            <p className="text-xs font-medium md:text-sm">
              © {new Date().getFullYear()} V.tal.{" "}
              <span className="hidden md:inline-block">
                Todos os direitos reservados.
              </span>
            </p>
          </footer>
        </aside>
        <div className="flex flex-col pl-4 py-6 pr-6 overflow-x-hidden flex-1">
          <Outlet />
          <ChatGPT />
          {/*    <button className="rounded-full w-fit p-4 flex items-center justify-center border bg-zinc-200 border-zinc-300 shadow-md text-zinc-500 absolute bottom-6 right-6 hover:bg-yellow-400 hover:text-zinc-800 hover:border-yellow-200 transition-all duration-200 active:scale-105">
      <Bot className="w-8 h-8 text-current" />
    </button> */}
        </div>
      </div>
    </>
  );
};
