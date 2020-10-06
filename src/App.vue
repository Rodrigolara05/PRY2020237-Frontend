<template>
  <v-app id="inspire">
  <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      dark
    >
      <v-btn icon large @click="$router.push('/')">
        <v-avatar size="32px" item>
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          ></v-img>
        </v-avatar>
      </v-btn>

      <v-toolbar-title style="width: 300px" class="ml-0 pl-4" @click="$router.push('/')">
        <span class="hidden-sm-and-down">Wire2Web</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn @click="$router.push('/guide')" flat>Guia de Wireframes</v-btn>
        <v-btn @click="$router.push('/login')" flat>Iniciar Sesión</v-btn>
        <v-btn @click="$router.push('/register')" flat>Registrarse</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>