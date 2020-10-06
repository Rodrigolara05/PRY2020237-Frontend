<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid >
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
             <v-card > 
        <v-card-title class="blue">Create Account</v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col class="align-center justify-space-between" cols="6">
              <v-row align="center" class="mr-0">

                <v-text-field
                  placeholder="Name"
                  v-model="firstName"
                ></v-text-field>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field
                prepend-icon="mdi-account-card-details-outline"
                v-model="lastName"
                placeholder="Last Name"
              ></v-text-field>
            </v-col>
            <!--   <v-col cols="6">
              <v-text-field placeholder="Job title"></v-text-field>
            </v-col>-->
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-mail"
                v-model="email"
                placeholder="Email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-lock"
                v-model="password"
                placeholder="Password"
              ></v-text-field>
            </v-col>
            <!--
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-text" placeholder="Notes"></v-text-field>
            </v-col>
            -->
          </v-row>
        </v-container>
        <v-card-actions>
          <!--   <v-btn text color="primary">More</v-btn> -->
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="save()">Save</v-btn>
        </v-card-actions>
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
  props: {
    source: String,
  },

  data: () => ({
    reg: false,
    dialog: false,
    dialoglogin: false,
    drawer: null,
  }),

  methods: {
    login() {
      //console.log("LOGUIN");
      //let me = this;
      axios
        .get("api/User")
        .then(function (response) {
          var email_value = document.getElementById("email").value;
          var pass_value = document.getElementById("password").value;
          var _flat = false;
          for (var i in response.data) {
            //console.log(response.data[i]["password"]);
            if (
              email_value == response.data[i]["email"] &&
              pass_value == response.data[i]["password"]
            ) {
              _flat = true;
              window.location.href = "/project";
            }
          }
          if (!_flat) alert("Usuario Incorrecto");
          //me.user = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      let me = this;
      axios
        .post("api/User", {
          firstName: me.firstName,
          lastName: me.lastName,
          email: me.email,
          password: me.password,
          token: "",
        })
        .then(function (response) {
          me.close();

          me.limpiar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    limpiar() {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";
      this.token = "";
    },
  },
};
</script>