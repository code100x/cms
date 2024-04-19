import { formatTime } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import {
  CaptionIcon,
  FullScreenCloseIcon,
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
  const [playerPaused, setPlayerPaused] = useState<boolean>(true);
  const [volumeIconState, setVolumeIconState] = useState<string>('high');
  const [durationStartTime, setDurationStartTime] = useState<string>('0:00');
  const [durationEndTime, setDurationEndTime] = useState<string>('0:00');
  const [playBackSpeed, setPlayBackSpeed] = useState<string>('1x');
  const [isMiniPlayerActive, setMiniPlayer] = useState<boolean>(false);
  const [isFullScreen, setFullScreen] = useState<boolean>(false);

  const volumeSliderRef = useRef<any>(null);

  // play / pause btn toggle
  function togglePlay() {
    if (player.paused()) {
      // player.paused() returns true if media is playing
      player.play();
    } else {
      player.pause();
    }
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

  // full screen handler
  function fullScreenHandler() {
    const fullScreen = document.fullscreenElement === null;

    const videoContainer = document.querySelector('#videoContainer');

    if (fullScreen && videoContainer) {
      videoContainer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullScreen(fullScreen);
  }

  // miniPlayer Handler
  function miniPlayerHandler() {
    if (isMiniPlayerActive) {
      player.exitPictureInPicture();
    } else {
      setMiniPlayer(true);
      player.requestPictureInPicture();
    }
  }

  useEffect(() => {
    if (player) {
      player.on('play', () => setPlayerPaused(false));
      player.on('pause', () => setPlayerPaused(true));

      player.on('volumechange', volumeIconToggle);

      player.on('loadedmetadata', setDurationHandler);
      player.on('timeupdate', startTimeHandler);

      player.on('click', togglePlay);

      player.on('ended', () => {
        setPlayerPaused(true);
        onVideoEnd();
      });

      player.on('leavepictureinpicture', () => setMiniPlayer(false));

      document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement === null) {
          setFullScreen(false);
        }
      });
    }
  }, [player]);
  return (
    <>
      <div
        className={`inline-flex flex-col items-center ${playerPaused ? 'opacity-100' : 'opacity-0'} justify-center h-24 w-24 bg-[#333] text-[#fff]  absolute left-[calc(50%-48px)] z-[1] rounded-full pointer-events-none p-5 transition-all duration-300 shadow-lg`}
      >
        {playerPaused ? <PauseIcon className="" /> : <PlayIcon className="" />}
      </div>
      <div
        className={`absolute bottom-0 ${playerPaused ? 'opacity-100' : 'opacity-0'} ${!isFullScreen && 'group-hover/v-container:opacity-100'} w-full z-50 transition-all py-1 before:content-[''] before:absolute before:bottom-0 before:w-full before:aspect-[5/1] before:z-[-1] before:bg-gradient-to-t from-[#000000E6] to-transparent`}
      >
        {/* //controls */}
        <div className="p-2 flex items-center justify-between">
          <div className="flex gap-3 items-center">
            {/*//play-pause-btn*/}
            <button
              className="flex items-center justify-center outline-none"
              onClick={togglePlay}
            >
              {playerPaused ? (
                <PauseIcon className="h-6 w-6" />
              ) : (
                <PlayIcon className="h-6 w-6" />
              )}
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
            <button className="outline-none">
              <CaptionIcon />
              <div className="red-underline"></div>
            </button>

            {/* speed-btn */}
            <button
              className="flex items-center justify-center w-10 outline-none"
              onClick={playBackSpeedHandler}
            >
              {playBackSpeed}
            </button>

            {/* mini-player-btn */}
            <button className="outline-none" onClick={miniPlayerHandler}>
              <MiniPlayerIcon />
            </button>

            {/* full-screen-btn */}
            <button className="outline-none" onClick={fullScreenHandler}>
              {isFullScreen ? <FullScreenCloseIcon /> : <FullScreenOpenIcon />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
