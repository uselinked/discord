const fetch = require('node-fetch')
const semverRegex = /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/
const baseUrl = 'https://api.github.com/repos/lostdesign/linked'

module.exports = {
    getReleaseByTag: async (tag) => {
        if (!tag.match(semverRegex)) return false

        return await fetch(baseUrl + '/releases/tags/v' + tag)
            .then(response => response.json())
            .then(data => data)
    },

    getAllTagNames: async () => {
        return await fetch(baseUrl + '/tags?per_page=200')
            .then(response => response.json())
            .then(tags => tags.map(tag => tag.name))
    },

    sumDownloads: (array) => {
        const sum = (accumulator, curr) => accumulator + curr
        return array
            //.filter(asset => asset.browser_download_url.includes(extension))
            .map(asset => asset.download_count)
            .reduce(sum)
    },

    getRepoStats: async () => {
        const {
            stargazers_count,
            open_issues_count,
            updated_at
        } = await fetch(baseUrl + '')
            .then(response => response.json())
            .then(data => data)

        return {
            stargazers_count,
            open_issues_count,
            updated_at
        }
    },

    getLatestReleaseStats: async () => {
        const {
            assets,
            name,
            url
        } = await fetch(baseUrl + '/releases/latest')
            .then(response => response.json())
            .then(data => data)

        return {
            assets,
            name,
            url
        }
    },

    filterReleaseAssets: (assets) => {
        return assets
            .map(asset => {
                return {
                    name: `${asset.name} `,
                    value: `[⬇️ ${asset.download_count} Downloads](${asset.browser_download_url})`,
                }
            })
            .filter(asset => !asset.name.includes('.yml'))
            .filter(asset => !asset.name.includes('.blockmap'))
            .filter(asset => !asset.name.includes('.zip'))
            .filter(asset => !asset.name.includes('Setup'))
    }
}
