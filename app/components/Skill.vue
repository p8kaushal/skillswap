<template>
  <div @click="navigate(skill)">
    <h1>{{ skill.trait.name }}</h1>
    <small>Level {{ skill.level }}</small>
    <small>Status {{ skill.status }}</small>
    <p v-html="skill.description"></p>
  </div>
</template>

<script setup>
  const router = useRouter();
  
  const { skill } = defineProps({
    skill: {
      type: Object,
      default: [],
    },
  })
  
  const navigate = (skill) => {
    router.push(`/skill/${skill.id}`);
  }
</script>

<style scoped>
  div {
    color: inherit;
    padding: 2rem;
  }
</style>
