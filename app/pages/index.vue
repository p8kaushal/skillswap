<script setup lang="ts">
const links = ref([
  {
    label: 'Sign up',
    color: 'neutral',
    to: '/signup',
  },
  {
    label: 'Learn more',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
])
</script>

<template>
  <UPageCTA
    title="Swill Swap"
    description="Learn new skills by teaching your own skills to others."
    orientation="horizontal"
    :links="links"
  >
    <img
      src="https://picsum.photos/640/728"
      width="320"
      height="364"
      alt="Illustration"
      class="w-full rounded-lg"
    />
  </UPageCTA>
</template>
