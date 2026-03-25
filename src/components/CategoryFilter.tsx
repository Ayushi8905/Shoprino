
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Utensils, Bath, Pencil, Shirt, Wheat, Search } from "lucide-react";
import { Category } from "@/lib/data";

type CategoryFilterProps = {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  onSearch: (searchTerm: string) => void;
};

const getCategoryIcon = (id: string) => {
  switch (id) {
    case 'food':
      return <Utensils className="h-4 w-4" />;
    case 'toiletries':
      return <Bath className="h-4 w-4" />;
    case 'stationery':
      return <Pencil className="h-4 w-4" />;
    case 'clothing':
      return <Shirt className="h-4 w-4" />;
    case 'grains':
      return <Wheat className="h-4 w-4" />;
    default:
      return null;
  }
};

export function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onSelectCategory, 
  onSearch 
}: CategoryFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="w-full md:w-64 bg-card border rounded-lg shadow-sm p-4">
      <div className="mb-4">
        <form onSubmit={handleSearchSubmit} className="flex space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
          <Button type="submit" size="sm">Search</Button>
        </form>
      </div>

      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories" className="border-none">
          <AccordionTrigger className="py-2 text-base font-medium">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="h-[calc(100vh-250px)] md:h-auto pr-3">
              <div className="space-y-1">
                <Button
                  variant={selectedCategory === null ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => onSelectCategory(null)}
                >
                  All Products
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => onSelectCategory(category.id)}
                  >
                    <span className="mr-2">{getCategoryIcon(category.id)}</span>
                    {category.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
