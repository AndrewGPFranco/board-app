import {defineConfig} from "vite";

export default defineConfig({
    test: {
        exclude: [],
    },
    resolve: {
        alias: {
            '@/': new URL('./', import.meta.url).pathname,
        },
    },
})