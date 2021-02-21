<template>
  <div>
    <!-- productmodal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempproduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  >
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i
                      class="fas fa-stroopwafel fa-spin"
                      v-if="this.$store.state.isfileuploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  >
                </div>
                <div
                  style="height: 150px; background-size: cover; background-position: center"
                  :style="{backgroundImage: `url(${tempproduct.imageUrl})`}"
                ></div>
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempproduct.title"
                    placeholder="請輸入標題"
                  >
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      v-model="tempproduct.category"
                      placeholder="請輸入分類"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      v-model="tempproduct.unit"
                      placeholder="請輸入單位"
                    >
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      v-model="tempproduct.origin_price"
                      placeholder="請輸入原價"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      v-model="tempproduct.price"
                      placeholder="請輸入售價"
                    >
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempproduct.description"
                    placeholder="請輸入產品描述"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempproduct.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempproduct.is_enabled"
                    >
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="updateproducts('#productModal')"
            >確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delproductmodal -->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempproduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-danger"
              @click.prevent="updateproducts('#delProductModal')"
            >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    <!-- OrderDetailModal -->
    <div
      class="modal fade"
      id="OrderDetailModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document" style="max-width:100%">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">訂單信息</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <table class="modal-body table">
            <thead>
              <tr>
                <th>#</th>
                <th>商品圖片</th>
                <th>商品名稱</th>
                <th>商品內容</th>
                <th>數量</th>
                <th>總金額</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index,num) in orderdetail.products" :key="item.id">
                <td class="align-middle">{{num + 1}}</td>
                <td
                  style="height: 150px; background-size: cover; background-position: center"
                  :style="{backgroundImage: `url(${item.product.imageUrl})`}"
                ></td>
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.product.content }}</td>
                <td class="align-middle">{{ item.qty }}</td>
                <td class="align-middle">{{ item.final_total }}</td>
              </tr>
            </tbody>
          </table>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- OrderUserDetailModal -->
    <div
      class="modal fade"
      id="OrderUserDetailModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">購買人信息</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <table class="modal-body table">
            <tbody>
              <tr>
                <th>姓名</th>
                <td>{{ orderdetail.user.name }}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{{ orderdetail.user.email }}</td>
              </tr>

              <tr>
                <th>收件人電話</th>
                <td>{{ orderdetail.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ orderdetail.user.address }}</td>
              </tr>
            </tbody>
          </table>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- couponModal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠券</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempcoupon.title"
                    placeholder="請輸入標題"
                  >
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="percent">折扣</label>
                    <input
                      type="number"
                      class="form-control"
                      id="percent"
                      v-model.number="tempcoupon.percent"
                      placeholder="請輸入折扣"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="due_date">到期日</label>
                    <input
                      type="date"
                      class="form-control"
                      id="due_date"
                      v-model="tempcoupon.due_date"
                    >
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="code">優惠碼</label>
                    <input
                      class="form-control"
                      id="code"
                      v-model="tempcoupon.code"
                      onKeyUp="value=value.replace(/[\W]/g,'')"
                      placeholder="請輸入優惠碼"
                    >
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model.number="tempcoupon.is_enabled"
                      :true-value="1"
                      :false-value="0"
                    >
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updatecoupons('#couponModal')">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delcouponmodal -->
    <div
      class="modal fade"
      id="delcouponmodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempcoupon.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-danger"
              @click="updatecoupons('#delcouponmodal')"
            >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    <!-- addbannermodal -->
    <div
      class="modal fade"
      id="addbannermodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增廣告</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempbanner.title"
                    placeholder="請輸入標題"
                  >
                </div>
                <div class="form-group">
                  <label for="title">分類</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempbanner.category"
                    placeholder="請輸入分類"
                  >
                </div>
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    name="picture"
                    v-validate="'required'"
                    v-model="tempbanner.imageUrl"
                    placeholder="請輸入圖片連結"
                  >

                  <span class="text-danger" v-if="errors.has('picture')">圖片欄位不得留空</span>
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i
                      class="fas fa-stroopwafel fa-spin"
                      v-if="this.$store.state.isfileuploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile"
                  >
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    v-model="tempbanner.content"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempbanner.is_enabled"
                    >
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-primary"
              v-if="tempbanner.imageUrl"
              @click.prevent="addbanners('#addbannermodal')"
            >確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delbannermodal -->
    <div
      class="modal fade"
      id="delbannermodal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{tempbanner.title}}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-danger"
              @click.prevent="delbanners('#delbannermodal')"
            >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    updateproducts(modal) {
      this.$store.dispatch("updateProducts", modal);
    },
    uploadFile(e) {
      const uploadedFile = e.target.files[0];
      this.$store.dispatch("uploadfile", uploadedFile);
    },
    updatecoupons(modal) {
      this.$store.dispatch("updateCoupons", modal);
    },
    addbanners(modal) {
      this.$validator.validate().then(result => {
        if (result) {
          this.$store.dispatch("addBanners", modal);
        } else {
          console.log("加入圖片");
        }
      });
    },
    delbanners(modal) {
      this.$store.dispatch('delBanners', modal);
    }
  },
  computed: {
    tempproduct: {
      get() {
        return this.$store.state.tempproduct;
      }
      // set(value) {
      //   this.$store.commit('TEMPPRODUCT', value);
      // }
    },
    orderdetail: {
      get() {
        return this.$store.state.orderdetail;
      }
    },
    tempcoupon: {
      get() {
        return this.$store.state.tempcoupon;
      }
    },
    tempbanner: {
      get() {
        return this.$store.state.tempbanner;
      }
    }
  }
};
</script>