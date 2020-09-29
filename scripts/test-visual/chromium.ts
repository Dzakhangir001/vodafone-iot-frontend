import { once } from 'lodash';
import onExit from 'signal-exit';
import waitOn from 'wait-on';
import { exec, execSync } from './util';

export interface ChromiumOptions {
  chromiumUrl?: string;
}

export default async function chromium({ chromiumUrl }: ChromiumOptions): Promise<string> {
  if (!chromiumUrl) {
    chromiumUrl = 'http://localhost:10222/';

    const proc = exec(
      'docker',
      ['run', '--rm', '--detach', '--publish', '10222:9222', 'alpeware/chrome-headless-trunk:rev-645378'],
      { stdio: 'pipe' },
    );

    const result = await proc;

    onExit(once(() => execSync('docker', ['stop', result.stdout])));
  }

  console.log(`Waiting for Chromium at "${chromiumUrl}"...`);

  await waitOn({
    resources: [chromiumUrl.replace(/^http:/, 'http-get:')],
    timeout: 60000,
  });

  console.log('Chromium available!');

  return chromiumUrl;
}
