/**
 * Main function to execute the hacking script.
 * @async
 * @param {NS} ns - The namespace object.
 * @returns {Array.<PS>} The namespace object.
 *
 */
export async function main(ns) {
  let servers = ns;
  return servers;
}

export async function testRunProtokoll(ns) {
  let serverManager = ns.run("net/serverManager.js");
  let resultat1 = serverManager.runProtocol("remote/grow-hgw.js", "all");
  print(resultat1);
}

/** @param {NS} ns **/
export async function main(ns) {
  let run = true;
  let serverManager = ns.run("net/serverManager.js", 1, "init");
  while (run) {
    ns.tprint("### START ###");
    ns.tprint(serverManager.type);
    ns.tprint("### END ###");
    await ns.sleep(10000);
    ns.ui.clearTerminal();
  }
  return 69420;
}
