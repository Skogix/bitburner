/** @param {NS} ns **/
export async function main(ns) {
  let serverManager = ns.run("/src/net/serverManager.js", 1, "init");
  let run = true;
  while (run) {
    ns.sleep(5000);
    ns.tprint("### dev start");
    ns.tprint("serverManager:" + serverManager);
    ns.tprint("### dev stopp");
  }
}
