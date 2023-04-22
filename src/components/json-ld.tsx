'use client'
import { usePathname } from "next/navigation";
import { getPublicUrl } from "@/utils";

export default function JsonLd({ schema }: { schema: object }) {
  const json = {
    ...schema,
    url: `${getPublicUrl()}${usePathname()}`,
  }

  return <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
  />
}