import { camelCase, upperFirst } from "lodash";
export const registerBaseComponents = (vm) => {
    try {
        // Require base component context
        const requireComponent = require.context(
            "../components/base",
            true,
            /Base[\w-]+\.vue$/
        );
        requireComponent.keys().forEach((filePath) => {
            // Get component config
            const componentConfig = requireComponent(filePath);
            // Get filename from the filePath
            const fileName = filePath.split("/").slice(-1)[0];
            // Remove file extension and convert component name to pascal case
            const componentName = upperFirst(
                camelCase(fileName.replace(/\.\w+$/, ""))
            );
            // Register component globally
            vm.component(
                componentName,
                componentConfig.default || componentConfig
            );
        });
    } catch (err) {
        console.log("Base component registration failed");
        console.error(err);
    }
};
