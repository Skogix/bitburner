/** @param {NS} ns **/
export async function main(ns) {
  ns.tprint("starting init.js");
  ns.run("net/serverManager.js", 1, "init");
  ns.tprint("done");
}
