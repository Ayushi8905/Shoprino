
import { create } from 'zustand';
import { products as initialProducts } from '@/lib/data';
import { Product } from '@/lib/data';

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: initialProducts,
  
  addProduct: (product: Product) => 
    set((state) => ({
      products: [...state.products, product]
    })),
  
  updateProduct: (updatedProduct: Product) => 
    set((state) => ({
      products: state.products.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    })),
  
  deleteProduct: (id: string) => 
    set((state) => ({
      products: state.products.filter(product => product.id !== id)
    })),
}));
