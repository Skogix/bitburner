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

    log(ns,`Starting operation: hack on ${target} in ${threads} threads`, true);
    let run = true
    while(run) {
        await ns.hack(target, {threads, stock: true})
    }
    ns.exit()
}
