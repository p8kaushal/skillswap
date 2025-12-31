<script setup lang="ts">
console.log('trait detail page')
import type { TableColumn, TableRow } from '@nuxt/ui'
import { success } from 'zod'

interface Trait {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}  
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

<template>
  <UCard class="max-w-2xl">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <UButton 
            color="gray" 
            variant="ghost" 
            icon="i-lucide-arrow-left"
            @click="router.back()"
          >
            Back
          </UButton>
          <h1 class="text-2xl font-bold">{{ trait?.name }}</h1>
        </div>
        <UButton color="red" @click="destroy(trait.id)" icon="i-heroicons-trash">
          Delete Trait
        </UButton>
      </div>
    </template>

    <div class="space-y-4 p-6">
      <p class="text-lg">{{ trait.description }}</p>
      <p><strong>Created At:</strong> {{ new Date(trait.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) }}</p>
      <p><strong>Updated At:</strong> {{ new Date(trait.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) }}</p>
    </div>
  </UCard>
</template>