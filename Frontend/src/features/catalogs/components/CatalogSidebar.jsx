import React, { useMemo } from "react";
const colors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Navy", hex: "#000080" },
  { name: "Grey", hex: "#808080" },
  { name: "Olive", hex: "#808000" },
  { name: "Maroon", hex: "#800000" },
];

const CatalogSidebar = ({ products = [] }) => {
  // Derive unique categories with counts from the products list
  const categories = useMemo(() => {
    const countMap = {};
    products.forEach((p) => {
      const cat = p.productType;
      if (cat) countMap[cat] = (countMap[cat] || 0) + 1;
    });
    return Object.entries(countMap).map(([name, count]) => ({ name, count }));
  }, [products]);

  // Derive unique sizes from all variant attributes (attributes is a Map)
  const sizes = useMemo(() => {
    const sizeSet = new Set();
    products.forEach((p) => {
      p.variants?.forEach((v) => {
        const size = v.attributes?.size || v.attributes?.Size;
        if (size) sizeSet.add(size.toUpperCase());
      });
    });
    return [...sizeSet];
  }, [products]);

  return (
    <div className="hidden md:block w-64 shrink-0 pr-8">
      {/* Categories */}
      <div className="py-6 border-b border-stone-200">
        <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">Categories</h3>
        {categories.length === 0 ? (
          <p className="text-sm text-stone-400">No categories found</p>
        ) : (
          <ul className="space-y-3">
            {categories.map((cat, idx) => (
              <li key={idx} className="flex justify-between items-center group cursor-pointer">
                <span className="text-stone-600 group-hover:text-stone-900 transition-colors capitalize">{cat.name}</span>
                <span className="text-xs text-stone-400">{cat.count}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sizes */}
      <div className="py-6 border-b border-stone-200">
        <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">Size</h3>
        {sizes.length === 0 ? (
          <p className="text-sm text-stone-400">No sizes available</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                className="w-10 h-10 flex items-center justify-center border border-stone-300 rounded-lg text-sm text-stone-600 hover:border-stone-900 hover:text-stone-900 transition-colors cursor-pointer"
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="py-6">
        <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">Color</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color, idx) => (
            <button
              key={idx}
              className="w-8 h-8 rounded-full border border-stone-200 shadow-sm flex items-center justify-center relative cursor-pointer group hover:scale-110 transition-transform"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              <span className="sr-only">{color.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogSidebar;
