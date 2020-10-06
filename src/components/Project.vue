<template>
  <v-app id="inspire">
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Wire2Web</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      dark
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title
          >{{ this.firstName }} {{ this.lastName }}</v-list-item-title
        >

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="px-2" @click="$router.push('/project')">
        <v-list-item-icon>
          <v-icon>mdi-briefcase</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Proyectos</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>

      <v-list-item class="px-2" @click="cerrarSesion">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-title>Cerrar sesión</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
    </v-navigation-drawer>

    <v-container class="grey lighten-5">
      <v-row>
        <v-col :key="create">
          <v-card class="pa-2" style="text-align: center" width="250px">
            <template>
              <v-dialog v-model="createDialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    >Nuevo</v-btn
                  >
                </template>

                <v-card>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="12">
                            <v-text-field
                              v-model="name"
                              :rules="nameRules"
                              label="Nombre de proyecto"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="12">
                            <v-text-field
                              v-model="description"
                              label="Descripcion (opcional)"
                            ></v-text-field>
                          </v-col>
                          <!--  <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          :rules="[(v) => !!v || 'Create es requerido']"
                          v-model="createDate"
                          label="createDate"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          :rules="[(v) => !!v || 'modify es requerido']"
                          v-model="modifyDate"
                          label="modifyDate"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          :rules="[(v) => !!v || 'userId es requerido']"
                          v-model="userId"
                          label="userId"
                        ></v-text-field>
                      </v-col> -->
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1"  @click="close"
                        >Cancel</v-btn
                      >
                      <v-btn
                        :disabled="!valid"
                        color="secondary"
                        class="mr-4"
                        @click="save"
                      >
                        Guardar
                      </v-btn>
                      <!-- <v-btn color="blue darken-1" text @click="save()">Save</v-btn> -->
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </template>
          </v-card>
        </v-col>

        <template v-for="(n, item) in projects.length">
          <v-col :key="n">
            <v-card class="pa-2" style="text-align: center" width="250px">
              <img src="http://placehold.it/130?text=No-image" />
              <p>
                {{ projects[item]["name"] }}
              </p>
              <p>
                <v-btn color="blue darken-1" v-on:click="noEvent">Detail</v-btn>
              </p>
              <p>
                <v-btn
                  color="red darken-1"
                  v-on:click="Delete(projects[item]['id'])"
                  >Delete</v-btn
                >
              </p>
            </v-card>
          </v-col>

          <v-responsive
            v-if="(n + 1) % 4 === 0"
            :key="`width-${n}`"
            width="100%"
          ></v-responsive>
        </template>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    drawer: true,
    projects: [],
    dialog: false,
    headers: [
      { text: "Opciones", value: "opciones", sortable: false },
      { text: "name", value: "name", sortable: false },
      { text: "description", value: "description", sortable: false },
      { text: "createDate", value: "createDate" },
      { text: "modifyDate", value: "modifyDate" },
      /*         { text: "userId", value: "userId" } */
    ],

    nameRules: [(v) => !!v || "El nombre del proyecto es requerido"],

    desserts: [],
    search: "",
    editedIndex: -1,

    //Model
    id: "",
    name: "",
    description: "",
    createDate: "",
    modifyDate: "",
    userId: "",
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Proyecto" : "Actualizar Proyecto";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.listar();
  },

  methods: {
    listar() {
      let me = this;
      axios
        .get("api/Project")
        .then(function (response) {
          //console.log(response);
          me.projects = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    editItem(item) {
      this.id = item.id;
      this.name = item.name;
      this.description = item.description;
      this.createDate = item.createDate;
      this.modifyDate = item.modifyDate;
      this.userId = item.userId;

      this.editedIndex = 1;
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    Delete(item) {
      if (confirm("¿Estas seguro de eliminar este Proyecto?")) {
        let me = this;
        axios
          .delete("api/Project/" + item)
          .then(function (response) {
            me.listar();
          })
          .catch(function (error) {
            alert("Hubo un error al eliminar un Proyecto");
          });
      }
    },

    close() {
        let me = this;
      this.createDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
         me.listar();
          me.limpiar();
    },

    /*  close() {
      this.dialog = false;
    }, */
    save() {
      this.$refs.form.validate();
    let me = this;
      if (me.name == "") {
        return false;
      }
      axios
        .post("api/Project", {
          /*  userId: 1,
                    name: 'web 4',
                    description: 'web cuatro',
                    createDate: '2020-09-26',
                    modifyDate: '2020-09-26'  */

          userId: 1,
          name: me.name,
          description: me.description,
          createDate: "2020-09-26",
          modifyDate: "2020-09-26",
        })
        .then(function (response) {
         me.close();
     
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    limpiar() {
      this.userId = "";
      this.name = "";
      this.description = "";
      //this.createDate = '';
      //this.modifyDate = '';
    },

    cerrarSesion() {
      if (localStorage.getItem("sesion") != null) {
        localStorage.removeItem("sesion");
      }
      window.location.href = "/";
    },
  },
};
</script>
