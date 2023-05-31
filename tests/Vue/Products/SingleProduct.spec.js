import { fireEvent, render } from "@testing-library/vue";

import SingleProduct from "../../../resources/js/components/Products/SingleProduct.vue";
import { useCart } from "../../../resources/js/store/useCart";
import formatPrice from "../../../resources/js/utils/functions";

import "@testing-library/jest-dom";

jest.mock("swrv", () => ({
    __esModule: true,
    default: jest.fn(),
}));

// Mock the useCart function
jest.mock("@/store/useCart", () => {
    const addToCartMock = jest.fn();
    return {
        useCart: jest.fn(() => ({ addToCart: addToCartMock })),
        __addToCartMock: addToCartMock,
    };
});

// Mock the useRoute function
jest.mock("vue-router", () => ({
    useRoute: jest.fn(() => ({
        params: {
            slug: "product-1",
        },
    })),
}));

const useRouterLink = {
    template: "<a><slot></slot></a>",
};

/**
 * Test case to verify the 'Add to Cart' functionality.
 *
 * @name Verify 'Add to Cart' functionality
 * @function
 * @async
 * @memberof module:tests
 *
 * @description
 * The test case does the following:
 * 1. Mocks the `useSWRV` hook to return the product data.
 * 2. Mocks the `useCart` store to use a Jest function as the `addToCart` method.
 * 3. Renders the `SingleProduct` component with the necessary global components.
 * 4. Verifies the product information is displayed.
 * 5. Clicks the 'Add To Cart' button.
 * 6. Verifies that the `addToCart` method in the store is called with the correct product.
 *
 * @returns {void}
 */
test("Verify 'Add to Cart' functionality", async () => {
    const useSWRV = require("swrv").default;
    const product = {
        id: 1,
        name: "Product 1",
        price: 100,
        slug: "product-1",
        imageUrl: "image1.jpg",
        description: "Sample description",
    };
    useSWRV.mockReturnValue({ data: product, error: null });

    const addToCartMock = jest.fn();
    useCart.mockReturnValue({
        addToCart: addToCartMock,
    });

    const { getByText } = render(SingleProduct, {
        global: {
            components: {
                "router-link": useRouterLink,
            },
        },
    });

    // Verify product information is displayed
    expect(getByText(product.name)).toBeInTheDocument();
    expect(getByText(formatPrice(product.price))).toBeInTheDocument();
    expect(getByText(product.description)).toBeInTheDocument();

    // Click the 'Add To Cart' button
    const addToCartButton = getByText("Add To Cart");
    await fireEvent.click(addToCartButton);

    // Verify that the `addToCart` method in the store is called with the correct product
    expect(addToCartMock).toHaveBeenCalledTimes(1);
    expect(addToCartMock).toHaveBeenCalledWith({ item: product });
});
