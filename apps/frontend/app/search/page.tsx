import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import { ProductCard } from "@/app/search/components/product-card";
import { Product } from "@/types/product";
import { Suspense } from "react";
import { YoutubeRecipeCards } from "@/app/search/components/youtube-recipe-cards";
import { RecipeCardSkeleton } from "@/app/search/components/recipe-card-skeleton";
import { mockProducts } from "@/app/search/constant/product.constant";
import { BlogRecipeCards } from "@/app/search/components/blog-recipe-cards";

export default async function Search({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const keyword = searchParams?.keyword as string;

  return (
    <main className="min-h-screen">
      <Header />
      <div className="flex flex-col">
        <div className="bg-gray-100 px-60 py-2">
          <span className="flex items-center text-sm">
            전체
            <ChevronRight className="w-4 h-4 mx-1" />
            {keyword}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between px-60 py-4">
          <div>
            <span className="font-bold">{keyword}</span>
            <span>에 대한 검색결과</span>
          </div>
          <select className="border rounded text-sm p-2">
            <option>36개씩 보기</option>
          </select>
        </div>
        <div className="flex flex-col items-center">
          <ProductList keyword={keyword} />
        </div>
      </div>
    </main>
  );
}

function ProductList({ keyword }: { keyword: string }) {
  const products: Product[] = mockProducts;

  return (
    <div className="grid grid-cols-4 gap-4">
      <Suspense fallback={<RecipeCardSkeleton />}>
        <YoutubeRecipeCards keyword={keyword} />
      </Suspense>
      <Suspense fallback={<RecipeCardSkeleton />}>
        <BlogRecipeCards keyword={keyword} />
      </Suspense>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
