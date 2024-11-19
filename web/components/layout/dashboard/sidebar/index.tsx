"use client";

import {
  CloudUpload,
  Gauge,
  ChartBar,
  Headphones,
  History,
  Settings2,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/constants";

type IconKey = "Gauge" | "History" | "ChartBar" | "Users";

interface NavLinkProps {
  href: string;
  icon: IconKey;
  label: string;
}

const iconMap: Record<IconKey, JSX.Element> = {
  Gauge: <Gauge size={20} />,
  History: <History size={20} />,
  ChartBar: <ChartBar size={20} />,
  Users: <UsersRound size={20} />,
};

const NavLink = ({ href, icon, label }: NavLinkProps) => {
  const pathname = usePathname();

  const isActive =
    (pathname.includes(href) && href.length > 1) || pathname === href;

  const IconComponent = iconMap[icon];

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-4 py-4 w-full text-foreground transition-all ${
        isActive ? "bg-secondary" : "hover:bg-secondary/50"
      }`}
    >
      {IconComponent}
      <span className="hidden xl:block">{label}</span>
    </Link>
  );
};

export const Sidebar = () => {
  return (
    <div className="border-r bg-background hidden sm:block max-w-60 fixed left-0 top-0 h-full z-20">
      <div className="flex h-full max-h-screen flex-col">
        <div className="flex py-4 items-center border-b px-4 justify-center xl:justify-normal">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <CloudUpload strokeWidth={2} className="h-10 text-primary" />
            <span className="text-xl hidden xl:block">Cloud Facility</span>
          </Link>
        </div>
        <div className="flex-1 px-4 h-full flex flex-col my-4">
          <nav className="grid items-start text-base font-medium space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                icon={link.icon as IconKey}
                label={link.label}
              />
            ))}
          </nav>
          <div className="mt-auto h-fit">
            <Button
              variant="ghost"
              size="icon"
              className="w-full mt-auto gap-3 rounded-lg xl:px-4 py-4 h-auto text-foreground transition-all text-base font-medium hover:bg-secondary/50"
            >
              <Settings2 size={20} />
              <span className="mr-auto hidden xl:block">Configurações</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-full mt-auto gap-3 rounded-lg xl:px-4 py-4 h-auto text-foreground transition-all text-base font-medium hover:bg-secondary/50"
            >
              <Headphones size={20} />
              <span className="mr-auto hidden xl:block">Ajuda & Suporte</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
