<template>
  <div @click="navigate(person)">
    <h2>{{ person.name }}</h2>
    <small v-if="person.description">{{ person.description }}</small>
    <small v-else>No description</small>
    <small v-if="person.email">{{ person.email }}</small>
    <small v-else>No email</small>
    <small v-if="person.phone">{{ person.phone }}</small>
    <small v-else>No phone</small>
    <small v-if="person.url">{{ person.url }}</small>
    <small v-else>No url</small>
    <small v-if="person.status">{{ person.status }}</small>
    <small v-else>No status</small>
    <p v-html="person.updatedAt"></p>
  </div>
</template>

<script setup>
  const router = useRouter();
  
  const { person } = defineProps({
    person: {
      type: Object,
      default: [],
    },
  })
  
  const navigate = (person) => {
    router.push(`/person/${person.id}`);
  }
</script>

<style scoped>
  div {
    color: inherit;
    padding: 2rem;
  }
</style>
