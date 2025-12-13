<template>
  <div class="page">
    <h1>Traits</h1>
    <main>
      <p v-if="pending">
        <span class="loading"></span>
        Loading Traits...
      </p>
      <p v-else-if="error">Error while fetching Traits 💔</p>
      <div v-else>
        <Trait class="trait" v-for="trait in feed" :key="trait.id" :trait="trait" />
      </div>
    </main>
  </div>
</template>

<script setup>
  let feed = ref([]);

  const { pending, error } = await useLazyAsyncData(async () => {
    const getFeed = await fetch(`/trait`).then((res) =>
      res.json()
    )

    feed.value = getFeed;
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
