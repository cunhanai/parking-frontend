<template>
  <BTableLite
    head-row-variant="info"
    :items="items"
    :fields="fields"
    :empty-text="emptyText"
    @rowClicked="$emit('row-clicked', $event)"
  />
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      },
      fields: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        emptyText: 'Nenhum registro encontrado!'
      }
    }
  }
</script>
