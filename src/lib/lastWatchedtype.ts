interface LastWatchedVideo{
  id:number;
  type:string;
  title:string;
  parentId:number | null;
}

export type LastWatchedVideoI = LastWatchedVideo | null;