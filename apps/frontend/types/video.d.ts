type Thumbnail = {
  height: number;
  url: string;
  width: number;
};

export type Video = {
  videoId: string;
  url: string;
  title: string;
  description: string;
  snippet: {
    url: string;
    duration: any;
    publishedAt: any;
    thumbnails: {
      id: string;
      url: string;
      default: Thumbnail;
      high: Thumbnail;
      height: number;
      width: number;
    };
    title: string;
  };
  views: any;
};
