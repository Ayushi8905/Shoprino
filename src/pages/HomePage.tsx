
import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { categories, products } from '@/lib/data';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Featured products - choose one from each category
  const featuredProducts = categories.map(category => 
    products.find(product => product.category === category.id)
  ).filter(Boolean);

  useEffect(() => {
    let result = products;
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(search) || 
          product.description.toLowerCase().includes(search)
      );
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Products</h1>
      
      {/* Featured Products Carousel */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {featuredProducts.map((product) => (
              <CarouselItem key={product?.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <div className="overflow-hidden rounded-lg">
                    <div className="p-4 bg-card">
                      <h3 className="font-semibold">{product?.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{product?.description}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 shrink-0">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSearch={setSearchTerm}
          />
        </div>
        
        <div className="flex-grow">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">
                Try changing your search criteria or browse all products.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
