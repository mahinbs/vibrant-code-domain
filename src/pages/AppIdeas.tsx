import { useState } from "react";
import CategoryFilter from "../components/AppIdeasCategoryFilter";
import ProductGrid from "../components/AppIdeasProductGrid";
import { mockProducts, categories } from "../data/app_ideas";

const AppIdeas = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProducts = activeCategory === "All"
        ? mockProducts
        : mockProducts.filter(product => product.category === activeCategory);

    return (
        <div className="dark min-h-screen bg-background overflow-x-hidden text-foreground">
            <header className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        Software Marketplace
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Discover premium software solutions for your business
                    </p>
                </div>
            </header>

            <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

            <ProductGrid
                products={filteredProducts}
            />
        </div>
    );
};

export default AppIdeas;
