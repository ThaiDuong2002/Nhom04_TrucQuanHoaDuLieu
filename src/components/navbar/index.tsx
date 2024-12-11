import { domainData } from "@/constants";
import Link from "next/link";
import MaxWidthWrapper from "../max-width-wrapper";
import { buttonVariants } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import ListItem from "./list-item";

const Navbar = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 gap-5 items-center justify-start border-b border-zinc-200">
          <Link
            href="/"
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
            })}
          >
            Home
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Domains</NavigationMenuTrigger>
                <NavigationMenuContent asChild>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {domainData.map((domain) => (
                      <ListItem
                        key={domain.title}
                        title={domain.title}
                        href={domain.href}
                      >
                        {domain.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
