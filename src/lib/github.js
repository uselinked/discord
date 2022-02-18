const fetch = require('node-fetch');
const semverRegex = /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/;
const baseUrl = 'https://api.github.com/repos/lostdesign/linked';
require('dotenv').config();


const getReleaseByTag = async (tag) => {
	if (tag !== 'latest' || !tag.match(semverRegex)) return false;

	if (tag === 'latest') {
		const tags = await getAllTagNames();
		tag = tags[0];
	}

	return await fetch(baseUrl + '/releases/tags/v' + tag)
		.then(response => response.json())
		.then(data => data);
};

const getAllTagNames = async () => {
	return await fetch(baseUrl + '/tags?per_page=200')
		.then(response => response.json())
		.then(tags => tags.map(tag => tag.name));
};

const sumDownloads = (array) => {
	const sum = (accumulator, curr) => accumulator + curr;
	return array
	// .filter(asset => asset.browser_download_url.includes(extension))
		.map(asset => asset.download_count)
		.reduce(sum);
};

const getRepoStats = async () => {
	const { stargazers_count, open_issues_count, updated_at } = await fetch(baseUrl + '')
		.then(response => response.json())
		.then(data => data);

	return { stargazers_count, open_issues_count, updated_at };
};
const getLatestReleaseStats = async () => {
	const { assets, name, url } = await fetch(baseUrl + '/releases/latest')
		.then(response => response.json())
		.then(data => data);

	return { assets, name, url };
};

const filterReleaseAssets = (assets) => {
	return assets
		.map(asset => {
			return {
				name: `${asset.name} `,
				value: `[⬇️ ${asset.download_count} Downloads](${asset.browser_download_url})`,
			};
		})
		.filter(asset => !asset.name.includes('.yml'))
		.filter(asset => !asset.name.includes('.blockmap'))
		.filter(asset => !asset.name.includes('.zip'))
		.filter(asset => !asset.name.includes('Setup'));
};

const fetchReleases = async (page) => {
	console.log('fetchReleases page', page);
	return await fetch(baseUrl + '/releases?per_page=50&page=' + page, {
		headers: {
			'Authorization': `token ${process.env.GITHUB_TOKEN}`,
		},
	})
		.then(response => response.json())
		.then(data => data);
};

const filterDownloadsByExtension = (array, extension) => {
	return array
		.map(version => version.filter(download => Object.keys(download) == extension))
		.map(version => version[0]?.[extension])
		.filter(count => count !== undefined);
};

const sum = (array) => {
	if (array.length === 0) return 0;
	return array.reduce((accumulator, curr) => accumulator + curr);
};

const getAllDownloads = async (page = 1) => {
	let result = await fetchReleases(page);
	let appDownloads,
		updateDownloads,
		rawDownloads,
		updates = 0,
		mac = 0,
		windows = 0,
		appImage = 0,
		snap = 0,
		deb = 0,
		rpm = 0,
		raw = 0;

	while (result.length !== 0) {
		appDownloads = result
			.map(release => release.assets
				.filter(asset => !asset.name.includes('.yml'))
				.filter(asset => !asset.name.includes('.blockmap'))
				.filter(asset => !asset.name.includes('.zip'))
				.filter(asset => !asset.name.includes('Setup'))
				.map(release => {
					const fileName = release.name.split('.');

					return {
						[fileName[fileName.length - 1]]: release.download_count,
					};
				}),
			);

		updateDownloads = result
			.map(release => release.assets
				.filter(asset => asset.name.includes('.yml'))
				.map(release => {
					const fileName = release.name.split('.');

					return {
						[fileName[fileName.length - 1]]: release.download_count,
					};
				}),
			);

		rawDownloads = result
			.map(release => release.assets
				.map(release => release.download_count),
			)
			.flat();


		console.log(sum(rawDownloads));
		raw += sum(rawDownloads);
		updates += sum(filterDownloadsByExtension(updateDownloads, 'yml'));
		mac += sum(filterDownloadsByExtension(appDownloads, 'dmg'));
		windows += sum(filterDownloadsByExtension(appDownloads, 'exe'));
		appImage += sum(filterDownloadsByExtension(appDownloads, 'AppImage'));
		snap += sum(filterDownloadsByExtension(appDownloads, 'snap'));
		deb += sum(filterDownloadsByExtension(appDownloads, 'deb'));
		rpm += sum(filterDownloadsByExtension(appDownloads, 'rpm'));

		result = await fetchReleases(++page);
	}

	return {
		mac,
		windows,
		appImage,
		snap,
		deb,
		rpm,
		updates,
		total: mac + windows + appImage + snap + deb + rpm,
		raw,
	};
};

module.exports = {
	getReleaseByTag,
	getAllTagNames,
	sumDownloads,
	getRepoStats,
	getLatestReleaseStats,
	filterReleaseAssets,
	fetchReleases,
	getAllDownloads,
};
