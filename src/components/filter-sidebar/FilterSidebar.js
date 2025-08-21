'use client'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter, X, Check, SlidersHorizontal
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export default function FilterSidebar({
  subcategory,
  products,
  activeFilters,
  setActiveFilters,
  priceRange,
  setPriceRange,
  minPrice,
  maxPrice,
  onClearAll
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPriceChanging, setIsPriceChanging] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleFilter = (filterName, value) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      const currentValues = newFilters[filterName] || [];

      if (currentValues.includes(value)) {
        const updated = currentValues.filter(v => v !== value);
        if (updated.length > 0) {
          newFilters[filterName] = updated;
        } else {
          delete newFilters[filterName];
        }
      } else {
        newFilters[filterName] = [...currentValues, value];
      }
      return newFilters;
    });
  };

  const getFilterOptions = (filterName) => {
    const field = subcategory?.fields?.find(f => f.name === filterName);
    if (field?.options) return field.options;

    const variantAttr = subcategory?.variantAttributes?.find(attr => attr.name === filterName);
    if (variantAttr?.options) return variantAttr.options;

    const values = new Set();
    products?.forEach(product => {
      product.specifications?.forEach(spec => {
        if (spec.name === filterName) values.add(spec.value);
      });
      product.variants?.forEach(variant => {
        variant.specifications?.forEach(spec => {
          if (spec.name === filterName) values.add(spec.value);
        });
      });
    });
    return Array.from(values).sort();
  };

  const handlePriceChange = (value) => {
    setIsPriceChanging(true);
    setPriceRange(value);
    setTimeout(() => setIsPriceChanging(false), 100);
  };

  const renderFilterSection = (filterName) => {
    const options = getFilterOptions(filterName);
    if (!options || options.length === 0) return null;

    return (
      <AccordionItem value={filterName} key={filterName} className="border-none">
        <AccordionTrigger className="py-3 hover:no-underline group">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm uppercase tracking-wide text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
              {filterName}
            </span>
            {activeFilters[filterName]?.length > 0 && (
              <Badge variant="secondary" className="h-5 w-5 p-0 bg-primary dark:bg-[#1e2949]  text-white">
                {activeFilters[filterName].length}
              </Badge>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-2 pt-1">
          <div className="space-y-2">
            {options.map(value => (
              <motion.div
                key={value}
                className="flex items-center space-x-3 py-1"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Checkbox
                  id={`${filterName}-${value}`}
                  checked={activeFilters[filterName]?.includes(value) || false}
                  onCheckedChange={() => toggleFilter(filterName, value)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label
                  htmlFor={`${filterName}-${value}`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer flex-1"
                >
                  {value}
                </label>
              </motion.div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  const renderDesktopFilters = () => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="hidden lg:block w-70 pr-6"
    >
      <div className="rounded-xl sticky top-30  border bg-background p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
        <div className="flex justify-between items-center mb-5 pb-2 border-b dark:border-gray-800">
          <h3 className="text-lg font-bold flex items-center gap-2 text-gray-800 dark:text-white">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            Filters
          </h3>
          {(Object.keys(activeFilters).length > 0 || (priceRange[0] !== minPrice || priceRange[1] !== maxPrice)) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="text-xs h-8 px-3 text-gray-500 hover:text-primary dark:text-gray-400"
            >
              Clear all
            </Button>
          )}
        </div>

        <ScrollArea className="h-[calc(100vh-220px)]  pr-4">
          <Accordion type="multiple" defaultValue={['price', ...(subcategory?.fields?.map(f => f.name) || [])]} className="space-y-4">
            <AccordionItem value="price" className="border-none">
              <AccordionTrigger className="py-3 hover:no-underline group">
                <span className="font-medium text-sm uppercase tracking-wide text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                  Price Range
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-2 pt-1">
                <div className="px-1">
                  <Slider
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    min={minPrice}
                    max={maxPrice}
                    step={Math.max(1, Math.floor((maxPrice - minPrice) / 100))}
                    className="my-6"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{Math.floor(priceRange[0]).toLocaleString()}</span>
                    <span>₹{Math.floor(priceRange[1]).toLocaleString()}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {subcategory?.fields?.map(field => renderFilterSection(field.name))}
            {subcategory?.variantAttributes?.map(attr => renderFilterSection(attr.name))}
          </Accordion>
        </ScrollArea>

        <AnimatePresence>
          {(Object.keys(activeFilters).length > 0 || (priceRange[0] !== minPrice || priceRange[1] !== maxPrice)) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-5 pt-4 border-t dark:border-gray-800"
            >
              <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Applied Filters</h4>
              <div className="flex flex-wrap gap-2">
                {priceRange[0] !== minPrice || priceRange[1] !== maxPrice ? (
                  <Badge variant="outline" className="flex items-center gap-1 py-1 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800">
                    <span className="text-xs">
                      Price: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                    </span>
                    <button onClick={() => setPriceRange([minPrice, maxPrice])} className="ml-1 hover:text-blue-900 dark:hover:text-blue-100">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ) : null}
                {Object.entries(activeFilters).map(([filterName, values]) =>
                  values.map(value => (
                    <Badge key={`${filterName}-${value}`} variant="outline" className="flex items-center gap-1 py-1 bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
                      <span className="text-xs">{value}</span>
                      <button onClick={() => toggleFilter(filterName, value)} className="ml-1 hover:text-gray-900 dark:hover:text-gray-100">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  const renderMobileFilters = () => (
    <div className="lg:hidden fixed bottom-6 right-6 z-40">
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right">
        <DrawerTrigger asChild>
          <Button
            variant="default"
            size="lg"
            className="rounded-full shadow-lg h-14 w-14 p-0 bg-primary hover:bg-primary/90"
          >
            <Filter className="h-6 w-6" />
            {(Object.keys(activeFilters).length > 0 || (priceRange[0] !== minPrice || priceRange[1] !== maxPrice)) && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                {Object.values(activeFilters).flat().length + ((priceRange[0] !== minPrice || priceRange[1] !== maxPrice) ? 1 : 0)}
              </span>
            )}
          </Button>
        </DrawerTrigger>
        {/* className={"bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl shadow-lg"} */}
        <DrawerContent className="h-full top-0 right-0 dark:bg-[#0e1525] dark:text-white dark:border-gray-700 left-auto mt-0 w-[85vw] max-w-sm rounded-none">
          <div className="h-full flex flex-col">
            <DrawerHeader className="border-b dark:border-gray-800 px-4 py-3">
              <div className="flex items-center justify-between">
                <DrawerTitle className="flex items-center gap-2 text-lg">
                  <SlidersHorizontal className="h-5 w-5 text-primary" />
                  <span>Filters</span>
                </DrawerTitle>
                <div className="flex items-center gap-2">
                  {(Object.keys(activeFilters).length > 0 || (priceRange[0] !== minPrice || priceRange[1] !== maxPrice)) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClearAll}
                      className="h-8 px-2 text-xs text-gray-500 hover:text-primary dark:text-gray-400"
                    >
                      Clear all
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDrawerOpen(false)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DrawerHeader>
            <ScrollArea className="flex-1 px-4" style={{ maxHeight: 'calc(100vh - 180px)' }}>
              <Accordion
                type="multiple"
                defaultValue={['price', ...(subcategory?.fields?.map(f => f.name) || [])]}
                className="py-4 space-y-4"
                onValueChange={(value) => {
                  if (isPriceChanging) return;
                }}
              >
                <AccordionItem value="price" className="border-none">
                  <AccordionTrigger className="py-3 hover:no-underline group">
                    <span className="font-medium text-sm uppercase tracking-wide text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                      Price Range
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2 pt-1">
                    <div className="px-1">
                      <Slider
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        min={minPrice}
                        max={maxPrice}
                        step={Math.max(1, Math.floor((maxPrice - minPrice) / 100))}
                        className="my-6"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>₹{Math.floor(priceRange[0]).toLocaleString()}</span>
                        <span>₹{Math.floor(priceRange[1]).toLocaleString()}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {subcategory?.fields?.map(field => renderFilterSection(field.name))}
                {subcategory?.variantAttributes?.map(attr => renderFilterSection(attr.name))}
              </Accordion>
            </ScrollArea>
            <div className="p-4 border-t dark:border-gray-800">
              <DrawerClose asChild>
                <Button className="w-full" size="lg">
                  <Check className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </DrawerClose>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );

  return (
    <>
      {renderDesktopFilters()}
      {renderMobileFilters()}
    </>
  );
}