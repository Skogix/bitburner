/** @param {NS} ns */
export function log(ns, message = "", alsoPrintToTerminal = true, toastStyle = "") {
    ns.print(message);
    if (toastStyle) ns.toast(message, toastStyle);
    if (alsoPrintToTerminal) {
        ns.tprint(message);
        // TODO: skriv till en loggfil?
    }
    return message;
}
