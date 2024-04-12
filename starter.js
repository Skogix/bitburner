// exempel
// import { findServers } from 'skogix//scripts/helpers/find-servers.js';
// import { FORMAT_MONEY, HOME, PURCHASED_SERVER_PREFIX } from 'skogix//scripts/constants.js';
import {
  log
} from 'skogix/lib/helpers.js'
import {
  scanAll
} from 'skogix/lib/scanner.js'
/** @param {NS} ns **/
export async function main(ns) {
  log(ns, "test");
  let test = [];
  test = scanAll(ns, "home");
  test.forEach((server) => log(ns,server,ToastVariant.SUCCESS));
  let msg = "Scannade " + test.count() " servrar.";
  log(ns, msg, "SUCCESS");
// gå till university
  // kommer med singularity (?)
// vid x hacking, hacka
// jobba
// vid var x:e level, kör en ny scan
// tor-router
}

