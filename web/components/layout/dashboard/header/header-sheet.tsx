"use client";

import {
  Gauge,
  ChartBar,
  Headphones,
  Menu,
  Settings2,
  ShoppingBag,
  History,
  UsersRound,
  CloudUpload,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
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
    <SheetClose asChild>
      <Link
        href={href}
        className={`flex items-center gap-3 rounded-lg px-4 py-4 w-full text-foreground transition-all ${
          isActive ? "bg-secondary" : "hover:bg-secondary/50"
        }`}
      >
        {IconComponent}
        <span>{label}</span>
      </Link>
    </SheetClose>
  );
};

export const HeaderSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="mr-auto sm:hidden">
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <div className="flex py-4 items-center border-b px-4 justify-normal">
          <SheetClose asChild>
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <CloudUpload strokeWidth={2} className="h-10 text-primary" />
              <span className="text-xl">Cloud Facility</span>
            </Link>
          </SheetClose>
        </div>
        <nav className="grid items-start text-base font-medium space-y-2 mt-2">
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
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-full mt-auto gap-3 rounded-lg px-4 py-4 h-auto text-foreground transition-all text-base font-medium"
            >
              <Settings2 size={20} />
              <span className="mr-auto">Configurações</span>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-full mt-auto gap-3 rounded-lg px-4 py-4 h-auto text-foreground transition-all text-base font-medium"
            >
              <Headphones size={20} />
              <span className="mr-auto">Ajuda & Suporte</span>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};
