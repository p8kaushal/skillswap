<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

type PersonFormState = {
    name: string
    description: string
    level: string
    status: 'WILLING' | 'NOT WILLING' | string
}

const state = reactive<PersonFormState>({
    name: '',
    description: '',
    level: '',
    status: ''
})

const toast = useToast() // if you use Nuxt UI toast; otherwise remove
const router = useRouter()
let traits = ref([]);
let traitId = ref();
let description = ref();
let level = ref();
let status = ref();

async function onSubmit(event: FormSubmitEvent<PersonFormState>) {
    try {
        await $fetch('/skill', {
            method: 'POST',
            body: event.data
        })

        toast.add?.({ title: 'Skill created', color: 'success' })
        router.push('/skill') // or wherever your list page is
    } catch (error) {
        console.error(error)
        toast.add?.({ title: 'Failed to create skill', color: 'error' })
    }
}
</script>

<template>
    <UContainer class="py-10 max-w-2xl">
        <h1 class="text-center text-lg font-semibold mb-6">
            Create skill
        </h1>
        <UForm :state="state" class="space-y-4" @submit="onSubmit">
            <!-- @to-do: dropdown to select trait -->
            <UFormGroup label="Trait" required>
                <USelect v-model="traitId" :options="traits" value-attribute="id" option-attribute="name"
                    placeholder="Select a trait" searchable />
            </UFormGroup>

            <UFormField label="Description" name="description">
                <UTextarea v-model="state.description" :rows="3" />
            </UFormField>

            <UFormField label="Level" name="level">
                <UInput v-model="state.level" placeholder="Beginner" />
            </UFormField>

            <UFormField label="Status" name="status">
                <USelect v-model="state.status" :items="[
                    { label: 'Willing', value: 'WILLING' },
                    { label: 'Not willing', value: 'NOT WILLING' }
                ]" />
            </UFormField>

            <div class="pt-2">
                <UButton type="submit" color="primary" block>
                    Submit
                </UButton>
                <UButton color="primary" variant="outline" block @click="router.back()">
                    Cancel (@to-do: it should go to person detail page)
                </UButton>
            </div>
        </UForm>
    </UContainer>
</template>
