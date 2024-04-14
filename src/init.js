/** @param {NS} ns **/
export async function main(ns) {
  let run = true;
  while (run) {
    let servers = ns.run("net/server.js");
    servers.forEach((server) => {
      ns.tprint(server.name);
      ns.scp("/src/net/server.js", server, "home");
      ns.exec("/src/net/server.js", "home", server);
    });
    await ns.sleep(5000);
  }
  return 69420;
}
