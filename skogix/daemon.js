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

  let run = true;
  while(run){
    await ns.sleep(1000)
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
    log(ns, "###### kör " + s + "", true)
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

    log(ns, "kopierar hack till " + s, true)
    ns.scp('skogix/lib/helpers.js', s, 'home')
    ns.scp('skogix/lib/runHack.js', s, 'home')
    ns.scp('skogix/lib/hackOnce.js', s, 'home')
    ns.scp('skogix/lib/hack.js', s, 'home')
    ns.scp('skogix/lib/weakenOnce.js', s, 'home')
    ns.scp('skogix/lib/weaken.js', s, 'home')
    ns.scp('skogix/lib/growOnce.js', s, 'home')
    ns.scp('skogix/lib/grow.js', s, 'home')
    log(ns, "startar hack på " + s, true)
    if(threads > 0){
      ns.exec('skogix/lib/runHack.js', s, threads, serverToHack)
    } 
  })
  }
}
