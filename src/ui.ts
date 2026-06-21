import type {
  Product,
  ProductDetail
} from "./types";

import { formatCurrency } from "./utils";

const productList = document.querySelector("#productList") as HTMLDivElement;
const productDetail = document.querySelector("#productDetail") as HTMLDivElement;
const status = document.querySelector("#status") as HTMLDivElement;

export const renderLoading = (): void => {
  status.innerHTML = "<p class='loading'>Đang tải sản phẩm...</p>";
};

export const renderError = (message: string): void => {
  status.innerHTML = `<p class="error">Lỗi: ${message}</p>`;
};

export const renderSuccess = (message: string): void => {
  status.innerHTML = `<p class="success">${message}</p>`;
};

export const renderProducts = (products: Product[]): void => {
  productList.innerHTML = products
    .map(({ id, title, image, price }) => `
      <div class="card" data-id="${id}">
        <img src="${image}" alt="${title}" loading="lazy" />
        <h3>${title}</h3>
        <p class="price">${formatCurrency(price)}</p>
      </div>
    `)
    .join("");
};

export const renderProductDetail = (product: ProductDetail): void => {
  const { title, description, category, price, image, rating } = product;

  // Sử dụng layout chi tiết sạch sẽ
  productDetail.style.display = "block"; // Hiển thị khung detail
  productDetail.innerHTML = `
    <div class="detail-content">
      <img src="${image}" alt="${title}" />
      <div class="detail-info">
        <h2>${title}</h2>
        <p class="category">Danh mục: <strong>${category}</strong></p>
        <p class="desc">${description}</p>
        <p class="price-detail">Giá: <strong>${formatCurrency(price)}</strong></p>
        <p class="rating">Đánh giá: ${rating.rate} ⭐ (${rating.count} lượt)</p>
      </div>
    </div>
  `;
};

export const clearDetail = (): void => {
  productDetail.innerHTML = "";
  productDetail.style.display = "none";
};

export const populateCategories = (categories: string[]): void => {
  const select = document.querySelector("#categorySelect") as HTMLSelectElement;
  select.innerHTML = '<option value="">Tất cả danh mục</option>';

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    select.appendChild(option);
  });
};