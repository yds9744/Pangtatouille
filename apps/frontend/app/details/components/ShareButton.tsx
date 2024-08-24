import { Button } from "@/components/ui/button";
import { Heart, Share} from "lucide-react";

export default function ShareButton() {
    return (
        <div className="flex justify-end gap-2">
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-gray-300">
            <Heart className="h-5 w-5 text-gray-500" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-gray-300">
            <Share className="h-5 w-5 text-gray-500" />
            </Button>
      </div>
    )
}