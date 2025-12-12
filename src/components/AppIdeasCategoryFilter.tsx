import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
    return (
        <div className="w-full bg-card border-b border-border">
            <div className="container mx-auto px-4 py-6">
                <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-accent">📱</span> Software Categories
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category, index) => (
                            <div key={category}>
                                <Button
                                    variant={activeCategory === category ? "default" : "outline"}
                                    onClick={() => onCategoryChange(category)}
                                    className={`
                    transition-all duration-300
                    ${activeCategory === category
                                            ? 'bg-gradient-primary shadow-glow border-0'
                                            : 'bg-secondary hover:bg-secondary/80 border-border'
                                        }
                  `}
                                >
                                    {category}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryFilter;
