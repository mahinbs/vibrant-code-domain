import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { adminDataService } from "@/services/adminDataService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Author {
  name: string;
  [key: string]: any;
}

interface BlogPost {
  id: string;
  title: string;
  author: Author;
  // The API might return either published_date or publishedDate
  published_date?: string;
  publishedDate?: string;
  // The API might return either reading_time or readingTime
  reading_time?: number;
  readingTime?: number;
  tags: string[];
  [key: string]: any;
}

const BlogList = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await adminDataService.getBlogs();

      // Use the real API data
      setBlogs(data);
    } catch (error) {
      console.error("Error loading blogs:", error);
      toast({
        title: "Error",
        description: "Failed to load blog posts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        await adminDataService.deleteBlog(id);
        await loadBlogs(); // Reload the list
        toast({
          title: "Blog post deleted",
          description: "The blog post has been successfully deleted.",
        });
      } catch (error) {
        console.error("Error deleting blog:", error);
        toast({
          title: "Error",
          description: "Failed to delete blog post. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "No date";

    try {
      // Convert to string if it's not already
      const dateStr = String(dateString);
      console.log("Formatting date:", dateStr);

      // Handle different date formats
      let date;

      // Check if it's just a date without time (YYYY-MM-DD)
      if (
        dateStr.match(/^\d{4}-\d{2}-\d{2}$/) ||
        dateStr.match(/^\d{4}-\d{1,2}-\d{1,2}$/)
      ) {
        const [year, month, day] = dateStr
          .split("-")
          .map((num) => parseInt(num, 10));
        date = new Date(year, month - 1, day);
        console.log("Parsed date parts:", { year, month, day });
      } else {
        // Handle ISO format or any other format
        date = new Date(dateStr);
      }

      // Check if the date is valid
      if (!isNaN(date.getTime())) {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const month = monthNames[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        const formatted = `${month} ${day}, ${year}`;
        console.log("Formatted date:", formatted);
        return formatted;
      } else {
        console.error("Invalid date:", dateStr);
        return dateStr;
      }
    } catch (error) {
      console.error("Error formatting date:", error);
      return String(dateString);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
        <span className="ml-2 text-black">Loading blog posts...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-3">
      <div className="flex items-center gap-4">
        <Button variant="outline" asChild className="border-gray-600 text-gray-900 hover:bg-gray-700 hover:text-white">
          <Link to="/admin">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-black">Blog Management</h1>
          <p className="text-gray-400">Manage your blog posts</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
          <Link to="/admin/blogs/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Blog Post
          </Link>
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">All Blog Posts ({blogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {blogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No blog posts found</p>
              <Button asChild className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                <Link to="/admin/blogs/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create your first blog post
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-700 border-b border-gray-600">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                      Author
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                      Reading Time
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                      Tags
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => {
                    // Debug info
                    console.log(`Blog ${blog.id}:`, {
                      title: blog.title,
                      published_date: blog.published_date,
                      publishedDate: blog.publishedDate,
                      reading_time: blog.reading_time,
                      readingTime: blog.readingTime,
                    });

                    return (
                      <tr key={blog.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                        <td className="px-4 py-4 text-sm font-medium text-white">
                          {blog.title}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-300">
                          {blog.author?.name || "Unknown"}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-300">
                          {blog.publishedDate
                            ? formatDate(blog.publishedDate)
                            : blog.published_date
                            ? formatDate(blog.published_date)
                            : "No date"}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-300">
                          {typeof blog.readingTime === "number"
                            ? `${blog.readingTime} min read`
                            : typeof blog.reading_time === "number"
                            ? `${blog.reading_time} min read`
                            : "Unknown"}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-300">
                          <div className="flex flex-wrap gap-1">
                            {blog.tags && blog.tags.length > 0 ? (
                              <>
                                {blog.tags.slice(0, 2).map((tag) => (
                                  <span
                                    key={tag}
                                    className="bg-cyan-700 text-cyan-200 px-2 py-1 rounded text-xs border border-cyan-600"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {blog.tags.length > 2 && (
                                  <span className="text-gray-500 text-xs">
                                    +{blog.tags.length - 2} more
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="text-gray-500">No tags</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-300">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                              <Link to={`/blog/${blog.id}`} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                              <Link to={`/admin/blogs/edit/${blog.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(blog.id)}
                              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogList;
