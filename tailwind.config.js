module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        "./node_modules/flowbite/**/*.js",
    ],
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            textColor: ["group-hover"],
            // Add any other group-hover variants you need
        },
    },
    plugins: ["flowbite/plugin"],
};
