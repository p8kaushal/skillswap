<template>
  <div>
    <p v-if="pending">
      <span class="loading"></span>
    </p>
    <p v-else-if="error">Error while fetching feed 💔</p>
    <main v-else>
      <h2>{{ skill.trait.name }}</h2>
      <div v-html="skill.description"></div>
      <div class="btn-wrapper">
        <button @click="destroy(skill.id)">Delete</button>
      </div>
    </main>
  </div>
</template>

<script setup>
  let skill = ref({});
 
  const router = useRouter();
  const { params: { id } } = useRoute();
 
  const { pending, error, refresh } = await useLazyAsyncData('skill', async () => {
    let getskills = await fetch(`/skill/${ id }`, {
      method: 'GET' 
    }).then(res => res.json());

    skill.value = getskills;
  }, { server: false }); 
 
  const destroy = async (id) => {  
    await fetch(`/skill/${id}`, {
      method: 'DELETE',
    })
    .then(()=>{
      router.push('/skill');
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
