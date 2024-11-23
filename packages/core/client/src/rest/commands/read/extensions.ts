import type { MezaExtension } from '../../../schemas/extension';
import type { RestCommand } from '../../types';

/**
 * @publicApi
 * @name readFields
 * @description List the available extensions in the project.
 */
export const readExtensions =
	<Schema>(): RestCommand<MezaExtension<Schema>[], Schema> =>
	() => ({
		path: `/extensions/`,
		method: 'GET',
	});
