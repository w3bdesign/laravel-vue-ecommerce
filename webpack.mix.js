const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
  .vue()
  .postCss('resources/css/app.css', 'public/css', [require('tailwindcss')]);

mix.options({
  postCss: [require('tailwindcss')('./tailwind.config.js')],
});

// config eslint
mix.webpackConfig({
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        test: /\.(js|vue)?$/,
      },
    ],
  },
});
