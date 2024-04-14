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
    if(!threads) {
        threads = 1
    }

    log(ns,`Starting operation: hack on ${target} in ${threads} threads`, true);
    await ns.grow(target, {threads, stock: true})
    ns.exit()
}
