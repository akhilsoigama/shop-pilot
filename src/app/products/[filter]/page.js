import FilteredProducts from '@/components/filter-products/FilterProducts'

const Page = ({ searchParams }) => {
  return <FilteredProducts searchParams={searchParams} />
}

export default Page