"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import Image from "next/image";
import Header from '@/components/Header'
import ReviewList from './components/ReviewList'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Rocket, Star, Heart, Share} from "lucide-react";

export default function Component() {
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
  }

  return (
    <div>
      <div className="min-h-screen">
        <Header/>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image */}
            <div className="w-full lg:w-1/2">
              <img src={product.image} alt="" className="w-full h-auto"/>
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2">
              <div className="flex flex-row justify-between">
                {/* text area */}
                <div>
                  <h1 className="text-lg font-bold mb-1">{product.name}</h1>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    ))}
                    <span className="ml-2 text-sm text-blue-500">
                      {product.rating_total_cnt}개 상품평
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
              {/* Price */}
              <div className="my-2">
                {product.discount_rate && product.base_price && (
                  <div className="flex items-baseline text-xs space-x-1">
                    <span>{product.discount_rate}</span>
                    <span className="line-through text-gray-400">
                      {product.base_price}
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <span className="text-xl text-red-600 font-bold">{product.price}원</span>
                  <span className="text-red-600">{product.unit_price}</span>
                  {product.discount_rate && product.base_price && (<span className="text-red-600 font-medium">와우할인가</span>)}
                  <Image src="https://image6.coupangcdn.com/image/badges/falcon/v1/web/rocket-fresh@2x.png" alt="로켓프레시" width={63} height={14}/>
                </div>
             </div>
              <div className="text-sm text-green-600 font-medium mb-2">{product.arrival_info}</div>
              <div className="text-sm mb-2">{product.free_shipping}</div>


              <Options/>
              <div className="flex items-center gap-2 mb-4">
                <Input type="number" value={1} min={1} className="w-20" />
                <Button variant="outline" className="flex-grow border-blue-600 text-blue-600">장바구니 담기</Button>
                <Button className="flex-grow bg-blue-600 :bg-blue-700 text-white">바로구매 &gt;</Button>
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


function Options() {
  const [activeTab, setActiveTab] = useState("26~30")

  const options = {
    "26~30": [
      { pack: "1팩", price: "7,730원", pricePerGram: "2,577원", discount: true },
      { pack: "2팩", price: "14,990원", pricePerGram: "2,498원", discount: true },
      { pack: "3팩", price: "22,020원", pricePerGram: "2,447원", discount: true },
      { pack: "6팩", price: "41,850원", pricePerGram: "2,325원", discount: true, lowest: true },
    ],
    "31~50": [
      { pack: "1팩", price: "6,980원", pricePerGram: "2,327원", discount: true },
      { pack: "2팩", price: "13,560원", pricePerGram: "2,260원", discount: true },
      { pack: "3팩", price: "19,890원", pricePerGram: "2,210원", discount: true },
      { pack: "6팩", price: "37,800원", pricePerGram: "2,100원", discount: true, lowest: true },
    ],
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-2">더 많은 옵션 보기</h2>
      <p className="text-sm text-gray-600 mb-4">중량 × 수량: 300g({activeTab}size) × 1팩</p>
      
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <button
            className={`text-lg font-semibold ${activeTab === "26~30" ? "text-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("26~30")}
          >
            300g(26~30size)
          </button>
          <button
            className={`text-lg font-semibold ${activeTab === "31~50" ? "text-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("31~50")}
          >
            300g(31~50size)
          </button>
        </div>
        <div className="h-1 bg-gray-200 rounded">
          <div 
            className="h-1 bg-blue-600 rounded transition-all duration-300 ease-in-out" 
            style={{ width: activeTab === "26~30" ? "50%" : "100%", marginLeft: activeTab === "26~30" ? "0" : "50%" }}
          ></div>
        </div>
      </div>

      <RadioGroup defaultValue="1pack">
        <div className="space-y-4">
          {options[activeTab].map((option, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <RadioGroupItem value={`${option.pack}-${activeTab}`} id={`${option.pack}-${activeTab}`} />
                <Label htmlFor={`${option.pack}-${activeTab}`} className="ml-2 font-semibold">{option.pack}</Label>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {option.price} {option.discount && <span className="text-gray-500 font-normal">와우할인가</span>}
                </p>
                <p className="text-sm text-gray-600">
                  100g당 {option.pricePerGram} {option.lowest && <span className="text-red-500">(최저 단위가)</span>}
                </p>
              </div>
              <Rocket className="w-5 h-5 text-green-500 ml-2" />
            </div>
          ))}
        </div>
      </RadioGroup>

      <Button variant="outline" className="w-full mt-4 text-blue-600">
        모든 옵션 보기 &gt;
      </Button>
    </div>
  )
}
