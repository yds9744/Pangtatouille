import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Video } from "@/types/video";
import { cn } from "@/lib/utils";

export function RecipeCard({ recipeVieo }: { recipeVieo: Video }) {
  return (
    <a href={`/recipe/${recipeVieo.videoId}`} key={recipeVieo.videoId}>
      <div className={cn("m-2 bg-card text-card-foreground")}>
        <CardContent className="p-0 w-[220px] h-[430px]">
          <div className="overflow-hidden mb-2 rounded-lg h-[220px] w-[220px]">
            <Image
              src={recipeVieo.snippet.thumbnails.high.url}
              alt=""
              width={230}
              height={230}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-sm mt-2">{recipeVieo.title}</span>
          <div className="h-fit">
            <span className={cn("text-xs text-gray-500 overflow-hidden")}>
              {recipeVieo.description.slice(0, 100) + "..."}
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
              <span className="ml-1 text-sm text-gray-600">({1000})</span>
            </div>
          </div>
        </CardContent>
      </div>
    </a>
  );
}
