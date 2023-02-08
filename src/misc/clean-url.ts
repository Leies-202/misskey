import { sanitizeUrl } from '@braintree/sanitize-url';

export function cleanUrl(str: string): string;
export function cleanUrl(str: string | null | undefined): string | null | undefined;
export function cleanUrl(str: string | null | undefined): string | null | undefined {
	if (str == null) return str;
	return sanitizeUrl(str);
}

export function cleanUrlToNull(str: string | null | undefined): string | null | undefined {
	if (str == null) return str;
	const result = sanitizeUrl(str);
	if (result === 'about:blank') return null;
	return result;
}
