import { Star } from "lucide-react";

export default function RatingSummary ({ratingTotalCnt} : {ratingTotalCnt:number|null}){
    return (
        <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            ))}
            {ratingTotalCnt &&
            <span className="ml-2 text-sm text-blue-500">
                formatNumber(ratingTotalCnt)개 상품평
            </span>
            }
        </div>
    )
}