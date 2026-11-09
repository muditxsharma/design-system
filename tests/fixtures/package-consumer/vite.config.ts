import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deliberately no Tailwind plugin, aliases or monorepo source references.
export default defineConfig({ plugins: [react()] });
