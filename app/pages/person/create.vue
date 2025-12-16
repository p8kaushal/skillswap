<template>
  <div>
    <form @submit="createPerson">
      <h1>Create Person</h1>
      <input autoFocus placeholder="Name" type="text" v-model="name" />
      <textarea cols="50" placeholder="Description" rows="8" v-model="description" />
      <input autoFocus placeholder="Email" type="text" v-model="email" />
      <input autoFocus placeholder="URL" type="text" v-model="url" />
      <input autoFocus placeholder="Address" type="text" v-model="address" />
      <input autoFocus placeholder="Status" type="text" v-model="status" />
      <input autoFocus placeholder="Phone" type="text" v-model="phone" />
      <input :class="{'primary': name}" v-bind="{'disabled': !name}" type="submit" value="Create" />
      <NuxtLink class="back" to="/"> or Cancel </NuxtLink>
    </form>
  </div>
</template>
<script setup>
  const router = useRouter();

  let name = ref();
  let description = ref();
  let url = ref();
  let address = ref();
  let status = ref();
  let phone = ref();
  let email = ref();
  let isLoading = ref(false);

  const createPerson = async (e) => {
    e.preventDefault()
    const body = {
      name: name.value,
      description: description.value,
      url: url.value,
      address: address.value,
      status: "draft",
      phone: phone.value,
      email: email.value,
    }

    await fetch(`/person`, {
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
