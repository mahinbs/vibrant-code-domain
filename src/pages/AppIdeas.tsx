import { useState } from "react";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import CategoryFilter from "../components/AppIdeasCategoryFilter";
import ProductGrid from "../components/AppIdeasProductGrid";
import { mockProducts, categories } from "../data/app_ideas";

const AppIdeas = () => {
    const [activeCategory, setActiveCategory] = useState("Micro SaaS");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = mockProducts.sort((a, b) => b.id - a.id).filter((product) => {
        const matchesCategory = activeCategory === "Micro SaaS"
            ? true
            : product.categories.includes(activeCategory);

        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="dark min-h-screen bg-background overflow-x-hidden text-foreground">
            <header className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-6">
                    <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        App Ideas Lab
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

            <div className="container mx-auto px-4 mt-6">
                <div className="relative max-w-md mr-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            <ProductGrid
                products={filteredProducts}
            />
        </div>
    );
};

export default AppIdeas;
