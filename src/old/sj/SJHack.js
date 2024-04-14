/** @param {NS} ns */
export async function main(ns) {
// Defines the "target server", which is the server
// that we're going to hack. In this case, it's "n00dles"
var target = ns.args[0];

// Defines how much money a server should have before we hack it
// In this case, it is set to 75% of the server's max money
var moneyThresh = ns.getServerMaxMoney(target) * 0.75;

// Defines the maximum security level the target server can
// have. If the target's security level is higher than this,
// we'll weaken it before doing anything else
var securityThresh = ns.getServerMinSecurityLevel(target) + 5;

// If we have the BruteSSH.exe program, use it to open the SSH Port
// on the target server
if (ns.fileExists("BruteSSH.exe", "home")) {
    ns.brutessh(target);
}

// Get root access to target server
ns.nuke(target);

// Infinite loop that continously hacks/grows/weakens the target server
while(true) {
    let securityLevel = ns.getServerSecurityLevel(target)
    let serverMoneyAvailable = ns.getServerMoneyAvailable(target)
    if (securityLevel > securityThresh) {
        // If the server's security level is above our threshold, weaken it
        ns.tprint("securityLevel: " + securityLevel)
        ns.tprint("securityThresh: " + securityThresh)
        ns.tprint("-> kör weaken")
        await ns.weaken(target);
    } else if (serverMoneyAvailable < moneyThresh) {
        ns.tprint("serverMoneyAvailable: " + serverMoneyAvailable)
        ns.tprint("moneyThresh: " + moneyThresh)
        // If the server's money is less than our threshold, grow it
        ns.tprint("-> kör grow")
        await ns.grow(target);
    } else {
        // Otherwise, hack it
        ns.tprint("-> kör hack")
        await ns.hack(target);
    }
    //await ns.sleep(2000)
}
}
