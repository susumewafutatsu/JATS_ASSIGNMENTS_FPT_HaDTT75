import { loadInitialData, getProductById } from "./api";
import { renderProducts, renderLoading, renderError, renderSuccess, renderProductDetail, populateCategories } from "./ui";
import { debounce } from "./utils";
import { setState, appState } from "./state";
import type { Product } from "./types";

let allProducts: Product[] = [];

const searchInput = document.querySelector("#searchInput") as HTMLInputElement;
const categorySelect = document.querySelector("#categorySelect") as HTMLSelectElement;
const sortSelect = document.querySelector("#sortSelect") as HTMLSelectElement;

const filterProducts = (): void => {
    const search = searchInput.value.toLowerCase();
    const category = categorySelect.value;
    const sort = sortSelect.value;

    let filtered = [...allProducts].filter(product => 
        product.title.toLowerCase().includes(search)
    );

    if (category) {
        filtered = filtered.filter(product => product.category === category);
    }

    switch (sort) {
        case "price-asc": filtered.sort((a, b) => a.price - b.price); break;
        case "price-desc": filtered.sort((a, b) => b.price - a.price); break;
        case "name": filtered.sort((a, b) => a.title.localeCompare(b.title)); break;
    }

    renderProducts(filtered);
};

const debouncedSearch = debounce(filterProducts, 400);

const loadData = async (): Promise<void> => {
    try {
        setState({ status: "loading" });
        renderLoading();
        const { products, categories } = await loadInitialData();
        allProducts = products;
        
        setState({ status: "success", products });
        renderProducts(products); // Đảm bảo hàm này không chèn nút "Add to Cart"
        populateCategories(categories);
        renderSuccess(`Đã tải ${products.length} sản phẩm`);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown Error";
        setState({ status: "error", message });
        renderError(message);
    }
};

searchInput.addEventListener("input", debouncedSearch);
categorySelect.addEventListener("change", filterProducts);
sortSelect.addEventListener("change", filterProducts);

document.addEventListener("click", async event => {
    const target = event.target as HTMLElement;
    const card = target.closest(".card");
    if (!card) return;
    
    const id = Number(card.getAttribute("data-id"));
    try {
        const product = await getProductById(id);
        renderProductDetail(product);
        document.querySelector("#productDetail")?.scrollIntoView({ behavior: 'smooth' });
    } catch {
        renderError("Không thể tải chi tiết sản phẩm");
    }
});

loadData();