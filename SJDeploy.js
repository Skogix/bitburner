/** @param {NS} ns */
export async function main(ns) {
  let target = ns.args[0]
  let listaMedAllaServrar = ns.getPurchasedServers()
  listaMedAllaServrar.forEach((server) => {
    ns.tprint(server)
    ns.scp('SJHack.js', server, 'home') 
    ns.exec('SJHack.js', server, 1, target.toString())
  })

