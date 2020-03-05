import User from '../models/user';
import Emoji from '../models/emoji';
import { toUnicode, toASCII } from 'punycode';
import config from '../config';
import { isSelfHost } from './convert-host';
import getDriveFileUrl from './get-drive-file-url';
import DriveFile from '../models/drive-file';

type IREmoji = {
	/**
	 * requested emoji key
	 */
	name: string,
	url: string,
	/***
	 * resolved host(in unicode)
	 */
	host: string,
	resolvable: string,
};

/**
 * 絵文字クエリオプション
 */
type EmojiOptions = {
	/**
	 * カスタム絵文字を許可する
	 */
	custom: boolean;

	/**
	 * アバター絵文字を許可する
	 */
	avatar: boolean;

	/**
	 * 外部ホスト指定を許可する
	 */
	foreign: boolean;
};

/**
 * 絵文字クエリ
 * @param emojis 絵文字名一覧
 * @param ownerHost 投稿またはプロフィール所有者のホスト
 * @param opt オプション
 */
export default async function(emojis: string[], ownerHost: string, opt: EmojiOptions) {
	const [custom, avatar] = await Promise.all([
		opt.custom ? packCustomEmojis(emojis, ownerHost, opt.foreign) : [],
		opt.avatar ? packAvatarEmojis(emojis, ownerHost, opt.foreign) : []
	]);

	return custom.concat(avatar);
}

/**
 * Pack avatar emojis
 * @param emojis 絵文字名一覧
 * @param host 投稿またはプロフィール所有者のホスト
 * @param foreign 外部ホスト指定を許可する
 */
export async function packAvatarEmojis(emojis: string[], ownerHost: string, foreign: boolean): Promise<IREmoji[]> {
	const avatarKeys = emojis
		.map(name => {
			const match = foreign ? name.match(/^@([\w-]+)(?:@([\w.-]+))?$/) : name.match(/^@([\w-]+)$/);
			if (!match) return null;

			let queryHost = foreign ? match[2] || ownerHost || null : null;
			if (isSelfHost(queryHost)) queryHost = null;

			return {
				emoji: match[0],
				usernameLower: match[1].toLowerCase(),
				host: normalizeHost(queryHost),
				resolvable: `@${match[1]}` + (queryHost ? `@${normalizeAsciiHost(queryHost)}` : '')
			};
		})
		.filter(x => x != null);

	let avatarEmojis = await Promise.all(avatarKeys.map(async key =>  {
		const user = await User.findOne({
			usernameLower: key.usernameLower,
			host: key.host
		});

		const profileEmoji = {
			name: key.emoji,
			url: (user && user.avatarId) ? getDriveFileUrl(await DriveFile.findOne({ _id: user.avatarId }), true, false) : `${config.driveUrl}/default-avatar.jpg`,
			host: key.host,
			resolvable: key.resolvable,
		} as IREmoji;

		return profileEmoji;
	}));

	avatarEmojis = avatarEmojis.filter(x => x != null);

	return avatarEmojis;
}

/**
 * Pack custom emojis
 * @param emojis 絵文字名一覧
 * @param host 投稿またはプロフィール所有者のホスト
 * @param foreign 外部ホスト指定を許可する
 */
export async function packCustomEmojis(emojis: string[], ownerHost: string, foreign: boolean): Promise<IREmoji[]> {
	const customKeys = emojis
		.map(name => {
			const match = foreign ? name.match(/^(\w+)(?:@([\w.-]+))?$/) : name.match(/^(\w+)$/);
			if (!match) return null;

			let queryHost = foreign ? match[2] || ownerHost || null : null;
			if (isSelfHost(queryHost)) queryHost = null;

			return {
				emoji: match[0],
				name: match[1],
				host: normalizeHost(queryHost),
				resolvable: `${match[1]}` + (queryHost ? `@${normalizeAsciiHost(queryHost)}` : ''),
			};
		})
		.filter(x => x != null);

	let customEmojis = await Promise.all(customKeys.map(async key =>  {
		const emoji = await Emoji.findOne({
			name: key.name,
			host: key.host
		}, {
			fields: { _id: false }
		});

		if (emoji == null) return null;

		const customEmoji = {
			name: key.emoji,
			url: key.host ? `${config.url}/files/${emoji.name}@${emoji.host}/${emoji.updatedAt ? emoji.updatedAt.getTime().toString(16) : '0'}.png` : emoji.url,
			host: key.host,
			resolvable: key.resolvable,
		} as IREmoji;

		return customEmoji;
	}));

	customEmojis = customEmojis.filter(x => x != null);

	return customEmojis;
}

const normalizeHost = (host: string) => {
	if (host == null) return null;
	return toUnicode(host.toLowerCase());
};

const normalizeAsciiHost = (host: string) => {
	if (host == null) return null;
	return toASCII(host.toLowerCase());
};
