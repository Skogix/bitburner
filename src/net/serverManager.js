import { log, pathJoin } from "/lib/helpers.js";
import { PC } from "/net/server.js";

/**
 * @typedef {Object} huhu
 * @property {number} secGoal - The optimal security level.
 * @property {number} cash - The available funds.
 * @property {number} cashGoal - The target funds.
 * @property {number} growth - The server growth rate.
 * @property {number} ramUsed - The consumed RAM.
 * @property {number} ramMax - The maximum RAM.
 * @property {number} cores - The CPU cores count.
 * @property {number} hackSkill - The required hacking skill.
 * @property {string} protocol - The target protocol.
 * @property {string} target - The host name of the target.
 * @property {number} threads - The thread capability.
 * @property {string} type - How the host is handled.
 * @property {string} goal - The end goal for the protocol.
 * @property {boolean} idle - Indicates if it's running scripts.
 */

export const ManagerType = {
  Server: "ServerManager",
  None: "",
};

/**
 * @type {class} ServerManager
 * @param {ServerManager} instance - the instance
 */
export class ServerManager {
  getNS() {
    let huhu = new PC();
    return this.ns;
  }
  getInstance(ns) {
    return this.instance;
  }
  getServers(ns) {
    return this.servers;
  }
  getServer(ns) {
    return this.servers.find((s) => s.username == ns.args[0]);
  }
  getPC(ns) {
    return this.servers.find((s) => s.username == ns.args[0]);
  }
  async getInstance(ns) {
    if (ns.args[0] == "init") {
      return new ServerManager(ns);
    } else {
      return this.instance;
    }
  }

  /**
   * creates a ServerManager
   * @type {class} ServerManager
   * @param {ServerManager} instance - the instance
   */
  constructor(ns, init = {}) {
    log(ns, "starting ServerManager constructor...");
    this.type = ManagerType.Server;
    this.hostname = init.hostname || "Unknown";
    this.ns = ns;
    this.log = ["Init"];
    this.ip = init.ip || "10.0.0.1";
    this.PCs = [];
    this.instance = null;
    this.servers = [];
    this.#initServers(ns);
  }
  /**
   * Executes a protocol on a specified computer.
   * @async
   * @param {NS} ns - The namespace object.
   * @param {PC} PC - The computer on which the protocol will be executed.
   */
  async #_runProtocol(ns, PC) {
    let protocol = ns.args[0];
    let target = ns.args[1];
    let source = ns.args[2];
    const filePath = pathJoin("scripts/", protocol);
    ns.scp(protocol, filePath);
    log(ns, filePath, true);

    ns.tprint(
      `Targeting ${PC.target} with ${filePath} on ${PC.name} using ${PC.threads} threads.`,
    );
    //ns.exec(filePath, PC.name, PC.threads, PC.target, PC.goal);
  }

  /**
   * Automatically executes hacking protocols on a computer.
   * @async
   * @param {NS} ns - The namespace object.
   * @param {PC} PC - The target computer.
   * @returns {boolean} - Returns true if the hacking attempt is successful, otherwise false.
   */
  async #autoHack(ns) {
    return "";
  }

  /**
   * Initiates a deep network scan to discover new computers and adds them to the array of discovered computers.
   * @param {Function} initServers - test
   * @param {Object} ns - The namespace object.
   * @param {PC} PC - The target computer.
   * @returns {Array.<PC>} - Returns an array of discovered computers.
   */
  async #initServers(ns) {
    log(ns, "START", true);
    /** @type {Array.<PS>} scanned*/
    var scanned = [];
    /** @type {Array.<PS>} notScanned*/
    var notScanned = [];
    log(ns, scanned, true);
    let homeserver = ns.getServer("home");
    log(ns, "homeserver" + homeserver);
    let homepc = PC.createPCfromServer(homeserver);
    log(ns, "homepc" + homepc);
    notScanned.push(homepc);
    while (notScanned.length > 0) {
      log(ns, 138);
      let currentPC = notScanned.pop();
      let scannedHostnames = ns.scan(currentPC.hostname);

      scannedHostnames.forEach((hostname) => {
        log(ns, "scannedhostname: " + hostname, true);
        if (
          scanned.includes((s) => s.hostname == hostname) ||
          hostname == undefined
        ) {
          // already scanned
          log(ns, "den finns inte", true);
        } else {
          log(ns, 151);
          // /** @param {Server} server */
          log(ns, "den finns", true);
          // log(ns, server.ip, true);
          let server = ns.getServer(hostname);
          if (server.ramMax <= 0 && server.cash <= 0) {
            ns.toast(`Dead PC: ${server.name}`, "info", 9999);
          }
          let newCreatedPC = PC.createPCfromServer(ns, server);
          log(ns, `${server.name}: ${server.orgName} @${server.ip}`, true);
          notScanned.push(newCreatedPC);
        }
      });
    }
    ServerManager.updateServers(scanned);
    log(ns, "Servers updated", true);
  }
  //static protocol = this.protocol
  async runProtocol(ns) {
    this.#_runProtocol(ns.args[0], ns.args[1], ns.args[2]);
  }
  _init(ns) {
    this.#_uldateServers(ns.args[0], ns.args[1], ns.args[2]);
  }

  /** @returns {ServerManager} instance */
  /** @param {ServerManager} instance */
  #_uldateServers(ns) {
    this.servers = ns.argrs[0];
  }
}

/**
 * Main function to execute the hacking script.
 * @async
 * @param {NS} ns - The namespace object.
 * @returns {Array.<PS>} The namespace object.
 *
 */
export async function main(ns) {
  ns.tprint("running /net/serverManager.js");
  let init = ns.args[0];
  if (init) {
    ServerManager.instance = new ServerManager(ns);
    ns.tprint("/net/serverManager.js initiated.");
  } else {
    return ServerManager.instance;
  }
}

/****************************************/

/**
 * Initiates a deep network scan to discover new computers and adds them to the array of discovered computers.
 * @param {Object} ns - The namespace object.
 * @returns {Array.<PC>} - Returns an array of discovered computers.
 */
export function deepScan(ns) {
  let PCAR = [new PC(ns.getServer("home"))];
  for (let i = 0; i < PCAR.length; i++) {
    const hostScan = ns.scan(PCAR[i].name);
    hostScan.forEach((host) => {
      if (!PCAR.some((pc) => pc.name === host)) {
        ns.killall(host);
        let IO = new PC(ns.getServer(host));
        ns.tprint(`${IO.name}: ${IO.orgName} @${IO.ip}`);
        if (IO.ramMax <= 0 && IO.cash <= 0) {
          ns.toast(`Dead PC: ${IO.name}`, "info", 9999);
        }
        PCAR.push(IO);
      }
    });
  }
  return PCAR;
}

/**
 * Selects a target computer based on hacking skill level and protocol priority.
 * @param {NS} ns - The namespace object.
 * @param {Array.<PC>} PCAR - The array of available computers.
 * @returns {PC} PC - Returns the selected target computer with target name, protocol, and goal.
 */
function getTarget(ns, PCAR) {
  const mySkill = ns.getHackingLevel();
  const jobPriority = ["Security", "Economic", "Farming"];
  let availableTargets = PCAR.filter((PC) => PC.hackSkill * 3 <= mySkill);
  availableTargets = availableTargets.filter((PC) =>
    jobPriority.includes(PC.protocol),
  );
  availableTargets.sort((a, b) => b.cashGoal - a.cashGoal);
  availableTargets.sort(
    (a, b) => jobPriority.indexOf(a.protocol) - jobPriority.indexOf(b.protocol),
  );
  if (availableTargets.length > 0) {
    return {
      target: availableTargets[0].name,
      protocol: availableTargets[0].protocol,
      goal: availableTargets[0].goal,
    };
  } else {
    ns.toast("getTarget list was EMPTY", "error", 5000);
  }
}

/**
 * Checks if a computer has a backdoor available and notifies the user if it does.
 * @param {Object} ns - The namespace object.
 * @param {PC} PC - The computer to check for a backdoor.
 */
function doorCheck(ns, PC) {
  let skill = ns.getHackingLevel();
  if (PC.name !== "home" && PC.name !== "darkweb") {
    if (!PC.backdoor && PC.secGoal / PC.sec > 0.9 && skill >= PC.hackSkill) {
      ns.toast(`${PC.name} Backdoor Available.`, "warning", 36000000);
    }
  }
}
/**
 * Updates the server of a computer object based on the current game state.
 * @param {Object} ns - The namespace object.
 * @param {PC} IO - The computer object to update.
 * @returns {PC} - Returns the updated computer object.
 */
export function updatePC(ns, IO) {
  let FRESH = new PC(ns.getServer(IO.name));
  for (let key in FRESH) {
    if (IO.hasOwnProperty(key)) {
      IO[key] = FRESH[key];
    }
  }
  IO.protocol = "";
  if (IO.admin) {
    if (IO.ramMax > 0) {
      IO.threads = Math.floor(IO.ramMax / 2);
      IO.idle = IO.ramUsed === 0;
      if (IO.cash > 0) {
        IO.type = "farm";
      } else {
        IO.type = "node";
        IO.protocol = "pending";
      }
    } else if (IO.cash > 0) {
      IO.type = "bank";
    } else IO.type = "dead";
  } else IO.type = "locked";
  doorCheck(ns, IO);
  if (
    IO.secGoal / IO.sec < 0.75 &&
    ["farm", "node", "bank"].includes(IO.type)
  ) {
    IO.protocol = "Security";
    IO.goal = IO.secGoal;
    IO.target = IO.name;
  } else if (
    IO.cash / IO.cashGoal < 0.75 &&
    ["farm", "bank"].includes(IO.type)
  ) {
    IO.protocol = "Economic";
    IO.goal = IO.cashGoal;
    IO.target = IO.name;
  } else if (
    IO.secGoal / IO.sec >= 0.75 &&
    IO.cash / IO.cashGoal >= 0.75 &&
    ["farm", "bank"].includes(IO.type)
  ) {
    IO.protocol = "Farming";
    IO.target = IO.name;
    IO.goal = 1;
  } else if (IO.type === "node" && IO.idle) IO.target = "pending";
  if (IO.name === "home") {
    IO.threads = Math.floor((IO.ramMax - IO.ramUsed - 16) / 2);
    if (IO.threads > 0) {
      IO.type = "node";
      IO.target = "pending";
    } else IO.type = "dead";
  }
  return IO;
}
