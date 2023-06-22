module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",       
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
};
