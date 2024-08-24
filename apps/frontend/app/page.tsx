import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Header from '@/components/Header'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="relative">
        <MainToday />
      </div>
      <div className="container mx-auto px-4">
        <ProductCarousel/>
      </div>
    </main>
  )
}

function MainToday() {
  return (
    <div className="relative h-96 bg-blue-100">
      <Image
        src="https://static.coupangcdn.com/la/cmg_paperboy/image/1724122524291/C1_PC1.jpg"
        alt="MainToday"
        layout="fill"
        objectFit="cover"
      />
    <div className="absolute top-4 right-4 w-64">
      <MainTodayList />
    </div>
    </div>
  )
}

function MainTodayList() {
    const categories = [
      { name: "오늘 단 하루특가", image: "https://static.coupangcdn.com/ea/cmg_paperboy/image/1724045298122/180x60.jpg" },
      { name: "미니스프리 브랜드데이", image: "https://static.coupangcdn.com/fa/cmg_paperboy/image/1724044791591/180x60.jpg" },
      { name: "선착순~반값!", image: "https://image6.coupangcdn.com/image/ccm/banner/93cb4fef1d79fc403a752040e8ae44fc.jpg" },
      { name: "롯데칠성 제로 탄산", image: "https://static.coupangcdn.com/ua/cmg_paperboy/image/1724122527940/C1_PC2.jpg" },
      { name: "키친 추석 세일", image: "https://image10.coupangcdn.com/image/ccm/banner/6beb0a3a4f2eea86187af6a329549a8c.png" },
      { name: "쿠팡이츠", image: "https://image9.coupangcdn.com/image/ccm/banner/bcd4e0fdac9e43aea501b14bf81bd6f7.jpg" },
    ]
  
    return (
          <ul>
            {categories.map((category, index) => (
              <li key={index} className="flex items-center drop-shadow-lg">
                <Image src={category.image} alt={category.name} width={170} height={30} className="border-b" />
              </li>
            ))}
          </ul>
    )
}

function ProductCarousel() {
  const products = [
    { name: "Tefal Kettle", image: "https://static.coupangcdn.com/da/cmg_paperboy/image/1724050355485/C2-1-BIG.jpg"},
    { name: "LG Gram Laptop", image: "https://static.coupangcdn.com/ga/cmg_paperboy/image/1724050339576/C2-2-BIG.jpg"},
  ]

  return (
    <div className="w-full">
      <span className="text-2xl font-bold my-4 inline-block">오늘의 발견</span>
      <span className="text-sm inline-blocks"> | 오늘 쿠팡이 엄선한 가장 HOT한 상품!</span>
      <div className="flex overflow-x-auto space-x-4">
        {products.map((product, index) => (
          <div key={index} className="w-1/2 flex-none bg-white p-4 shadow-md border">
            <Image src={product.image} alt={product.name} width={10000} height={200} />
          </div>
        ))}
      </div>
    </div>
  )
}