// @ts-nocheck
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = ({ params }: Parameters<PageLoad>[0]) => {
	if (params.slug) {
		return { id: params.slug };
	}
	throw error(404, 'Not found');
};
