import type { ActionFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { LANGUAGES } from '~modules/i18n/i18n';
import { cookieLocaleName } from '~modules/i18n/i18next.server';

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const language = formData.get('language') as string;

	// Validate language
	const validLanguage = LANGUAGES.find((lang) => lang.code === language)
		? language
		: 'en';

	// Set language cookie
	return redirect('/', {
		headers: {
			'Set-Cookie': `${cookieLocaleName}=${validLanguage}; Path=/; HttpOnly; SameSite=Strict`,
		},
	});
}
