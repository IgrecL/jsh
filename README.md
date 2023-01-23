![jsh](https://user-images.githubusercontent.com/99618877/213927588-78d08b31-ee3f-490e-a1a5-6ed8a881f121.png)

# JSH

A really simple JavaScript shell run locally with Node.js.

## Commands

* `help` - display the list of available commands
* `run <path> [!]` - run a process with its absolute or relative path (you can add the postfixe "!" to detach the process)
* `lp` - list running processes by decreasing pid
* `bing [-k|-p|-c] <pid>` - kill, pause or resume a running process
* `keep <pid>` - keep a process alive even after closing jsh

## Keyboard shortcut

* `Ctrl+P` - close jsh
