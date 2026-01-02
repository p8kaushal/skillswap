<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
const { signIn } = useAuth()

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  email: '',
  password: ''
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  await signIn ({
    email: event.data.email,
    password: event.data.password,
    redirect: false,
  },
  ).then(({ error }) => {
    if (error) {
      toast.add({ title: 'Error', description: error, color: 'error' })
    } else {
      toast.add({ title: 'Success', description: 'Logged in successfully', color: 'success' })
      // Redirect to dashboard or home page
      const router = useRouter()
      router.push('/dashboard')
    }
  }
)
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>

