export const PauseIcon = ({ className }: { className: string }) => {
  return (
    <svg className={`pause-icon ${className}`} viewBox="0 0 24 24">
      <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
    </svg>
  );
};

export const PlayIcon = ({ className }: { className: string }) => {
  return (
    <svg className={`play-icon ${className}`} viewBox="0 0 24 24">
      <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
    </svg>
  );
};

export const HighVolumeIcon = ({ className }: { className: string }) => {
  return (
    <svg className={className} height="24px" width="24px" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
      />
    </svg>
  );
};

export const LowVolumeIcon = ({ className }: { className: string }) => {
  return (
    <svg className={className} height="24px" width="24px" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
      />
    </svg>
  );
};

export const MutedVolumeIcon = ({ className }: { className: string }) => {
  return (
    <svg className={className} height="24px" width="24px" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
      />
    </svg>
  );
};

export const CaptionIcon = () => {
  return (
    <svg viewBox="0 0 24 24" height="24px" width="24px">
      <path
        fill="currentColor"
        d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z"
      />
    </svg>
  );
};

export const MiniPlayerIcon = () => {
  return (
    <svg viewBox="0 0 24 24" height="24px" width="24px">
      <path
        fill="currentColor"
        d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"
      />
    </svg>
  );
};

export const FullScreenOpenIcon = () => {
  return (
    <svg className="open" viewBox="0 0 24 24" height="24px" width="24px">
      <path
        fill="currentColor"
        d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
      />
    </svg>
  );
};

export const FullScreenCloseIcon = () => {
  return (
    <svg viewBox="0 0 24 24" height="24px" width="24px">
      <path
        fill="currentColor"
        d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
      />
    </svg>
  );
};

export const SkipDurationBackIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="19 4 12 12 19 20 19 4" />
      <polygon points="12 4 5 12 12 20 12 4" />
    </svg>
  );
};

export const SkipDurationNextIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 4 12 12 5 20 5 4" />
      <polygon points="12 4 19 12 12 20 12 4" />
    </svg>
  );
};
