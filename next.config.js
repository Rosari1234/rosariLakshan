// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     swcMinify: true,
//     images: {
//         domains: ['open.cruip.com','ucarecdn.com', 'www.svgrepo.com','images.unsplash.com', 'res.cloudinary.com']
//     },
//     webpack(config) {
//         config
//             .module
//             .rules
//             .push({test: /\.svg$/, use: ["@svgr/webpack"]});

//         return config;
//     }
// }

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    outputFileTracing: true,
    images: {
        domains: [
            'open.cruip.com',
            'ucarecdn.com',
            'www.svgrepo.com',
            'images.unsplash.com',
            'res.cloudinary.com',
        ],
    },
    webpack(config, { isServer }) {
        // Add support for importing SVGs as React components
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        // Add support for WebAssembly files
        config.module.rules.push({
            test: /\.wasm$/,
            type: "asset/inline",
        });

        // Enable WebAssembly experiments (needed for certain WASM use cases)
        config.experiments = {
            ...config.experiments,
            asyncWebAssembly: true,
            layers: true,
        };

        // Adjustments for server or client-specific configurations if necessary
        if (!isServer) {
            // Example: Polyfills for client-side WebAssembly (if required)
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false, // Disable 'fs' module in the browser
            };
        }

        return config;
    },
};

module.exports = nextConfig;

