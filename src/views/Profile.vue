<template>
  <div class="app-page">
    <div class="page-title">
      <h3>{{ "ProfileTitle" | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />
        <label for="description">{{ "Name" | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
          >{{ "Message_EnterName" | localize }}
        </small>
      </div>
      <div class="switch">
        <label>
          Russian
          <input type="checkbox" v-model="isAuLocale" />
          <span class="lever"></span>
          English
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{ "Refresh" | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
//import localeFilter from "@/filters/localize.filter";

export default {
  metaInfo() {
    return {
      title: this.$title("ProfileTitle")
    };
  },
  data: () => ({
    name: "",
    isAuLocale: true
  }),
  computed: {
    ...mapGetters(["info"])
  },
  mounted() {
    this.name = this.info.name;
    this.isAuLocale = this.info.locale === "en-AU";
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    }, 0);
  },
  validations: {
    name: { required }
  },
  methods: {
    ...mapActions(["updateInfo"]),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isAuLocale ? "en-AU" : "ru-RU"
        });
        //await this.$store.dispatch("login", formData);
        //this.$router.push("/");
      } catch (e) {
        //console.log(e);
      }
    }
  }
};
</script>

<style>
.switch {
  margin-bottom: 2rem;
}
</style>
