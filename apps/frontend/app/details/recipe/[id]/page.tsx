import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import RatingSummary from "@/components/RatingSummary";
import CartBuyButton from "../../components/CartBuyButton";
import Details from "../../components/Details";
import Prices from "../../components/Prices";
import ReviewList from "../../components/ReviewList";
import ProductList from "@/app/cart/components/ProductList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductPackage } from "@/types/product-package";

export default async function RecipePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const productPackage: ProductPackage = await fetch(
    `${process.env.SERVER_BASE_URL}/product-package/${params.id}`
  ).then((res) => res.json());

  const recipeId = params.id;
  const products = productPackage.products;
  // const [totalPrice, setTotalPrice] = useState(0)
  // const [totalDiscountRate, setTotalDiscountRate] = useState(0)
  // const [totalBasePrice, setTotalBasePrice] = useState(0)
  // const [averageDiscountRate, setAverageDiscountRate] = useState(0)
  const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
  const totalDiscountRate = products.reduce(
    (acc, product) => acc + (product.discountRate ?? 0),
    0
  );
  const totalBasePrice = products.reduce(
    (acc, product) => acc + (product.basePrice ?? product.price),
    0
  );
  const averageDiscountRate = parseInt(
    (totalDiscountRate / products.length).toFixed(0)
  );

  const quantityList = Array(products.length).fill(1);
  const checkedList = Array(products.length).fill(true);
  // const [quantityList, setQuantityList] = useState<number[]>(Array(products.length).fill(1))
  // const [checkedList, setCheckedList] = useState<boolean[]>(Array(products.length).fill(true))

  // useEffect(() => {
  //   const newTotalPrice = products.reduce((sum, product, index) => {
  //     return sum + (checkedList[index] ? product.price * quantityList[index] : 0)
  //   }, 0);
  //   setTotalPrice(newTotalPrice)

  //   const newTotalBasePrice = products.reduce((sum, product, index) => {
  //     const price = product.basePrice ? product.basePrice : product.price
  //     return sum + (checkedList[index] ? price * quantityList[index] : 0)
  //   }, 0);
  //   setTotalBasePrice(newTotalBasePrice)

  //   const newTotalDiscountRate = products.reduce((sum, product, index) => {
  //     return sum + (product.discountRate && checkedList[index] ? product.discountRate * quantityList[index] : 0)
  //   }, 0);
  //   setAverageDiscountRate(parseInt((newTotalDiscountRate / products.length).toFixed(0)))
  // }, [quantityList, checkedList])

  const updateQuantityList = (id: number, addNum: number) => {
    //   setQuantityList((prevQuantity) =>
    //     prevQuantity.map((quantity, index) =>
    //       index === id ? Math.max(1, quantityList[id] + addNum) : quantity
    //     )
    //   );
  };

  const updateCheckedList = (id: number) => {
    //   setCheckedList((prevCheckedList) =>
    //     prevCheckedList.map((checked, index) =>
    //       index === id ? !checked : checked
    //     )
    //   );
  };

  return (
    <div>
      <div className="min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image */}
            <div className="w-full lg:w-1/2">
              <img
                src={productPackage.video.snippet.thumbnails.high.url}
                alt=""
                className="w-full h-auto"
              />
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2">
              <div className="flex flex-row justify-between">
                {/* text area */}
                <div>
                  <h1 className="text-lg font-bold mb-1">
                    {productPackage.video.title}
                  </h1>
                  <RatingSummary ratingTotalCnt={3065} />
                </div>
                <CartBuyButton />
              </div>
              <hr />
              <Prices
                dcRate={averageDiscountRate}
                basePrice={totalBasePrice}
                price={totalPrice}
                unitPrice={null}
                arrivalInfo={null}
              />
              <ProductList products={products} quantityList={quantityList} />
              <div className="flex items-center gap-2 mb-4">
                <Input type="number" value={1} min={1} className="w-20" />
                <Button
                  variant="outline"
                  className="flex-grow border-blue-600 text-blue-600"
                >
                  장바구니 담기
                </Button>
                <Button className="flex-grow bg-blue-600 text-white font-bold hover:bg-blue-700">
                  바로구매 &gt;
                </Button>
              </div>
            </div>
          </div>
          <Details recipe={productPackage.recipe} />
        </main>
      </div>
      <ReviewList />
    </div>
  );
}
