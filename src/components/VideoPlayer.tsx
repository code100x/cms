"use client"
import React, { useEffect, useRef, useState } from "react"

// mpdUrl => https://cloudfront.enet/video/video.mp4
// thumbnail => https://cloudfront.enet/video/thumbnail.jpg
// subtitles => https://cloudfront.enet/video/subtitles.vtt
//
export const VideoPlayer = ({
  mpdUrl,
  subtitles,
}: {
  mpdUrl: string
  thumbnail: string
  subtitles: string
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [player, setPlayer] = useState<any>(null)

  useEffect(() => {
    if (!player) {
      return
    }
    const handleKeyPress = (event: any) => {
      switch (event.code) {
        case "Space": // Space bar for play/pause
          if (player.paused()) {
            player.play()
            event.stopPropagation()
          } else {
            player.pause()
            event.stopPropagation()
          }
          break
        case "ArrowRight": // Right arrow for seeking forward 5 seconds
          player.currentTime(player.currentTime() + 5)
          event.stopPropagation()
          break
        case "ArrowLeft": // Left arrow for seeking backward 5 seconds
          player.currentTime(player.currentTime() - 5)
          event.stopPropagation()
          break
      }
    }

    document.addEventListener("keydown", handleKeyPress)

    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [player])

  useEffect(() => {
    if (!videoRef.current) {
      return
    }
    window.setTimeout(() => {
      const player = (window as any).videojs(
        videoRef.current,
        {
          playbackrates: [0.5, 1, 1.25, 1.5, 1.75, 2],
          controls: true,
          fluid: true,
          html5: {
            vhs: {
              overridenative: true,
            },
          },
        },
        function () {
          //@ts-ignore
          player.eme()
          setPlayer(player)
          if (mpdUrl.endsWith(".mpd")) {
            //@ts-ignore
            this.src({
              src: mpdUrl,
              type: "application/dash+xml",
              keySystems: {
                "com.widevine.alpha":
                  "https://widevine-dash.ezdrm.com/proxy?pX=288FF5&user_id=MTAwMA==",
              },
            })
          } else if (mpdUrl.endsWith(".m3u8")) {
            //@ts-ignore
            this.src({
              src: mpdUrl,
              type: "application/x-mpegURL",
            })
          } else {
            //@ts-ignore
            this.src({
              src: mpdUrl,
              type: "video/mp4",
            })
          }

          //@ts-ignore
          this.on("keystatuschange", (event: any) => {
            console.log("event: ", event)
          })
          player.seekButtons({
            forward: 10,
            back: 10,
          })
        },
      )
    }, 1000)

    return () => {}
  }, [videoRef.current])

  return (
    <div className="py-2">
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.11.7/video-js.min.css"
        rel="stylesheet"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/videojs-seek-buttons/dist/videojs-seek-buttons.css"
        rel="stylesheet"
      />
      <script
        defer
        src="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.11.7/video.min.js"
      ></script>
      <script
        defer
        src="https://cdn.jsdelivr.net/npm/videojs-contrib-eme@3.8.0/dist/videojs-contrib-eme.js"
      ></script>
      <script
        defer
        src="https://cdn.jsdelivr.net/npm/videojs-seek-buttons/dist/videojs-seek-buttons.min.js"
      ></script>
      <video ref={videoRef} id="my-video" className="video-js">
        <track kind="subtitles" src={subtitles} srcLang="en" label="English" />
      </video>
    </div>
  )
}
