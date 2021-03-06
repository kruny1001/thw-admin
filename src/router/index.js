import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Products from '@/components/Products'
import FindItems from '@/components/FindItems'
import Category from '@/components/Category'
import CategoryById from '@/components/CategoryById'
import ProductById from '@/components/ProductById'
import Customers from '@/components/Customers'
import Orders from '@/components/Orders'
import Search from '@/components/Search'
import CreateProduct from '@/components/CreateProduct'
import Color from '@/components/Color'
import AddColor from '@/components/AddColor'
import ProductTables from '@/components/ProductTable'
import Update from '@/components/Update'
import Social from '@/components/Social'
import Diag from '@/components/Diag'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/diag',
      name: 'Diag',
      component: Diag
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/find',
      name: 'FindItems',
      component: FindItems
    },
    {
      path: '/products/:id',
      name: 'ProductsByBrand',
      component: Products
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/category/:id',
      name: 'categoryById',
      component: CategoryById
    },
    {
      path: '/product/:id',
      name: 'ProductById',
      component: ProductById
    },
    {
      path: '/customers/',
      name: 'Customers',
      component: Customers
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/create',
      name: 'Create',
      component: CreateProduct
    },
    {
      path: '/update/:id',
      name: 'Update',
      component: Update
    },
    {
      path: '/color',
      name: 'Color',
      component: Color
    },
    {
      path: '/colorEdit',
      name: 'AddColor',
      component: AddColor
    },
    {
      path: '/prds',
      name: 'ProductTables',
      component: ProductTables
    },
    {
      path: '/social',
      name: 'Social',
      component: Social
    }

  ]
})
