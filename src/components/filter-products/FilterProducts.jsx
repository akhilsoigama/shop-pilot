'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Slider,
    Alert,
    Skeleton,
    Rating,
    IconButton,
    Box,
    Container
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FilterList,
    Inventory,
    LocalOffer,
    Category,
    BrandingWatermark,
    TrendingUp,
    Favorite,
    FavoriteBorder,
    Star,
    ChevronRight,
} from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { Eye } from 'lucide-react';

const FloatingParticles = () => {
    return (
        <>
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 10 + 2}px`,
                        height: `${Math.random() * 10 + 2}px`,
                        background: i % 3 === 0
                            ? 'rgba(59, 130, 246, 0.3)'
                            : i % 3 === 1
                                ? 'rgba(139, 92, 246, 0.3)'
                                : 'rgba(236, 72, 153, 0.3)'
                    }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 15, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}
        </>
    );
};

const ShimmerEffect = () => {
    return (
        <motion.div
            className="absolute inset-0  -skew-x-12 z-0"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
        />
    );
};

const FilteredProducts = () => {
    const searchParams = useSearchParams();
    const brand = searchParams.get("brand");
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        inStock: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'newest'
    });
    const [wishlist, setWishlist] = useState(new Set());
    const router = useRouter();

    const decodedCategory = category ? decodeURIComponent(category) : '';
    const decodedBrand = brand ? decodeURIComponent(brand) : '';
    const decodedSubCategory = subCategory ? decodeURIComponent(subCategory) : '';

    useEffect(() => {
        fetchFilteredProducts();
    }, [brand, category, subCategory, filters]);

    const fetchFilteredProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            if (brand) params.append('brand', brand);
            if (category) params.append('category', category);
            if (subCategory) params.append('subCategory', subCategory);
            if (filters.inStock) params.append('inStock', filters.inStock);
            if (filters.minPrice) params.append('minPrice', filters.minPrice);
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
            if (filters.sortBy) params.append('sortBy', filters.sortBy);

            const response = await axios.get(`/api/product/filter?${params.toString()}`);

            setProducts(response.data.products || []);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error.response?.data?.message || error.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            inStock: '',
            minPrice: '',
            maxPrice: '',
            sortBy: 'newest'
        });
    };

    const toggleWishlist = (productId) => {
        const newWishlist = new Set(wishlist);
        if (newWishlist.has(productId)) {
            newWishlist.delete(productId);
        } else {
            newWishlist.add(productId);
        }
        setWishlist(newWishlist);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        },
        hover: {
            y: -8,
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            transition: { duration: 0.3 }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen p-4 md:p-8 relative overflow-hidden  backdrop-blur-sm">
                <div className="fixed inset-0 -z-10 overflow-hidden backdrop-blur-md">
                    <FloatingParticles />
                </div>

                <Container maxWidth="xl" className="py-8">
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Skeleton variant="text" width={400} height={70} className="mx-auto mb-4 " />
                            <Skeleton variant="rounded" width={500} height={60} className="mx-auto mb-8 " />
                        </motion.div>
                    </div>

                    <Grid container spacing={3}>
                        {[...Array(8)].map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="h-full rounded-2xl shadow-lg  backdrop-blur-sm border border-gray-100/50 overflow-hidden">
                                        <Skeleton variant="rectangular" height={280}  />
                                        <CardContent className="p-4">
                                            <Box className="flex justify-between mb-3">
                                                <Skeleton variant="rounded" width={100} height={28}  />
                                                <Skeleton variant="rounded" width={80} height={28}  />
                                            </Box>
                                            <Skeleton variant="text" height={32} width="90%"  />
                                            <Skeleton variant="text" height={24} width="60%"  />
                                            <Box className="flex justify-between items-center mt-4">
                                                <Skeleton variant="text" width={80} height={32}  />
                                                <Skeleton variant="rounded" width={120} height={40}  />
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-8 relative overflow-hidden  backdrop-blur-sm">
            <div className="fixed inset-0 -z-10 overflow-hidden backdrop-blur-md">
                <FloatingParticles />
            </div>

            <motion.div
                className="absolute top-6 right-6 z-10"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.5 }}
            >
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-2 backdrop-blur-sm">
                    <Star className="h-4 w-4 fill-current" />
                    <span>PREMIUM COLLECTION</span>
                </div>
            </motion.div>

            <Container maxWidth="xl" className="py-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 relative"
                >
                    <motion.div
                        animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity }
                        }}
                        className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-16 opacity-20"
                    >
                        <Star className="w-full h-full text-blue-500" />
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-3">
                        {decodedCategory || decodedBrand || 'All Products'}
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {decodedSubCategory && `Explore our ${decodedSubCategory} collection`}
                        {!decodedSubCategory && 'Discover our premium products tailored to your preferences'}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-gray-100/50 relative overflow-hidden"
                >
                    <ShimmerEffect />

                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
                        <div className="flex items-center">
                            <FilterList className="text-indigo-600 mr-2" />
                            <Typography variant="h6" className="font-semibold">
                                Refine Results
                            </Typography>
                        </div>

                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={clearFilters}
                            className="rounded-full border-indigo-300 text-indigo-600 "
                        >
                            Clear All Filters
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        <FormControl fullWidth>
                            <InputLabel>Stock Status</InputLabel>
                            <Select
                                value={filters.inStock}
                                label="Stock Status"
                                onChange={(e) => handleFilterChange('inStock', e.target.value)}
                                className="rounded-xl "
                            >
                                <MenuItem value="">All Products</MenuItem>
                                <MenuItem value="true">In Stock</MenuItem>
                                <MenuItem value="false">Out of Stock</MenuItem>
                            </Select>
                        </FormControl>

                        <div className=" p-3 rounded-xl">
                            <Typography gutterBottom className="flex items-center text-sm font-medium">
                                <LocalOffer className="text-indigo-600 mr-1" style={{ fontSize: '1rem' }} />
                                Min Price: {filters.minPrice ? `₹${filters.minPrice}` : 'Any'}
                            </Typography>
                            <Slider
                                value={filters.minPrice ? parseInt(filters.minPrice) : 0}
                                onChange={(e, value) => handleFilterChange('minPrice', value)}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `₹${value}`}
                                min={0}
                                max={10000}
                                step={100}
                                className="text-indigo-600"
                            />
                        </div>

                        <div className=" p-3 rounded-xl">
                            <Typography gutterBottom className="flex items-center text-sm font-medium">
                                <LocalOffer className="text-indigo-600 mr-1" style={{ fontSize: '1rem' }} />
                                Max Price: {filters.maxPrice ? `₹${filters.maxPrice}` : 'Any'}
                            </Typography>
                            <Slider
                                value={filters.maxPrice ? parseInt(filters.maxPrice) : 10000}
                                onChange={(e, value) => handleFilterChange('maxPrice', value)}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `₹${value}`}
                                min={0}
                                max={10000}
                                step={100}
                                className="text-indigo-600"
                            />
                        </div>

                        <FormControl fullWidth>
                            <InputLabel>Sort By</InputLabel>
                            <Select
                                value={filters.sortBy}
                                label="Sort By"
                                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                className="rounded-xl "
                            >
                                <MenuItem value="newest">Newest First</MenuItem>
                                <MenuItem value="priceLow">Price: Low to High</MenuItem>
                                <MenuItem value="priceHigh">Price: High to Low</MenuItem>
                                <MenuItem value="popular">Most Popular</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </motion.div>

                {!error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-between mb-8"
                    >
                        <Typography variant="h6" className="text-gray-700">
                            Showing <span className="font-bold text-indigo-600">{products.length}</span> products
                        </Typography>

                        <div className="flex items-center">
                            <Inventory className="text-green-500 mr-2" />
                            <Typography variant="body2" className="text-gray-600">
                                {products.filter(p => p.inStock).length} in stock
                            </Typography>
                        </div>
                    </motion.div>
                )}

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8"
                    >
                        <Alert severity="error" className="rounded-xl">
                            Error loading products: {error}
                        </Alert>
                    </motion.div>
                )}

                {!error && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {products.length > 0 ? (
                            <AnimatePresence>
                                {products.map((product) => (
                                    <motion.div
                                        key={product._id}
                                        variants={itemVariants}
                                        whileHover="hover"
                                        className="group relative"
                                    >
                                        <Card className="h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/50  backdrop-blur-sm relative">
                                            <motion.div
                                                className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                                initial={false}
                                            />

                                            <ShimmerEffect />

                                            <IconButton
                                                className="absolute top-4 right-4 z-10 shadow-md"
                                                size="small"
                                                onClick={() => toggleWishlist(product._id)}
                                            >
                                                {wishlist.has(product._id) ? (
                                                    <Favorite className="text-red-500" />
                                                ) : (
                                                    <FavoriteBorder className="text-gray-400" />
                                                )}
                                            </IconButton>

                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.3 }}
                                                className="relative w-full h-64 flex items-center justify-center  overflow-hidden"
                                            >
                                                <Image
                                                    src={product.productImage[0] || '/placeholder-product.jpg'}
                                                    alt={product.productName}
                                                    fill
                                                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                />
                                            </motion.div>

                                            <CardContent className="p-5 relative z-10">
                                                <div className="flex justify-between items-start mb-3">
                                                    <Chip
                                                        label={product.brand}
                                                        size="small"
                                                        className=" text-indigo-800 rounded-full font-medium"
                                                        icon={<BrandingWatermark fontSize="small" />}
                                                    />
                                                    {!product.inStock && (
                                                        <Chip
                                                            label="Out of stock"
                                                            size="small"
                                                            color="error"
                                                            variant="outlined"
                                                            className="text-xs"
                                                        />
                                                    )}
                                                </div>

                                                <Typography
                                                    variant="h6"
                                                    component="h2"
                                                    className="font-bold mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2"
                                                    title={product.productName}
                                                >
                                                    {product.productName}
                                                </Typography>

                                                <div className="flex items-center mb-2">
                                                    <Rating
                                                        value={product.rating || 4.5}
                                                        precision={0.5}
                                                        size="small"
                                                        readOnly
                                                        emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                    />
                                                    <Typography variant="caption" className="text-gray-600 ml-1">
                                                        {product.reviewCount || 123}
                                                    </Typography>
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    <div>
                                                        <Typography variant="h6" className="font-bold text-green-600">
                                                            ₹{product.price}
                                                        </Typography>
                                                        {product.discount > 0 && (
                                                            <Typography variant="body2" className="text-red-500 line-through">
                                                                ₹{product.discountPrice}
                                                            </Typography>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <Link href={`/categories/${decodedCategory}/${subCategory}/${product._id}`} className="flex-1">
                                                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                            <Button
                                                                size="small"
                                                                className="w-full py-3 text-sm bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 rounded-xl transition-all duration-500 shadow-lg hover:shadow-xl relative overflow-hidden group/btn"
                                                                style={{ color: 'white' }}
                                                            >
                                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                                                                <span className="relative z-10 flex items-center justify-center gap-1">
                                                                    <Eye className="h-4 w-4" />
                                                                    View Details
                                                                </span>
                                                            </Button>
                                                        </motion.div>
                                                    </Link>
                                                </div>

                                                {product.category && (
                                                    <div className="mt-4 pt-3 border-t border-gray-100">
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <Category fontSize="small" className="mr-1" />
                                                            <span>{product.category}</span>
                                                            {product.subCategory && (
                                                                <>
                                                                    <span className="mx-2">•</span>
                                                                    <span>{product.subCategory}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </CardContent>

                                            <motion.div
                                                className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                                initial={false}
                                            />
                                            <motion.div
                                                className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-purple-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                                initial={false}
                                            />
                                        </Card>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-center py-16 col-span-full  backdrop-blur-sm rounded-2xl border border-gray-100/50"
                            >
                                <TrendingUp className="text-gray-300" style={{ fontSize: '4rem' }} />
                                <Typography variant="h5" className="mt-4 text-gray-500">
                                    No products found
                                </Typography>
                                <Typography variant="body1" className="text-gray-400 mb-6">
                                    Try adjusting your filters to see more results
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={clearFilters}
                                    className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6"
                                >
                                    Clear All Filters
                                </Button>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </Container>

            <motion.button
                className="fixed bottom-6 left-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-2xl z-10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push('/')}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
            >
                <ChevronRight className="h-6 w-6 rotate-180" />
            </motion.button>
        </div>
    );
};

export default FilteredProducts;