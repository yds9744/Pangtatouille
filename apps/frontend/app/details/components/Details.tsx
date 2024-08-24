import { Card, CardContent } from "@/components/ui/card";

export default function Details(){
    return (
    <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-0">
        <div className="grid grid-cols-4 divide-x divide-gray-200 text-sm">
            <div className="p-4 font-medium bg-gray-50">상품상세</div>
            <div className="p-4 font-medium bg-gray-50">상품평 (3,065)</div>
            <div className="p-4 font-medium bg-gray-50">상품문의</div>
            <div className="p-4 font-medium bg-gray-50">배송/교환/반품 안내</div>
        </div>
        <div className="p-4">
            {/* Content for the selected tab would go here */}
            <p className="text-gray-600">상품 상세 정보가 이 곳에 표시됩니다.</p>
        </div>
        </CardContent>
    </Card>
    )
}