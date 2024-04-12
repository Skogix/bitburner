import { findServers } from '/scripts/helpers/find-servers.js';
import { FORMAT_MONEY, HOME, PURCHASED_SERVER_PREFIX } from '/scripts/constants.js';

export const PURCHASED_SERVER_PREFIX = 'pserv-';
export const HOME = 'home';
export const FORMAT_MONEY = '($0.00a)';
export const HACK_PAYLOAD = '/scripts/hack.js';
export const SHARE_PAYLOAD = '/scripts/share.js';
export const PAYLOAD_SCRIPTS = [HACK_PAYLOAD, SHARE_PAYLOAD];

/** @type {Server[]} **/

/**
 * @param {NS} ns
 * @param {string} hostname
 * */
