import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'], // altere aqui para .jsx
            refresh: true,
        }),
    ],
    esbuild: {
        loader: {
            '.js': 'jsx',  // Certifique-se de que todos os arquivos .js sejam tratados como JSX
        },
    },
});
