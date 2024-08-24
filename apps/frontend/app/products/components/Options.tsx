"use client"

import Image from "next/image";
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Options() {
    const [activeTab, setActiveTab] = useState("26~30")
  
    const options = {
      "26~30": [
        { pack: "1팩", Price: "7,730원", PricePerGram: "2,577원", discount: true },
        { pack: "2팩", Price: "14,990원", PricePerGram: "2,498원", discount: true },
        { pack: "3팩", Price: "22,020원", PricePerGram: "2,447원", discount: true },
        { pack: "6팩", Price: "41,850원", PricePerGram: "2,325원", discount: true, lowest: true },
      ],
      "31~50": [
        { pack: "1팩", Price: "6,980원", PricePerGram: "2,327원", discount: true },
        { pack: "2팩", Price: "13,560원", PricePerGram: "2,260원", discount: true },
        { pack: "3팩", Price: "19,890원", PricePerGram: "2,210원", discount: true },
        { pack: "6팩", Price: "37,800원", PricePerGram: "2,100원", discount: true, lowest: true },
      ],
    }
  
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text font-semibold mb-2">더 많은 옵션 보기</h2>
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
          <div>
            {options[activeTab].map((option, index) => (
              <div key={index} className="flex items-center space-x-11 p-4 border-b rounded-lg">
                <div className="flex items-center">
                  <RadioGroupItem value={`${option.pack}-${activeTab}`} id={`${option.pack}-${activeTab}`} />
                  <Label htmlFor={`${option.pack}-${activeTab}`} className="ml-2 font-semibold">{option.pack}</Label>
                </div>
                <div className="text-left">
                  <div className="flex flex-row">
                    <p className="font-semibold">
                      {option.Price} {option.discount && <span className="text-sm text-gray-800 font-normal">와우할인가</span>}
                    </p>
                    <div className="w-[75px] ml-2">
                      <Image src="https://image6.coupangcdn.com/image/badges/falcon/v1/web/rocket-fresh@2x.png" alt="로켓프레시" width={75} height={16}/>
                    </div>
                  </div>
                  <p className="text-sm">
                    100g당 {option.PricePerGram} {option.lowest && <span className="text-red-500">(최저 단위가)</span>}
                  </p>
                </div>
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