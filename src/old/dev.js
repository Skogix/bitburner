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
  let run = true;
  while(run){
    let allServers = scanAll(ns, 'home');
    let targetServer = getServerToHack(ns, allServers);
    let purchasedServers = ns.getPurchasedServers();
    let hostServers = [];
		purchasedServers.forEach(server => {
			hostServers.push(server);
		})
		hostServers.forEach((a) => log(a));
  }
}
