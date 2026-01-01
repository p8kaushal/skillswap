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
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
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

