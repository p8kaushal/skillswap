<template>
  <div>
    <form @submit="createTrait">
      <h1>Create Trait</h1>
      <input autoFocus placeholder="Name" type="text" v-model="name" />
      <textarea cols="50" placeholder="Description" rows="8" v-model="description" />
      <input :class="{'primary': name}" v-bind="{'disabled': !name}" type="submit" value="Create" />
      <NuxtLink class="back" to="/"> or Cancel </NuxtLink>
    </form>
  </div>
</template>
<script setup>
  const router = useRouter();

  let name = ref();
  let description = ref();
  let isLoading = ref(false);

  const createTrait = async (e) => {
    e.preventDefault()
    const body = {
      name: name.value,
      description: description.value,
    }

    await fetch(`/trait`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    .then(()=>{
      router.push({ name: 'trait' })
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
