<template>
  <UCard class="max-w-2xl">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <UButton 
            color="gray" 
            variant="ghost" 
            icon="i-lucide-arrow-left"
            :to="`/person/${skill?.person?.id}`"
          >
            Back
          </UButton>
          <h1 class="text-2xl font-bold">{{ skill?.trait?.name }}</h1>
        </div>
        <UButton color="red" @click="destroy(skill.id)" icon="i-heroicons-trash">
          Delete Skill
        </UButton>
      </div>
    </template>

    <div class="space-y-4 p-6">
      <p class="text-lg">{{ skill.description }}</p>
      <p><strong>Level:</strong> {{ skill.level }}</p>
      <p><strong>Status:</strong> {{ skill.status }}</p>
    </div>
  </UCard>
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
      router.push('/person/' + skill.value.person.id);
    })
    .catch((error)=>{
      console.error(error);
    });
  }

</script>
