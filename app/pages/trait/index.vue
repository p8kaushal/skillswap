<template>
  <div class="page">
  <nav>
    <div class="left"></div>
    <div class="right">
      <NuxtLink to="/trait/create">Create Trait</NuxtLink>
    </div>
  </nav>
    <h1>Traits</h1>
    <main>
      <p v-if="pending">
        <span class="loading"></span>
        Loading Traits...
      </p>
      <p v-else-if="error">Error while fetching Traits 💔</p>
      <div v-else>
        <Trait class="trait" v-for="trait in traits" :key="trait.id" :trait="trait" />
      </div>
    </main>
  </div>
</template>

<script setup>
  let traits = ref([]);

  const { pending, error } = await useLazyAsyncData(async () => {
    const getFeed = await fetch(`/trait`).then((res) =>
      res.json()
    )

    traits.value = getFeed;
  }, { server: false });
</script>

<style>
  .trait {
    background: white;
    transition: box-shadow 0.1s ease-in;
  }

  .trait:hover {
    box-shadow: 1px 1px 3px #aaa;
  }

  .trait,
  .trait {
    margin-top: 2rem;
  }
</style>
