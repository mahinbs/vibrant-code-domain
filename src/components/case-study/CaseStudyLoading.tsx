
import { Skeleton } from '@/components/ui/skeleton';

const CaseStudyLoading = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Header Skeleton - Simplified */}
      <div className="h-16 bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-6 h-full flex items-center">
          <Skeleton className="h-8 w-32 bg-gray-800" />
        </div>
      </div>

      {/* Hero Section Skeleton - Optimized layout */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6 pt-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Back link */}
              <Skeleton className="h-4 w-32 mb-8 bg-gray-700" />
              
              {/* Client info */}
              <div className="flex items-center space-x-3 mb-4">
                <Skeleton className="w-12 h-12 rounded-full bg-gray-700" />
                <div>
                  <Skeleton className="h-4 w-24 mb-2 bg-gray-700" />
                  <Skeleton className="h-3 w-16 bg-gray-800" />
                </div>
              </div>
              
              {/* Title and description */}
              <Skeleton className="h-12 w-full mb-4 bg-gray-700" />
              <Skeleton className="h-4 w-full mb-2 bg-gray-800" />
              <Skeleton className="h-4 w-3/4 mb-8 bg-gray-800" />
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <Skeleton className="w-6 h-6 mx-auto mb-2 bg-gray-700" />
                    <Skeleton className="h-4 w-12 mx-auto mb-1 bg-gray-700" />
                    <Skeleton className="h-3 w-8 mx-auto bg-gray-800" />
                  </div>
                ))}
              </div>
              
              {/* Metrics */}
              <div className="flex gap-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-20 rounded-lg bg-gray-800" />
                ))}
              </div>
            </div>
            
            {/* Hero image */}
            <Skeleton className="h-96 w-full rounded-2xl bg-gray-800" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyLoading;
