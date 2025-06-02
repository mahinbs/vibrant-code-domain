
import { Skeleton } from '@/components/ui/skeleton';

const CaseStudyLoading = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Header Skeleton */}
      <div className="h-16 bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-6 h-full flex items-center">
          <Skeleton className="h-8 w-32" />
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6 pt-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-16 w-full mb-6" />
              <Skeleton className="h-6 w-3/4 mb-8" />
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <Skeleton className="w-6 h-6 mx-auto mb-2" />
                    <Skeleton className="h-4 w-12 mx-auto mb-1" />
                    <Skeleton className="h-3 w-8 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Content Sections Skeleton */}
      <div className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-12 w-64 mx-auto mb-12" />
            <div className="grid lg:grid-cols-2 gap-12">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="h-48 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyLoading;
