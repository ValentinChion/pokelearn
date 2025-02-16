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

const validateOutputLog = new BeautifyConsole.default();

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
            options: { [key: string]: string | boolean };
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
    options = {},
    withConsole = true,
}: {
    fn: (...args: any[]) => any;
    inputs: any[];
    outputs: any[];
    options: { [key: string]: string | boolean };
    withConsole?: boolean;
}) => {
    try {
        let isCorrect = true;
        outputs.some((output, index) => {
            let userOutput = fn(inputs[index]);
            if (typeof userOutput === "string" && options.trim) {
                userOutput = userOutput.trim();
            }
            if (userOutput !== output) {
                isCorrect = false;
                if (withConsole) {
                    inputErrorLog.error(inputs[index]);
                    userOutputErrorLog.error(userOutput);
                    expectedOutputErrorLog.error(output);
                }
                return true;
            }
        });

        if (isCorrect) {
            if (withConsole) {
                term.green("La fonction est correcte !");
            }
            return true;
        }
        return false;
    } catch (error) {
        term.red("Erreur lors de l'exécution de la fonction");
        console.log(error);
        return false;
    }
};

const validateAnswers = () => {
    let learn;
    try {
        learn = require("./learn");
    } catch (error) {
        term.red(
            "! Une des fonctions n'est pas définie ou une erreur de syntaxe a été détectée ! Détails :\n",
        );
        console.log(error);
        process.exit();
        return;
    }

    const allFunctions: [
        string,
        {
            fn: (...args: any[]) => any;
            inputs: any[];
            outputs: any[];
            options: { [key: string]: string | boolean };
        },
    ][] = Object.entries(learn);

    let endedExercices = true;
    allFunctions.map(([key, { fn, inputs, outputs, options }]) => {
        const isFnValidated = testFunction({
            fn,
            inputs,
            outputs,
            options,
            withConsole: false,
        });

        validateOutputLog.config({
            title: key,
        });
        if (isFnValidated) {
            validateOutputLog.log("Fonction correcte !");
        } else {
            endedExercices = false;
            validateOutputLog.error("Erreur sur la fonction");
        }
    });

    if (!endedExercices) {
        showExitMessage();
    } else {
        term.white(
            "Vous avez finis ce module ! Toutes vos fonctions sont corrects. Présentez votre code à un coach pour discuter de votre code.\n",
        );
        process.exit();
    }
};

const showExitMessage = () => {
    term.white(
        "\nPour relancer le programme sans attendre, utilise la commande : \n",
    );
    term.cyan("npm run learn -s\n\n");
    process.exit();
};

learn();
