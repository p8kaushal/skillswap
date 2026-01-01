<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Person',
  to: '/person',
  icon: 'i-lucide-user',
  active: route.path.startsWith('/person')
}, {
  label: 'Trait',
  to: '/trait',
  icon: 'i-lucide-leaf',
  active: route.path.startsWith('/trait')
}, 
])
</script>

<template>
  <UHeader title="Skill Swap" to="/">
    <template>
      <UIcon name="i-lucide-lightbulb" class="size-5" />
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <UTooltip text="Signup" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          to="/signup"
          target="_self"
          icon="i-heroicons-user-plus"
          aria-label="GitHub"
        />
      </UTooltip>
      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/p8kaushal/skillswap"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>

