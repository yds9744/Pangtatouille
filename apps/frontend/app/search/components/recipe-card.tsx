import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Video } from "@/types/video";
import { cn } from "@/lib/utils";
import { FullRecipe } from "@/types/full-recipe";

export function RecipeCard({ fullRecipe }: { fullRecipe: FullRecipe }) {
  return (
    <a href={`/recipe/${fullRecipe.video.videoId}`}>
      <div className={cn("m-2 bg-card text-card-foreground")}>
        <CardContent className="p-0 w-[220px] h-[430px]">
          <div className="overflow-hidden mb-2 rounded-lg h-[220px] w-[220px]">
            <Image
              src={fullRecipe.video.snippet.thumbnails.high.url}
              alt=""
              width={230}
              height={230}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-sm mt-2">{fullRecipe.video.title}</span>
          <div className="h-fit">
            <span className={cn("text-xs text-gray-500 overflow-hidden")}>
              {fullRecipe.video.description.slice(0, 100) + "..."}
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 stroke-yellow-400"
                />
              ))}
              <span className="ml-1 text-sm text-gray-600">(1,000)</span>
            </div>
          </div>
        </CardContent>
      </div>
    </a>
  );
}
