<template>
  <div class="app-page">
    <div class="page-title">
      <h3>New Record</h3>
    </div>

    <loader v-if="loading" />
    <p v-else-if="!categories.length" class="center">
      You do not have any categories
      <router-link to="/categories">Add New Category </router-link>
    </p>
    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c of categories" :key="c.id" :value="c.id">{{
            c.title
          }}</option>
        </select>
        <label>Choose a Category</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Income</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Expense</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{
            invalid: $v.amount.$dirty && !$v.amount.minValue
          }"
        />
        <label for="amount">Amount</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
        >
          Minimum amount {{ $v.amount.$params.minValue.min }}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid: $v.description.$dirty && !$v.description.required
          }"
        />
        <label for="description">Description</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
        >
          Description must be provided
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Add
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "vuelidate/lib/validators";
import Loader from "../components/app/Loader.vue";
import { mapGetters } from "vuex";
export default {
  metaInfo() {
    return {
      title: this.$title("Menu_NewRecord")
    };
  },
  components: { Loader },
  name: "record",
  data: () => ({
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: "outcome",
    amount: 1,
    description: ""
  }),
  validations: {
    description: { required },
    amount: { minValue: minValue(10) }
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      M.updateTextFields();
      // eslint-disable-next-line no-undef
      this.select = M.FormSelect.init(this.$refs.select);
    }, 0);
  },
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }
      return this.info.amount >= this.amount;
    }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          });
          const amount =
            this.type === "income"
              ? this.info.amount + this.amount
              : this.info.amount - this.amount;
          await this.$store.dispatch("updateInfo", { amount });
          this.$message("You created a new record");
          this.$v.$reset();
          this.amount = 1;
          this.description = "";
        } catch (error) {
          console.log("something is wrong");
        }
      } else {
        this.$message("Sorry, You have not enought money");
      }
    }
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
};
</script>

<style></style>
