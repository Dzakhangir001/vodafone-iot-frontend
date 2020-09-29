import commander from 'commander';
import exit from 'exit';
import packageJson from '../../package.json';
import chromium, { ChromiumOptions } from './chromium';
import storybook, { StorybookOptions } from './storybook';
import test, { TestOptions } from './test';

interface Options extends ChromiumOptions, StorybookOptions, Omit<TestOptions, 'chromiumUrl'> {
  updateSnapshot: boolean;
}

commander
  .version(packageJson.version)
  .description('Run visual regression test suites.', { jestArgs: 'Passed through to Jest' })
  .arguments('[jestArgs...]')
  .option('--base-url <url>', 'The URL under which Chromium can access Storybook', 'http://host.docker.internal:7007/')
  .option('--chromium-url <url>', 'Do not start Chromium and connect to the one provided via URL')
  .option(
    '--screenshot-delay <ms>',
    'Delay before taking screenshots to wait for completion of browser rendering',
    parseInt,
    300,
  )
  .option('--slow-mo <ms>', 'Puppeteer slow motion mode', parseInt, 0)
  .option('--storybook-url <url>', 'Do not start Storybook and connect to the one provided via URL')
  // Duplicate Jest's updateSnapshot option to avoid putting "--" into package.json scripts
  .option('--update-snapshot', 'Passed through to Jest to update stored snapshots')
  .action(async (jestArgs: string[], options: Options) => {
    if (options.updateSnapshot) {
      jestArgs.unshift('--updateSnapshot');
    }

    let code = 1;

    try {
      const [chromiumUrl] = await Promise.all([chromium(options), storybook(options)]);
      code = await test({ ...options, jestArgs, chromiumUrl });
    } catch (e) {
      console.log(e);
    }

    exit(code);
  })
  .parse(process.argv);
