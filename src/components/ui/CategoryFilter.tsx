import { Button } from "@/components/ui/button";
import useScrollAnimation from "@/hooks/use-scroll-animation";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  const filterRef = useScrollAnimation();

  return (
    <div className="w-full bg-card border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div
          ref={filterRef.ref}
          className={`transition-all duration-700 ${
            filterRef.isVisible ? 'animate-slide-up' : 'scroll-hidden'
          }`}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-accent">📱</span> Software Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category, index) => (
              <div
                key={category}
                className={`transition-all duration-700 ${
                  filterRef.isVisible ? `animate-scale-in animate-stagger-${(index % 6) + 1}` : 'scroll-hidden-scale'
                }`}
              >
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
