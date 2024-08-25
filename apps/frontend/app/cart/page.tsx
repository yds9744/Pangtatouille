"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ProductList from "./components/ProductList";
import { Product } from "@/types/product";
import { ChevronLeft, ChevronRight } from "lucide-react";

const defaultProduct: Product = {
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
};

function Cart() {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantityMap, setQuantityMap] = useState<{ [key: number]: number }>(
    products.reduce((map, product) => {
      map[product.id] = 1;
      return map;
    }, {} as { [key: number]: number })
  );
  const [checkedMap, setCheckedMap] = useState<{ [key: number]: boolean }>(
    products.reduce((map, product) => {
      map[product.id] = !product.ingredient?.isSauce;
      return map;
    }, {} as { [key: number]: boolean })
  );
  const [total, setTotal] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Extract and log query parameters
    const productsParam = searchParams.get("products");
    const quantitiesParam = searchParams.get("quantities");

    // Optionally parse and log parsed data
    try {
      const parsedProducts: Product[] = productsParam
        ? JSON.parse(productsParam)
        : [];
      const parsedQuantities: number[] = quantitiesParam
        ? JSON.parse(quantitiesParam)
        : [];

      // Set products and quantities
      if (parsedProducts.length) {
        setProducts(parsedProducts);
        setQuantityMap(
          parsedQuantities.length
            ? parsedQuantities
            : Array(parsedProducts.length).fill(1)
        );
        setCheckedMap(Array(parsedProducts.length).fill(true));
      } else {
        setProducts(Array(20).fill(defaultProduct));
        setQuantityMap(Array(20).fill(1));
        setCheckedMap(Array(20).fill(true));
      }
    } catch (error) {
      console.error("Error parsing query parameters:", error);
      // Fallback to default products if there's an error
      setProducts(Array(20).fill(defaultProduct));
      setQuantityMap(Array(20).fill(1));
      setCheckedMap(Array(20).fill(true));
    }
  }, [searchParams]);

  useEffect(() => {
    const newTotal = products.reduce((sum, product) => {
      return (
        sum + (checkedMap[product.id] ? product.price * quantityMap[product.id] : 0)
      );
    }, 0);
    setTotal(newTotal);
  }, [products, quantityMap, checkedMap]);

  const updateQuantityMap = (id: number, addNum: number) => {
    setQuantityMap((prevQuantityMap) => ({
      ...prevQuantityMap,
      [id]: Math.max(1, (prevQuantityMap[id] || 1) + addNum),
    }));
  };

  const updateCheckedMap = (id: number) => {
    setCheckedMap((prevCheckedMap) => ({
      ...prevCheckedMap,
      [id]: !prevCheckedMap[id],
    }));
  };

  return (
    <div className="flex flex-col items-center container mx-auto p-4 bg-gray-100">
      <div>
        <a href="/">
          <Image
            src="https://image7.coupangcdn.com/image/coupang/common/logo_coupang_w350.png"
            alt="Coupang Logo"
            width={150}
            height={40}
            className="my-5"
          />
        </a>
        <div className="flex-1 bg-white shadow-xl p-10">
          <CartHeader />

          {/* 로켓 프레시 상품 */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white p-6 mb-6 rounded-sm border">
                <h2 className="text-lg font-bold mb-4">로켓프레시 상품</h2>
                <p className="text-sm text-gray-500 mb-4">
                  장바구니에는 최근에 담은 70개의 상품만 표시됩니다.
                </p>
                <ProductList
                  products={products}
                  quantityMap={quantityMap}
                  checkedMap={checkedMap}
                  updateQuantityMap={updateQuantityMap}
                  updateCheckedMap={updateCheckedMap}
                />
              </div>
            </div>
            <TotalPrice total={total} />
          </div>
        </div>
      </div>
    </div>
  );
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
  );
}

function TotalPrice({ total }: { total: number }) {
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
  );
}

export default function CartPage() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Cart />
    </Suspense>
  );
}
