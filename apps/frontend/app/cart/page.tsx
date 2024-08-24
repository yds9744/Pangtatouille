"use client";
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronRight, Minus, Plus } from 'lucide-react'

type Product = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  deliveryType: '로켓배송' | '로켓와우' | '판매자배송' | '로켓직구'
  deliveryDate: string
  discount?: number
  points?: number
}

export default function Component() {
  const [rocketDeliveryProducts, setRocketDeliveryProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'MORN 현미 월남쌈, 200g, 1개',
      price: 2250,
      image: 'placeholder.svg',
      quantity: 1,
      deliveryType: '로켓와우',
      deliveryDate: '내일(토) 8/24 새벽 7시 전 도착 보장 (밤 12시 전 주문 시)',
      discount: 5,
      points: 23,
    },
    {
      id: 2,
      name: '바겐슈타이거 에델 실리콘 키친툴 스패츌라, 라이트, 1개',
      price: 8180,
      image: 'placeholder.svg',
      quantity: 1,
      deliveryType: '로켓배송',
      deliveryDate: '내일(토) 8/24 도착 보장 (밤 12시 전 주문 시)',
      points: 82,
    },
    {
      id: 3,
      name: '토니모리 인키 라이브러리 프로폴리스 앰플, 30ml, 1개',
      price: 14220,
      image: 'placeholder.svg',
      quantity: 1,
      deliveryType: '로켓와우',
      deliveryDate: '내일(토) 8/24 새벽 7시 전 도착 보장 (오후 9시 전 주문 시)',
      discount: 10,
      points: 142,
    },
  ])

  const [rocketDirectProducts, setRocketDirectProducts] = useState<Product[]>([
    {
      id: 4,
      name: 'Doctors Best 비타민 D3 5000 IU 베지 소프트젤, 180정, 1개',
      price: 19700,
      image: 'placeholder.svg',
      quantity: 1,
      deliveryType: '로켓직구',
      deliveryDate: '',
    },
    {
      id: 5,
      name: '스포츠리서치 비타민 D3 125mcg 소프트젤, 360정, 1개',
      price: 24570,
      image: 'placeholder.svg',
      quantity: 1,
      deliveryType: '로켓직구',
      deliveryDate: '화요일 8/27 도착 예정',
      discount: 20,
      points: 246,
    },
  ])

  const [total, setTotal] = useState(0)

  useEffect(() => {
    const newTotal = [...rocketDeliveryProducts, ...rocketDirectProducts].reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    )
    setTotal(newTotal)
  }, [rocketDeliveryProducts, rocketDirectProducts])

  const updateQuantity = (id: number, newQuantity: number, isRocketDelivery: boolean) => {
    const updateProducts = (products: Product[]) =>
      products.map((product) =>
        product.id === id ? { ...product, quantity: Math.max(1, newQuantity) } : product
      )

    if (isRocketDelivery) {
      setRocketDeliveryProducts(updateProducts)
    } else {
      setRocketDirectProducts(updateProducts)
    }
  }

  const renderProduct = (product: Product, isRocketDelivery: boolean) => (
    <div key={product.id} className="flex items-start border-b py-4">
      <input type="checkbox" className="mt-2 mr-4" />
      <Image
        src={product.image}
        alt={product.name}
        width={80}
        height={80}
        className="object-cover mr-4"
      />
      <div className="flex-grow">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.deliveryDate}</p>
        <div className="flex items-center mt-2">
          <button
            onClick={() => updateQuantity(product.id, product.quantity - 1, isRocketDelivery)}
            className="border rounded p-1"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="mx-2">{product.quantity}</span>
          <button
            onClick={() => updateQuantity(product.id, product.quantity + 1, isRocketDelivery)}
            className="border rounded p-1"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold">{product.price.toLocaleString()}원</p>
        {product.discount && (
          <p className="text-sm text-red-500">{product.discount}% 할인</p>
        )}
        {product.points && (
          <p className="text-sm text-gray-500">최대 {product.points}원 적립</p>
        )}
        <span className="text-sm text-blue-500">{product.deliveryType}</span>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col items-center container mx-auto p-4 bg-gray-100">
      <div>
        <a href="/">
          <Image src="https://image7.coupangcdn.com/image/coupang/common/logo_coupang_w350.png" alt="Coupang Logo" width={150} height={40} className="my-5"/>
        </a>
        <div className="flex-1 bg-white shadow-xl p-10">
          <div className="flex flex-row pb-10 justify-between">
            <h1 className="text-4xl font-bold">장바구니</h1>
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
        
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white p-6 mb-6 rounded-sm border">
                <h2 className="text-xl font-bold mb-4">로켓배송 상품 ({rocketDeliveryProducts.length})</h2>
                <p className="text-sm text-gray-500 mb-4">
                  장바구니에는 최근에 담은 70개의 상품만 표시됩니다.
                </p>
                {rocketDeliveryProducts.map((product) => renderProduct(product, true))}
              </div>
    
              <div className="bg-white p-6 rounded-sm border">
                <h2 className="text-xl font-bold mb-4">로켓직구 상품</h2>
                {rocketDirectProducts.map((product) => renderProduct(product, false))}
              </div>
            </div>
    
            <div className="lg:w-1/3 relative">
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
                  <button className="w-full bg-blue-500 text-white py-3 rounded-lg mt-6 font-bold">
                    구매하기 (0)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}