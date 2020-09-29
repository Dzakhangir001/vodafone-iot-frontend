import { exec, onExitKill } from './util';

export interface TestOptions {
  baseUrl: string;
  chromiumUrl: string;
  jestArgs: string[];
  screenshotDelay: number;
  slowMo: number;
}

export default async function test({
  baseUrl,
  chromiumUrl,
  jestArgs,
  screenshotDelay,
  slowMo,
}: TestOptions): Promise<number> {
  const args = [
    './node_modules/@vue/cli-service/bin/vue-cli-service.js',
    'test:unit',
    '--config',
    './tests/visual/jest.config.js',
    ...jestArgs,
  ];

  if (!args.includes('--maxWorkers') && !args.includes('-w') && !args.includes('--runInBand')) {
    args.push('--runInBand');
  }

  const proc = exec('node', args, {
    stdio: 'inherit',
    env: {
      JEST_PUPPETEER_CONFIG: './tests/visual/jest-puppeteer.config.js',
      PUPPETEER_BROWSER_URL: chromiumUrl,
      PUPPETEER_SLOW_MO: String(slowMo),
      TEST_VISUAL_BASE_URL: baseUrl,
      TEST_VISUAL_SCREENSHOT_DELAY: String(screenshotDelay),
    },
  });

  onExitKill(proc);

  const result = await proc;

  return result.exitCode === null ? 1 : result.exitCode;
}
