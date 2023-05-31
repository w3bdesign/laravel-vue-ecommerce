import { render } from "@testing-library/vue";
import BaseButton from "../../../resources/js/components/base/BaseButton.vue";

import "@testing-library/jest-dom";

test("Verify that the button renders and that the default slot works", async () => {
    const { getByText } = render(BaseButton, {
        slots: { default: "Button test" },
    });

    const button = getByText("Button test");
    expect(button).toBeInTheDocument();
});
