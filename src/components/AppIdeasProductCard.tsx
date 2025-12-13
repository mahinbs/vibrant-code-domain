import { Card } from "@/components/ui/card";

export interface Product {
    id: number;
    title: string;
    categories: string[];
    description: string;
    author: string;
    image: string;
    rating: number;
    price: number;
    // sales: number;
    features: string[];
}

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const handleClick = () => {
        // Navigate to local route instead of opening in new tab, or keep as is if desired.
        // User requested /app-ideas/product/:id
        // The source used window.open('/product/' + product.id, '_blank').
        // I should probably change this to navigate internally if it's an SPA, but strict copy is safer for behavior.
        // However, user said "Use /app-ideas and /app-ideas/product/:id as routes."
        // So I should link to `/app-ideas/product/${product.id}`
        window.location.href = `/app-ideas/product/${product.id}`;
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
                <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-blue-500 transition-colors line-clamp-2">
                    {product.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">by {product.author}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">
                    ₹{product.price.toLocaleString()}
                    </span>
                    {/* <span className="text-xs text-muted-foreground">{product.sales} sales</span> */}
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;
