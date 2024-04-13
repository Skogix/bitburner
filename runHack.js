import {
  log
} from 'skogix/lib/helpers.js'

/** @param {NS} ns **/
export async function main(ns) {
    const target = ns.args[0]
    const threads = ns.args[1]
    const delay = ns.args[2]

    if (delay && delay > 0) {
        await ns.sleep(delay)
    }

    let run = true
    let threads = 1
    let hackRam = ns.getScriptRam('skogix/lib/hack.js')
    let growRam = ns.getScriptRam('skogix/lib/grow.js')
    let weakenRam = ns.getScriptRam('skogix/lib/weaken.js')
    log(ns, "--- scriptRam (hack.js) " + scriptRam + "", true)
    let totalRam = ns.getServerMaxRam(s)
    log(ns, "--- totalRam " + totalRam + "", true)
    let usedRam = ns.getServerUsedRam(s)
    log(ns, "--- usedRam " + usedRam + "", true)
    let freeRam = totalRam - usedRam
    log(ns, "--- freeRam " + freeRam + "", true)
    threads = Math.floor(freeRam / scriptRam)
    log(ns, "--- threads: " + threads + "", true)
    log(ns,`Starting operation: hack on ${target} in ${threads} threads`, true);
    while(run) {
        let moneyAvailable = ns.getServerMoneyAvailable(serverToHack)
        let moneyMax = ns.getServerMaxMoney(serverToHack)
        log(ns, "--- moneyAvailable " + moneyAvailable + "")
        log(ns, "--- moneyMax " + moneyMax + "")

        if(moneyAvailable > moneyMax*0.7){
            log(ns, "### hacking")
            await ns.hack(target, {threads, stock: true})
        } else {
            log(ns, "### growing")
            await ns.grow(target, {threads, stock: true})
        }
    }
    ns.exit()
}
