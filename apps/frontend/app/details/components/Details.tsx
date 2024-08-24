import { Card, CardContent } from "@/components/ui/card";
import { Recipe } from "@/types/recipe";

export default function Details({ recipe }: { recipe?: Recipe }) {
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
          {recipe?.steps.map((step, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-lg font-bold">{step.step}</h2>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
          {(recipe?.steps.length ?? 0) === 0 && (
            <p className="text-gray-600">
              상품 상세 정보가 이 곳에 표시됩니다.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
