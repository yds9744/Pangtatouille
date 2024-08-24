import Image from "next/image";
import Header from '@/components/Header'
import Options from './components/Options'
import ReviewList from './components/ReviewList'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Star, Heart, Share} from "lucide-react";
import { formatNumber } from '@/utils/formatNumber';

export default function Component() {
  const product = {
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
  }

  return (
    <div>
      <div className="min-h-screen">
        <Header/>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image */}
            <div className="w-full lg:w-1/2">
              <img src={product.ImageUrl} alt="" className="w-full h-auto"/>
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2">
              <div className="flex flex-row justify-between">
                {/* text area */}
                <div>
                  <h1 className="text-lg font-bold mb-1">{product.Name}</h1>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm text-blue-500">
                      {formatNumber(product.RatingTotalCnt)}개 상품평
                    </span>
                  </div>
                </div>
                {/* button area */}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-gray-300">
                    <Heart className="h-5 w-5 text-gray-500" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-gray-300">
                    <Share className="h-5 w-5 text-gray-500" />
                  </Button>
                </div>
              </div>
              <hr/>
              {/* Price */}
              <div className="my-2">
                {product.DiscountRate && product.BasePrice && (
                  <div className="flex items-baseline text-xs space-x-1">
                    <span>{product.DiscountRate}%</span>
                    <span className="line-through text-gray-400">
                      {formatNumber(product.BasePrice)}원
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <span className="text-xl text-red-600 font-bold">{formatNumber(product.Price)}원</span>
                  <span className="text-sm text-red-600">{product.UnitPriceText}</span>
                  {product.DiscountRate && product.BasePrice && (<span className="text-sm text-red-600 font-medium">와우할인가</span>)}
                  <Image src="https://image6.coupangcdn.com/image/badges/falcon/v1/web/rocket-fresh@2x.png" alt="로켓프레시" width={63} height={14}/>
                </div>
              </div>
              <div className="flex flex-row space-x-1 mb-2">
                <Image src="https://static.coupangcdn.com/image/badges/member/wow@2x.png" alt="" width={40} height={17} />
                <span className="text-sm">
                  고객님은 <span className="text-blue-600 font-bold">와우회원</span>으로
                </span>
              </div>
              <div className="mb-2">
                <span className="text-xs text-white bg-green-600 px-2 py-1">로켓프레시 구매가능</span>
              </div>
              <hr/>
              <div className="text-sm text-green-600 font-medium mt-2">{product.ArrivalInfo}</div>
              <div className="text-xs font-bold mb-2">무료배송</div>

              <Options/>
              <div className="flex items-center gap-2 mb-4">
                <Input type="number" value={1} min={1} className="w-20" />
                <Button variant="outline" className="flex-grow border-blue-600 text-blue-600">장바구니 담기</Button>
                <Button className="flex-grow bg-blue-600 text-white font-bold hover:bg-blue-700">바로구매 &gt;</Button>
              </div>

            </div>
          </div>
          {/* Details */}
          <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="p-0">
            <div className="grid grid-cols-4 divide-x divide-gray-200 text-sm">
              <div className="p-4 font-medium bg-gray-50">상품상세</div>
              <div className="p-4 font-medium bg-gray-50">상품평 (3,065)</div>
              <div className="p-4 font-medium bg-gray-50">상품문의</div>
              <div className="p-4 font-medium bg-gray-50">배송/교환/반품 안내</div>
            </div>
            <div className="p-4">
              {/* Content for the selected tab would go here */}
              <p className="text-gray-600">상품 상세 정보가 이 곳에 표시됩니다.</p>
            </div>
          </CardContent>
          </Card>
        </main>
      </div>
      <ReviewList/>
    </div>
  );
}