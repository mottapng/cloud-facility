import { HeaderSheet } from "./header-sheet";
import { ThemeMenu } from "./theme-menu";
import { UserMenu } from "./user-menu";

export const Header = () => {
  return (
    <div className="bg-background border-b fixed top-0 left-0 w-full z-10">
      <div className="sm:ml-[84px] xl:ml-[240px]">
        <div className="container mx-auto px-6 sm:px-14 flex items-center w-full py-4">
          <HeaderSheet />

          <div className="flex ml-auto">
            <ThemeMenu />
            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  );
};
