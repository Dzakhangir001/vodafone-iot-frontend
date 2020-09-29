import { ChildProcess } from 'child_process';
import execa, { ExecaChildProcess, ExecaSyncReturnValue, Options, SyncOptions } from 'execa';
import { once } from 'lodash';
import onExit from 'signal-exit';
import treeKill from 'tree-kill';

export function onExitKill(proc: ChildProcess): void {
  onExit(
    once(() => {
      if (proc.pid) {
        treeKill(proc.pid);
      }
    }),
  );
}

export function exec(command: string, args: string[], options?: Options): ExecaChildProcess {
  console.log(`> ${command} ${args.join(' ')}`);

  return execa(command, args, options);
}

export function execSync(command: string, args: string[], options?: SyncOptions): ExecaSyncReturnValue {
  console.log(`> ${command} ${args.join(' ')}`);

  return execa.sync(command, args, options);
}
