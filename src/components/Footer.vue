<template>
  <div class="container-fluid">
    <div class="footer text-center">
      <ul class="socialicon-group">
        <li class="socialicon-item fa-3x">
          <i class="fab fa-facebook-square"></i>
        </li>
        <li class="socialicon-item fa-3x">
          <i class="fab fa-github"></i>
        </li>
        <li class="socialicon-item fa-3x">
          <i class="fas fa-envelope"></i>
        </li>
      </ul>
      <div style="color:#3f5d45;">©Copright 2018 Neil Yang</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-fluid {
  margin-top: 20px;
  padding-right: 0px;
  padding-left: 0px;
  .footer {
    border-top: 1px solid green;
    margin-bottom: 20px;
    .socialicon-group {
      display: flex;
      justify-content: center;
      .socialicon-item {
        margin: 20px;
        color:#3f5d45;
      }
    }
  }
}
</style>