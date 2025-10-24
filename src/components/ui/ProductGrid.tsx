import ProductCard, { Product } from "./ProductCard";
import useScrollAnimation from "@/hooks/use-scroll-animation";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const gridRef = useScrollAnimation();

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">No products found in this category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div 
        ref={gridRef.ref}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
          gridRef.isVisible ? 'animate-fade-in' : 'scroll-hidden'
        }`}
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`transition-all duration-700 ${
              gridRef.isVisible ? `animate-scale-in animate-stagger-${(index % 6) + 1}` : 'scroll-hidden-scale'
            }`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
