import waitOn from 'wait-on';
import { exec, onExitKill } from './util';

export interface StorybookOptions {
  storybookUrl?: string;
}

export default async function storybook({ storybookUrl }: StorybookOptions): Promise<string> {
  if (!storybookUrl) {
    storybookUrl = 'http://localhost:7007/';

    const proc = exec(
      'node',
      [
        './node_modules/@vue/cli-service/bin/vue-cli-service.js',
        'storybook:serve',
        '--config-dir',
        './storybook',
        '--port',
        '7007',
        '--ci',
      ],
      { stdio: 'ignore' },
    );

    onExitKill(proc);
  }

  console.log(`Waiting for Storybook at "${storybookUrl}"...`);

  await waitOn({
    resources: [storybookUrl.replace(/^http:/, 'http-get:')],
    timeout: 120000,
  });

  console.log('Storybook available!');

  return storybookUrl;
}
