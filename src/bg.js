/** @param {NS} ns **/
export async function main(ns) {
  let serverManager = ns.run("net/serverManager.js", 1, "init");
  let run = true;
  while (run) {
    await ns.sleep(30000);
    ns.tprint("### dev start");
    ns.spawn("dev.js");
    ns.tprint("serverManager:" + serverManager);
    ns.tprint("### dev stopp");
  }
}
