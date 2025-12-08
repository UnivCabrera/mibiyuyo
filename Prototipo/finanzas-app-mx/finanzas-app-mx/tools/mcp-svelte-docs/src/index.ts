import { initializeApp } from 'svelte-app';
import { loadResources } from './resources/svelte-docs';
import { setupSearch } from './tools/doc-search';

const app = initializeApp();

async function main() {
    try {
        await loadResources();
        setupSearch(app);
        console.log('MCP Svelte documentation tool initialized successfully.');
    } catch (error) {
        console.error('Error initializing MCP Svelte documentation tool:', error);
    }
}

main();