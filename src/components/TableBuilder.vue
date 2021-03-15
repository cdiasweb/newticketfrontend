<template>
  <table v-if="tableData">
    <tr>
      <th v-for="column in tableData.columns" v-bind:key="column">
        {{ column }}
      </th>
    </tr>
    <tr v-for="row in tableData.rows" v-bind:key="row[0] + generateKey()">
      <td v-for="cell in row" v-bind:key="cell">
        <TableAction v-if="cell.data" :actionData="cell"></TableAction>
        <div v-else>
          {{ cell }}
        </div>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, onUpdated, toRefs } from "vue";
import TableAction from "./TableAction.vue";

export default defineComponent({
  components: { TableAction },
  props: {
    tableData: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    function generateKey() {
      return Math.random().toString(36).substring(7);
    }

    function renderCell(cell: any) {
      if (cell.action) {
        return "";
      } else {
        return cell;
      }
    }

    return {
      generateKey,
      renderCell,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  background-color: white;
  border-radius: 5px;
}

tr:first {
  border-radius: 5px;
}

td,
th {
  border-bottom: 1px solid gray;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
