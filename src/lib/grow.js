/** @param {NS} ns **/
export async function main(ns) {
	while(true) {
		await ns.weaken(ns.getHostname())
		await ns.sleep(10);
	}
}
