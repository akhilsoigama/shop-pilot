'use client'
import { useProducts } from "@/hooks/useProduct";
import { useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { Subcategories } from "@/lib/category";
import { useCart } from "@/context/cartContext";
import ProductPage from "../productPage/Product-page";
import { AnimatePresence } from "framer-motion";
import Subcategory from "../subcategory/Subcategory";
import FilterSidebar from "../filter-sidebar/FilterSidebar";

const normalizeColorValue = (value) => {
  if (!value || typeof value !== 'string') return value;
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export default function SubcategoryLayout() {
  const { category, subcategory } = useParams();
  const decodedCategory = decodeURIComponent(category);
  const decodedSubcategory = decodeURIComponent(subcategory);
  const { addToCart } = useCart();
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({});
  const { products, isLoading, isError } = useProducts(decodedCategory, decodedSubcategory);

  const [minPrice, maxPrice] = useMemo(() => {
    if (!products || products.length === 0) return [0, 10000];
    return products.reduce(
      ([min, max], product) => {
        const price = product.discountPrice || product.price;
        return [Math.min(min, price), Math.max(max, price)];
      },
      [Infinity, -Infinity]
    );
  }, [products]);

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const currentCategory = Subcategories.find(cat => cat.name === decodedCategory);
  const currentSubcategory = currentCategory?.subcategories?.find(
    sub => sub.name === decodedSubcategory
  );

  const filteredProducts = useMemo(() => {
    let filtered = products || [];

    if (priceRange) {
      const [min, max] = priceRange;
      filtered = filtered.filter(product => {
        const price = product.discountPrice || product.price;
        return price >= min && price <= max;
      });
    }

    if (Object.keys(activeFilters).length > 0) {
      filtered = filtered.filter(product => {
        return Object.entries(activeFilters).some(([filterName, values]) => {
          const isColorFilter = filterName.toLowerCase().includes('color');

          const topMatch = product.specifications?.some(spec => {
            if (spec.name !== filterName) return false;
            const compareValue = isColorFilter ? normalizeColorValue(spec.value) : spec.value;
            return values.includes(compareValue);
          });

          const variantMatch = product.variants?.some(variant =>
            variant.specifications?.some(spec => {
              if (spec.name !== filterName) return false;
              const compareValue = isColorFilter ? normalizeColorValue(spec.value) : spec.value;
              return values.includes(compareValue);
            })
          );

          return topMatch || variantMatch;
        });
      });
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.productName.toLowerCase().includes(query) ||
        (product.brand && product.brand.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [products, priceRange, activeFilters, searchQuery]);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveFilters({});
    setPriceRange([minPrice, maxPrice]);
  };

  return (
      <div className="flex flex-col md:flex-row gap-2 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <FilterSidebar
        subcategory={currentSubcategory}
        products={products}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onClearAll={clearAllFilters}
      />
      
      <Subcategory
        products={filteredProducts}
        isLoading={isLoading}
        isError={isError}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilters={activeFilters}
        priceRange={priceRange}
        minPrice={minPrice}
        maxPrice={maxPrice}
        decodedSubcategory={decodedSubcategory}
        onViewProduct={handleViewProduct}
        hoveredProduct={hoveredProduct}
        setHoveredProduct={setHoveredProduct}
        onClearAll={clearAllFilters}
      />
      
      <AnimatePresence>
        {isDialogOpen && (
          <ProductPage
            product={selectedProduct}
            onAddToCart={addToCart}
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}