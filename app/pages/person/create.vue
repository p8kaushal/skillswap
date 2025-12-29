<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

type PersonFormState = {
  name: string
  description: string
  url: string
  address: string
  status: 'ACTIVE' | 'INACTIVE' | string
  phone: string
  email: string
}

const state = reactive<PersonFormState>({
  name: '',
  description: '',
  url: '',
  address: '',
  status: '',
  phone: '',
  email: ''
})

const toast = useToast() // if you use Nuxt UI toast; otherwise remove
const router = useRouter()

async function onSubmit (event: FormSubmitEvent<PersonFormState>) {
  try {
    await $fetch('/person', {
      method: 'POST',
      body: event.data
    })

    toast.add?.({ title: 'Person created', color: 'success' })
    router.push('/person') // or wherever your list page is
  } catch (error) {
    console.error(error)
    toast.add?.({ title: 'Failed to create person', color: 'error' })
  }
}
</script>

<template>
  <UContainer class="py-10 max-w-2xl">
    <h1 class="text-center text-lg font-semibold mb-6">
      Create person
    </h1>

    <UForm :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Name" name="name">
        <UInput v-model="state.name" />
      </UFormField>

      <UFormField label="Description" name="description">
        <UTextarea v-model="state.description" :rows="3" />
      </UFormField>

      <UFormField label="URL" name="url">
        <UInput v-model="state.url" placeholder="https://example.com" />
      </UFormField>

      <UFormField label="Address" name="address">
        <UInput v-model="state.address" />
      </UFormField>

      <UFormField label="Status" name="status">
        <USelect
          v-model="state.status"
          :items="[
            { label: 'Active', value: 'ACTIVE' },
            { label: 'Inactive', value: 'INACTIVE' }
          ]"
        />
      </UFormField>

      <UFormField label="Phone number" name="phone">
        <UInput v-model="state.phone" />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput v-model="state.email" type="email" />
      </UFormField>

      <div class="pt-2">
        <UButton type="submit" color="primary" block>
          Submit
        </UButton>
      </div>
    </UForm>
  </UContainer>
</template>
