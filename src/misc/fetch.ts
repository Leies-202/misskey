import * as http from 'http';
import * as https from 'https';
import CacheableLookup from 'cacheable-lookup';
import fetch, { HeadersInit } from 'node-fetch';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import config from '../config';
import { AbortController } from 'abort-controller';

export async function getJson(url: string, accept = 'application/json, */*', timeout = 10000, headers?: HeadersInit) {
	const controller = new AbortController();
	setTimeout(() => {
		controller.abort();
	}, timeout * 6);

	const res = await fetch(url, {
		headers: Object.assign({
			'User-Agent': config.userAgent,
			Accept: accept
		}, headers || {}),
		timeout,
		size: 10 * 1024 * 1024,
		agent: getAgentByUrl,
		signal: controller.signal,
	});

	if (!res.ok) {
		throw {
			name: `StatusError`,
			statusCode: res.status,
			message: `${res.status} ${res.statusText}`,
		};
	}

	try {
		return await res.json();
	} catch (e) {
		throw {
			name: `JsonParseError`,
			statusCode: 481,
			message: `JSON parse error ${e.message || e}`
		};
	}
}

export async function getHtml(url: string, accept = 'text/html, */*', timeout = 10000, headers?: HeadersInit) {
	const controller = new AbortController();
	setTimeout(() => {
		controller.abort();
	}, timeout * 6);

	const res = await fetch(url, {
		headers: Object.assign({
			'User-Agent': config.userAgent,
			Accept: accept
		}, headers || {}),
		timeout,
		size: 10 * 1024 * 1024,
		agent: getAgentByUrl,
		signal: controller.signal,
	});

	if (!res.ok) {
		throw {
			name: `StatusError`,
			statusCode: res.status,
			message: `${res.status} ${res.statusText}`,
		};
	}

	return await res.text();
}

const cache = new CacheableLookup({
	maxTtl: 3600,	// 1hours
	errorTtl: 30,	// 30secs
	lookup: false,	// nativeのdns.lookupにfallbackしない
});

/**
 * Get http non-proxy agent
 */
const _http = new http.Agent({
	keepAlive: true,
	keepAliveMsecs: 30 * 1000,
	lookup: cache.lookup,	// DefinitelyTyped issues
} as http.AgentOptions);

/**
 * Get https non-proxy agent
 */
const _https = new https.Agent({
	keepAlive: true,
	keepAliveMsecs: 30 * 1000,
	lookup: cache.lookup,
} as https.AgentOptions);

/**
 * Get http proxy or non-proxy agent
 */
export const httpAgent = config.proxy
	? new HttpProxyAgent(config.proxy)
	: _http;

/**
 * Get https proxy or non-proxy agent
 */
export const httpsAgent = config.proxy
	? new HttpsProxyAgent(config.proxy)
	: _https;

/**
 * Get agent by URL
 * @param url URL
 * @param bypassProxy Allways bypass proxy
 */
export function getAgentByUrl(url: URL, bypassProxy = false): http.Agent | https.Agent {
	if (bypassProxy) {
		return url.protocol == 'http:' ? _http : _https;
	} else {
		return url.protocol == 'http:' ? httpAgent : httpsAgent;
	}
}
