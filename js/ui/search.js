/**
 * The Daily Chronograph - Search Controller
 * Real-time debounced query filtering across headline, summary, and article body.
 */

import { setSearchQuery } from './navigation.js';

let debounceTimer = null;

export function initSearch() {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");

    const performSearch = () => {
        const query = searchInput ? searchInput.value.trim() : "";
        setSearchQuery(query);
    };

    if (searchBtn) {
        searchBtn.onclick = performSearch;
    }

    if (searchInput) {
        searchInput.oninput = () => {
            if (debounceTimer) clearTimeout(debounceTimer);
            debounceTimer = setTimeout(performSearch, 200);
        };

        searchInput.onkeypress = (e) => {
            if (e.key === "Enter") {
                if (debounceTimer) clearTimeout(debounceTimer);
                performSearch();
            }
        };
    }
}
