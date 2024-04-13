import {
  log
} from 'skogix/lib/helpers.js'
/** @param {NS} ns **/
export async function main(ns) {
    let target = ns.args[0]
    let threads = ns.args[1]
    log(ns,`Starting operation: hack on ${target} in ${threads} threads`, true);
    await ns.weaken(target, {threads, stock: true})
    ns.exit()
}
