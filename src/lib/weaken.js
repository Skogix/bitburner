import {
  log
} from 'skogix/lib/helpers.js'
/** @param {NS} ns */
export async function main(ns) {
  let target = ns.args[0]
  while(true){
   ns.run('skogix/lib/weakenOnce.js', 1, target)
  }

