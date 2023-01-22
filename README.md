# JSH

A really simple JavaScrippt shell run locally with Node.js.

## Commands

* `help` - display the list of available Commands
* `run <path> [!]` - run a process with its absolute or relative path (you can add the postfixe "!" to detach the process)
* `lp` - list running processes by decreasing pid
* `bing [-k|-p|-c] <pid>` - kill, pause or resume a running process
* `keep <pid>` - keep a process alive even after closing jsh

## Keyboard shortcuts

* `Ctrl+P` - close jsh
* `Up` and `Down` : navigate in the jsh commands history
