# Project Review & TODOs: Laravel Vue E-commerce

## Overall Assessment

The project uses a modern stack (Laravel 10, Vue 3) and follows generally good practices for an SPA with a backend API. It has a solid foundation for an e-commerce application. The frontend utilizes Pinia for state management and Vue Router, with components generally following good practices. Data fetching is handled both by Pinia actions and directly in components using `useSWRV`.

## Critical TODOs

- [ ] **Implement `CategoryController` Methods:**
    - The `app/Http/Controllers/Api/CategoryController.php` is currently empty.
    - Implement `index()` method to list all categories.
    - Implement `show()` method to display a single category by its slug or ID.
    - Ensure these methods fetch data from the `Category` model and return appropriate JSON responses.
- [ ] **Fix `checkout(product)` Call in `OrderCheckout.vue`:**
    - The `@click` handler for the "Submit order" button in `resources/js/components/Checkout/OrderCheckout.vue` calls `checkout(product)`, but `product` is not defined in the component's scope.
    - Change to `checkout()`.
- [ ] **Correct `paymentIsProcessing` Logic in `OrderCheckout.vue`:**
    - In `resources/js/components/Checkout/OrderCheckout.vue`, `localState.paymentIsProcessing` is incorrectly set to `false` at the beginning of the `checkout()` method.
    - It should be set to `true` when the payment process starts and then to `false` in both the `.then()` and `.catch()` blocks of the Axios call.
- [ ] **Define `placeholderImage` in `SingleProduct.vue`:**
    - The `resources/js/components/Products/SingleProduct.vue` component attempts to use an undefined `placeholderImage`.
    - Define this variable (e.g., import a local image asset or set a URL string) or remove its usage if a placeholder is not desired.

## High Priority TODOs

- [ ] **Refine User Creation on Purchase (`UserController@purchase`):**
    - Currently creates a user with a random password if email doesn't exist.
    - Consider options:
        - Clearly inform the user an account is being created.
        - Send a welcome email with a password reset link or temporary password.
        - Offer a distinct "guest checkout" that doesn't create a full user account or makes it optional.
- [ ] **Add Input Validation to Laravel Controllers:**
    - Ensure all incoming request data in API controllers (e.g., `UserController@purchase`, `ProductController`, `CategoryController`) is thoroughly validated using Laravel's validation features.
- [ ] **Improve Error Handling in `UserController@purchase`:**
    - Avoid exposing raw exception messages directly to the client.
    - Log detailed errors on the server.
    - Return user-friendly and distinct error messages for different failure scenarios.
- [ ] **Initialize `products` State in Pinia Store (`useCart.js`):**
    - The `products` array in `resources/js/store/useCart.js` is used by actions/getters but not explicitly initialized in the `state` object.
    - Add `products: []` to the initial state.
- [ ] **Correct Order ID Saved in `OrderCheckout.vue`:**
    - The `checkout()` method in `OrderCheckout.vue` saves `paymentMethod.id` as the order ID.
    - It should save the actual order ID from the backend response (e.g., `response.data.id` or `response.data.transaction_id`).

## Medium Priority TODOs

- [ ] **Expand Test Coverage:**
    - Write more comprehensive tests for backend API endpoints (PHPUnit).
    - Write more frontend tests for Vue components and user interactions (Jest, Vue Testing Library).
- [ ] **Review and Enhance Security (General):**
    - Conduct a general security review (input validation, XSS, CSRF, SQLi, sensitive data exposure).
- [ ] **Review Data Fetching Strategy (Vue):**
    - Product data is fetched via `useSWRV` in components (`ShowAllProducts`, `SingleProduct`) and also via an action in the Pinia store (`getProductsFromApi`).
    - Decide on a consistent strategy: either centralize in Pinia or ensure components using `useSWRV` don't conflict with store logic if the store is intended as the single source of truth for product lists.
- [ ] **Improve Error Display in Vue Components:**
    - `SingleProduct.vue` could display an error message if product fetching fails.
    - Error messages in `OrderCheckout.vue` could be more specific and user-friendly.
- [ ] **Adjust `formatPrice` for Decimal Places (if needed):**
    - The `formatPrice` utility in `resources/js/utils/functions.js` formats to 0 decimal places.
    - If prices can have cents (e.g., $9.99), change `minimumFractionDigits` to `2`.

## Low Priority / Future Growth TODOs

- [ ] **Optimize Vue Component Registration:**
    - Consider if global component registration in `resources/js/app.js` impacts initial load time as the app grows.
- [ ] **Improve Project Documentation:**
    - Expand `README.md` and consider API documentation.
- [ ] **Frontend UX/UI Review:**
    - Conduct a thorough review of the user experience and interface.
- [ ] **Clarify `formatPrice` Export/Import Style:**
    - The `formatPrice` utility has both named and default exports. Imports are mixed. Standardize for clarity.
- [ ] **Review Purpose of `<fakevisa-details />`:**
    - Clarify the role of this component in `OrderCheckout.vue`. Remove or conditionally render if it's for testing only.
- [ ] **Route Params vs. Props in `SingleProduct.vue`:**
    - The component uses `useRoute().params.slug` while the route has `props: true`. Consider using the prop for consistency.

## Questions for Clarification

- [ ] Clarify the meaning of "bot" in the initial project description. If there's specific automated functionality intended, it needs to be reviewed.
