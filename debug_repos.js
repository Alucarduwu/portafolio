const axios = require('axios');
require('dotenv').config();

const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;
const GITHUB_USERNAME = "Alucarduwu";

async function listRepos() {
    try {
        const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
            headers: GITHUB_TOKEN ? { "Authorization": `Bearer ${GITHUB_TOKEN}` } : {}
        });
        const repos = response.data;
        console.log(`Total repos found: ${repos.length}`);
        repos.forEach(r => {
            console.log(`- ${r.name} (Fork: ${r.fork}, Private: ${r.private})`);
        });
        
        const filtered = repos.filter(r => !r.fork && r.name !== GITHUB_USERNAME);
        console.log(`\nFiltered repos (not fork, not profile): ${filtered.length}`);
        filtered.forEach(r => console.log(`- ${r.name}`));

    } catch (e) {
        console.error("Error:", e.message);
    }
}

listRepos();
