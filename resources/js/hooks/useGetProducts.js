import axios from "axios";

async function useGetProducts() {
    let products;
    let loading;

    try {
        loading = true;
        const response = await axios.get("/api/products");
        products = response.data;
        loading = false;
    } catch (error) {
        this.error = error;
    }

    return { products, loading };
}

export default useGetProducts;
