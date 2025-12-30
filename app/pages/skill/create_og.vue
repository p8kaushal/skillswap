<template>
  <div>
    <form @submit="createSkill">
      <h1>Create Skill</h1>
      Trait <select v-model="traitId">
        <option v-for="trait in traits" :key="trait.id" :value="trait.id">
          {{ trait.name }}
        </option>
      </select>
      <textarea cols="50" placeholder="Description" rows="8" v-model="description" />
      <input autoFocus placeholder="Level" type="text" v-model="level" />
      <input autoFocus placeholder="Status" type="text" v-model="status" />
      <input :class="{'primary': traitId}" v-bind="{'disabled': !traitId}" type="submit" value="Create" />
      <NuxtLink class="back" to="/"> or Cancel </NuxtLink>
    </form>
  </div>
</template>
<script setup>
  const router = useRouter();
  const route = useRoute();

  let traits = ref([]);
  let traitId = ref();
  let description = ref();
  let level = ref();
  let status = ref();
  let isLoading = ref(false);

    const { pending: pendingTraits, error: errorTraits } = await useLazyAsyncData(async () => {
        const getTraits = await fetch(`/trait`).then((res) =>
        res.json()
        )
    
        traits.value = getTraits;
        console.log(traits.value);
    }, { server: false });

  const createSkill = async (e) => {
    e.preventDefault()
    const body = {
        personId: route.query.id,  //getting personId from query param
      traitId: traitId.value, //@to-do ideally should be from a dropdown
      description: description.value,
      level: level.value,
      status: status.value,
    }
    
    await fetch(`/skill`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    .then(()=>{
      router.push({ name: 'person' })
    })
    .catch((error)=>{
      console.error(error);
    })
    }
</script>
<style scoped>
  .page {
    background: white;
    padding: 3rem;
    display: flex;
    justify-description: center;
    align-items: center;
  }

  input[type='text'],
  textarea {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
    border-radius: 0.25rem;
    border: 0.125rem solid rgba(0, 0, 0, 0.2);
  }

  input[type='submit'] {
    background: #ececec;
    border: 0;
    padding: 1rem 2rem;
  }

  .back {
    margin-left: 1rem;
  }

  span {
    color: red;
  }

  .primary {
    background: blue !important;
    color: white;
  }
</style>
