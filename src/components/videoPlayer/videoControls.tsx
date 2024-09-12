import { Segment, formatTime } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
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
  SkipDurationBackIcon,
  SkipDurationNextIcon,
} from './icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './../ui/dropdown-menu';
import { segmentsHandler, updateTimeline } from '@/lib/createAndHandleSegments';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VideoPlayerControls({
  player,
  onVideoEnd,
  segments,
  setQuality,
  subtitles,
}: {
  player: any;
  onVideoEnd: () => void;
  segments: Segment[];
  setQuality: React.Dispatch<React.SetStateAction<string>>;
  subtitles: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [playerPaused, setPlayerPaused] = useState<boolean>(true);
  const [volumeIconState, setVolumeIconState] = useState<string>('high');
  const [durationStartTime, setDurationStartTime] = useState<string>('0:00');
  const [durationEndTime, setDurationEndTime] = useState<string>('0:00');
  const [playBackSpeed, setPlayBackSpeed] = useState<string>('1x');
  const [isFullScreen, setFullScreen] = useState<boolean>(false);
  const [showCaption, setShowCaption] = useState<boolean>(false);
  const [captionBtnDisabled, setCaptionBtnDisabled] = useState<boolean>(false);
  const [isSkipDurationNext, setSkipDurationNext] = useState<boolean>(false);
  const [isSkipDurationBack, setSkipDurationBack] = useState<boolean>(false);
  const [qualityValue, setQualityValue] = useState(
    searchParams.get('quality') ?? '1080',
  );

  const volumeSliderRef = useRef<any>(null);

  // play / pause btn toggle
  function togglePlay() {
    if (player?.paused()) {
      // player?.paused() returns true if media is playing
      player?.play();
    } else {
      player?.pause();
    }
  }

  // toggle voulme button
  function toggleVolumeBtn() {
    player?.muted(!player?.muted());
    setVolumeIconState(player?.muted() ? 'muted' : 'high');

    if (player?.muted()) {
      player?.volume(0);
    } else {
      player?.volume(1);
    }
  }

  function volumeSliderHandler(e: any) {
    player?.volume(e?.target.value);
    player?.muted(e?.target.value === 0);
  }

  function volumeIconToggle() {
    let volState;
    const volume = player?.volume();

    if (player?.muted() || volume === 0) {
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
    const totalDuration = formatTime(player?.duration());
    setDurationEndTime(totalDuration);
  }

  // start and end duration handler
  function startTimeHandler() {
    const currentTime = formatTime(player?.currentTime());
    setDurationStartTime(currentTime);
  }

  // playback speed control
  function playBackSpeedHandler() {
    const speedArr = [0.5, 1, 1.25, 1.5, 1.75, 2];
    let currentSpeed = player?.playbackRate();
    let index = speedArr.indexOf(currentSpeed);

    if (index === speedArr.length - 1) {
      index = 0;
    } else {
      index++;
    }

    currentSpeed = speedArr[index];
    player?.playbackRate(currentSpeed);
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
    if (document?.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      player?.requestPictureInPicture();
    }
  }

  //caption Handler
  function captionClickHandler() {
    const length = player?.textTracks()?.length;
    if (length === 0) {
      setCaptionBtnDisabled(true);
      return;
    }
    const isCaptionOn = player?.textTracks()[0].mode === 'showing';
    if (isCaptionOn) {
      setShowCaption(false);
      player.textTracks()[0].mode = 'hidden';
    } else {
      setShowCaption(true);
      player.textTracks()[0].mode = 'showing';
    }
  }

  // skip 15 sec
  const skip = (skipTime: number) => {
    if (skipTime > 0) {
      setSkipDurationNext(true);
      setTimeout(() => {
        setSkipDurationNext(false);
      }, 500);
    } else {
      setSkipDurationBack(true);
      setTimeout(() => {
        setSkipDurationBack(false);
      }, 500);
    }
    player?.currentTime(player?.currentTime() + skipTime);
  };

  //quality handler
  const qualityHandler = (quality: string) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('quality', quality);
    setQuality(quality);
    setQualityValue(quality);
    router.push(`${currentUrl?.pathname + currentUrl?.search}`);
  };

  // handle key events
  function handleKeyEvents(e: any) {
    switch (e?.code) {
      case 'Space':
        togglePlay();
        e?.stopPropagation();
        e?.preventDefault();
        break;

      case 'KeyF':
        fullScreenHandler();
        e?.stopPropagation();
        break;

      case 'KeyI':
        miniPlayerHandler();
        e?.stopPropagation();
        break;
      case 'ArrowRight':
        skip(15);
        e?.stopPropagation();

        break;
      case 'ArrowLeft':
        skip(-15);
        e?.stopPropagation();

        break;
      case 'KeyP':
        playBackSpeedHandler();
        e?.stopPropagation();

        break;
      case 'KeyM':
        toggleVolumeBtn();
        e?.stopPropagation();
        break;
      case 'KeyC':
        captionClickHandler();
        e?.stopPropagation();
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (player) {
      player?.on('play', () => setPlayerPaused(false));
      player?.on('pause', () => setPlayerPaused(true));

      player?.on('volumechange', volumeIconToggle);

      player?.on('loadedmetadata', () => {
        const length = player?.textTracks()?.length;
        if (length === 0) {
          player?.addRemoteTextTrack({
            kind: 'captions',
            srclang: 'en',
            label: 'English',
            src: subtitles,
          });
        }

        setDurationHandler();
        captionClickHandler();
        segmentsHandler(segments, player);
      });
      player?.on('timeupdate', startTimeHandler);

      player?.on('click', togglePlay);

      player?.on('ended', () => {
        setPlayerPaused(true);
        onVideoEnd();
      });

      document.addEventListener('keydown', handleKeyEvents);
      document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement === null) {
          setFullScreen(false);
        }
      });

      // segments handling events
      const timelineContainer = document.querySelector(
        '#timeline-container',
      ) as Element;
      player?.on('timeupdate', (e: any) => updateTimeline(e, player, segments));

      timelineContainer.addEventListener('click', (e: any) =>
        updateTimeline(e, player, segments),
      );
      timelineContainer.addEventListener('mousemove', (e: any) =>
        updateTimeline(e, player, segments),
      );
      timelineContainer.addEventListener('mouseover', (e: any) =>
        updateTimeline(e, player, segments),
      );
      timelineContainer.addEventListener('mouseout', (e: any) =>
        updateTimeline(e, player, segments),
      );
      timelineContainer.addEventListener('mousedown', (e: any) =>
        updateTimeline(e, player, segments),
      );

      document.addEventListener('mouseup', (e: any) =>
        updateTimeline(e, player, segments),
      );
    }
  }, [player]);

  return (
    <>
      <div
        id="skip-duration-back"
        className={`${isSkipDurationBack ? 'opacity-100' : 'opacity-0'} pointer-events-none absolute left-[10%] top-[calc(50%-40px)] z-[1] inline-flex h-20 w-20 flex-col items-center justify-center rounded-full bg-[#fff]/90 p-2 text-[#000] transition-all duration-300`}
      >
        <SkipDurationBackIcon />
        <span className="text-[13px] font-bold">15 sec</span>
      </div>
      <div
        id="skip-duration-next"
        className={`${isSkipDurationNext ? 'opacity-100' : 'opacity-0'} pointer-events-none absolute right-[10%] top-[calc(50%-40px)] z-[1] inline-flex h-20 w-20 flex-col items-center justify-center rounded-full bg-[#fff]/90 p-2 text-[#000] transition-all duration-300`}
      >
        <SkipDurationNextIcon />
        <span className="text-[13px] font-bold">15 sec</span>
      </div>
      <div
        className={`inline-flex flex-col items-center ${playerPaused ? 'opacity-100' : 'opacity-0'} pointer-events-none absolute left-[calc(50%-48px)] top-[calc(50%-48px)] z-[1] h-20 w-20 justify-center rounded-full bg-[#db3636] p-3 text-[#fff] shadow-lg transition-all duration-300`}
      >
        {playerPaused ? <PauseIcon className="" /> : <PlayIcon className="" />}
      </div>
      <div
        className={`absolute bottom-0 ${!isFullScreen && 'group-hover/v-container:opacity-100'} z-50 w-full from-[#000000E6] to-transparent py-1 transition-all before:pointer-events-none before:absolute before:bottom-0 before:z-[-1] before:aspect-[5/1] before:w-full before:bg-gradient-to-t before:content-['']`}
      >
        {/* timeline segments */}
        <div
          id="timeline-container"
          className="group/timeline relative mx-[10px] mb-2 flex h-[5px] w-[calc(100%-20px)] cursor-pointer items-center transition-all"
        >
          <div
            id="timeline"
            className="relative left-0 top-0 flex h-full w-full items-center justify-between"
          >
            <div
              id="timeline-label"
              className="font-semibol absolute -top-8 hidden items-center gap-1 whitespace-nowrap rounded-md bg-[#555] px-1 text-[14px] text-[#f2f2f2] group-hover/timeline:flex"
            >
              0:00
            </div>{' '}
            {/* timeline-label */}
          </div>
        </div>

        {/* //controls */}
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-3">
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
            <div className="group/volume-container flex items-center gap-2">
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
                className="relative h-[3px] w-0 scale-x-0 cursor-pointer appearance-none bg-[#f2f2f2] outline-none transition-all duration-200 group-hover/volume-container:w-[75px] group-hover/volume-container:scale-x-100 [&::-webkit-slider-thumb]:h-[13px] [&::-webkit-slider-thumb]:w-[13px] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ff2a2a]"
                name="mute-btn-range"
                min="0"
                max="1"
                step="any"
                defaultValue="1"
                onChange={volumeSliderHandler}
              />
            </div>

            {/* duration-container*/}
            <div className="font-semibold">
              <span className="duration-start-time">{durationStartTime} </span>/
              <span className="duration-end-time"> {durationEndTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* speed-btn */}
            <button
              className="flex w-8 items-center justify-center outline-none"
              onClick={playBackSpeedHandler}
            >
              {playBackSpeed}
            </button>

            {/* captions-btn */}
            <button
              className="relative flex justify-center outline-none disabled:opacity-50"
              onClick={captionClickHandler}
              disabled={captionBtnDisabled}
            >
              <CaptionIcon />
              <div
                className={`absolute bottom-0 h-[3px] w-[calc(100%-6px)] bg-[#f52626] transition-all ${showCaption ? 'opacity-100' : 'opacity-0'}`}
              ></div>
            </button>

            <DropdownMenu key="1" modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="outline-none">{qualityValue}</button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#a2a0a0] text-[#000]">
                <DropdownMenuItem
                  className="flex justify-center"
                  onClick={() => qualityHandler('360')}
                >
                  360p
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex justify-center"
                  onClick={() => qualityHandler('720')}
                >
                  720p
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex justify-center"
                  onClick={() => qualityHandler('1080')}
                >
                  1080p
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
