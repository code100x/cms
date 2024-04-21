/* eslint-disable no-undef */
import { formatTime, type Segment } from './utils';

export function segmentsHandler(segments: Segment[], player: any) {
  segments?.forEach((each: Segment) => {
    const segmentDiv = document.createElement('div');
    const previewEle = document.createElement('div');
    const progressEle = document.createElement('div');
    segmentDiv.classList.add('timeline-segments');
    previewEle.classList.add('timeline-segments-preview');
    progressEle.classList.add('timeline-segments-progress');

    segmentDiv.style.width = `${((each?.end - each?.start) / player.duration()) * 100 - 0.3}%`;

    const s = document.querySelector('#timeline');

    segmentDiv.append(previewEle);
    segmentDiv.append(progressEle);
    if (s) {
      s.append(segmentDiv);
    }
  });
}

function previewViaBuffer(player: any) {
  const bufferedEnd = player.bufferedEnd();
  const percent = bufferedEnd / player.duration();
  return percent;
}
function progessTimeline(segments: Segment[], player: any) {
  const progressEles: NodeListOf<HTMLDivElement> = document.querySelectorAll(
    '.timeline-segments-progress',
  );

  segments.forEach((each: Segment, index: number) => {
    if (each.end > player.currentTime()) {
      progressEles[index].style.right =
        `${((each.end - player.currentTime()) / (each.end - each.start)) * 100}%`;
    } else {
      progressEles[index].style.right = '0px';
    }
  });
}

function previewViaMouseOverOrMove(e: any) {
  const timelineContainer = document.querySelector('#timeline-container');

  const rect = timelineContainer && timelineContainer.getBoundingClientRect();
  if (rect) {
    const percent =
      Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    return percent;
  }
}
function changeCurrentTimeOnClick(e: any, player: any) {
  const timelineContainer = document.querySelector('#timeline-container');

  const rect = timelineContainer && timelineContainer.getBoundingClientRect();
  let percent;
  if (rect) {
    percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
    player.currentTime(percent * player.duration());
  }
}

function setCurrentLabel(
  e: any,
  preview_position: any,
  segments: Segment[],
  player: any,
) {
  let currentLabel = segments[0].title;

  const currentPos = preview_position * player.duration();
  if (preview_position !== 0) {
    segments.forEach((each: Segment) => {
      if (each.start < currentPos && each.end > currentPos) {
        currentLabel = each.title;
      }
    });
  }

  const timelineLabel = document.querySelector(
    '#timeline-label',
  ) as HTMLDivElement;
  const timelineContainer = document.querySelector(
    '#timeline-container',
  ) as HTMLDivElement;

  const rect = timelineContainer && timelineContainer.getBoundingClientRect();

  let timelineLabelWidth = timelineLabel.offsetWidth / 2;

  if (timelineLabel && rect && timelineContainer) {
    timelineLabel.innerHTML = `<div>${formatTime(preview_position.toFixed(2) * player.duration())} - ${currentLabel}</div>`;

    if (Math.max(0, e.x - rect.x) < timelineLabel.offsetWidth / 2) {
      timelineLabelWidth = Math.max(0, e.x - rect.x);
    } else if (
      Math.max(0, e.x - rect.x) >
      timelineContainer.offsetWidth - timelineLabel.offsetWidth / 2
    ) {
      timelineLabelWidth =
        timelineLabel.offsetWidth -
        (timelineContainer.offsetWidth - (e.x - rect.x));
    }

    timelineLabel.style.left = `calc(${preview_position * 100}% - ${timelineLabelWidth}px)`;
  }
}

export function updateTimeline(e: any, player: any, segments: Segment[]) {
  let preview_position = 0;
  let isMouseOver = false;
  let isMouseDown = false;

  if (e.type === 'timeupdate') {
    if (!isMouseDown) {
      progessTimeline(segments, player);
    }

    if (!isMouseOver) {
      preview_position = previewViaBuffer(player);
    }
  }
  if (e.type === 'click') {
    changeCurrentTimeOnClick(e, player);
    isMouseDown = false;
  }

  if (e.type === 'mouseover') {
    isMouseOver = true;

    preview_position = previewViaMouseOverOrMove(e) as number;
  }
  if (e.type === 'mousemove') {
    isMouseOver = true;

    preview_position = previewViaMouseOverOrMove(e) as number;

    setCurrentLabel(e, preview_position, segments, player);

    if (isMouseDown) {
      changeCurrentTimeOnClick(e, player);
      progessTimeline(segments, player);
    }
  }
  if (e.type === 'mousedown') {
    isMouseDown = true;
  }
  if (e.type === 'mouseup') {
    isMouseDown = false;
    preview_position = previewViaBuffer(player);
  }

  if (e.type === 'mouseout') {
    isMouseOver = false;
    preview_position = previewViaBuffer(player);
  }
  const previewEles = document.querySelectorAll(
    '.timeline-segments-preview',
  ) as NodeListOf<HTMLDivElement>;

  if (preview_position !== 0) {
    segments.forEach((each, index) => {
      if (each.end > preview_position * player.duration()) {
        if (previewEles[index]) {
          previewEles[index].style.right =
            `${((each.end - preview_position * player.duration()) / (each.end - each.start)) * 100}%`;
        }
      } else if (previewEles[index]) {
        previewEles[index].style.right = '0px';
      }
    });
  }
}
