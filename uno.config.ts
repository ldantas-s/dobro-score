// uno.config.ts
import { defineConfig } from 'unocss';

export default defineConfig({
  theme: {
    colors: {
      red: {
        400: '#F5827A',
        500: '#EF3122',
        600: '#E01E10',
      },
      yellow: {
        400: '#FED352',
        500: '#FEC210',
        600: '#EAAF01',
      },
      blue: {
        400: '#00D1D1',
        500: '#00B8B9',
        600: '#00A8A8',
      },
      green: {
        400: '#29D159',
        500: '#23B24B',
        600: '#20A245',
      },
      gray: {
        400: '#D6D6D6',
        500: '#CCCCCC',
        600: '#A3A3A3',
      },
      white: '#ffffff',
      black: '#110A0C',
    },
  },
  variants: [
    (matcher) => {
      if (!matcher.startsWith('hover:')) return matcher;
      return {
        matcher: matcher.slice(6),
        selector: (s) => `${s}:hover`,
      };
    },
  ],
  rules: [
    [/^d-flex/, () => ({ display: 'flex' })],
    [/^items-(center|flex-start|flex-end)$/, ([_, opt]) => ({ 'align-items': opt })],
    [
      /^flex-(column|row)$/,
      ([_, direction]) => ({ 'flex-direction': direction }),
    ],

    [/^gap-([\.\d]+)$/, ([_, num]) => ({ gap: `${num}px` })],
    [
      /^overflow-(x|y)-(auto|hidden|scroll)$/,
      ([_, direction, option]) => ({ [`overflow-${direction}`]: option }),
    ],

    [/^w-full/, () => ({ width: '100%' })],
    [/^h-([\.\d]+)$/, ([_, num]) => ({ height: `${num}px` })],
    [/^w-([\.\d]+)$/, ([_, num]) => ({ width: `${num}px` })],

    [/^text-center/, () => ({ 'text-align': 'center' })],
    [/^text-base/, () => ({ 'font-size': '1rem', 'line-height': '1.5rem' })],
    [/^text-lg/, () => ({ 'font-size': '1.5rem', 'line-height': '2rem' })],

    [/^bold-([\.\d]+)$/, ([_, num]) => ({ 'font-weight': `${num}` })],
    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],

    [/^my-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px 0` })],
    [/^mx-([\.\d]+)$/, ([_, num]) => ({ margin: `0 ${num}px` })],

    [/^p-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
    [/^py-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px 0` })],
    [/^px-([\.\d]+)$/, ([_, num]) => ({ padding: `0 ${num}px` })],
    [/^rounded-([\.\d]+)$/, ([_, num]) => ({ 'border-radius': `${num}px` })],
    [
      /^text-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { color: theme.colors[c] };
      },
    ],
    [
      /^bg-(.*)$/,
      ([, c], { theme }) => {
        if (theme.colors[c]) return { 'background-color': theme.colors[c] };
      },
    ],
  ],
  shortcuts: {
    'title-1': 'bold-500 text-lg',
    'title-2': 'bold-500 text-base',
  },
});

const colorsBy = function (prop: string) {
  return ([, c], { theme }) => {
    if (theme.colors[c]) return { [prop]: theme.colors[c] };
  };
};
