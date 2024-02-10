/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config, { env, webpack ,defaultLoaders}) => {
    config.module.rules.push({
    //test: /\.js$/,
    test: /\.mdx/,
    use: [
      defaultLoaders.babel,
      {
        loader: '@mdx-js/loader',
       // options: pluginOptions.options,
      },
    ],
    exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module-react|quill-image-resize-module)/,
    
    });
    config.plugins.push(
    new webpack.ProvidePlugin({
      'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js',
    //'window.Quill': 'quill'
    })
    );
    return config;
    }
    
    
  ,

    reactStrictMode: false,
   
    images: {
      domains: ['firebasestorage.googleapis.com'],
    }
}




module.exports = nextConfig
