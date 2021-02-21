import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import News from './views/News.vue';
import Admin from './views/Admin.vue';

// components
import ProductList from './components/ProductList.vue';
import OrderList from './components/OrderList.vue';
import CouponList from './components/CouponList.vue';
import OrderTest from './components/OrderTest.vue';
import ProductDetail from './components/ProductDetail.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import Checkout from './components/Checkout.vue';
import PayOrder from './components/PayOrder.vue';
import Products from './components/Products.vue';
import FavoriteProducts from './components/favoriteproducts.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/products',
    },
    {
      path: '/products',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'products',
          component: Products,
        },
        {
          path: 'favorite',
          name: 'favorite',
          component: FavoriteProducts,
        },
      ],
    },
    {
      path: '/news',
      name: 'news',
      component: News,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'productlist',
          name: 'productlist',
          component: ProductList,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'orderlist',
          name: 'orderlist',
          component: OrderList,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'couponlist',
          name: 'couponlist',
          component: CouponList,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'ordertest',
          name: 'ordertest',
          component: OrderTest,
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    // 不需要驗證，客戶用
    {
      path: '/productdetail/:id',
      name: 'productdetail',
      component: ProductDetail,
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: ShoppingCart,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout,
    },
    {
      path: '/payorder/:orderId',
      name: 'payorder',
      component: PayOrder,
    },
  ],
});
