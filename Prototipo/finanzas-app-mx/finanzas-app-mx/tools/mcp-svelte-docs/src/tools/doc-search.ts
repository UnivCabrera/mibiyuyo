import { SvelteDoc } from '../resources/svelte-docs';

export class DocSearch {
    private docs: SvelteDoc[];

    constructor(docs: SvelteDoc[]) {
        this.docs = docs;
    }

    public search(query: string): SvelteDoc[] {
        const lowerCaseQuery = query.toLowerCase();
        return this.docs.filter(doc => 
            doc.title.toLowerCase().includes(lowerCaseQuery) || 
            doc.content.toLowerCase().includes(lowerCaseQuery)
        );
    }
}