'use strict';

import * as vscode from 'vscode';
import * as child_process from "child_process";
import { dirname } from 'path';

export function activate(context: vscode.ExtensionContext) {
  console.log('Fourmolu extension activated!');

  vscode.languages.registerDocumentFormattingEditProvider(
    { scheme: 'file', language: 'haskell' },
    {
      provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
        const config = vscode.workspace.getConfiguration("fourmolu");

        const replaceVars = (template: string) => {
          return template.replaceAll('${file}', document.fileName);
        }

        const executable = config.get("path") as string;
        const args = (config.get("arguments") as Array<string>).map(replaceVars);
        const workDir = dirname(document.fileName);

        console.info(`Formatting file: ${document.fileName}`,
          {
            "command": executable,
            "args": args,
            "workDir": workDir
          });

        const process = child_process.spawnSync(executable, args, {
          cwd: workDir,
          stdio: "pipe",
          shell: true,
          input: document.getText()
        });

        if (process.error || process.status !== 0) {
          console.error('An error occurred while trying to format the file',
            { "error": process.error
            , "stderr": process.stderr.toString()
            }
          );
        }

        return [vscode.TextEdit.replace(
          new vscode.Range(0, 0, document.lineCount, 0),
          process.stdout.toString()
        )];
      }
    });
}


