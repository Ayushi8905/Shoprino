
import { Link } from 'react-router-dom';
import { ShoppingBag, LogIn, UserPlus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

export function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SHOPRINO</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden sm:flex space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/login" className="flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button asChild>
                <Link to="/register" className="flex items-center">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12 lg:py-24">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Welcome to <span className="text-primary">SHOPRINO</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-md">
              Your one-stop shop for all your needs. Browse categories, find the best deals, and shop with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/shop" className="flex items-center">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/login">Login to your account</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                <ShoppingBag className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold">Vast Selection</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Thousands of products across categories
                </p>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                <svg className="h-8 w-8 text-primary mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 7L12 3L4 7M20 7V17L12 21M20 7L12 11M12 21L4 17V7M12 21V11M4 7L12 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Quick and reliable shipping options
                </p>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                <svg className="h-8 w-8 text-primary mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="font-semibold">Best Prices</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Competitive pricing and regular discounts
                </p>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
                <svg className="h-8 w-8 text-primary mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 20L20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 16L20 4L8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 8L4 20L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="font-semibold">Secure Checkout</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Secure and hassle-free payment options
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 animate-pulse rounded-full opacity-25 bg-gradient-to-r from-primary via-white/10 to-accent blur-3xl"></div>
            <div className="relative glass-card rounded-2xl overflow-hidden shadow-xl animate-scale-in">
              <div className="grid grid-cols-2 gap-px bg-muted">
                <div className="aspect-square bg-background p-4 flex items-center justify-center">
                  <img src="https://source.unsplash.com/random/300x300/?food" alt="Food products" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="aspect-square bg-background p-4 flex items-center justify-center">
                  <img src="https://source.unsplash.com/random/300x300/?toiletries" alt="Toiletries" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="aspect-square bg-background p-4 flex items-center justify-center">
                  <img src="https://source.unsplash.com/random/300x300/?stationery" alt="Stationery" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="aspect-square bg-background p-4 flex items-center justify-center">
                  <img src="https://source.unsplash.com/random/300x300/?clothing" alt="Clothing" className="w-full h-full object-cover rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose Shoprino?</h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Experience shopping like never before with our innovative features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 3L14 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 21H3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 21L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Undo Feature</h3>
              <p className="text-muted-foreground">
                Made a mistake? No worries. Our unique undo feature lets you revert cart actions instantly.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 13C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11C9.44772 11 9 11.4477 9 12C9 12.5523 9.44772 13 10 13Z" fill="currentColor"/>
                  <path d="M14 13C14.5523 13 15 12.5523 15 12C15 11.4477 14.5523 11 14 11C13.4477 11 13 11.4477 13 12C13 12.5523 13.4477 13 14 13Z" fill="currentColor"/>
                  <path d="M18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12C17 12.5523 17.4477 13 18 13Z" fill="currentColor"/>
                  <path d="M21 3H3C1.89543 3 1 3.89543 1 5V17C1 18.1046 1.89543 19 3 19H7.96857L11.1543 21.7772C11.6664 22.2356 12.4454 22.2153 12.9321 21.7286L15.8135 19H21C22.1046 19 23 18.1046 23 17V5C23 3.89543 22.1046 3 21 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Emoji Feedback</h3>
              <p className="text-muted-foreground">
                Share your shopping experience using our simple emoji-based feedback system.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 16L8 7L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 14H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 5L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 9L18 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Invoice</h3>
              <p className="text-muted-foreground">
                Get detailed PDF invoices with embedded QR codes for easy tracking and management.
              </p>
            </div>
          </div>
        </div>
        
        <div className="py-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Browse Our Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-card rounded-lg overflow-hidden border hover:shadow-md transition-all group">
              <div className="h-40 overflow-hidden">
                <img 
                  src="https://source.unsplash.com/random/400x300/?food" 
                  alt="Food Category" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">Food</h3>
                <p className="text-sm text-muted-foreground">Quality grocery items</p>
                <Button asChild variant="link" className="mt-2">
                  <Link to="/shop">Explore Food</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-card rounded-lg overflow-hidden border hover:shadow-md transition-all group">
              <div className="h-40 overflow-hidden">
                <img 
                  src="https://source.unsplash.com/random/400x300/?toiletries" 
                  alt="Toiletries Category" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">Toiletries</h3>
                <p className="text-sm text-muted-foreground">Personal care products</p>
                <Button asChild variant="link" className="mt-2">
                  <Link to="/shop">Explore Toiletries</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-card rounded-lg overflow-hidden border hover:shadow-md transition-all group">
              <div className="h-40 overflow-hidden">
                <img 
                  src="https://source.unsplash.com/random/400x300/?stationery" 
                  alt="Stationery Category" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">Stationery</h3>
                <p className="text-sm text-muted-foreground">Office and school supplies</p>
                <Button asChild variant="link" className="mt-2">
                  <Link to="/shop">Explore Stationery</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-card rounded-lg overflow-hidden border hover:shadow-md transition-all group">
              <div className="h-40 overflow-hidden">
                <img 
                  src="https://source.unsplash.com/random/400x300/?clothing" 
                  alt="Clothing Category" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">Clothing</h3>
                <p className="text-sm text-muted-foreground">Fashionable apparel</p>
                <Button asChild variant="link" className="mt-2">
                  <Link to="/shop">Explore Clothing</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-card rounded-lg overflow-hidden border hover:shadow-md transition-all group">
              <div className="h-40 overflow-hidden">
                <img 
                  src="https://source.unsplash.com/random/400x300/?grains" 
                  alt="Grains Category" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">Grains</h3>
                <p className="text-sm text-muted-foreground">Premium quality grains</p>
                <Button asChild variant="link" className="mt-2">
                  <Link to="/shop">Explore Grains</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-12 text-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to dive in?</h2>
            <p className="text-muted-foreground mb-6">
              Create an account now to start enjoying our full range of features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/shop">Browse Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 md:h-16">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <span className="font-medium">SHOPRINO</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Shoprino. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
