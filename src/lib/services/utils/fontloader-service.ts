export function loadGoogleFont(fontName: string): void {
	const formattedFontName = fontName.replace(/\s+/g, '+');
	const linkId = `google-font-${formattedFontName}`;

	if (document.getElementById(linkId)) {
		return;
	}

	const link: HTMLLinkElement = document.createElement('link');
	link.id = linkId;
	link.rel = 'stylesheet';
	link.href = `https://fonts.googleapis.com/css2?family=${formattedFontName}&display=swap`;
	document.head.appendChild(link);
}
