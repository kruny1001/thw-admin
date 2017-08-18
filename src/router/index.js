import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Products from '@/components/Products'
import Category from '@/components/Category'
import CategoryById from '@/components/CategoryById'
import ProductById from '@/components/ProductById'
import Customers from '@/components/Customers'
import Orders from '@/components/Orders'
import Search from '@/components/Search'
import CreateProduct from '@/components/CreateProduct'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
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
    }
  ]
})
