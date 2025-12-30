<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

type TraitFormState = {
    name: string
    description: string
}

const state = reactive<TraitFormState>({
    name: '',
    description: '',
})

const toast = useToast() // if you use Nuxt UI toast; otherwise remove
const router = useRouter()

async function onSubmit(event: FormSubmitEvent<TraitFormState>) {
    try {
        await $fetch('/trait', {
            method: 'POST',
            body: event.data
        })

        toast.add?.({ title: 'Trait created', color: 'success' })
        router.push('/trait') // or wherever your list page is
    } catch (error) {
        console.error(error)
        toast.add?.({ title: 'Failed to create trait', color: 'error' })
    }
}
</script>

<template>
    <UContainer class="py-10 max-w-2xl">
        <h1 class="text-center text-lg font-semibold mb-6">
            Create trait
        </h1>

        <UForm :state="state" class="space-y-4" @submit="onSubmit">
            <UFormField label="Name" name="name">
                <UInput v-model="state.name" />
            </UFormField>





            <UFormField label="Description" name="description">
                <UTextarea v-model="state.description" :rows="3" />
            </UFormField>

            <div class="pt-2">
                <UButton type="submit" color="primary" block>
                    Submit
                </UButton>
                <UButton color="primary" variant="outline" block to="/trait">
                    Cancel
                </UButton>
            </div>
        </UForm>
    </UContainer>
</template>
