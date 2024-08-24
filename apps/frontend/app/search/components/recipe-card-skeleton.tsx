export function RecipeCardSkeleton() {
  return (
    <div className="m-2 bg-card text-card-foreground animate-pulse">
      <div className="p-0 w-[220px] h-[430px]">
        <div className="overflow-hidden mb-2 rounded-lg h-[220px] w-[220px] bg-gray-300" />
        <div className="h-4 bg-gray-300 mt-2 rounded"></div>
        <div className="h-fit mt-2">
          <div className="h-3 bg-gray-300 rounded"></div>
          <div className="h-3 bg-gray-300 rounded mt-1"></div>
        </div>
        <div className="my-2">
          <div className="flex items-baseline text-xs space-x-1">
            <div className="h-3 bg-gray-300 rounded w-12"></div>
            <div className="h-3 bg-gray-300 rounded w-10"></div>
            <div className="h-3 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="flex items-center space-x-1 mt-2">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-300 rounded w-24 mt-2"></div>
        <div className="mt-2">
          <div className="flex items-center mb-2 space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-300 rounded-full"></div>
            ))}
            <div className="h-3 bg-gray-300 rounded w-10 ml-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
