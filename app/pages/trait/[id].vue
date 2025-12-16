<template>
  <div>
    <p v-if="pending">
      <span class="loading"></span>
    </p>
    <p v-else-if="error">Error while fetching feed 💔</p>
    <main v-else>
      <h2>{{ trait.name }}</h2>
      <div v-html="trait.description"></div>
      <div class="btn-wrapper">
        <button @click="destroy(trait.id)">Delete</button>
      </div>
    </main>
  </div>
</template>

<script setup>
  let trait = ref({});
 
  const router = useRouter();
  const { params: { id } } = useRoute();
 
  const { pending, error, refresh } = await useLazyAsyncData('trait', async () => {
    let getTraits = await fetch(`/trait/${ id }`, {
      method: 'GET' 
    }).then(res => res.json());

    trait.value = getTraits;
  }, { server: false }); 
 
  const destroy = async (id) => {  
    await fetch(`/trait/${id}`, {
      method: 'DELETE',
    })
    .then(()=>{
      router.push('/trait');
    })
    .catch((error)=>{
      console.error(error);
    });
  }

</script>

<style scoped>
  .page {
    background: white;
    padding: 2rem;
  }

  .actions {
    margin-top: 2rem;
  }

  button {
    margin: 0.5rem;
    background: #ececec;
    border: 1px black solid;
    border-radius: 0.125rem;
    padding: 1rem 2rem;
  }

  button button {
    margin-left: 1rem;
  }

  .btn-wrapper {
    display: flex;
    justify-content: center;
    width: fit-content;
    margin-top: 1rem;
  }
</style>
