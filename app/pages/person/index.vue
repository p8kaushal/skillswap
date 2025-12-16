<template>
  <div class="page">
  <nav>
    <div class="left"></div>
    <div class="right">
      <NuxtLink to="/person/create">Create Person</NuxtLink>
    </div>
  </nav>
    <h1>Person</h1>
    <main>
      <p v-if="pending">
        <span class="loading"></span>
        Loading Person...
      </p>
      <p v-else-if="error">Error while fetching Person 💔</p>
      <div v-else>
        <Person class="person" v-for="person in persons" :key="person.id" :person="person" />
      </div>
    </main>
  </div>
</template>

<script setup>
  let persons = ref([]);

  const { pending, error } = await useLazyAsyncData(async () => {
    const getFeed = await fetch(`/person`).then((res) =>
      res.json()
    )

    persons.value = getFeed;
  }, { server: false });
</script>

<style>
  .person {
    background: white;
    transition: box-shadow 0.1s ease-in;
  }

  .person:hover {
    box-shadow: 1px 1px 3px #aaa;
  }

  .person,
  .person {
    margin-top: 2rem;
  }
</style>
