/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
const termKit = require("terminal-kit");
const BeautifyConsole = require("beautify-console-log");
const args = require("args");
const term = termKit.terminal;

args.option("skip", "Skip the starting text");

const flags = args.parse(process.argv);

const inputErrorLog = new BeautifyConsole.default();
inputErrorLog.config({
    title: "Valeur d'entrée",
});

const userOutputErrorLog = new BeautifyConsole.default();
userOutputErrorLog.config({
    title: "Valeur obtenue",
});

const expectedOutputErrorLog = new BeautifyConsole.default();
expectedOutputErrorLog.config({
    title: "Valeur attendue",
});

async function learn() {
    const learnText = `Bienvenue dans le programme d'apprentissage Javascript de Pokélearn !
Pour des raisons de praticité, cette première étape ne concernera pas les pokémons...
Nous allons faire quelques cas pratiques suite au premier cours de Javascript.\n
Cela consiste à compléter le fichier ./scripts/learn.ts, pour cela il suffit d'ouvrir le fichier et de te laisser guider par les commentaires.\n
N'oublie pas de sauvegarder le fichier avant de passer à la suite !\n`;
    if (flags.skip) {
        term.white(learnText);
    } else {
        await term.slowTyping(learnText, {
            flashStyle: term.brightWhite,
            style: term.white,
            delay: 10,
        });
    }
    mainMenu();
}

const mainMenu = async () => {
    term.white("\nJe souhaite :");

    const items = [
        "Tester une de mes fonctions",
        "Valider mes réponses",
        "Quitter le menu.",
    ];

    const menu = term.singleColumnMenu(items, {
        extraLines: 1,
        continueOnSubmit: true,
    });

    menu.on(
        "submit",
        (
            response: {
                selectedIndex: number;
                selectedText: string;
                submitted: boolean;
                x: number;
                y: number;
            },
            err: any,
        ) => {
            switch (response.selectedText) {
                case "Tester une de mes fonctions":
                    testFunctionMenu();
                    term("\n");
                    menu.stop();

                    break;
                case "Valider mes réponses":
                    validateAnswers();
                    term("\n");
                    menu.stop();

                    break;
                case "Quitter le menu.":
                    showExitMessage();
            }
        },
    );
};

const testFunctionMenu = () => {
    let learn;
    try {
        Object.keys(require.cache).forEach(function (key) {
            delete require.cache[key];
        });
        console.log("require.cache", require.cache);
        learn = require("./learn");
    } catch (error) {
        term.red(
            "! Une des fonctions n'est pas définie ou une erreur de syntaxe a été détectée ! Détails :\n",
        );
        console.log(error);
        process.exit();
        return;
    }

    const items: [
        string,
        {
            fn: (...args: any[]) => any;
            inputs: any[];
            outputs: any[];
        },
    ][] = Object.entries(learn);

    term.white("Choisis une fonction à tester :");

    const menu = term.singleColumnMenu(
        items.map(([key]) => key),
        {
            extraLines: 1,
            continueOnSubmit: true,
        },
    );

    menu.on(
        "submit",
        (
            response: {
                selectedIndex: number;
                selectedText: string;
                submitted: boolean;
                x: number;
                y: number;
            },
            err: any,
        ) => {
            menu.stop();
            testFunction(items[response.selectedIndex][1]);
            showExitMessage();
        },
    );
};

const testFunction = ({
    fn,
    inputs,
    outputs,
}: {
    fn: (...args: any[]) => any;
    inputs: any[];
    outputs: any[];
}) => {
    try {
        let isCorrect = true;
        outputs.some((output, index) => {
            const userOutput = fn(inputs[index]);
            if (userOutput !== output) {
                isCorrect = false;
                inputErrorLog.error(inputs[index]);
                userOutputErrorLog.error(userOutput);
                expectedOutputErrorLog.error(output);
                return true;
            }
        });

        if (isCorrect) {
            term.green("La fonction est correcte !");
        }
    } catch (error) {
        console.log(error);
        term.red("Erreur lors de l'exécution de la fonction");
    }
};

const validateAnswers = () => {
    term("validate");
};

const showExitMessage = () => {
    term.white(
        "\nPour relancer le programme sans attendre, utilise la commande : \n",
    );
    term.cyan("npm run learn -s\n\n");
    process.exit();
};

learn();
