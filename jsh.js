const { exit } = require("process");
const prompt = require("prompt"); prompt.start();
const exec = require("child_process").exec;
const spawn = require("child_process").spawn;
const readline = require('readline');
const fs = require('fs');
const { execSync } = require("child_process");

// Keyboard interactions
readline.emitKeypressEvents(process.stdin);
process.stdin.on('keypress', (ch, key) => {
    if (key.ctrl && key.name == "p") { // Exiting on CTRL+P
        exit();
    }
});
process.stdin.setRawMode(true);

// Asynchronous loop
(async () => {
    for (;;) {
        const input = await prompt.get("jsh");
        interpreter(input.jsh);
    }
})();

// Interprete the jsh command
function interpreter(input) {
    const parsedInput = input.split(" ");
    switch (parsedInput[0]) {
		case "help": help(); 			break;
        case "run":  run(parsedInput); 	break;
        case "lp":   lp(parsedInput);   break;
        case "bing": bing(parsedInput); break;
        case "keep": keep(parsedInput); break;
        default:                        break;
    }
	fs.appendFile('.jshistory', input+ "\n", err => {
	    if (err) {
			console.error(err);
	  	}	
	});
}

// Display the list of available commands
function help() {
	console.log("\n   - help : display the list of available commands\n   - run <path> [!] : run a process with its absolute or relative path or with its name (you can add the postfixe \"!\" to detach the process)\n   - lp : list running processes by decreasing pid\n   - bing [-k|-p|-c] <pid> : kill, pause or resume a running process\n   - keep <pid> : keep a process alive even after closing jsh\n");
}

// Run a process with its absolute or relative path
function run(parsedInput) {
    if (parsedInput.length >= 2) {
		command = parsedInput[1];
		arguments = parsedInput.slice(2);
		if (arguments[arguments.length-1] != "!") {
			const child = spawn(command, arguments);
			child.stdout.on("data", data => {
				data = data.slice(0,-1);
				console.log(`${data}`);
			});
			child.stderr.on("data", data => {
				data = data.slice(0,-1);
				console.error(`${data}`);
			});
		} else {
			arguments = arguments.slice(0, -1);
			const child = spawn(command, arguments, {
				stdio: ["ignore", "ignore", "ignore"]
			});
		}
	} else {
        console.log("Please enter the path or program name");
    }
}

// List running processes by decreasing pid
function lp(parsedInput) {
    if (parsedInput.length == 1) {
        exec("ps -A",
        function (error, stdout, stderr) {
            console.log("\nProcesses list: \n\n" + stdout);
        });
    } else {
        console.log("Too many arguments. Please use \"lp\".")
    }
}

// Kill, pause and resume a running process
function bing(parsedInput) {
    var suffix = []
    var reponse = []
    switch (parsedInput[1]) {
        case "-k": suffix = " ";      reponse = "killed";        break;
        case "-p": suffix = "-STOP "; reponse = "interrupted"; break;
        case "-c": suffix = "-CONT "; reponse = "relancé";    break;
        default:
            console.log("Please use \"bing [-k|-p|-c] <pid>\".");
            break;
    }
    exec("kill " + suffix + parsedInput[2],
    function (error) {
        if (error == null) {
            console.log("The process " + parsedInput[2] + " was " + reponse + ".");
        } else {
            console.log("\n" + parsedInput[2] + " is not a valid pid.");
        }
    });
}

// Keep a process alive even after closing jsh
function keep(parsedInput) {
	if (parsedInput.length < 3) {
		pid = parsedInput[1];
		exec("kill -SIGSTOP" + pid);
		exec("kill -SIGCONT" + pid);
	} else {
        console.log("Too many arguments. Please use \"keep <pid>\".")
	}
}
