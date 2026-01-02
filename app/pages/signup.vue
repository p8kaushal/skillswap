<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import { fa } from 'zod/locales'

const toast = useToast()

const fields: AuthFormField[] = [
{
  name: 'name',
  type: 'text',
  label: 'Name',
  placeholder: 'Enter your name',
  required: true
},
{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
  required: false
}, {
  name: 'phone',
  label: 'Phone',
  type: 'text',
  placeholder: 'Enter your phone number',
  required: false
},
{
  name: 'address',
  label: 'Address',
  type: 'text',
  placeholder: 'Enter your address',
  required: false
},
{
  name: 'url',
  label: 'URL',
  type: 'text',
  placeholder: 'Enter your URL',
  required: false
},
{
  name: 'description',
  label: 'Description',
  type: 'text',
  placeholder: 'Enter your description',
  required: false
},
{
  name: 'status',
  label: 'Status',
  type: 'text',
  placeholder: 'Enter your status',
  required: true
},
{
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true
},
]

// const providers = [{
//   label: 'Google',
//   icon: 'i-simple-icons-google',
//   onClick: () => {
//     toast.add({ title: 'Google', description: 'Login with Google' })
//   }
// }, {
//   label: 'GitHub',
//   icon: 'i-simple-icons-github',
//   onClick: () => {
//     toast.add({ title: 'GitHub', description: 'Login with GitHub' })
//   }
// }]

const schema = z.object({
  name: z.string('Name is required').min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
  phone: z.string().optional(),
  address: z.string().optional(),
  url: z.string().optional(),
  description: z.string().optional(),
  status: z.string('Status is required').min(2, 'Status must be at least 2 characters')

})

type Schema = z.output<typeof schema>

const router = useRouter()  

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
  try {
    await $fetch('/api/auth/signup', {
      method: 'POST',
      body: payload.data
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
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Sign Up"
        description="Create a new person to get started"
        icon="i-lucide-user"
        :fields="fields"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>

