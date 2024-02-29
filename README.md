# Haskell formatter plugin based on `fourmolu`

The extension was made as the only decent way to format code with `fourmolu` was via `haskell-language-server`, which has fairly
large memory footprint. This extension is very lightweight compared to `haskell-language-server`.

## Requirements

Fourmolu executable has to be available on your system.

## Extension Settings

This extension contributes the following settings:

* `fourmolu.path`: Path to the fourmolu executable
    * Default: `fourmolu`
* `fourmolu.arguments`: Arguments to pass to fourmolu
    * Default: `--stdin-input-file ${file}`
    * Supports `${file}` variable which contains the absolute path of the file.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release
