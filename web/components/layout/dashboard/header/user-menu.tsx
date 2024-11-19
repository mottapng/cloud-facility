import { ChevronDown, UserCircle2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserProps {
  name: string;
  email: string;
  image?: string;
}

export const UserMenu = () => {
  const user: UserProps | null = {
    name: "João da Silva",
    email: "joaodasilva@email.com",
  };

  function getInitials(name: string) {
    const nameParts = name.split(" ").filter((part) => part.length > 0);

    if (nameParts.length === 0) return;

    const getFirstUpperCase = (str: string): string => {
      const upperLetters = str.match(/[A-Z]/g);
      return upperLetters?.[0] || str[0]?.toUpperCase() || "";
    };

    if (nameParts.length === 1) {
      const upperLetters = nameParts[0].match(/[A-Z]/g);
      if (upperLetters && upperLetters.length >= 2) {
        return upperLetters.slice(0, 2).join("");
      }
      return nameParts[0].slice(0, 2).toUpperCase();
    }

    const firstInitial = getFirstUpperCase(nameParts[0]);
    const lastInitial = getFirstUpperCase(nameParts[nameParts.length - 1]);

    return `${firstInitial}${lastInitial}`;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          {user ? (
            <div className="flex items-center space-x-2">
              <Avatar>
                {user.image && <AvatarImage src={user.image} />}
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <h3 className="text-base">{user.name}</h3>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <ChevronDown
                size={18}
                className="text-muted-foreground mt-1 hidden sm:block"
              />
            </div>
          ) : (
            <UserCircle2 size={40} />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <b>Minha Conta</b>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Configurações</DropdownMenuItem>
        <DropdownMenuItem>Suporte</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
