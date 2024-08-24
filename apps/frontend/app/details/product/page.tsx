import Header from '@/components/Header'
import RatingSummary from '@/components/RatingSummary'
import CartBuyButton from '../components/CartBuyButton'
import Details from '../components/Details'
import Options from '../components/Options'
import Prices from '../components/Prices'
import ReviewList from '../components/ReviewList'
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function DetailProduct() {

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
  
  return (
    <div>
      <div className="min-h-screen">
        <Header/>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image */}
            <div className="w-full lg:w-1/2">
              <img src={product.imageUrl} alt="" className="w-full h-auto"/>
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2">
              <div className="flex flex-row justify-between">
                {/* text area */}
                <div>
                  <h1 className="text-lg font-bold mb-1">{product.name}</h1>
                  <RatingSummary ratingTotalCnt={product.ratingTotalCnt}/>
                </div>
                <CartBuyButton/>
              </div>
              <hr/>
              <Prices dcRate={product.discountRate} basePrice={product.basePrice} price={product.price} unitPrice={product.unitPriceText} arrivalInfo={product.arrivalInfo}/>
              <Options/>
              <div className="flex items-center gap-2 mb-4">
                <Input type="number" value={1} min={1} className="w-20" />
                <Button variant="outline" className="flex-grow border-blue-600 text-blue-600">장바구니 담기</Button>
                <Button className="flex-grow bg-blue-600 text-white font-bold hover:bg-blue-700">바로구매 &gt;</Button>
              </div>

            </div>
          </div>
          <Details/>
        </main>
      </div>
      <ReviewList/>
    </div>
  );
}
