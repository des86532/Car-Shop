/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import $ from 'jquery';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {
    isLoading: false,
    pagination: {},
    products: [],
    searchText: '',
    categories: [],
    productdetail: {},
    adminproducts: [],
    tempproduct: {},
    isfileuploading: false,
    adminorders: [],
    orderdetail: {
      user: {},
    },
    orderdetailform: {
      user: {
        name: {
          name_first: '',
          name_last: '',
        },
        email: '',
        tel: '',
        address: '',
      },
      message: '',
    },
    temporderid: '',
    coupons: [],
    tempcoupon: {},
    banners: [],
    tempbanner: {},
    isNew: '',
    cartlist: {},
    errormessage: false,
    favoritelist: JSON.parse(localStorage.getItem('items')) || [],
  },
  // 提交狀態
  actions: {
    updateLoading(contxet, status) {
      contxet.commit('LOADING', status);
    },
    openModal(context, modalstatus) {
      if (modalstatus.species === 'product') {
        context.commit('TEMPPRODUCT', modalstatus.item);
      } else if (modalstatus.species === 'order') {
        context.commit('ORDERDETAIL', modalstatus.item);
      } else if (modalstatus.species === 'coupon') {
        context.commit('TEMPCOUPON', modalstatus.item);
      } else if (modalstatus.species === 'banner') {
        context.commit('TEMPBANNER', modalstatus.item);
      }
      context.commit('MODAL', modalstatus.status);
      $(`${modalstatus.modal}`).modal('show');
    },
    // Customer
    getProducts(context, page = 1) {
      const api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/products?page=${page}`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        console.log('取得產品列表', response);
        if (response.data.success) {
          context.commit('PRODUCTS', response.data.products);
          context.commit('CATEGORIES', response.data.products);
          context.commit('PAGINATION', response.data.pagination);
          context.commit('LOADING', false);
        } else {
          context.commit('LOADING', false);
        }
      });
    },
    getProduct(context, id) {
      const api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/product/${id}`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        console.log('取得特定產品', response);
        context.commit('PRODUCTDETAIL', response.data.product);
        context.commit('LOADING', false);
      });
    },
    searchText(context, text) {
      context.commit('SEARCHTEXT', text);
    },
    getCarts(context) {
      const api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/cart`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        console.log('取得購物車列表', response);
        if (response.data.success) {
          context.commit('Carts', response.data.data);
          context.commit('LOADING', false);
        }
      });
    },
    addtoCart(context, cart) {
      const api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/cart`;
      axios.post(api, { data: cart }).then((response) => {
        console.log('加入購物車', response);
        this.dispatch('getCarts');
      });
    },
    removecartitem(context, id) {
      const api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/cart/${id}`;
      const vm = this;
      context.commit('LOADING', true);
      axios.delete(api).then((response) => {
        console.log('刪除購物車商品', response);
        vm.dispatch('getCarts');
        context.commit('LOADING', false);
      });
    },
    addcouponcode(context, coupon) {
      const api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/coupon`;
      const vm = this;
      context.commit('LOADING', true);
      axios.post(api, coupon).then((response) => {
        console.log('套用優惠券', response);
        if (response.data.success) {
          vm.dispatch('getCarts');
          context.commit('LOADING', false);
        } else {
          context.commit('LOADING', false);
        }
      });
    },
    createOrder(context, orderdetailform) {
      const api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/order`;
      const order = {
        user: {
          name: `${orderdetailform.user.name.name_first + orderdetailform.user.name.name_last}`,
          email: `${orderdetailform.user.email}`,
          tel: `${orderdetailform.user.tel}`,
          address: `${orderdetailform.user.address}`,
        },
        message: `${orderdetailform.message}`,
      };
      context.commit('LOADING', true);
      axios.post(api, { data: order }).then((response) => {
        if (response.data.success) {
          console.log('訂單已建立', response);
          context.commit('ORDERID', response.data.orderId);
          context.commit('CLEANORDERFORM');
          context.commit('LOADING', false);
        } else {
          context.commit('CLEANORDERFORM');
          context.commit('LOADING', false);
        }
      });
    },
    getOrder(context, orderId) {
      const api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/order/${orderId}`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        console.log('取得特定訂單', response);
        if (response.data.success) {
          context.commit('ORDERDETAIL', response.data.order);
          context.commit('LOADING', false);
        } else {
          console.log('取得訂單失敗');
          context.commit('LOADING', false);
        }
      });
    },
    payOrder(context, orderId) {
      const api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/pay/${orderId}`;
      axios.post(api).then((response) => {
        if (response.data.success) {
          this.dispatch('getOrder', orderId);
        } else {
          console.log('付款失敗');
        }
      });
    },
    addtolike(context, item) {
      if (this.state.favoritelist.findIndex(ele => ele === item) < 0) {
        context.commit('ADDFAVORITE', item);
      } else {
        console.log('已加入星號');
      }
    },
    dellike(context, item) {
      context.commit('DELFAVORITE', item);
    },
    // Admin
    getAdminProducts(context, page = 1) {
      const api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/products?page=${page}`;
      axios.get(api).then((response) => {
        console.log('取得管理產品列表', response);
        if (response.data.success) {
          context.commit('ADMINPRODUCTS', response.data.products);
          context.commit('PAGINATION', response.data.pagination);
          context.commit('LOADING', false);
        } else {
          context.commit('LOADING', false);
          if (response.data.message === '驗證錯誤, 請重新登入') {
            this.dispatch('updateerror', true);
          }
        }
      });
    },
    updateProducts(context, modal) {
      let api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/admin/product`;
      let httpMethod = 'post';
      const vm = this;
      if (vm.state.isNew === 'Edit') {
        api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/admin/product/${vm.state.tempproduct.id}`;
        httpMethod = 'put';
      } else if (vm.state.isNew === 'Del') {
        api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/admin/product/${vm.state.tempproduct.id}`;
        httpMethod = 'delete';
      }
      vm.commit('LOADING', true);
      axios[httpMethod](api, { data: this.state.tempproduct }).then((response) => {
        if (response.data.success) {
          $(`${modal}`).modal('hide');
          vm.dispatch('getAdminProducts');
          vm.commit('LOADING', false);
        } else {
          $(`${modal}`).modal('hide');
          vm.dispatch('getAdminProducts');
          if (vm.state.isNew === 'New') {
            console.log('添加產品失敗');
          } else if (vm.state.isNew === 'Edit') {
            console.log('修改產品失敗');
          } else {
            console.log('刪除產品失敗');
          }
          vm.commit('LOADING', false);
        }
      });
    },
    updatefileloading(context, status) {
      context.commit('FILELOADING', status);
    },
    getAdminOrders(context, page = 1) {
      const api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/admin/orders?page=${page}`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        console.log('取得訂單列表', response);
        if (response.data.success) {
          context.commit('ADMINORDERS', response.data.orders);
          context.commit('PAGINATION', response.data.pagination);
          context.commit('LOADING', false);
        } else {
          context.commit('LOADING', false);
        }
      });
    },
    getCoupons(context, page = 1) {
      const api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/admin/coupons?page=${page}`;
      context.commit('LOADING', true);
      axios.get(api).then((response) => {
        console.log('取得優惠券列表', response);
        if (response.data.success) {
          context.commit('COUPONS', response.data.coupons);
          context.commit('PAGINATION', response.data.pagination);
          context.commit('LOADING', false);
        }
      });
    },
    updateCoupons(context, modal) {
      let api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/admin/coupon`;
      let httpMethod = 'post';
      const vm = this;
      if (vm.state.isNew === 'Edit') {
        api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/admin/coupon/${vm.state.tempcoupon.id}`;
        httpMethod = 'put';
      } else if (vm.state.isNew === 'Del') {
        api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/admin/coupon/${vm.state.tempcoupon.id}`;
        httpMethod = 'delete';
      }
      vm.commit('LOADING', true);
      axios[httpMethod](api, { data: this.state.tempcoupon }).then((response) => {
        if (response.data.success) {
          $(`${modal}`).modal('hide');
          vm.dispatch('getCoupons');
          vm.commit('LOADING', false);
        } else {
          $(`${modal}`).modal('hide');
          vm.dispatch('getCoupons');
          if (vm.state.isNew === 'New') {
            console.log('添加產品失敗');
          } else if (vm.state.isNew === 'Edit') {
            console.log('修改產品失敗');
          } else {
            console.log('刪除產品失敗');
          }
          vm.commit('LOADING', false);
        }
      });
    },
    addBanners(context, modal) {
      context.commit('BANNERS');
      $(`${modal}`).modal('hide');
    },
    delBanners(context, modal) {
      context.commit('DELBANNER');
      $(`${modal}`).modal('hide');
    },
    updateerror(context, status) {
      context.commit('ERRORMESSAGE', status);
    },
    uploadfile(context, file) {
      const api = `${process.env.VUE_APP_PATHAPI}/api/${process.env.VUE_APP_CUSTOMAPI}/admin/upload`;
      const formData = new FormData();
      formData.append('file-to-upload', file);
      context.commit('FILELOADING', true);
      axios.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        console.log('上傳圖片', response);
        if (response.data.success) {
          context.commit('TEMPPRODUCTIMAGE', response.data.imageUrl);
          context.commit('TEMPBANNERIMAGE', response.data.imageUrl);
          context.commit('FILELOADING', false);
        } else {
          context.commit('FILELOADING', false);
        }
      });
    },
  },
  // 改變狀態
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    PAGINATION(state, pageinfo) {
      state.pagination = pageinfo;
    },
    MODAL(state, status) {
      state.isNew = status;
    },
    // Customer
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    SEARCHTEXT(state, payload) {
      state.searchText = payload;
    },
    CATEGORIES(state, payload) {
      const categories = new Set();
      payload.forEach((item) => {
        categories.add(item.category);
      });
      state.categories = Array.from(categories);
    },
    PRODUCTDETAIL(state, detail) {
      state.productdetail = detail;
    },
    Carts(state, payload) {
      state.cartlist = payload;
    },
    ORDERID(state, orderid) {
      state.temporderid = orderid;
    },
    CLEANORDERFORM(state) {
      state.orderdetailform = {
        user: {
          name: {
            name_first: '',
            name_last: '',
          },
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      };
    },
    // Admin
    ADMINPRODUCTS(state, payload) {
      state.adminproducts = payload;
    },
    TEMPPRODUCT(state, payload) {
      state.tempproduct = Object.assign({}, payload);
    },
    TEMPPRODUCTIMAGE(state, value) {
      state.tempproduct.imageUrl = value;
    },
    FILELOADING(state, status) {
      state.isfileuploading = status;
    },
    ADMINORDERS(state, payload) {
      state.adminorders = payload;
    },
    ORDERDETAIL(state, payload) {
      state.orderdetail = Object.assign({}, payload);
    },
    COUPONS(state, payload) {
      state.coupons = payload;
    },
    TEMPCOUPON(state, payload) {
      state.tempcoupon = Object.assign({}, payload);
    },
    BANNERS(state, payload) {
      state.banners.push(state.tempbanner);
    },
    TEMPBANNER(state, payload) {
      state.tempbanner = Object.assign({}, payload);
    },
    TEMPBANNERIMAGE(state, value) {
      state.tempbanner.imageUrl = value;
    },
    DELBANNER(state) {
      const index = state.banners.findIndex(ele => ele.imageUrl === state.tempbanner.imageUrl);
      state.banners.splice(index, 1);
    },
    ERRORMESSAGE(state, payload) {
      state.errormessage = payload;
    },
    ADDFAVORITE(state, item) {
      state.favoritelist.push(item);
      localStorage.setItem('items', JSON.stringify(state.favoritelist));
    },
    DELFAVORITE(state, item) {
      const dataIndex = state.favoritelist.findIndex(ele => ele.id === item.id);
      state.favoritelist.splice(dataIndex, 1);
      localStorage.setItem('items', JSON.stringify(state.favoritelist));
    },
  },
});
