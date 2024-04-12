import {
  log
} from 'skogix/lib/helpers.js'
import {
  scanAll
} from 'skogix/lib/scanner.js'
/** @param {NS} ns **/
export async function main(ns) {
  let test = [];
  test = scanAll(ns, "home");
  test.forEach((server) => log(ns,server,"SUCCESS"));
  let msg = "Scannade " + test.length + " servrar.";
  log(ns, msg, false, "success");

// gå till university
  // kommer med singularity (?)
// vid x hacking, hacka
// jobba
// vid var x:e level, kör en ny scan
// tor-router

