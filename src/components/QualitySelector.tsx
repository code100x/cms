"use client"

import { Button } from "./ui/button"

export const QualitySelector = () => {
  return (
    <div className="flex justify-end">
      <div className="pr-2">
        <Button
          onClick={() => {
            const currentUrl = new URL(window.location.href)
            currentUrl.searchParams.set("quality", "1080")
            window.location.href = currentUrl.href
          }}
        >
          1080p
        </Button>
      </div>

      <div className="pr-2">
        <Button
          onClick={() => {
            const currentUrl = new URL(window.location.href)
            currentUrl.searchParams.set("quality", "720")
            window.location.href = currentUrl.href
          }}
        >
          720p
        </Button>
      </div>
      <Button
        onClick={() => {
          const currentUrl = new URL(window.location.href)
          currentUrl.searchParams.set("quality", "360")
          window.location.href = currentUrl.href
        }}
      >
        360p
      </Button>
    </div>
  )
}
