import * as mongo from 'mongodb';
import User, { IRemoteUser } from '../../../../models/user';
import config from '../../../../config';
import * as debug from 'debug';
import { IBlock } from '../../type';
import unblock from '../../../../services/blocking/delete';

const log = debug('misskey:activitypub');

export default async (actor: IRemoteUser, activity: IBlock): Promise<void> => {
	const id = typeof activity.object == 'string' ? activity.object : activity.object.id;

	const uri = activity.id || activity;

	log(`UnBlock: ${uri}`);

	if (!id.startsWith(config.url + '/')) {
		return null;
	}

	const blockee = await User.findOne({
		_id: new mongo.ObjectID(id.split('/').pop())
	});

	if (blockee === null) {
		throw new Error('blockee not found');
	}

	if (blockee.host != null) {
		throw new Error('ブロック解除しようとしているユーザーはローカルユーザーではありません');
	}

	unblock(actor, blockee);
};
