
import { blogCategories } from '@/data/blogs';

interface BlogCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const BlogCategories = ({ selectedCategory, onCategoryChange }: BlogCategoriesProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {blogCategories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default BlogCategories;
