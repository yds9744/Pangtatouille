"use client";
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/types/product";
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react'
import { formatNumber } from "@/utils/formatNumber";

const product : Product = {
  id: 0,
  name: "흰다리 새우살 (냉동), 300g(26~30size), 1팩",
  discountRate: 21,
  basePrice: 9900,
  price: 7730,
  amount: 300,
  amountUnit: "g",
  quantity: 1,
  quantityUnit: "팩",
  unitPriceText: "(100g당 2,577원)",
  arrivalInfo: "내일(토) 새벽 도착 보장",
  ratingTotalCnt: 3058,
  rewardCash: 77,
  imageUrl:
    "https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/1200073317916374-985075ca-74a7-45f5-b956-fd65088e99a7.jpg",
}
const products: Product[] = Array(20).fill(product);


export default function Component() {
  const [quantityList, setQuantityList] = useState<number[]>(Array(products.length).fill(1))
  const [checkedList, setCheckedList] = useState<boolean[]>(Array(products.length).fill(true))
  const [total, setTotal] = useState(0)

  useEffect(() => {
    console.log("quantity:", quantityList)
    console.log("checked:", checkedList)
    const newTotal = products.reduce((sum, product, index) => {
      return sum + (checkedList[index] ? product.price * quantityList[index] : 0)
    }, 0);
    setTotal(newTotal)
  }, [quantityList, checkedList])

  const updateQuantityList = (id: number, addNum: number) => {
    setQuantityList((prevQuantity) =>
      prevQuantity.map((quantity, index) =>
        index === id ? Math.max(1, quantityList[id] + addNum) : quantity
      )
    );
    // console.log(quantityList)
  }

  const updateCheckedList = (id: number) => {
    setCheckedList((prevCheckedList) =>
      prevCheckedList.map((checked, index) =>
        index === id ? !checked : checked
      )
    );
    // console.log(checkedList)
  }

  return (
    <div className="flex flex-col items-center container mx-auto p-4 bg-gray-100">
      <div>
        <a href="/">
          <Image src="https://image7.coupangcdn.com/image/coupang/common/logo_coupang_w350.png" alt="Coupang Logo" width={150} height={40} className="my-5"/>
        </a>
        <div className="flex-1 bg-white shadow-xl p-10">
          <CartHeader/>

          {/* 로켓 프레시 상품 */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white p-6 mb-6 rounded-sm border">
                <h2 className="text-lg font-bold mb-4">로켓프레시 상품</h2>
                <p className="text-sm text-gray-500 mb-4">
                  장바구니에는 최근에 담은 70개의 상품만 표시됩니다.
                </p>
                <ProductList quantityList={quantityList} updateQuantityList={updateQuantityList} updateCheckedList={updateCheckedList}/>
              </div>
            </div>
    
          <TotalPrice total={total} />
          </div>
        </div>
      </div>
    </div>
  )
}

function CartHeader() {
  return (
    <div className="flex flex-row pb-10 justify-between">
      <div className="flex flex-row">
        <ChevronLeft className="w-10 h-10 mx-1" />
        <h1 className="text-4xl font-bold">장바구니</h1>
      </div>
      <div className="flex items-center text-base text-gray-500 mt-2">
        <span className="text-gray-300">01 옵션선택</span>
        <ChevronRight className="w-4 h-4 mx-1 text-gray-300" />
        <span className="font-bold text-blue-500">02</span>
        <span className="font-bold">&nbsp;장바구니</span>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-gray-300">03 주문/결제</span>
        <ChevronRight className="w-4 h-4 mx-1" />
        <span className="text-gray-300">04 주문완료</span>
      </div>
    </div>
  )
}

function ProductList({ quantityList, updateQuantityList, updateCheckedList }: {quantityList: number[]; updateQuantityList: (id: number, addNum: number) => void; updateCheckedList: (id: number) => void}) {
  return (
    <div>
      {products.map((product, index) => (
      <div key={product.id} className="flex items-center border-b py-4">
        <Checkbox
          defaultChecked={true}
          className="mt-2 mr-4 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          onCheckedChange = {() => updateCheckedList(index)}/>
        <Image src={product.imageUrl} alt={product.name} width={80} height={80} className="object-cover mr-4" />
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
        <div className="text-right">
          
        </div>
      </div>
      ))}
    </div>
  )
}

function TotalPrice({total} : {total: number}) {
  return (
    <div className="w-[300px]">
    <div className="sticky top-4">
      <div className="bg-white p-6 rounded-sm border">
        <h2 className="text-xl font-bold mb-4">주문 예상 금액</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>총 상품 가격</span>
            <span>{total.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span>총 할인</span>
            <span className="text-red-500">-0원</span>
          </div>
          <div className="flex justify-between">
            <span>총 배송비</span>
            <span>+0원</span>
          </div>
          <div className="flex justify-between font-bold text-xl mt-4">
            <span>총 주문 금액</span>
            <span>{total.toLocaleString()}원</span>
          </div>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-6 font-bold">
          구매하기
        </button>
      </div>
    </div>
  </div>
  )
}