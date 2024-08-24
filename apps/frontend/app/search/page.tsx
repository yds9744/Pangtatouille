import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import { ProductCard } from "@/app/search/components/product-card";
import { Product } from "@/types/product";
import { Suspense } from "react";
import { RecipeCards } from "@/app/search/components/recipe-cards";
import { RecipeCardSkeleton } from "@/app/search/components/recipe-card-skeleton";

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
  const product: Product = {
    id: 0,
    name: "흰다리 새우살 (냉동), 300g(26~30size), 1팩",
    discountRate: 21,
    basePrice: 9900,
    price: 7730,
    amount: 1,
    unitPriceText: "(100g당 2,577원)",
    arrivalInfo: "내일(토) 새벽 도착 보장",
    ratingTotalCnt: 3058,
    rewardCash: 77,
    imageUrl:
      "https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/1200073317916374-985075ca-74a7-45f5-b956-fd65088e99a7.jpg",
    amountUnit: "g",
    quantity: 1,
    quantityUnit: "팩",
  };
  const products: Product[] = Array(20).fill(product);

  return (
    <div className="grid grid-cols-4 gap-4">
      <Suspense fallback={<RecipeCardSkeleton />}>
        <RecipeCards keyword={keyword} />
      </Suspense>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
