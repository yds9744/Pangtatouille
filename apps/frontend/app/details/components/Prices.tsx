import Image from "next/image";
import { formatNumber } from '@/utils/formatNumber';

export default function Prices({dcRate, basePrice, price, unitPrice, arrivalInfo} : {dcRate: number|null, basePrice: number|null, price: number, unitPrice: string|null, arrivalInfo: string|null}) {
    return (
        <div>
            <div className="my-2">
            {dcRate && basePrice && (
            <div className="flex items-baseline text-xs space-x-1">
                <span>{dcRate}%</span>
                <span className="line-through text-gray-400">
                {formatNumber(basePrice)}원
                </span>
            </div>
            )}
            <div className="flex items-center space-x-1">
            <span className="text-xl text-red-600 font-bold">{formatNumber(price)}원</span>
            {unitPrice && <span className="text-sm text-red-600">{unitPrice}</span>}
            {dcRate && basePrice && (<span className="text-sm text-red-600 font-medium">와우할인가</span>)}
            <Image src="https://image6.coupangcdn.com/image/badges/falcon/v1/web/rocket-fresh@2x.png" alt="로켓프레시" width={63} height={14}/>
            </div>
        </div>
        <div className="flex flex-row space-x-1 mb-2">
            <Image src="https://static.coupangcdn.com/image/badges/member/wow@2x.png" alt="" width={40} height={17} />
            <span className="text-sm">
            고객님은 <span className="text-blue-600 font-bold">와우회원</span>으로
            </span>
            </div>
            <div className="mb-2">
                <span className="text-xs text-white bg-green-600 px-2 py-1">로켓프레시 구매가능</span>
            </div>
            <hr/>
            {arrivalInfo && <div className="text-sm text-green-600 font-medium mt-2">{arrivalInfo}</div>}
            <div className="text-xs font-bold mb-2">무료배송</div>
        </div>
    )
}