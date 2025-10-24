import { Card } from "@/components/ui/card";

export interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  author: string;
  image: string;
  rating: number;
  // sales: number;
  features: string[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleClick = () => {
    window.open(`/product/${product.id}`, '_blank');
  };

  return (
    <Card 
      className="group h-full cursor-pointer overflow-hidden bg-gradient-card border-border hover:border-accent transition-all duration-300 hover:shadow-glow hover:-translate-y-1"
      onClick={handleClick}
    >
      <div className="aspect-video overflow-hidden bg-secondary">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-accent transition-colors line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">by {product.author}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          {/* <span className="text-xs text-muted-foreground">{product.sales} sales</span> */}
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
