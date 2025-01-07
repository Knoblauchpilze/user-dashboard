import { logoutUser } from '$lib/services/sessions';
import { getUser } from '$lib/services/users';
import { handleApiError, redirectToLoginIfNeeded } from '$lib/rest/api';
import { loadSessionCookiesOrRedirectToLogin } from '$lib/cookies';
import { HttpStatus, parseApiResponseAsSingleValue } from '@totocorpsoftwareinc/frontend-toolkit';
import { UserResponseDto } from '$lib/communication/api/userResponseDto';
import { userResponseDtoToUserUiDto } from '$lib/converters/userConverter';
import { error, redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const sessionCookies = loadSessionCookiesOrRedirectToLogin(cookies);

	const apiResponse = await getUser(sessionCookies.apiKey, sessionCookies.apiUser);
	redirectToLoginIfNeeded(apiResponse);
	handleApiError(apiResponse);

	const apiUserDto = parseApiResponseAsSingleValue(apiResponse, UserResponseDto);
	if (apiUserDto === undefined) {
		error(HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to get server data');
	}

	return {
		user: userResponseDtoToUserUiDto(apiUserDto),
		apiKey: sessionCookies.apiKey
	};
}

export const actions = {
	logout: async ({ cookies }) => {
		const sessionCookies = loadSessionCookiesOrRedirectToLogin(cookies);

		const apiResponse = await logoutUser(sessionCookies.apiKey, sessionCookies.apiUser);
		handleApiError(apiResponse);

		redirect(HttpStatus.SEE_OTHER, '/login');
	}
};
