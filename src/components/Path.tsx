const PATH = {
  login: "/",
  home: "/home",
  register: "/register",
  products: "/products",
  productDetails: "/products/:id",
  category: "/category",
  about: "/about",
  productDetailsById: (id: number | string) => `/products/${id}`,
} as const;

export default PATH
