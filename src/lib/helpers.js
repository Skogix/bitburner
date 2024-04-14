/**
 * Logs a message to the console, prints it to the terminal, and optionally displays a toast notification.
 * @param {NS} ns - The namespace object.
 * @param {string} [message=""] - The message to log.
 * @param {boolean} [alsoPrintToTerminal=true] - Whether to print the message to the terminal.
 * @param {string} [toastStyle=""] - The style of the toast notification (e.g., "info", "warning").
 * @returns {string} - The logged message.
 */
export function log(
  ns,
  message = "",
  alsoPrintToTerminal = true,
  toastStyle = "",
) {
  ns.print(message);
  if (toastStyle) ns.toast(message, toastStyle);
  if (alsoPrintToTerminal) {
    ns.tprint(message);
    // TODO: Write to a log file?
  }
  return message;
}

/**
 * Prints a break line followed by centered text to the terminal.
 * @param {NS} ns - The namespace object.
 * @param {string} text - The text to be centered within the break line.
 */
export function printBreak(ns, text) {
  let breakLine = "~".repeat(50); // Create a line of tildes
  let padding = Math.floor((breakLine.length - text.length) / 2); // Calculate the padding needed
  let centeredText = " ".repeat(padding) + text + " ".repeat(padding); // adding spaces before and after
  ns.tprint(breakLine); // Print the line of tildes
  ns.tprint(centeredText); // Print the centered words
}
