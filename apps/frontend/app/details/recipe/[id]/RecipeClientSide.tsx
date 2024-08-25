"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import RatingSummary from "@/components/RatingSummary";
import CartBuyButton from "../../components/CartBuyButton";
import Details from "../../components/Details";
import Prices from "../../components/Prices";
import ReviewList from "../../components/ReviewList";
import ShareButton from "../../components/ShareButton";
import ProductList from "@/app/cart/components/ProductList";
import { ProductPackage } from "@/types/product-package";

export default function RecipeClientSide({
  productPackage,
}: {
  productPackage: ProductPackage;
}) {
  const router = useRouter();
  const orgProducts = productPackage.products
  const sauceProducts = orgProducts.filter(product => product.ingredient?.isSauce);
  const nonSauceProducts = orgProducts.filter(product => !product.ingredient?.isSauce);
  const products = [...nonSauceProducts, ...sauceProducts];

  console.log(nonSauceProducts);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalBasePrice, setTotalBasePrice] = useState(0);
  const [averageDiscountRate, setAverageDiscountRate] = useState(0);

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

  useEffect(() => {
    const newTotalPrice = products.reduce((sum, product, index) => {
      return (
        sum + (checkedMap[product.id] ? product.price * quantityMap[product.id] : 0)
      );
    }, 0);
    setTotalPrice(newTotalPrice);

    const newTotalBasePrice = products.reduce((sum, product, index) => {
      const price = product.basePrice ? product.basePrice : product.price;
      return sum + (checkedMap[product.id] ? price * quantityMap[product.id] : 0);
    }, 0);
    setTotalBasePrice(newTotalBasePrice);

    const newTotalDiscountRate = products.reduce((sum, product, index) => {
      return (
        sum +
        (product.discountRate && checkedMap[product.id]
          ? product.discountRate * quantityMap[product.id]
          : 0)
      );
    }, 0);
    setAverageDiscountRate(
      parseInt((newTotalDiscountRate / products.length).toFixed(0))
    );
  }, [quantityMap, checkedMap]);

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

  const thumbnailUrl =
    productPackage.video?.snippet.thumbnails.high.url ??
    productPackage.blog?.imageUrl ??
    "";
  const title =
    productPackage.video?.snippet.title ?? productPackage.blog?.title ?? "";
  const description = productPackage.video?.description ?? "";

  const handleCartButtonClick = () => {
    const selectedProducts = products.filter((product) => checkedMap[product.id]);
    const selectedQuantities = selectedProducts.map(
      (product) => quantityMap[product.id]
    );

    const query = new URLSearchParams({
      products: JSON.stringify(selectedProducts),
      quantities: JSON.stringify(selectedQuantities),
    }).toString();

    router.push(`/cart?${query}`);
  };

  return (
    <div>
      <div className="min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image */}
            <div className="w-full lg:w-1/2">
              <img src={thumbnailUrl} alt="" className="w-full h-auto" />
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2">
              <div className="flex flex-row justify-between">
                {/* text area */}
                <div>
                  <h1 className="text-lg font-bold mb-1">{title}</h1>
                  <RatingSummary ratingTotalCnt={3065} />
                </div>
                <ShareButton />
              </div>
              <hr />
              <Prices
                dcRate={averageDiscountRate}
                basePrice={totalBasePrice}
                price={totalPrice}
                unitPrice={null}
                arrivalInfo={null}
              />
              <ProductList
                products={products}
                quantityMap={quantityMap}
                checkedMap={checkedMap}
                updateCheckedMap={updateCheckedMap}
                updateQuantityMap={updateQuantityMap}
                isRecipeView={true}
              />
              <CartBuyButton handleCartButtonClick={handleCartButtonClick}/>
            </div>
          </div>
          <Details recipe={productPackage.recipe} />
        </main>
      </div>
      <ReviewList />
    </div>
  );
}
