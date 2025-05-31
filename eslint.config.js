import antfu from '@antfu/eslint-config';

export default antfu({
    formatters: {
        css: true,
        html: true,
    },
    stylistic: {
        indent: 4,
        semi: true,
        quotes: 'single',
    },
    yaml: true,
});
