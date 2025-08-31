import React, { useState, useMemo, useCallback } from 'react'
import {
    alpha,
    InputBase,
    styled,
    List,
    ListItem,
    ListItemText,
    Paper,
    Box,
    Typography,
    IconButton,
    Chip
} from '@mui/material';
import { Search, Clear, Category } from '@mui/icons-material';
import { useProducts } from '@/hooks/useProduct';
import { useRouter } from 'next/navigation';

const SearchContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: alpha(
        theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
        0.05
    ),
    '&:hover': {
        backgroundColor: alpha(
            theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
            0.08
        ),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    transition: theme.transitions.create(['width', 'background-color'], {
        duration: theme.transitions.duration.standard,
    }),
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.mode === 'dark' ?
        alpha(theme.palette.common.white, 0.7) :
        alpha(theme.palette.common.black, 0.5),
}));

const ClearIconWrapper = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(1),
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 4, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}));

const ResultsContainer = styled(Paper)(({ theme }) => ({
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: theme.spacing(1),
    zIndex: 1000,
    maxHeight: 400,
    overflow: 'auto',
    boxShadow: theme.shadows[3],
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
}));

const ProductImage = styled('img')({
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: 4,
    marginRight: 12,
});

const MainSearch = () => {
    const { products } = useProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    const handleSearchChange = useCallback((event) => {
        setSearchTerm(event.target.value);
    }, []);

    const handleClearSearch = useCallback(() => {
        setSearchTerm('');
    }, []);

    const handleProductSelect = useCallback((product) => {
        setSearchTerm(product.productName || '');
        const queryParams = new URLSearchParams();
        if (product.brand) queryParams.append('brand', product.brand);
        if (product.category) queryParams.append('category', product.category);
        if (product.subCategory) queryParams.append('subCategory', product.subCategory);
        router.push(`/products/filter?${queryParams.toString()}`);
        setIsFocused(false);
    }, [router]);

    const highlightMatch = (text, term) => {
        if (!text || !term) return text;

        const regex = new RegExp(`(${term})`, 'gi');
        const parts = String(text).split(regex);

        return parts.map((part, index) =>
            regex.test(part) ?
                <span key={index} style={{ backgroundColor: '#ffeb3b', fontWeight: 'bold' }}>{part}</span> :
                part
        );
    };

    const filteredProductsWithMatches = useMemo(() => {
        if (!searchTerm.trim()) return [];

        const term = searchTerm.toLowerCase();

        return products
            .map(product => {
                const matches = [];

                if (product.productName?.toLowerCase().includes(term)) {
                    matches.push({ field: 'Name', value: product.productName });
                }
                if (product.category?.toLowerCase().includes(term)) {
                    matches.push({ field: 'Category', value: product.category });
                }
                if (product.subCategory?.toLowerCase().includes(term)) {
                    matches.push({ field: 'Subcategory', value: product.subCategory });
                }
                if (product.brand?.toLowerCase().includes(term)) {
                    matches.push({ field: 'Brand', value: product.brand });
                }
                if (product.productDescription?.toLowerCase().includes(term)) {
                    matches.push({ field: 'Description', value: product.productDescription });
                }
                if (product.sku?.toLowerCase().includes(term)) {
                    matches.push({ field: 'SKU', value: product.sku });
                }
                if (product.productKey?.toLowerCase().includes(term)) {
                    matches.push({ field: 'Product Key', value: product.productKey });
                }

                // Check specifications
                product.specifications?.forEach(spec => {
                    if (spec.name?.toLowerCase().includes(term)) {
                        matches.push({
                            field: 'Specification',
                            value: `${spec.name}: ${spec.value}`
                        });
                    } else if (spec.value?.toLowerCase().includes(term)) {
                        matches.push({
                            field: 'Specification',
                            value: `${spec.name}: ${spec.value}`
                        });
                    }
                });

                // Check variants
                product.variants?.forEach(variant => {
                    if (variant.sku?.toLowerCase().includes(term)) {
                        matches.push({ field: 'Variant SKU', value: variant.sku });
                    }

                    variant.specifications?.forEach(spec => {
                        if (spec.name?.toLowerCase().includes(term) ||
                            spec.value?.toLowerCase().includes(term)) {
                            matches.push({
                                field: 'Variant Spec',
                                value: `${spec.name}: ${spec.value}`
                            });
                        }
                    });
                });

                if (product.stripeProductId?.toLowerCase().includes(term)) {
                    matches.push({ field: 'Stripe Product', value: product.stripeProductId });
                }
                if (product.stripePriceId?.toLowerCase().includes(term)) {
                    matches.push({ field: 'Stripe Price', value: product.stripePriceId });
                }

                return { product, matches };
            })
            .filter(({ matches }) => matches.length > 0)
            .sort((a, b) => b.matches.length - a.matches.length);
    }, [products, searchTerm]);

    const productList = useMemo(() => {
        return filteredProductsWithMatches.map(({ product, matches }) => (
            <ListItem
                key={product.id || product._id}
                onClick={() => handleProductSelect(product)}
                sx={{
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                    py: 2,
                }}
            >
                {product.image && (
                    <ProductImage
                        src={product.image}
                        alt={product.name}
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                )}

                <Box sx={{ flex: 1 }}>
                    <ListItemText
                        disableTypography
                        primary={
                            <Box component="div" suppressHydrationWarning>
                                {highlightMatch(product.productName, searchTerm)}
                            </Box>
                        }
                        secondary={
                            <Box component="div" sx={{ mt: 0.5 }}>
                                {product.category && (
                                    <Chip
                                        icon={<Category />}
                                        label={product.category}
                                        size="small"
                                        sx={{ mr: 1, mb: 0.5 }}
                                    />
                                )}
                                <Typography variant="body2" color="text.secondary" component="div" suppressHydrationWarning>
                                    Matched in: {matches.slice(0, 2).map((match, index) => (
                                        <span key={index}>
                                            {index > 0 && ', '}
                                            {match.field}
                                        </span>
                                    ))}
                                    {matches.length > 2 && `, +${matches.length - 2} more`}
                                </Typography>
                            </Box>
                        }
                    />
                </Box>
            </ListItem>
        ));
    }, [filteredProductsWithMatches, handleProductSelect, searchTerm]);

    const showResults = useMemo(() =>
        isFocused && searchTerm && filteredProductsWithMatches.length > 0,
        [isFocused, searchTerm, filteredProductsWithMatches.length]
    );

    const showNoResults = useMemo(() =>
        isFocused && searchTerm && filteredProductsWithMatches.length === 0,
        [isFocused, searchTerm, filteredProductsWithMatches.length]
    );

    return (
        <Box sx={{ position: 'relative', minWidth: 300 }}>
            <SearchContainer>
                <SearchIconWrapper>
                    <Search />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search products"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    className='truncate'
                />
                {searchTerm && (
                    <ClearIconWrapper
                        size="small"
                        onClick={handleClearSearch}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <Clear fontSize="small" />
                    </ClearIconWrapper>
                )}
            </SearchContainer>

            {showResults && (
                <ResultsContainer>
                    <List dense>
                        {productList}
                    </List>
                </ResultsContainer>
            )}

            {showNoResults && (
                <ResultsContainer>
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Search sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                            No products found
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Try searching with different terms
                        </Typography>
                    </Box>
                </ResultsContainer>
            )}
        </Box>
    );
}

export default React.memo(MainSearch);