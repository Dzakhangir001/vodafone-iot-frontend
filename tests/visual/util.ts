import { toId } from '@storybook/router/utils';
import { MatchImageSnapshotOptions } from 'jest-image-snapshot';
import { stringify } from 'querystring';

if (!process.env.TEST_VISUAL_BASE_URL) {
  throw new Error('No TEST_VISUAL_BASE_URL set');
}

type Params = Record<string, string> | string;

const BASE_URL = process.env.TEST_VISUAL_BASE_URL.replace(/\/$/, '');
const STORY_URL = `${BASE_URL}/iframe.html`;

const SCREENSHOT_DELAY = parseInt(process.env.TEST_VISUAL_SCREENSHOT_DELAY || '', 10) || 300;

export function buildStoryUrl(kind: string, story: string, params?: Params): string {
  const url = new Array<string>();
  url.push(STORY_URL);
  url.push('?');
  url.push(stringify({ id: toId(kind, story) }));

  if (params === undefined) {
    // nothing
  } else if (typeof params === 'object') {
    url.push('&');
    url.push(stringify(params));
  } else if (params !== '') {
    url.push('&');
    url.push(params);
  }

  return url.join('');
}

export default function testStory(
  kind: string,
  story: string,
  params?: Params,
  options?: MatchImageSnapshotOptions,
): void {
  describe(kind, () => {
    test(story, async () => {
      await page.goto(buildStoryUrl(kind, story, params));
      await page.addStyleTag({
        content: `
          *, *::before, *::after {
            -moz-transition: none !important;
            transition: none !important;
            -moz-animation: none !important;
            animation: none !important;
          }
        `,
      });
      // let chrome apply new styles...
      await page.waitFor(SCREENSHOT_DELAY);

      const image = await page.screenshot();

      expect(image).toMatchImageSnapshot(options);
    });
  });
}
