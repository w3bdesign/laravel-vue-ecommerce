import axios from "axios";

async function useGetProducts() {
    let products;

    try {
        const response = await axios.get("/api/products");
        products = response.data;
    } catch (error) {
        this.error = error;
    }

    return { products };
}

export default useGetProducts;
