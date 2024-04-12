import {
  log
} from 'skogix/lib/helpers.js'
import {
  scanAll, gainRootAccess
} from 'skogix/lib/scanner.js'

/** @param {NS} ns **/
export async function main(ns) {
  let test = [];
  test = scanAll(ns, "home");
  test.forEach((server) => log(ns,server));
  let msg = "Scannade " + test.length + " servrar.";
  log(ns, msg, false, "success");
  test.forEach((server) => gainRootAccess(ns,server));

	// börja göra något
	ns.exec("/lib/hack.js", "home", 1)
	await ns.sleep(500)

  let threads = 10
	while (ns.exec("skogix/lib/hack.js", "n00dles", threads) == 0) {
		await ns.sleep(1000)
		log(ns, "kör attack mot noodles", true)
	}

}
