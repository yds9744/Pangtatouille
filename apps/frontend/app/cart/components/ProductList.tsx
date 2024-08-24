"use client";
import React from 'react'
import Image from 'next/image'
import { Checkbox } from "@/components/ui/checkbox";
import { formatNumber } from "@/utils/formatNumber";
import { Product } from "@/types/product";
import { Minus, Plus } from 'lucide-react'

export default function ProductList({ products, quantityList, updateQuantityList, updateCheckedList }: {products: Product[], quantityList: number[]; updateQuantityList: (id: number, addNum: number) => void; updateCheckedList: (id: number) => void}) {
  return (
    <div>
      {products.map((product, index) => (
      <div key={product.id} className="flex items-center border-b py-4">
        <Checkbox
          defaultChecked={true}
          className="mt-2 mr-4 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          onCheckedChange = {() => updateCheckedList(index)}/>
        <Image src={product.imageUrl} alt={product.name} width={140} height={140} className="object-cover mr-4" />
        <div className="flex-grow space-y-2">
          {/* Content */}
          <span className="text-sm">{product.name}</span>
          <p className="text-sm text-green-600">{product.arrivalInfo}</p>
          {/* Price */}
          <div>
            {product.discountRate && product.basePrice && (
              <div className="flex flex-row items-baseline text-xs space-x-1">
                <span className="text-[11px] text-white font-bold bg-red-600 rounded px-1 py-[1px]">{product.discountRate}% 할인</span>
                <span className="text-red-600 font-medium">와우할인가</span>
                <span className="line-through text-gray-400">
                  {formatNumber(product.basePrice)}
                </span>
              </div>
            )}
            <div className="flex flex-row items-center space-x-2">
              <p className="text-xl font-bold">{product.price.toLocaleString()}원</p>
              <Image src="https://image6.coupangcdn.com/image/badges/falcon/v1/web/rocket-fresh@2x.png" alt="로켓프레시" width={72} height={16}/>
            </div>
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
              {product.rewardCash}원 적립
            </span>
          </div>
          {/* Quantity */}
          <div className="flex items-center mt-2">
            <button
              onClick={() => updateQuantityList(index, -1)}
              className="border rounded p-1"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="mx-2">{quantityList[index]}</span>
            <button
              onClick={() => updateQuantityList(index, 1)}
              className="border rounded p-1"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      ))}
    </div>
  )
}