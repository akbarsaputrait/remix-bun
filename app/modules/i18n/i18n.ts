// Define available languages
export const LANGUAGES = [
	{ code: "en", name: "🇺🇸 English" },
	{ code: "id", name: "🇮🇩 Indonesia" },
];

export default {
	// This is the list of languages your application supports
	supportedLngs: ["en", "id"],
	// This is the language you want to use in case
	// if the user language is not in the supportedLngs
	fallbackLng: "en",
	// The default namespace of i18next is "translation", but you can customize it here
	defaultNS: "common",
	interpolation: {
		escapeValue: false,
	},
};
