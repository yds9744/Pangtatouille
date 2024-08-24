import Image from "next/image";
import { Product } from "@/types/product";
import { CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  return (
    <a href="/products" key={product.name}>
      <div className={cn("m-2 bg-card text-card-foreground")}>
        <CardContent className="p-0 w-[220px]">
          <div className="overflow-hidden mb-2 rounded-lg h-[220px] w-[220px]">
            <Image
              src={product.image_url}
              alt=""
              width={230}
              height={230}
              className="w-full mb-2 rounded-lg"
            />
          </div>
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
              <span className="text-red-600 font-bold">{product.price}원</span>
              <Image
                src="https://image6.coupangcdn.com/image/badges/falcon/v1/web/rocket-fresh@2x.png"
                alt="로켓프레시"
                width={72}
                height={16}
              />
            </div>
            <div className="text-xs text-gray-500 mb-2">
              {product.unit_price_text}
            </div>
          </div>
          <div className="text-sm text-green-600 font-medium mb-2">
            {product.arrival_info}
          </div>
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
      </div>
    </a>
  );
}
