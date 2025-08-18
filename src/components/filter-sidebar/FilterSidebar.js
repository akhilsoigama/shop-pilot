'use client'
import { Filter, X, Check, SlidersHorizontal } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
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
    setPriceRange(value);
  };

  const renderFilterSection = (filterName) => {
    const options = getFilterOptions(filterName);
    if (!options || options.length === 0) return null;

    return (
      <AccordionItem value={filterName} key={filterName} className="border-b ">
        <AccordionTrigger className="py-4 hover:no-underline">
          <div className="flex items-center gap-2">
            <span className="font-medium">{filterName}</span>
            {activeFilters[filterName]?.length > 0 && (
              <Badge variant="secondary" className="h-5 w-5 p-0">
                {activeFilters[filterName].length}
              </Badge>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-2">
          <div className="space-y-3">
            {options.map(value => (
              <div key={value} className="flex items-center space-x-3">
                <Checkbox
                  id={`${filterName}-${value}`}
                  checked={activeFilters[filterName]?.includes(value) || false}
                  onCheckedChange={() => toggleFilter(filterName, value)}
                />
                <label htmlFor={`${filterName}-${value}`} className="text-sm">
                  {value}
                </label>
              </div>
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
      className="hidden md:block w-72 pr-4"
    >
      <div className="rounded-lg border bg-background p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            Filters
          </h3>
          {(Object.keys(activeFilters).length > 0 || (priceRange[0] !== minPrice || priceRange[1] !== maxPrice)) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
            >
              Clear all
            </Button>
          )}
        </div>

        <ScrollArea className="h-[calc(100vh-180px)] pr-4">
          <Accordion type="multiple" defaultValue={['price', ...(subcategory?.fields?.map(f => f.name) || [])]}>
            <AccordionItem value="price" className="border-b">
              <AccordionTrigger className="py-4 hover:no-underline">
                <span className="font-medium">Price Range</span>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
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
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
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
              className="mt-4 pt-4 border-t"
            >
              <div className="flex flex-wrap gap-2">
                {priceRange[0] !== minPrice || priceRange[1] !== maxPrice ? (
                  <Badge variant="outline" className="flex items-center gap-1 py-1">
                    <span className="text-xs">
                      Price: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                    </span>
                    <button onClick={() => setPriceRange([minPrice, maxPrice])}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ) : null}
                {Object.entries(activeFilters).map(([filterName, values]) =>
                  values.map(value => (
                    <Badge key={`${filterName}-${value}`} variant="outline" className="flex items-center gap-1 py-1">
                      <span className="text-xs">{filterName}: {value}</span>
                      <button onClick={() => toggleFilter(filterName, value)}>
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
    <div className="md:hidden fixed bottom-6 right-6 z-20">
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="default"
            size="lg"
            className="rounded-full shadow-lg h-14 w-14 p-0"
          >
            <Filter className="h-6 w-6" />
            {(Object.keys(activeFilters).length > 0 || (priceRange[0] !== minPrice || priceRange[1] !== maxPrice)) && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                {Object.values(activeFilters).flat().length + ((priceRange[0] !== minPrice || priceRange[1] !== maxPrice) ? 1 : 0)}
              </span>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[90vh]">
          <div className="mx-auto w-full max-w-md">
            <DrawerHeader>
              <DrawerTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  <span>Filters</span>
                </div>
                {(Object.keys(activeFilters).length > 0 || (priceRange[0] !== minPrice || priceRange[1] !== maxPrice)) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearAll}
                  >
                    Clear all
                  </Button>
                )}
              </DrawerTitle>
            </DrawerHeader>
            <ScrollArea className="h-[60vh] px-4">
              <Accordion type="multiple" defaultValue={['price', ...(subcategory?.fields?.map(f => f.name) || [])]}>
                <AccordionItem value="price" className="border-b">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="font-medium">Price Range</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
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
                        <span>₹{priceRange[0].toLocaleString()}</span>
                        <span>₹{priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {subcategory?.fields?.map(field => renderFilterSection(field.name))}
                {subcategory?.variantAttributes?.map(attr => renderFilterSection(attr.name))}
              </Accordion>
            </ScrollArea>
            <div className="p-1 h-[50px]">
              <DrawerClose asChild>
                <Button className="w-full">
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