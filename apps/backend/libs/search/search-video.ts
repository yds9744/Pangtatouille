import { ParserService } from './parser.service';

const rfc3986EncodeURIComponent = (str: string) =>
  encodeURIComponent(str).replace(/[!'()*]/g, escape);

export async function searchVideo(searchQuery: string) {
  const YOUTUBE_URL = 'https://www.youtube.com';

  const results = [];
  let details = [];
  let fetched = false;
  const options = { type: 'video', limit: 0 };

  const searchRes = await fetch(
    `${YOUTUBE_URL}/results?q=${rfc3986EncodeURIComponent(
      searchQuery.trim(),
    )}&hl=en`,
  );
  let html = await searchRes.text();
  let parsedHtml: any = null;
  // try to parse html
  try {
    const data = html.split("ytInitialData = '")[1].split("';</script>")[0];
    html = data.replace(/\\x([0-9A-F]{2})/gi, (...items) => {
      return String.fromCharCode(parseInt(items[1], 16));
    });
    html = html.replace(/\\\\"/g, '');
    parsedHtml = JSON.parse(html);
  } catch (e) {
    /* nothing */
  }

  if (
    parsedHtml &&
    parsedHtml.contents &&
    parsedHtml.contents.sectionListRenderer &&
    parsedHtml.contents.sectionListRenderer.contents &&
    parsedHtml.contents.sectionListRenderer.contents.length > 0 &&
    parsedHtml.contents.sectionListRenderer.contents[0].itemSectionRenderer &&
    parsedHtml.contents.sectionListRenderer.contents[0].itemSectionRenderer
      .contents.length > 0
  ) {
    details =
      parsedHtml.contents.sectionListRenderer.contents[0].itemSectionRenderer
        .contents;
    fetched = true;
  }
  // backup/ alternative parsing
  if (!fetched) {
    try {
      details = JSON.parse(
        html
          .split('{"itemSectionRenderer":{"contents":')
          [html.split('{"itemSectionRenderer":{"contents":').length - 1].split(
            ',"continuations":[{',
          )[0],
      );
      fetched = true;
    } catch (e) {
      /* nothing */
    }
  }
  if (!fetched) {
    try {
      details = JSON.parse(
        html
          .split('{"itemSectionRenderer":')
          [html.split('{"itemSectionRenderer":').length - 1].split(
            '},{"continuationItemRenderer":{',
          )[0],
      ).contents;
      fetched = true;
    } catch (e) {
      /* nothing */
    }
  }

  if (!fetched) return [];

  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < details.length; i++) {
    if (
      typeof options.limit === 'number' &&
      options.limit > 0 &&
      results.length >= options.limit
    )
      break;
    const data = details[i];

    const parserService = new ParserService();
    const parsed = parserService.parseVideo(data);
    if (!parsed) continue;
    const res = parsed;

    results.push(res);
  }

  return results;
}
