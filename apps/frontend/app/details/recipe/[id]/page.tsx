import Header from '@/components/Header'
import RatingSummary from '@/components/RatingSummary'
import CartBuyButton from '../../components/CartBuyButton'
import Details from '../../components/Details'
import Prices from '../../components/Prices'
import ReviewList from '../../components/ReviewList'
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
  const productPackage: ProductPackage[] = await fetch(
    `http://localhost:8000/search/full-recipe/youtube/mock?query=${"hi"}`
  ).then((res) => res.json()); // TODO: replace this with http://localhost:8000/full-recipe/${id}

  const recipeId = params.id;
  const recipe = productPackage[0];
  const products = recipe.products;
  const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
  const totalDiscountRate = products.reduce(
    (acc, product) => acc + (product.discountRate ?? 0),
    0
  );
  const totalBasePrice = products.reduce(
    (acc, product) => acc + (product.basePrice ?? product.price),
    0
  );
  const averageDiscountRate = parseInt((totalDiscountRate / products.length).toFixed(0));

  return (
    <div>
      <div className="min-h-screen">
        <Header/>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image */}
            <div className="w-full lg:w-1/2">
              <img src={recipe.video.snippet.thumbnails.high.url} alt="" className="w-full h-auto"/>
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2">
              <div className="flex flex-row justify-between">
                {/* text area */}
                <div>
                  <h1 className="text-lg font-bold mb-1">{recipe.video.title}</h1>
                  <RatingSummary ratingTotalCnt={3065}/>
                </div>
                <CartBuyButton/>
              </div>
              <hr/>
              <Prices dcRate={averageDiscountRate} basePrice={totalBasePrice} price={totalPrice} unitPrice={null} arrivalInfo={null}/>
              
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
