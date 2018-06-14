<template>
  <div id='app'>
    <nav>
      <div class='nav__logo'>
        <img src='img/impactful.svg'>
        <router-link to='/home'>Dashboard</router-link>
        <router-link to='/programs'>Programs</router-link>
        <router-link to='/settings'>Settings</router-link>
      </div>
  
      <div class='nav__right'>
        <input class='nav__right--search' placeholder='Search people or projects…' />
        <span class='nav__right--user'>
              <p>Kyle Ducharme</p>
              <img src='img/chevronLight.svg'>
            </span>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style lang='scss'>
  @import './styles/variables';
  @import './styles/mixins';
  @import './styles/global';
  nav {
    @include display-flex(flex-start, center, row);
    background-color: $colorPrimaryDark;
    height: 44px;
    width: 100vw;
    padding: 0 30px 0 30px;
    font-size: 14px;
    .nav__logo {
      @include display-flex(flex-start, center, row);
      width: 50%;
      img {
        margin-right: 60px;
        padding-top: 2px;
      }
      a {
        margin-right: 50px;
        letter-spacing: 0.7px;
        opacity: 0.5;
        color: white;
      }
    }
    .nav__right {
      @include display-flex(flex-end, center, row);
      width: 50%;
      .nav__right--search {
        height: 34px;
        width: 290px;
        padding-left: 15px;
        margin-right: 20px;
        color: white;
        font-size: 13px;
        background-color: #4c505f;
        border-radius: 3px;
        border: none;
      }
      .nav__right--search::placeholder {
        color: white;
        opacity: 0.5;
      }
      .nav__right--search:focus {
        cursor: text;
      }
    }
    .nav__right--user {
      @include display-flex(flex-start, center, row);
    }
    .nav__right--user>p {
      margin-right: 5px;
      color: white;
    }
    .router-link-active {
      font-weight: $weightMedium;
      opacity: 1 !important;
    }
  }
</style>
