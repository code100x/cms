import { FunctionComponent } from 'react';

interface YoutubeRendererProps {
  url: string;
}

export const YoutubeRenderer: FunctionComponent<YoutubeRendererProps> = ({
  url,
}) => {
  return (
    <div className="mt-2 flex justify-center">
      <iframe
        width="100%"
        className="h-[80vh] rounded-2xl"
        height="500px"
        src={url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};
