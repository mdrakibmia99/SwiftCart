// app/dashboard/page.tsx

import { getAllBrands } from '@/services/Brand'
import { getAllShops } from '../shop/all-shops/_actions'
import { getAllUsers } from '../user-management/_actions'
import { getAllCategories } from '@/services/Category'
import DashboardPage from './_components/DashboardPage'
import { LayersIcon, StoreIcon, TagsIcon, UsersIcon } from 'lucide-react'
 // Adjust based on your project

export default async function Dashboard() {
  const [usersRes, shopsRes, brandsRes, categoriesRes] = await Promise.all([
    getAllUsers(),
    getAllShops(),
    getAllBrands(),
    getAllCategories(),
  ])

  const users = usersRes?.data || []
  const shops = shopsRes?.data || []
  const brands = brandsRes?.data || []
  const categories = categoriesRes?.data || []

   const stats = [
    {
      title: 'Users',
      value: users.length,
      change: '+5%',
      icon: <UsersIcon className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Shops',
      value: shops.length,
      change: '+2%',
      icon: <StoreIcon className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Brands',
      value: brands.length,
      change: '+3%',
      icon: <TagsIcon className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Categories',
      value: categories.length,
      change: '+1%',
      icon: <LayersIcon className="h-6 w-6 text-primary" />,
    },
  ]

  const userGrowthData = [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 200 },
    { month: 'Mar', users: 150 },
    { month: 'Apr', users: 300 },
    { month: 'May', users: 250 },
  ]

  const shopDistributionData = categories.map((category: any) => ({
    name: category.name,
    value: shops.filter((shop: any) => shop.category === category._id).length,
  }))

  const brandPopularityData = brands.map((brand: any) => ({
    name: brand.name,
    shops: shops.filter((shop: any) => shop.brand === brand._id).length,
  }))


  return (
    <div>
       <DashboardPage
      users={users}
      shops={shops}
      brands={brands}
      categories={categories}
      stats={stats}
      userGrowthData={userGrowthData}
      shopDistributionData={shopDistributionData}
      brandPopularityData={brandPopularityData}
    />
    </div>
  )
}
