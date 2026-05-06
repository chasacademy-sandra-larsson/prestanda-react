import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

const enableCompiler = process.env.REACT_COMPILER === 'false'

export default defineConfig({
  plugins: [
    react(),
    ...(enableCompiler
      ? [babel({ presets: [reactCompilerPreset({ target: '19' })] })]
      : []),
    tailwindcss(),
  ],
})
