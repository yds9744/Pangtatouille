import { Star, ChevronRight, Truck, Info, Snowflake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";

export default function Component() {
  const keyword = "새우";
  return (
    <main className="min-h-screen">
      <Header />
      <div className="flex flex-col">
        <div className="bg-gray-100 px-60 py-2">
          <span className="text-sm">전체 &gt; `${keyword}`</span>
        </div>
        <div className="flex flex-row items-center justify-between px-60 py-4">
          <div>
            <span className="font-bold">{keyword}</span>
            <span>에 대한 검색결과</span>
          </div>
          <select className="border rounded p-2">
            <option>36개씩 보기</option>
          </select>
        </div>
        <div className="flex px-60 gap-8">
          <ProductList />
        </div>
      </div>
    </main>
  );
}

function ProductList() {
  const products = [
    {
      name: "흰다리 새우살 (냉동), 300g(26~30size), 1팩",
      dc_percent: "21%",
      price: "9,900",
      dc_price: "7,730원",
      unit_price: "(100g당 2,577원)",
      delivery_time: "내일(토) 새벽 도착 보장",
      delivery_price: "무료배송",
      review: "(3058)",
      point: "77",
      image:
        "https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/1200073317916374-985075ca-74a7-45f5-b956-fd65088e99a7.jpg",
    },
    {
      name: "흰다리 새우살 (냉동), 300g(26~30size), 1팩",
      dc_percent: "21%",
      price: "9,900",
      dc_price: "7,730원",
      unit_price: "(100g당 2,577원)",
      delivery_time: "내일(토) 새벽 도착 보장",
      delivery_price: "무료배송",
      review: "(3058)",
      point: "77",
      image:
        "https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/1200073317916374-985075ca-74a7-45f5-b956-fd65088e99a7.jpg",
    },
    {
      name: "흰다리 새우살 (냉동), 300g(26~30size), 1팩",
      dc_percent: "21%",
      price: "9,900",
      dc_price: "7,730원",
      unit_price: "(100g당 2,577원)",
      delivery_time: "내일(토) 새벽 도착 보장",
      delivery_price: "무료배송",
      review: "(3058)",
      point: "77",
      image:
        "https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/1200073317916374-985075ca-74a7-45f5-b956-fd65088e99a7.jpg",
    },
    {
      name: "흰다리 새우살 (냉동), 300g(26~30size), 1팩",
      dc_percent: "21%",
      price: "9,900",
      dc_price: "7,730원",
      unit_price: "(100g당 2,577원)",
      delivery_time: "내일(토) 새벽 도착 보장",
      delivery_price: "무료배송",
      review: "(3058)",
      point: "77",
      image:
        "https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/1200073317916374-985075ca-74a7-45f5-b956-fd65088e99a7.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product, index) => (
        <a href="/products" key={product.name}>
          <Card key={index}>
            <CardContent className="p-4">
              <img
                src={product.image}
                alt=""
                className="w-full mb-2 rounded-lg"
              />
              <span className="text-sm mt-2">{product.name}</span>
              <div className="my-2">
                <div className="flex items-baseline">
                  <span className="text-xs mr-2">{product.dc_percent}</span>
                  <span className="text-xs line-through text-gray-400 mr-2">
                    {product.price}
                  </span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-red-600 font-bold">
                    {product.dc_price}
                  </span>
                  <div className="flex items-center text-green-600 mb-2">
                    <Truck className="w-4 h-4 mr-1" />
                    <span className="text-sm">로켓프레시</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  {product.unit_price}
                </div>
              </div>
              <div className="text-sm text-blue-600 font-semibold mb-2">
                {product.delivery_time}
              </div>
              <div className="text-sm mb-2">{product.delivery_price}</div>
              <div className="mt-2">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                  <span className="ml-1 text-sm text-gray-600">
                    {product.review}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="flex items-center border border-gray-300 rounded-full px-2 py-1">
                    <span className="text-yellow-500 mr-1">C</span> 최대{" "}
                    {product.point}원 적립
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
