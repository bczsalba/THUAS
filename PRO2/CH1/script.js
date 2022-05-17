/*

JavaScript in Space.

Prompt (shortened):
    Design and create a website that is to be used inside [a] spacecraft. The purpose of
    the website is to give information about the trip and to prepare travelers for
    upcoming arrival on mars.

*/


NF = Intl.NumberFormat();

MAX_FUEL = 700000;
DISTANCE = 54500000;
MONTH_TO_MS = 2629800000;

END_DATE = new Date("2022-06-01T00:00:00Z");

TERMINAL_HISTORY = document.getElementById("terminal-history");

HELP_TEXT = `\
Commands:
    - help: Shows this menu.
    - echo: Prints anything given to it to this terminal.
    - marsweight <earth_weight>: Returns the given earth weight,
        adjusted for Mars' gravity.
`


// Computes how many percent of the trip has been completed.
function computePercentElapsed(difference) {
    return difference / MONTH_TO_MS;
}

// Gets the ETA from END_DATE
//  Not sure if this is timezone-accurate, but also not sure of
//  how timezones are handled in space, so it should be fine :).
function getETA(difference) {
    seconds = difference / 1000;
    minutes = seconds / 60;
    hours = minutes / 60;
    days = hours / 24;

    return `\
        ${Math.floor(days)} days,\
        ${Math.floor(hours % 24)}h\
        ${Math.floor(minutes % 60)}m\
        ${Math.floor(seconds % 60)}s\
    `
}

// Generates a random speed value.
//  Apparently, spaceships can reach up to 250,000 km/h, so that's
//  the max generated by this function. The lowest value (10k) is
//  just something I thought made sense.
function getSpeed() {
    let speed = Math.floor(100000 + Math.random() * 150000);
    return `${NF.format(speed)} km/h`;
}

// Calculates how much of the total fuel remains, using the elapsed %.
function getFuel(difference) {
    let factor = computePercentElapsed(difference);

    let remaining = Math.floor(factor * MAX_FUEL);

    return `${NF.format(remaining)} kg`;
}

// Calculates the remaining distance based on the maximum.
function getDistance(difference) {
    let factor = computePercentElapsed(difference);
    let travelled = Math.floor(DISTANCE * factor);

    return `${NF.format(travelled)} km`
}

// Generates a random acceleration value.
//  Spaceships tend to reach around 29 ms^2 acceleration during takeoff,
//  though it goes down once the ship is on trajectory. I assume while in
//  deep-space transit it would be relatively close to 0, but that doesn't
//  look very interesting.
function getAcceleration() {
    let accel = 10 + Math.floor(Math.random() * 5)
    return `${NF.format(accel)} m/s^2`
}

// Appends some text to the command history field.
function appendToHistory(text) {
    if (TERMINAL_HISTORY.innerText.length > 0) {
        text = "\n" + text;
    }

    TERMINAL_HISTORY.innerText += text;
    TERMINAL_HISTORY.scrollTop = TERMINAL_HISTORY.scrollHeight;
}

// Handles a command input.
function handleCommand(command) {
    let parts = command.split(" ");
    if (parts[0] == "help" || parts[0] == "?") {
        appendToHistory(HELP_TEXT);
        return;
    }

    if (parts[0] == "marsweight") {
        if (parts.length !== 2) {
            appendToHistory(`Invalid input: Command requires one argument, got [${parts}].`);
            return;
        }

        appendToHistory(
            `${parts[1]}KG on Earth is ${Number(parts[1]) * 0.375}KG on Mars.`
        );
        return;
    }

    if (parts[0] == "echo") {
        appendToHistory(parts.slice(1).join(" "));
        return;
    }

    appendToHistory(`Invalid input: Unrecognized command ${parts[0]} in [${parts}].`);
}

// Submits the current input value to the `handleCommand` function.
function submitInput(input) {
    if (event.code == "Enter") {
        handleCommand(input.value);
        input.value = "";
    } else if (event.code == "KeyL" && event.ctrlKey) {
        TERMINAL_HISTORY.innerText = "";
    }
}

// Periodically updates all UI.
setInterval(() => {
    let difference = END_DATE - new Date();

    let eta = document.getElementById("eta");
    eta.innerText = getETA(difference);

    let speed = document.getElementById("speed");
    speed.innerText = getSpeed(difference);

    let acceleration = document.getElementById("acceleration");
    acceleration.innerText = getAcceleration();

    let fuel = document.getElementById("fuel");
    fuel.innerText = getFuel(difference);

    let distance = document.getElementById("distance");
    distance.innerText = getDistance(difference);
}, 1000);

// We send out a `help` command on startup to display the help message. This
// could be done by other means, but this is cleaner IMO.
handleCommand("help");
