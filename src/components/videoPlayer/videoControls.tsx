import { formatTime } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import {
  CaptionIcon,
  FullScreenOpenIcon,
  HighVolumeIcon,
  LowVolumeIcon,
  MiniPlayerIcon,
  MutedVolumeIcon,
  PauseIcon,
  PlayIcon,
} from './icons';

export default function VideoPlayerControls({
  player,
  onVideoEnd,
}: {
  player: any;
  onVideoEnd: () => void;
}) {
  const [playerPaused, setPlayerPaused] = useState<boolean>(false);
  const [volumeIconState, setVolumeIconState] = useState<string>('high');
  const [durationStartTime, setDurationStartTime] = useState<string>('0:00');
  const [durationEndTime, setDurationEndTime] = useState<string>('0:00');
  const [playBackSpeed, setPlayBackSpeed] = useState<string>('1x');

  const volumeSliderRef = useRef<any>(null);

  // play / pause btn toggle
  function togglePlay() {
    if (player.paused()) {
      // player.paused() returns true if media is playing
      player.play();
    } else {
      player.pause();
    }

    setPlayerPaused(player.paused());
  }

  // toggle voulme button
  function toggleVolumeBtn() {
    player.muted(!player.muted());
    setVolumeIconState(player.muted() ? 'muted' : 'high');

    if (player.muted()) {
      player.volume(0);
    } else {
      player.volume(1);
    }
  }

  function volumeSliderHandler(e: any) {
    player.volume(e.target.value);
    player.muted(e.target.value === 0);
  }

  function volumeIconToggle() {
    let volState;
    const volume = player.volume();

    if (player.muted() || volume === 0) {
      volState = 'muted';
    } else if (volume < 0.5) {
      volState = 'low';
    } else {
      volState = 'high';
    }
    volumeSliderRef.current.value = volume;
    setVolumeIconState(volState);
  }

  // setduration after metadata is loaded
  function setDurationHandler() {
    const totalDuration = formatTime(player.duration());
    setDurationEndTime(totalDuration);
  }

  // start and end duration handler
  function startTimeHandler() {
    const currentTime = formatTime(player.currentTime());
    setDurationStartTime(currentTime);
  }

  // playback speed control
  function playBackSpeedHandler() {
    const speedArr = [0.5, 1, 1.25, 1.5, 1.75, 2];
    let currentSpeed = player.playbackRate();
    let index = speedArr.indexOf(currentSpeed);

    if (index === speedArr.length - 1) {
      index = 0;
    } else {
      index++;
    }

    currentSpeed = speedArr[index];
    player.playbackRate(currentSpeed);
    setPlayBackSpeed(`${currentSpeed}x`);
  }

  useEffect(() => {
    if (player) {
      player.on('volumechange', volumeIconToggle);

      player.on('loadedmetadata', setDurationHandler);
      player.on('timeupdate', startTimeHandler);

      player.on('ended', () => {
        setPlayerPaused(true);
        onVideoEnd();
      });
    }
  }, [player]);
  return (
    <>
      <div
        className={`absolute bottom-0 ${playerPaused ? 'opacity-100' : 'opacity-0'} group-hover/v-container:opacity-100 w-full z-50 transition-all py-1 before:content-[''] before:absolute before:bottom-0 before:w-full before:aspect-[5/1] before:z-[-1] before:bg-gradient-to-t from-[#000000E6] to-transparent`}
      >
        {/* //controls */}
        <div className="p-2 flex items-center justify-between">
          <div className="flex gap-3 items-center">
            {/*//play-pause-btn*/}
            <button
              className="flex items-center justify-center outline-none"
              onClick={togglePlay}
            >
              {playerPaused ? <PauseIcon /> : <PlayIcon />}
            </button>

            {/*volume-container*/}
            <div className="flex gap-2 items-center group/volume-container">
              <button className="outline-none" onClick={toggleVolumeBtn}>
                <HighVolumeIcon
                  className={volumeIconState === 'high' ? 'block' : 'hidden'}
                />
                <LowVolumeIcon
                  className={volumeIconState === 'low' ? 'block' : 'hidden'}
                />

                <MutedVolumeIcon
                  className={volumeIconState === 'muted' ? 'block' : 'hidden'}
                />
              </button>
              <input
                ref={volumeSliderRef}
                type="range"
                className="cursor-pointer appearance-none h-[3px] w-0 scale-x-0 transition-all duration-200 group-hover/volume-container:scale-x-100 group-hover/volume-container:w-[75px] relative outline-none bg-[#f2f2f2] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[13px] [&::-webkit-slider-thumb]:h-[13px] [&::-webkit-slider-thumb]:bg-[#ff2a2a] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:rounded-full"
                name="mute-btn-range"
                min="0"
                max="1"
                step="any"
                defaultValue="1"
                onChange={volumeSliderHandler}
              />
            </div>

            {/* duration-container*/}
            <div className="font-bold">
              <span className="duration-start-time">{durationStartTime}</span>/
              <span className="duration-end-time">{durationEndTime}</span>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {/* captions-btn */}
            <button className="captions-btn">
              <CaptionIcon />
              <div className="red-underline"></div>
            </button>

            {/* speed-btn */}
            <button
              className="flex items-center justify-center w-10"
              onClick={playBackSpeedHandler}
            >
              {playBackSpeed}
            </button>

            {/* mini-player-btn */}
            <button className="mini-player-btn">
              <MiniPlayerIcon />
            </button>

            {/* full-screen-btn */}
            <button className="full-screen-btn">
              <FullScreenOpenIcon />
              <svg
                className="hidden"
                viewBox="0 0 24 24"
                height="24px"
                width="24px"
              >
                <path
                  fill="currentColor"
                  d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
