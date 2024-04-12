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
  
}
