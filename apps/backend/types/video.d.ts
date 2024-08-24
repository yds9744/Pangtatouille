export type Video = {
  videoId: string;
  url: string;
  title: string;
  description: any;
  snippet: {
    url: string;
    duration: any;
    publishedAt: any;
    thumbnails: {
      id: any;
      url: any;
      default: any;
      high: any;
      height: any;
      width: any;
    };
    title: string;
  };
  views: any;
};
