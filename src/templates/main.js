import { getAllServerNames } from "util/util";
import { NS } from '@ns';
export async function main(ns: NS){
}

// vs

/** @param {NS} ns */
export async function main(ns) {
  tprint("testing testing");
}

