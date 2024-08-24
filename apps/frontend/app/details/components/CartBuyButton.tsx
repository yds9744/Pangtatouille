import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CartBuyButton({handleCartButtonClick}: {handleCartButtonClick: () => void}){
    return (
        <div className="flex items-center gap-2 mb-4">
            {/* <Input type="number" value={1} min={1} className="w-20" /> */}
            <Button variant="outline" className="flex-grow border-blue-600 text-blue-600" onClick={() => handleCartButtonClick}>장바구니 담기</Button>
            <Button className="flex-grow bg-blue-600 text-white font-bold hover:bg-blue-700">바로구매 &gt;</Button>
        </div>
    )
}