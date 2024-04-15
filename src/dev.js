import { ServerManager, ManagerType } from "/net/serverManager.js";
import { log } from "/lib/helpers.js";
export async function testRunProtokoll(ns) {
  let serverManager = ns.run("/net/serverManager.js");
  let resultat1 = serverManager.runProtocol("/remote/grow-hgw.js", "all");
  print(resultat1);
}

/** @param {NS} ns **/
export async function main(ns) {
  log(ns, "aaaaaaaaa", true);
  ns.ui.clearTerminal();
  ns.tprint("Starting dev.js");
  killRunningDevProcess(ns);
  let run = 1;
  ns.tprint("/init.js starting");
  ns.run("/init.js");
  await ns.sleep(2000);
  ns.tprint("/init.js complete");

  while (run > 0) {
    ns.tprint("### START ###");
    /** @type {ServerManager} serverManager */
    let serverManager = ServerManager.instance;
    ns.tprint(serverManager.type);
    let target = serverManager;
    ns.tprint("targets:" + target);
    ns.scp("/src/net/server.js", target[1], "home");
    ns.exec("/src/net/server.js", "home", target[1]);
    ns.tprint("### END ###");
    await ns.sleep(10000);
    ns.ui.clearTerminal();
    if (run > 5) {
      ns.spawn("/dev.js");
    }
    run++;
  }
  return 69420;
}

/** @param {NS} ns **/
async function killRunningDevProcess(ns) {
  let processes = ns.ps().sort((p) => p.pid);
  ns.tprint("running processes:");
  processes.forEach((p) => ns.tprint(p));
  let devfileprocess = processes.filter((p) => p.filename == "dev.js");
  if (devfileprocess.length > 1) {
    let devfileid = devfileprocess.pid;
    ns.kill(devfileid);
    ns.tprint("old dev.js process killed");
  }
}
