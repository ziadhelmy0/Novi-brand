/**
 * يحمّل كل صور المنتجات من مجلد assets ويبني منها مصفوفة منتجات جاهزة.
 * كل منتج بيتربط بصورة front و back (لو موجودة) حسب الاسم.
 */
export function loadProducts(categories) {
  const allFiles = import.meta.glob('../assets/*/*.jpg', { eager: true });
  const allProducts = [];

  categories.forEach((cat) => {
    const productsMap = {};

    Object.keys(allFiles).forEach((path) => {
      if (!path.includes(cat.id)) return;

      const fileName = path.split('/').pop().replace('.jpg', '');
      const isBack = fileName.toLowerCase().includes('_back');
      const baseId = isBack
        ? fileName.replace('_back', '')
        : fileName.replace('_front', '');

      if (!productsMap[baseId]) {
        productsMap[baseId] = {
          id: baseId,
          name: cat.label,
          color: cat.id,
          price: cat.price ?? 600,
          front: '',
          back: '',
        };
      }

      if (isBack) {
        productsMap[baseId].back = allFiles[path].default;
      } else {
        productsMap[baseId].front = allFiles[path].default;
      }
    });

    allProducts.push(...Object.values(productsMap));
  });

  return allProducts;
}
