<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img src="./assets/logo.svg" width="112" height="28">
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          Home
        </a>

        <a class="navbar-item">
          Satellites
        </a>

        <a class="navbar-item">
          Packets
        </a>

        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">

      </div>
    </div>
  </nav>

  <section class="hero is-halfheight is-link">
    <div class="hero-body">
      Leaflet map here
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h3 class="title is-3 has-text-centered">
        Welcome to TinyGS, the Open Source Global Satellite Network
      </h3>

      <p class="content is-medium">
        TinyGS is an open network of Ground Stations distributed around the world to receive and operate LoRa
        satellites, weather probes and other flying objects, using cheap and versatile modules.
      </p>

      <p class="content is-medium">
        This project is based on ESP32 boards and currently it is compatible with sx126x and sx127x LoRa módules but we
        plan to support more radio módules in the future.
      </p>
    </div>
  </section>

  <footer class="footer">
    My foot
  </footer>
</template>


<script>
// import logoUrl from './assets/logo.svg'
// document.getElementById('navbar-logo').src = logoUrl

</script>

<style lang="scss">
@import "./assets/main.scss";
</style>