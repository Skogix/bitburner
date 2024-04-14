/** @param {NS} ns **/
export async function main(ns) {
  let serverManager = ns.run("src/net/serverManager.js");
  let target = serverManager.getPC("n00dles");
  ns.tprint("home");
  ns.scp("/src/net/server.js", target, "home");
  ns.exec("/src/net/server.js", "home", target);
  await ns.sleep(5000);
}
