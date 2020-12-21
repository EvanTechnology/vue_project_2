<template>
  <div class="app-page">
    <div class="page-title">
      <h3>Expenses</h3>
      <h4>{{ info.amount | currency("AUD") }}</h4>
    </div>

    <Loader v-if="loading" />
    <p v-else-if="!categories.length" class="center">
      You do not have any categories
      <router-link to="/categories">Add New Category </router-link>
    </p>
    <section v-else>
      <div v-for="c of categories" :key="c.id">
        <p>
          <strong>{{ c.title }}:</strong>
          {{ c.spend | currency }} из {{ c.limit | currency }}
        </p>
        <div class="progress" v-tooltip="c.tooltip">
          <div
            class="determinate"
            :class="[c.progressColor]"
            :style="{ width: c.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import currencyFilter from "@/filters/currency.filter";
export default {
  metaInfo() {
    return {
      title: this.$title("Menu_Planning")
    };
  },
  name: "planning",
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(["info"])
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.categories = categories.map(c => {
      const spend = records
        .filter(r => r.categoryId === c.id)
        .filter(r => r.type === "outcome")
        .reduce((total, record) => {
          return (total += +record.amount);
        }, 0);
      const percent = (100 * spend) / c.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellow" : "red";
      const tooltipValue = c.limit - spend;
      const tooltip = `${
        tooltipValue < 0 ? "You overspend:" : "Left:"
      } ${currencyFilter(Math.abs(tooltipValue))}`;
      return {
        ...c,
        progressPercent,
        progressColor,
        spend,
        tooltip
      };
    });

    this.loading = false;
  }
};
</script>

<style></style>
