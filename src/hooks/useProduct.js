// src/hooks/useProduct.js
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function useProducts(category = '', subcategory = '') {
  const basePath = process.env.NEXT_PUBLIC_ADMIN_API || '/api/product';
  let url = basePath;
  
  const params = new URLSearchParams();
  
  if (category) params.append('category', category);
  if (subcategory) params.append('subcategory', subcategory);
  
  if (params.toString()) url += `?${params.toString()}`;

  const { data, error, isLoading, isValidating } = useSWR(
    url, 
    fetcher,
    {
      revalidateOnFocus: false,
      refreshInterval: 30000,
      shouldRetryOnError: true,
      errorRetryInterval: 5000,
    }
  );

  return {
    products: data || [],
    isLoading,
    isError: error,
    isValidating,
  };
}

// Single product ke liye alag function
export function useProduct(productId = '') {
  const basePath = process.env.NEXT_PUBLIC_ADMIN_API || '/api/product';
  const url = productId ? `${basePath}/${productId}` : null;

  const { data, error, isLoading, isValidating } = useSWR(
    url, 
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    product: data,
    isLoading,
    isError: error,
    isValidating,
  };
}