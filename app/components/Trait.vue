<template>
  <div @click="navigate(trait)">
    <h2>{{ trait.name }}</h2>
    <small v-if="trait.description">By {{ trait.description }}</small>
    <small v-else>No description</small>
    <p v-html="trait.updatedAt"></p>
  </div>
</template>

<script setup>
  const router = useRouter();
  
  const { trait } = defineProps({
    trait: {
      type: Object,
      default: [],
    },
  })
  
  const navigate = (trait) => {
    router.push(`/p/${trait.id}`);
  }
</script>

<style scoped>
  div {
    color: inherit;
    padding: 2rem;
  }
</style>
