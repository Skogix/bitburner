//import * as namespace from "script filename"; //Import all functions from script
//import {fn1, fn2, ...} from "script filename"; //Import specific functions from script
//import { clearLog } from "UserInterface";

import { log, printBreak } from "lib/helpers.js";
class PC {
  /**
   * Creates an instance of PC.
   * @param {Object} [server={}] - The properties of the PC.
   * @param {string} [server.hostname="Unknown"] - The host's permanent name.
   * @param {string} [server.organizationName="Mystery"] - The associated organization.
   * @param {boolean} [server.purchasedByPlayer=false] - The ownership status.
   * @param {string} [server.ip="10.0.0.1"] - The IP address.
   * @param {boolean} [server.hasAdminRights=false] - The admin rights status.
   * @param {boolean} [server.backdoorInstalled=false] - The backdoor installation status.
   * @param {boolean} [server.isConnectedTo=false] - The connection status.
   * @param {Object} server.ports - The ports information.
   * @param {number} [server.numOpenPortsRequired=0] - The required ports for NUKE.
   * @param {number} [server.openPortCount=0] - The count of open ports.
   * @param {boolean} [server.sshPortOpen=false] - The SSH port status.
   * @param {boolean} [server.ftpPortOpen=false] - The FTP port status.
   * @param {boolean} [server.smtpPortOpen=false] - The SMTP port status.
   * @param {boolean} [server.httpPortOpen=false] - The HTTP port status.
   * @param {boolean} [server.sqlPortOpen=false] - The SQL port status.
   * @param {number} [server.hackDifficulty=1] - The current security level.
   * @param {number} [server.minDifficulty=1] - The optimal security level.
   * @param {number} [server.moneyAvailable=0] - The available funds.
   * @param {number} [server.moneyMax=0] - The target funds.
   * @param {number} [server.serverGrowth=0] - The server growth rate.
   * @param {number} [server.ramUsed=0] - The consumed RAM.
   * @param {number} [server.maxRam=0] - The maximum RAM.
   * @param {number} [server.cpuCores=0] - The CPU cores count.
   * @param {number} [server.requiredHackingSkill=0] - The required hacking skill.
   * @param {string} server.protocol - The target protocol.
   * @param {string} server.target - The host name of the target.
   * @param {number} server.threads - The thread capability.
   * @param {string} server.type - How the host is handled.
   * @param {string} server.goal - The end goal for the protocol.
   * @param {boolean} server.idle - Indicates if it's running scripts.
   */
  constructor(server = {}) {
    this.name = server.hostname || "Unknown";
    this.orgName = server.organizationName || "Mystery";
    this.owned = server.purchasedByPlayer || false;
    this.ip = server.ip || "10.0.0.1";
    this.admin = server.hasAdminRights || false;
    this.backdoor = server.backdoorInstalled || false;
    this.connected = server.isConnectedTo || false;
    this.ports = {
      nukePorts: server.numOpenPortsRequired || 0,
      openPorts: server.openPortCount || 0,
      SSH: server.sshPortOpen || false,
      FTP: server.ftpPortOpen || false,
      SMTP: server.smtpPortOpen || false,
      HTTP: server.httpPortOpen || false,
      SQL: server.sqlPortOpen || false,
    };
    this.sec = server.hackDifficulty || 1;
    this.secGoal = server.minDifficulty || 1;
    this.cash = server.moneyAvailable || 0;
    this.cashGoal = server.moneyMax || 0;
    this.growth = server.serverGrowth || 0;
    this.ramUsed = server.ramUsed || 0;
    this.ramMax = server.maxRam || 0;
    this.cores = server.cpuCores || 0;
    this.hackSkill = server.requiredHackingSkill || 0;
    this.protocol = server.protocol;
    this.target = server.target;
    this.threads = server.threads;
    this.type = server.type;
    this.goal = server.goal;
    this.idle = server.idle;
  }

  /** @param {NS} ns - The namespace object. */
  print(ns) {
    let hackingDiff = this.hackSkill - ns.getHackingLevel();
    let hackable = hackingDiff > 0 ? hackingDiff : "Hackable!";
    log(
      ns,
      `${this.name.toUpperCase()}:  ${hackable}`,
      true,
      hackable > 0 ? "success" : "",
    );
  }
  /** @param {NS} ns - The namespace object. */
  printFull(ns) {
    log(ns, `=== PC Info === `, true);
    log(ns, `Hostname: ${this.name}`, true);
    log(ns, `Organization Name: ${this.orgName}`, true);
    log(ns, `Owned by Player: ${this.owned}`, true);
    log(ns, `IP Address: ${this.ip}`, true);
    log(ns, `Admin Rights: ${this.admin}`, true);
    log(ns, `Backdoor Installed: ${this.backdoor}`, true);
    log(ns, `Connected: ${this.connected}`, true);
    log(ns, `Ports: ${this.ports}`, true);
    log(ns, `Security Level: ${this.sec}`, true);
    log(ns, `Security Goal: ${this.secGoal}`, true);
    log(ns, `Available Funds: ${this.cash}`, true);
    log(ns, `Target Funds: ${this.cashGoal}`, true);
    log(ns, `Server Growth Rate: ${this.growth}`, true);
    log(ns, `RAM Used: ${this.ramUsed}`, true);
    log(ns, `Max RAM: ${this.ramMax}`, true);
    log(ns, `CPU Cores: ${this.cores}`, true);
    log(ns, `Required Hacking Skill: ${this.hackSkill}`, true);
    log(ns, `Protocol: ${this.protocol}`, true);
    log(ns, `Target: ${this.target}`, true);
    log(ns, `Threads: ${this.threads}`, true);
    log(ns, `Type: ${this.type}`, true);
    log(ns, `Goal: ${this.goal}`, true);
    log(ns, `Idle: ${this.idle}`, true);
  }

  /** @param {NS} ns - The namespace object.
   *  @param {Server} server - The server to be converted
   *  @returns {PC} pc - The newly born pc
   */
  static createPCfromServer(ns, server) {
    let pc = new PC(server);
    server.pc.name = "Skogix";
    pc.hostname = server.hostname || "Unknown";
    pc.orgName = server.organizationName || "Mystery";
    pc.owned = server.purchasedByPlayer || false;
    pc.ip = server.ip || "10.0.0.1";
    pc.admin = server.hasAdminRights || false;
    pc.backdoor = server.backdoorInstalled || false;
    pc.connected = server.isConnectedTo || false;
    pc.ports = {
      nukePorts: server.numOpenPortsRequired || 0,
      openPorts: server.openPortCount || 0,
      SSH: server.sshPortOpen || false,
      FTP: server.ftpPortOpen || false,
      SMTP: server.smtpPortOpen || false,
      HTTP: server.httpPortOpen || false,
      SQL: server.sqlPortOpen || false,
    };
    pc.sec = server.hackDifficulty || 1;
    pc.secGoal = server.minDifficulty || 1;
    pc.cash = server.moneyAvailable || 0;
    pc.cashGoal = server.moneyMax || 0;
    pc.growth = server.serverGrowth || 0;
    pc.ramUsed = server.ramUsed || 0;
    pc.ramMax = server.maxRam || 0;
    pc.cores = server.cpuCores || 0;
    pc.hackSkill = server.requiredHackingSkill || 0;
    pc.protocol = server.protocol;
    pc.target = server.target;
    pc.threads = server.threads;
    pc.type = server.type;
    pc.goal = server.goal;
    pc.idle = server.idle;
    return pc;
  }
}

/**
 * Main function to execute the hacking script.
 * @async
 * @param {NS} ns - The namespace object.
 */
export async function main(ns) {
  log(ns, "START", true);
  /** @type {Array.<PS>} scanned*/
  var scanned = [];
  /** @type {Array.<PS>} notScanned*/
  var notScanned = [];
  log(ns, scanned, true);
  let homepc = new PC(ns.getServer("home"));
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
        let newCreatedPC = PC.createPCfromServer(server);
        log(ns, "newpc:" + newCreatedPC, true);
        notScanned.push(newCreatedPC);
      }
    });
    // ns.getServer(currentPC.hostname);
  }
  //notScanned.forEach((pc) => {
  //  const scannedPcs = ns.scan(pc.name);
  //  scannedPcs.forEach((host) => {
  //    if (!pcs.some((pc) => pc.name === host)) {
  //      ns.killall(host);
  //      let IO = new PC(ns.getServer(host));
  //      log(ns, `${IO.name}: ${IO.orgName} @${IO.ip}`, true);
  //      if (IO.ramMax <= 0 && IO.cash <= 0) {
  //        ns.toast(`Dead PC: ${IO.name}`, "info", 9999);
  //      }
  //      pcs.push(IO);
  //    }
  //  });
  //});
  //PCAR.forEach((pc) => pc.printFull(ns));
  //pcs.forEach((pc) => pc.print(ns));
  //
  log(ns, "main done", true);
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

// /**
//  * Main function to execute the hacking script.
//  * @async
//  * @param {NS} ns - The namespace object.
//  */
// export async function main(ns) {
//   printBreak(ns, "Spooling up data center...");
//   /** @param {Array.<PC>} PCAR - The array of available computers. */
//   let PCAR = deepScan(ns);
//   while (true) {
//     const timer = new Promise((resolve) => setTimeout(resolve, 60000));
//     PCAR = PCAR.map((oldPC) => updatePC(ns, oldPC));
//     let target = getTarget(ns, PCAR);
//     const lockedPCs = PCAR.filter((locked) => locked.type === "locked");
//     for (let PC of lockedPCs) {
//       const result = autoHack(ns, PC);
//       if (result) {
//         PC = updatePC(ns, PC);
//         ns.toast(`Acquired ${ PC.name } (${ PC.type })`, "info", 360000);
//       }
//     }
//     for (let PC of PCAR) {
//       if (PC.idle && PC.protocol) {
//         if (PC.type === "node" && PC.protocol === "pending") {
//           Object.assign(PC, target);
//         }
//         printBreak(ns, `${ PC.orgName } (${ PC.type })`);
//         await runProtocol(ns, PC);
//       }
//     }
//     await timer;
//   }
// }

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
