import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import { Video } from "@/types/video";
import { ProductCard } from "@/app/search/components/product-card";
import { Product } from "@/types/product";
import { RecipeCard } from "@/app/search/components/recipe-card";

export default async function Search() {
  const keyword = "새우";

  const recipeVideos: Video[] = await fetch(
    `http://localhost:8000/search/recipe/youtube/mock?query=${"새우볶음밥"}`
  ).then((res) => res.json());

  console.log("recipeVideos", recipeVideos);

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
          <ProductList recipeVideos={recipeVideos} />
        </div>
      </div>
    </main>
  );
}

function ProductList({ recipeVideos }: { recipeVideos: Video[] }) {
  const product: Product = {
    Id: 0,
    Name: "흰다리 새우살 (냉동), 300g(26~30size), 1팩",
    DiscountRate: 21,
    BasePrice: 9900,
    Price: 7730,
    Amount: 1,
    Unit: "팩",
    UnitPrice: 25.77,
    UnitPriceText: "(100g당 2,577원)",
    ArrivalInfo: "내일(토) 새벽 도착 보장",
    RatingTotalCnt: 3058,
    RewardCash: 77,
    ImageUrl:
      "https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/1200073317916374-985075ca-74a7-45f5-b956-fd65088e99a7.jpg",
  };
  const products: Product[] = Array(20).fill(product);

  return (
    <div className="grid grid-cols-4 gap-4">
      {recipeVideos.map((video) => (
        <RecipeCard recipeVieo={video} key={video.videoId} />
      ))}
      {products.map((product) => (
        <ProductCard product={product} key={product.Id} />
      ))}
    </div>
  );
}
