import { exec, ExecException } from "child_process";

interface IReturn {
  error: ExecException | null;
  stdout: string;
  stderr: string;
}

/**
 * Promise wrapper for exec module
 * @param command Cli command
 */
export const execPromise = (command: string): Promise<IReturn> => {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      // removing \n character from end
      const url = stdout?.slice(0, stdout.length - 1);
      resolve({ error, stderr, stdout: url });
    });
  });
};
