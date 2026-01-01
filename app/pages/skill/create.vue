<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

type PersonFormState = {
    name: string
    description: string
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | string
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
const route = useRoute();
let traitId = ref();
let description = ref();
let level = ref();
let status = ref();
const selectedTraitId = ref(undefined)

const { data: traits, pending: traitsStatus } = await useLazyAsyncData('traits', async () => {
    const res = await fetch('/trait').then((res) => res.json());
    return res;
}, { server: false });


async function onSubmit(event: FormSubmitEvent<PersonFormState>) {
    const body = {
        personId: route.query.id,  //getting personId from query param
        traitId: selectedTraitId.value, //@to-do ideally should be from a dropdown
        description: state.description,
        level: state.level,
        status: state.status,
    }
    try {
        await $fetch('/skill', {
            method: 'POST',
            body: body
        })

        toast.add?.({ title: 'Skill created', color: 'success' })
        router.push('/person') // or wherever your list page is
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
        <UForm @submit="onSubmit" :state="state" class="space-y-4">
            <UFormField label="Name" name="name">
                <USelect v-model="selectedTraitId" :items="traits || []" :loading="traitsStatus === 'pending'"
                    placeholder="Select trait" value-key="id" label-key="name"></USelect>
            </UFormField>

            <UFormField label="Level" name="level">
                <USelect v-model="state.level" :items="[
                    { label: 'Beginner', value: 'BEGINNER' },
                    { label: 'Intermediate', value: 'INTERMEDIATE' },
                    { label: 'Advanced', value: 'ADVANCED' }
                ]" placeholder="Beginner" />
            </UFormField>

            <UFormField label="Description" name="description">
                <UTextarea v-model="state.description" :rows="3" />
            </UFormField>

            <UFormField label="Status" name="status">
                <USelect v-model="state.status" :items="[
                    { label: 'Willing', value: 'WILLING' },
                    { label: 'Not willing', value: 'NOT WILLING' }
                ]" placeholder="Willing" />
            </UFormField>

            <div class="pt-2">
                <UButton type="submit" color="primary" block>
                    Submit
                </UButton>
                <UButton color="primary" variant="outline" block @click="router.back()">
                    Cancel
                </UButton>
            </div>
        </UForm>
    </UContainer>
</template>
