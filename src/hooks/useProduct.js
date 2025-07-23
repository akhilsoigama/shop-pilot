import useSWR from 'swr';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_ADMIN_API || '/api/product?category=${selectedCategory}';

const fetcher = (url) => axios.get(url).then(res => res.data);

export function useProducts(category = '') {
  const url = category ? `${API_BASE}?category=${encodeURIComponent(category)}` : API_BASE;

  const { data, error, isLoading, isValidating } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 30000,
    shouldRetryOnError: true,
    errorRetryInterval: 5000,
  });


  return {
    products: data || [],
    isLoading,
    isError: error,
    isValidating,
  }
}
