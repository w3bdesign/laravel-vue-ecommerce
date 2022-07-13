import { render } from "@testing-library/vue";
import BaseTable from "../../../resources/js/components/base/BaseTable.vue";

import "@testing-library/jest-dom";

test("Verify that the tableTitle prop works", async () => {
    const { getByText } = render(BaseTable, {
        props: { tableTitle: "Table title test" },
    });

    const tableTitle = getByText("Table title test");
    expect(tableTitle).toBeInTheDocument();
});
