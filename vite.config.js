import { defineConfig } from 'vite';

export default defineConfig({
  base: '/emoji-minesweeper/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        help: 'help.html',
      },
    },
  },
});
