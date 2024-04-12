import {
  log
} from 'skogix/lib/helpers.js'
import {
  scanAll, gainRootAccess
} from 'skogix/lib/scanner.js'

/** @param {NS} ns **/
async function getServerToHack(ns, servers){
  return servers[1] 
}

/** @param {NS} ns **/
export async function main(ns) {
  // input:
  // mängd ram vi har
    let allServers = scanAll(ns, 'home');
    let targetServer = getServerToHack(ns, allServers);
    let purchasedServers = ns.getPurchasedServers();
    let hostServers = [];
		purchasedServers.forEach(server => {
			hostServers.push(server);
		})
		hostServers.forEach((a) => log(a));
    
  let hackServers = allServers.filter((s) => ns.hasRootAccess(s))
  //let serverToHack = getServerToHack(ns, allServers) 
  let serverToHack = 'n00dles'
	//while (ns.exec('skogix/lib/hack.js', allServers[1], 10, allServers[2]) == 0) {
  hackServers.forEach((s) => {
    //ns.tprint(s)
    //let msg = "kör " + s + " serever atm"
    log(ns, "kopierar hack till " + s, true)
    ns.scp('skogix/lib/helpers.js', s, 'home')
    ns.scp('skogix/lib/hackOnce.js', s, 'home')
    ns.scp('skogix/lib/hack.js', s, 'home')
    log(ns, "startar hack på " + s, true)
    ns.exec('skogix/lib/hack.js', s, 1, serverToHack)
  }) 


}
