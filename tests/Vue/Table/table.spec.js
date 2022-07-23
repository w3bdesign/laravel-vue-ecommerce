import { render, screen } from "@testing-library/vue";
import BaseTable from "../../../resources/js/components/base/BaseTable.vue";

import "@testing-library/jest-dom";

describe("BaseTable", () => {
    beforeEach(() => {
        render(BaseTable, {
            props: {
                tableTitle: "card details for testing",
                tableHeaders: [
                    "Name",
                    "Address",
                    "Zipcode",
                    "City",
                    "State",
                    "Email",
                ],
                tableData: [
                    "firstName",
                    "address",
                    "zipcode",
                    "city",
                    "state",
                    "email",
                ],
            },
        });
    });

    test("Verify that the tableTitle prop works", async () => {
        const tableTitle = screen.getByRole("heading", {
            name: /card details for testing/i,
        });
        expect(tableTitle).toBeInTheDocument();
    });

    test("Verify that the tableHeaders prop works", async () => {
        const name = screen.getByRole("columnheader", { name: /name/i });
        expect(name).toBeInTheDocument();
    });

    test("Verify that the tableData prop works", async () => {
        const firstName = screen.getByRole("cell", { name: /firstName/i });
        expect(firstName).toBeInTheDocument();
    });
});
