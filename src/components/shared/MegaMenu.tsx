import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
interface Category {
  name: string;
  subcategories: string[];
  query : string
}

interface MegaMenuProps {
  categories: Category[];
}
const MegaMenu = ({ categories }: MegaMenuProps) => {
  return (
    <div className="hidden md:flex justify-center border-t">
      <NavigationMenu>
        <NavigationMenuList>
          {categories.map((category) => (
            <NavigationMenuItem key={category.name}>
              <NavigationMenuTrigger className="text-sm font-medium hover:text-primary data-[state=open]:text-primary">
                {category.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className=" px-4 py-6 grid grid-cols-1 gap-6 w-[650px]">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg mb-4">{category.name}</h3>
                    <ul className="grid grid-cols-3 gap-x-8 gap-y-2">
                      {category.subcategories.map((sub) => (
                        <li key={sub}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={{
                                pathname: "/products",
                                query: {
                                  [category.query]: sub
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")
                                },
                              }}
                              className="hover:text-primary transition-colors block py-1 text-sm"
                            >
                              {sub}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default MegaMenu;
