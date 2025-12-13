<template>
  <div @click="navigate(skill)">
    <h2>{{ skill.trait }}</h2>
    <small v-if="skill.person">By {{ skill.person.name }}</small>
    <small v-else>Of unknown person</small>
    <p v-html="skill.content"></p>
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
    router.push(`/p/${skill.id}`);
  }
</script>

<style scoped>
  div {
    color: inherit;
    padding: 2rem;
  }
</style>
