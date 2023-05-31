import { render } from "@testing-library/vue";
import BaseLoadingSpinner from "../../../resources/js/components/base/BaseLoadingSpinner.vue";

import "@testing-library/jest-dom";

test("Verify that the loading message is rendered", async () => {
    const { getByText } = render(BaseLoadingSpinner);

    const loadingMessage = getByText("Loading products ...");
    expect(loadingMessage).toBeInTheDocument();
});
