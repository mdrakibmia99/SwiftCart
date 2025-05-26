import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

interface SubcategoryItem {
  id: string;
  name: string;
}

interface Category {
  name: string;
  subcategories: SubcategoryItem[];
  query: string;
}

interface MegaMenuProps {
  categories: Category[];
}

const MegaMenu = ({ categories }: MegaMenuProps) => {
  return (
    <div className="hidden md:flex justify-center border-t">
      <NavigationMenu>
        <NavigationMenuList>
          {categories.map((category, idx) => (
            <NavigationMenuItem key={idx + 1}>
              {category.subcategories.length === 0 ? (
                // Render as direct link if no subcategories
                <NavigationMenuLink asChild>
                  <Link
                    href="/products" // Direct link target
                    className="text-sm font-medium hover:text-primary data-[state=open]:text-primary px-2 py-3 w-full text-left"
                  >
                    {category.name}
                  </Link>
                </NavigationMenuLink>
              ) : (
                // Render dropdown for categories with subcategories
                <>
                  <NavigationMenuTrigger className="text-sm font-medium hover:text-primary data-[state=open]:text-primary">
                    {category.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="px-4 py-6 grid grid-cols-1 gap-6 w-[650px]">
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg mb-4">
                          {category.name}
                        </h3>
                        <ul className="grid grid-cols-3 gap-x-8 gap-y-2">
                          {category.subcategories.map((sub, idx) => (
                            <li key={idx + 1}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={
                                    category.query === "products"
                                      ? `/products/${sub.id}`
                                      : {
                                          pathname: "/products",
                                          query: { [category.query]: sub.id },
                                        }
                                  }
                                  className="hover:text-primary transition-colors block py-1 text-sm"
                                >
                                  {sub.name}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default MegaMenu;
