import { youtube_v3 } from '@googleapis/youtube';
import { google } from 'googleapis';
import { Video } from 'types/video';

// initialize the Youtube API library
const youtube = google.youtube('v3');

export async function searchRecipeVideo(searchQuery: string): Promise<Video[]> {
  const listParams: youtube_v3.Params$Resource$Search$List = {
    q: searchQuery + ' 레시피',
    part: ['snippet'],
    key: process.env.YOUTUBE_API_KEY,
  };
  const res = await youtube.search.list(listParams);
  const descriptionAvailableVideos: youtube_v3.Schema$SearchResult[] = [];
  console.log('res.data.items', JSON.stringify(res.data.items, null, 2));
  res.data.items.map((item) => {
    if (item.snippet?.description.length > 30) {
      descriptionAvailableVideos.push(item);
    }
  });

  if (descriptionAvailableVideos.length === 0) {
    return [];
  }

  const res2 = await youtube.videos.list({
    id: descriptionAvailableVideos.map((item) => item.id.videoId),
    part: ['id', 'snippet'],
    key: process.env.YOUTUBE_API_KEY,
  });

  const videosWithDescription = res2.data.items;
  console.log('item', JSON.stringify(videosWithDescription, null, 2));
  const convertedVideos: Video[] = videosWithDescription.map((item) => {
    return {
      videoId: item.id,
      url: `https://www.youtube.com/watch?v=${item.id}`,
      title: item.snippet.title,
      description: item.snippet.description,
      snippet: {
        url: `https://www.youtube.com/watch?v=${item.id}`,
        duration: item.snippet.publishedAt,
        publishedAt: item.snippet.publishedAt,
        thumbnails: {
          id: item.id,
          url: item.snippet.thumbnails.default.url,
          default: item.snippet.thumbnails.default,
          high: item.snippet.thumbnails.high,
          height: item.snippet.thumbnails.high.height,
          width: item.snippet.thumbnails.high.width,
        },
        title: item.snippet.title,
      },
      views: item.snippet.publishedAt,
    };
  });

  return convertedVideos;
}
