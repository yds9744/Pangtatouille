import Image from "next/image";
import { Star, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import { Video } from "@/types/video";

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
          <ProductList />
        </div>
      </div>
    </main>
  );
}

function ProductList() {
  const product = {
    name: "흰다리 새우살 (냉동), 300g(26~30size), 1팩",
    discount_rate: "21%",
    base_price: "9,900",
    price: "7,730",
    unit_price: "(100g당 2,577원)",
    arrival_info: "내일(토) 새벽 도착 보장",
    free_shipping: "무료배송",
    rating_total_cnt: "3058",
    reward_cash: "77",
    image:
      "https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/1200073317916374-985075ca-74a7-45f5-b956-fd65088e99a7.jpg",
  };
  const products = Array(20).fill(product);

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((product, index) => (
        <a href="/products" key={product.name}>
          <Card key={index}>
            <CardContent className="p-4 w-[220px]">
              <Image
                src={product.image}
                alt=""
                width={230}
                height={230}
                className="w-full mb-2 rounded-lg"
              />
              <span className="text-sm mt-2">{product.name}</span>
              <div className="my-2">
                {product.discount_rate && product.base_price && (
                  <div className="flex items-baseline text-xs space-x-1">
                    <span className="text-red-600 font-medium">와우할인가</span>
                    <span>{product.discount_rate}</span>
                    <span className="line-through text-gray-400">
                      {product.base_price}
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <span className="text-red-600 font-bold">
                    {product.price}원
                  </span>
                  <Image
                    src="https://image6.coupangcdn.com/image/badges/falcon/v1/web/rocket-fresh@2x.png"
                    alt="로켓프레시"
                    width={72}
                    height={16}
                  />
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  {product.unit_price}
                </div>
              </div>
              <div className="text-sm text-green-600 font-medium mb-2">{product.arrival_info}</div>
              <div className="text-sm mb-2">{product.free_shipping}</div>
              <div className="mt-2">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 stroke-yellow-400"
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-600">
                    ({product.rating_total_cnt})
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="flex text-xs items-center border border-gray-300 rounded-full px-2 py-1">
                    최대{" "}
                    <Image
                      src="https://image6.coupangcdn.com/image/badges/cashback/web/list-cash-icon@2x.png"
                      alt=""
                      width={15}
                      height={15}
                      className="mx-1"
                    />{" "}
                    {product.reward_cash}원 적립
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}
