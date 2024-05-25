import { Badge } from "@/components/ui/badge";


export function splitTags(tags: string) {
    return tags.split(", ").map((tag) => tag.trim());
}

export function TagsList({ tags }: { tags: string[] }) {
    return(
        <div className="flex gap-2 flex-wrap">
        {tags.map((language) => (
          <Badge className="w-fit" key={language}>
            {language}
          </Badge>
        ))}
      </div>
    )
}