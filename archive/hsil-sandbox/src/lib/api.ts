import type { HSIL } from '../types';

export const encodeIntent = async (text: string): Promise<HSIL> => {
    try {
        const response = await fetch('/encode-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.hsil;
    } catch (error) {
        console.error("API call failed:", error);
        // Return a dummy fallback if API fails entirely
        return {
            type: "E1_Discover",
            intensity: 0.5,
            scope: "Self",
            temporal: "ShortTerm"
        };
    }
};
