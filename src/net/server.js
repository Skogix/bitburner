import { log, printBreak } from "lib/helpers.js";

class PC {
  /**
   * Creates an instance of PC.
   * @param {Object} [properties={}] - The properties of the PC.
   * @param {string} [properties.hostname="Unknown"] - The host's permanent name.
   * @param {string} [properties.organizationName="Mystery"] - The associated organization.
   * @param {boolean} [properties.purchasedByPlayer=false] - The ownership status.
   * @param {string} [properties.ip="10.0.0.1"] - The IP address.
   * @param {boolean} [properties.hasAdminRights=false] - The admin rights status.
   * @param {boolean} [properties.backdoorInstalled=false] - The backdoor installation status.
   * @param {boolean} [properties.isConnectedTo=false] - The connection status.
   * @param {Object} properties.ports - The ports information.
   * @param {number} [properties.numOpenPortsRequired=0] - The required ports for NUKE.
   * @param {number} [properties.openPortCount=0] - The count of open ports.
   * @param {boolean} [properties.sshPortOpen=false] - The SSH port status.
   * @param {boolean} [properties.ftpPortOpen=false] - The FTP port status.
   * @param {boolean} [properties.smtpPortOpen=false] - The SMTP port status.
   * @param {boolean} [properties.httpPortOpen=false] - The HTTP port status.
   * @param {boolean} [properties.sqlPortOpen=false] - The SQL port status.
   * @param {number} [properties.hackDifficulty=1] - The current security level.
   * @param {number} [properties.minDifficulty=1] - The optimal security level.
   * @param {number} [properties.moneyAvailable=0] - The available funds.
   * @param {number} [properties.moneyMax=0] - The target funds.
   * @param {number} [properties.serverGrowth=0] - The server growth rate.
   * @param {number} [properties.ramUsed=0] - The consumed RAM.
   * @param {number} [properties.maxRam=0] - The maximum RAM.
   * @param {number} [properties.cpuCores=0] - The CPU cores count.
   * @param {number} [properties.requiredHackingSkill=0] - The required hacking skill.
   * @param {string} properties.protocol - The target protocol.
   * @param {string} properties.target - The host name of the target.
   * @param {number} properties.threads - The thread capability.
   * @param {string} properties.type - How the host is handled.
   * @param {string} properties.goal - The end goal for the protocol.
   * @param {boolean} properties.idle - Indicates if it's running scripts.
   */
  constructor(properties = {}) {
    this.name = properties.hostname || "Unknown";
    this.orgName = properties.organizationName || "Mystery";
    this.owned = properties.purchasedByPlayer || false;
    this.ip = properties.ip || "10.0.0.1";
    this.admin = properties.hasAdminRights || false;
    this.backdoor = properties.backdoorInstalled || false;
    this.connected = properties.isConnectedTo || false;
    this.ports = {
      nukePorts: properties.numOpenPortsRequired || 0,
      openPorts: properties.openPortCount || 0,
      SSH: properties.sshPortOpen || false,
      FTP: properties.ftpPortOpen || false,
      SMTP: properties.smtpPortOpen || false,
      HTTP: properties.httpPortOpen || false,
      SQL: properties.sqlPortOpen || false,
    };
    this.sec = properties.hackDifficulty || 1;
    this.secGoal = properties.minDifficulty || 1;
    this.cash = properties.moneyAvailable || 0;
    this.cashGoal = properties.moneyMax || 0;
    this.growth = properties.serverGrowth || 0;
    this.ramUsed = properties.ramUsed || 0;
    this.ramMax = properties.maxRam || 0;
    this.cores = properties.cpuCores || 0;
    this.hackSkill = properties.requiredHackingSkill || 0;
    this.protocol = properties.protocol;
    this.target = properties.target;
    this.threads = properties.threads;
    this.type = properties.type;
    this.goal = properties.goal;
    this.idle = properties.idle;
  }
}

/**
 * Executes a protocol on a specified computer.
 * @async
 * @param {NS} ns - The namespace object.
 * @param {PC} PC - The computer on which the protocol will be executed.
 */
async function runProtocol(ns, PC) {
  const file = `${PC.protocol}Protocol.js`;
  ns.scp(`${file}`, PC.name);
  log(ns);
  ns.tprint(
    `Targeting ${PC.target} with ${file} on ${PC.name} using ${PC.threads} threads.`,
  );
  ns.exec(file, PC.name, PC.threads, PC.target, PC.goal);
}

/**
 * Automatically executes hacking protocols on a computer.
 * @async
 * @param {NS} ns - The namespace object.
 * @param {PC} PC - The target computer.
 * @returns {boolean} - Returns true if the hacking attempt is successful, otherwise false.
 */
async function autoHack(ns, PC) {
  if (!PC.admin) {
    try {
      if (PC.ports.nukePorts >= 1) ns.brutessh(PC.name);
      if (PC.ports.nukePorts >= 2) ns.ftpcrack(PC.name);
      if (PC.ports.nukePorts >= 3) ns.relaysmtp(PC.name);
      if (PC.ports.nukePorts >= 4) ns.httpworm(PC.name);
      if (PC.ports.nukePorts >= 5) ns.sqlinject(PC.name);
      ns.nuke(PC.name);
    } catch (error) {
      return false;
    }
  }
  return true;
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
 * Main function to execute the hacking script.
 * @async
 * @param {NS} ns - The namespace object.
 */
export async function main(ns) {
  printBreak(ns, "Spooling up data center...");
  /** @param {Array.<PC>} PCAR - The array of available computers. */
  let PCAR = deepScan(ns);
  while (true) {
    const timer = new Promise((resolve) => setTimeout(resolve, 60000));
    PCAR = PCAR.map((oldPC) => updatePC(ns, oldPC));
    let target = getTarget(ns, PCAR);
    const lockedPCs = PCAR.filter((locked) => locked.type === "locked");
    for (let PC of lockedPCs) {
      const result = autoHack(ns, PC);
      if (result) {
        PC = updatePC(ns, PC);
        ns.toast(`Acquired ${PC.name} (${PC.type})`, "info", 360000);
      }
    }
    for (let PC of PCAR) {
      if (PC.idle && PC.protocol) {
        if (PC.type === "node" && PC.protocol === "pending") {
          Object.assign(PC, target);
        }
        require("lib/helpers").printBreak(ns, `${PC.orgName} (${PC.type})`);
        await runProtocol(ns, PC);
      }
    }
    await timer;
  }
}

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
        ns.tprint(`${IO.name}:${IO.orgName} @ ${IO.ip}`);
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
 * Updates the properties of a computer object based on the current game state.
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
