import Header from '@/components/Header'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  HeartIcon,
  ShareIcon,
  ShoppingCartIcon,
  UserIcon,
  SearchIcon,
  MenuIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

export default function Component() {
  return (
    <div>
      <div className="min-h-screen bg-gray-100">
        <Header/>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Image */}
            <div className="w-full lg:w-1/2">
              <img
                src="placeholder.svg"
                alt="Biore UV Sunscreen"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-2xl font-bold mb-2">
                비오레 UV 아쿠아리치 워터리 에센스 선크림, 70g, 6개
              </h1>
              <div className="flex items-center mb-4">
                <span className="text-yellow-400">★★★★★</span>
                <span className="ml-2 text-sm text-gray-500">204개 상품평</span>
              </div>
              <div className="mb-4">
                <span className="text-red-500 font-bold">32% 할인</span>
                <div className="text-3xl font-bold">24,910원</div>
                <div className="text-sm text-gray-500">
                  <span className="line-through">36,600원</span>
                  <span className="ml-2">24,160원 적립</span>
                </div>
              </div>

              <Card className="mb-4">
                <CardContent>
                  <RadioGroup defaultValue="70g">
                    {["50g", "70g", "90g", "105g", "110g"].map((size) => (
                      <div
                        key={size}
                        className="flex justify-between items-center py-2"
                      >
                        <RadioGroupItem value={size} id={size} />
                        <label htmlFor={size} className="flex-grow ml-2">
                          {size}
                        </label>
                        <span>{size === "70g" ? "10,000원" : "가격"}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center py-2">
                      <RadioGroupItem value="6pack" id="6pack" />
                      <label htmlFor="6pack" className="flex-grow ml-2">
                        6개
                      </label>
                      <span className="text-red-500 font-bold">24,910원</span>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <div className="flex items-center gap-2 mb-4">
                <Input type="number" value={1} min={1} className="w-20" />
                <Button variant="outline" className="flex-grow">
                  장바구니 담기
                </Button>
                <Button className="flex-grow">바로구매 &gt;</Button>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon">
                  <HeartIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ShareIcon className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-8">
                <h3 className="font-bold mb-2">상품 정보</h3>
                <p className="text-sm text-gray-600">
                  비오레 UV 아쿠아리치 워터리 에센스 선크림은 가볍고 산뜻한
                  사용감으로 피부에 부담 없이 사용할 수 있는 선크림입니다.
                  SPF50+ PA++++의 높은 자외선 차단 지수로 피부를 효과적으로
                  보호합니다.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        {/* ... (previous header code remains unchanged) ... */}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ... (previous product details code remains unchanged) ... */}

          {/* Review Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">상품평</h2>

            {/* Overall Rating */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <StarIcon
                    key={star}
                    className="h-6 w-6 text-yellow-400 fill-current"
                  />
                ))}
                <StarIcon
                  className="h-6 w-6 text-yellow-400 fill-current"
                  strokeWidth={0.5}
                />
              </div>
              <span className="ml-2 text-2xl font-bold">204</span>
              <Button variant="link" className="ml-2 text-sm">
                자세히보기
              </Button>
            </div>

            {/* Review Images Carousel */}
            <div className="relative mb-8">
              <div className="flex overflow-x-auto space-x-2 pb-4">
                {[...Array(10)].map((_, i) => (
                  <img
                    key={i}
                    src={"placeholder.svg"}
                    alt={`Review ${i + 1}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 transform -translate-y-1/2"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>

            {/* Rating Breakdown */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="font-bold mb-2">향 만족도</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="w-24 text-sm">아주만족해요</span>
                    <Progress value={62} className="flex-grow" />
                    <span className="ml-2 text-sm">62%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 text-sm">만족해요</span>
                    <Progress value={25} className="flex-grow" />
                    <span className="ml-2 text-sm">25%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 text-sm">보통이에요</span>
                    <Progress value={13} className="flex-grow" />
                    <span className="ml-2 text-sm">13%</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">발림성</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="w-24 text-sm">부드럽게발려요</span>
                    <Progress value={73} className="flex-grow" />
                    <span className="ml-2 text-sm">73%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 text-sm">보통이에요</span>
                    <Progress value={23} className="flex-grow" />
                    <span className="ml-2 text-sm">23%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 text-sm">뻑뻑해요</span>
                    <Progress value={4} className="flex-grow" />
                    <span className="ml-2 text-sm">4%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Search */}
            <div className="flex mb-4">
              <Input
                placeholder="상품평을 검색해보세요"
                className="flex-grow"
              />
              <Button className="ml-2">검색</Button>
            </div>

            {/* Individual Review */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-bold mr-2">김*희</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className="h-4 w-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">2023.01.08</span>
                  </div>
                </div>
                <p className="mb-4">
                  향이 은은하고 좋아요. 자외선 차단제중에 제일 좋아하는
                  제품이에요. 가격도 저렴해서 구매하고 있어요. 잘 발리고
                  백탁현상도 없어요. 얼굴에 올리면 굉장히 촉촉해요.
                </p>
                <div className="flex space-x-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <img
                      key={i}
                      src={"placeholder.svg"}
                      alt={`Review Image ${i + 1}`}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  ))}
                </div>
                <Button variant="outline" size="sm">
                  도움돼요 0
                </Button>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
