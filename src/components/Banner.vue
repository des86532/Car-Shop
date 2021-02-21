<template>
  <div class="container text-center">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            class="d-block w-100"
            src="../../public/guillermo-ferla-1197148-unsplash.jpg"
            alt="First slide"
          >
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100"
            src="../../public/levin-zhao-1216605-unsplash.jpg"
            alt="Second slide"
          >
        </div>
        <div class="carousel-item">
          <img
            class="d-block w-100"
            src="../../public/alex-siale-95113-unsplash.jpg"
            alt="Third slide"
          >
        </div>
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel-item {
  max-height: 460px;
  object-fit: cover;
}
</style>