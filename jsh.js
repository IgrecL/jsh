const { exit } = require("process");
const prompt = require("prompt"); prompt.start();
const exec = require("child_process").exec;
const readline = require('readline');

// Gestion des entrées clavier
readline.emitKeypressEvents(process.stdin);
process.stdin.on('keypress', (ch, key) => {
    if (key.ctrl && key.name == "p") { // On sort si l'utilisateur fait CTRL+P
        exit()
    } else if (key.name == "up") { // Navigation parmis les commandes précédentes
        
    }
});
process.stdin.setRawMode(true);

// Boucle asynchrone pour exécuter le shell en boucle
(async () => {
    for (;;) {
        const input = await prompt.get("jsh");
        interpreter(input.jsh);
    }
})();

// Interprétation de la commande jsh entrée
function interpreter(input) {
    const parsedInput = input.split(" ");
    switch (parsedInput[0]) {
        case "run":  run(parsedInput); 	break;
        case "lp":   lp(parsedInput);   break;
        case "bing": bing(parsedInput); break;
        case "keep": keep(parsedInput); break;
        default:                        break;
    }
}

// Exécution d'un programme de chemin donné
function run(parsedInput) {
    if (parsedInput.length == 2 || parsedInput.length == 3) {
        if (parsedInput[1].charAt(0) == "/") {
			if (parsedInput[3] == "!") {
				suffix = " &"
			} else {
				suffix = ""
			}
			exec(parsedInput[1] + suffix);
		} else {
            console.log("Le chemin doit commencer par \"/\"");
        }
	} else if (parsedInput.length < 2) {
        console.log("Veuillez indiquer le chemin vers l'exécutable.");
    } else {
        console.log("Trop d'arguments donnés.");
    }
}

// Liste des processus en cours
function lp(parsedInput) {
    if (parsedInput.length == 1) {
        exec("ps -A",
        function (stdout) {
            console.log("\nListe des processus : \n\n" + stdout);
        });
    } else {
        console.log("Trop d'arguments. Entrez juste \"lp\".")
    }
}

// Tuer, mettre en pause et reprendre des processus
function bing(parsedInput) {
    var suffix = []
    var reponse = []
    switch (parsedInput[1]) {
        case "-k": suffix = " ";      reponse = "tué";        break;
        case "-p": suffix = "-STOP "; reponse = "interrompu"; break;
        case "-c": suffix = "-CONT "; reponse = "relancé";    break;
        default:
            console.log("Veuillez entrer \"bing [-k|-p|-c] <processId>\".");
            break;
    }
    exec("kill " + suffix + parsedInput[2],
    function (error) {
        if (error == null) {
            console.log("Le processus " + parsedInput[2] + " a été " + reponse + ".");
        } else {
            console.log("\n" + parsedInput[2] + " n'est pas un pid valide.");
        }
    });
}

function keep(parsedInput) {
    
}