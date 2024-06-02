"use client";

import { useRouter } from "next/navigation";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function TagsList({ tags }: { tags: string[] }) {
  const router = useRouter();
  return (
    <div className="flex gap-2 flex-wrap">
      {tags.map((tag) => (
        <button
          key={tag}
          className={cn(badgeVariants(), )}
          onClick={() => {
            router.push(`/browse?search=${tag}`);
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
