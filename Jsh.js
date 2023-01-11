var prompt = require('prompt');

prompt.start();

(async () => {
    for (;;) {
        const input = await prompt.get("jshell");
        interpret(input.jshell);
    }
})();

function interpret(input) {
    const parsedInput = input.split(" ");
    switch (parsedInput[0]) {
        case "run":
            console.log("test");
            break;
        default:
            break;
    }
}
