import { render } from "@testing-library/vue";
import ShowAllProducts from "../../../resources/js/components/Products/ShowAllProducts.vue";
import formatPrice from "../../../resources/js/utils/functions";

import "@testing-library/jest-dom";

jest.mock("swrv", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const useRouterLink = {
    template: "<a><slot></slot></a>",
};

/**
 * @description
 * Test case to verify that products are rendered correctly with their respective details,
 * and that the router-link component works as expected.
 *
 * The test will:
 * 1. Mock the `useSWRV` hook to return a list of products.
 * 2. Render the `ShowAllProducts` component.
 * 3. Iterate through each product and check if the product's name, price, and image are present in the DOM.
 * 4. Check if the list of images found by the role "img" matches the length of the products list.
 *
 * @async
 * @function
 * @name verifyProductsAreRenderedAndRouterLinkWorksTest
 */
test("Verify products are rendered and router-link works", async () => {
    const useSWRV = require("swrv").default;
    const products = [
        {
            id: 1,
            name: "Product 1",
            price: 100,
            slug: "product-1",
            imageUrl: "image1.jpg",
        },
        {
            id: 2,
            name: "Product 2",
            price: 200,
            slug: "product-2",
            imageUrl: "image2.jpg",
        },
    ];
    useSWRV.mockReturnValue({ data: products, error: null });

    const { getByText, getAllByRole } = render(ShowAllProducts, {
        global: {
            components: {
                "router-link": useRouterLink,
            },
        },
    });

    for (const product of products) {
        expect(getByText(product.name)).toBeInTheDocument();
        expect(getByText(formatPrice(product.price))).toBeInTheDocument();

        const productLink = getByText(product.name).closest("a");
        const productImage = productLink.querySelector("img");
        expect(productImage).toHaveAttribute("src", product.imageUrl);
    }

    const images = getAllByRole("img");
    expect(images.length).toBe(products.length);
});

/**
 * @description
 * Test case to verify that an error message is displayed when an error occurs while loading products.
 *
 * The test will:
 * 1. Mock the `useSWRV` hook to return an error.
 * 2. Render the `ShowAllProducts` component.
 * 3. Check if the error message is present in the DOM.
 *
 * @async
 * @function
 * @name verifyErrorMessageIsDisplayedWhenErrorOccursTest
 */
test("Verify error message is displayed when error occurs", async () => {
    const useSWRV = require("swrv").default;
    useSWRV.mockReturnValue({
        data: null,
        error: new Error("Error loading products"),
    });

    const { getByText } = render(ShowAllProducts, {
        global: {
            components: {
                "router-link": useRouterLink,
            },
        },
    });

    const errorMessage = getByText("Error loading products");
    expect(errorMessage).toBeInTheDocument();
});
