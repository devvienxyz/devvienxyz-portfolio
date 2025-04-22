import { mergeConfig } from 'vite'
import baseConfig from '@packages/config/vite.base'

export default mergeConfig(baseConfig, {
  root: __dirname,
  build: {
    outDir: 'dist',
  },
})