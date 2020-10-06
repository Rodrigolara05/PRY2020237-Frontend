<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-form
                ref="form" v-model="valid" lazy-validation
              >
              
                <v-toolbar color="secondary" dark flat>
                  <v-toolbar-title>Login </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-text-field
                  prepend-icon="mdi-account"
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  id="email"
                  required
                ></v-text-field>
                <v-text-field
                   prepend-icon="mdi-lock"
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  type= "password"
                  id="password"
                  required
                ></v-text-field>



                </v-card-text>
              
              <v-card-actions>
                <v-spacer></v-spacer>
                 <v-btn
                  :disabled="!valid"
                  color="secondary"
                  class="mr-4"
                  @click="validate"
                >
                  Ingresar
                </v-btn>
              </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: true,
    password: "",
    passwordRules: [(v) => !!v || "La contraseña es requerida"],
    email: "",
    emailRules: [
      (v) => !!v || "El e-mail es requerido",
      (v) => /.+@.+\..+/.test(v) || "Ingrese un email con el formato correcto",
    ],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
      var email_value = document.getElementById("email").value;
      var pass_value = document.getElementById("password").value;
      if (email_value == "" || pass_value == "") {
        return false;
      }
      axios
        .post("api/User/login", {
          email: email_value,
          password: pass_value,
        })
        .then(function (response) {
          if (response.status == 200) {
            localStorage.setItem("sesion", JSON.stringify(response.data));
            window.location.href = "/project";
          } else {
            alert("Usuario Incorrecto");
          }
        })
        .catch(function (error) {
          console.log(error);
          alert("No hay servicio. Intente nuevamente en unos segundos.");
        });
    },
  },
};
</script>