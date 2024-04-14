import {
  log
} from 'skogix/lib/helpers.js'
import {
  scanAll, gainRootAccess
} from 'skogix/lib/scanner.js'
/** @param {NS} ns */
export async function main(ns) {
  let target = ns.args[0]
  let listaMedAllaServrar = ns.getPurchasedServers()
  let nyaLista = scanAll(ns, 'home')
  listaMedAllaServrar = listaMedAllaServrar.concat(nyaLista)
  listaMedAllaServrar.forEach((server) => {
    ns.tprint(server)
    ns.scp('SJHack.js', server) 
    ns.exec('SJHack.js', server, 1, target.toString())
  })
}
