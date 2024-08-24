import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StarIcon, ChevronLeftIcon, ChevronRightIcon} from "lucide-react";

export default function ReviewList() {
    return (
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
                  src={"/placeholder.svg"}
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
                    src={"/placeholder.svg"}
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
    )
  }