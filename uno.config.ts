// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  rules: [
    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^my-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px 0` })],
    [/^mx-([\.\d]+)$/, ([_, num]) => ({ margin: `0 ${num}px` })],
    [/^p-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
    [/^py-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px 0` })],
    [/^px-([\.\d]+)$/, ([_, num]) => ({ padding: `0 ${num}px` })],
  ]
})