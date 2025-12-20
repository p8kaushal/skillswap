<template>
  <div>
    <p v-if="pending">
      <span class="loading"></span>
    </p>
    <p v-else-if="error">Error while fetching feed 💔</p>
    <main v-else>
      <h1>{{ person.name }}</h1>
      <div v-html="person.description"></div>
      <div class="btn-wrapper">
        <button @click="destroy(person.id)">Delete</button>
        <NuxtLink :to="`/skill/create?id=${ person.id }`">Create Skill</NuxtLink>
      </div>
      <div>
        <Skill class="person" v-for="skill in skills" :key="skill.id" :skill="skill" />
      </div>
    </main>
  </div>
</template>

<script setup>
  let person = ref({});
  let skills = ref([]);
 
  const router = useRouter();
  const { params: { id } } = useRoute();
 
  const { pending, error, refresh } = await useLazyAsyncData('person', async () => {
    let getpersons = await fetch(`/person/${ id }`, {
      method: 'GET' 
    }).then(res => res.json());

    person.value = getpersons;
  }, { server: false }); 

  const { pending: pendingSkills, error: errorSkills } = await useLazyAsyncData(async () => {
    const getSkill = await fetch(`/skill?id=${id}`).then((res) =>
      res.json()
    )

    skills.value = getSkill;
    console.log(skills.value);
  }, { server: false });
 
  const destroy = async (id) => {  
    await fetch(`/person/${id}`, {
      method: 'DELETE',
    })
    .then(()=>{
      router.push('/person');
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
