<script setup lang="ts">
const links = ref([
  {
    label: 'Sign up',
    color: 'neutral',
    to: '/signup',
  },
  {
    label: 'Dashboard',
    color: 'neutral',
    to: '/dashboard',
  },
  {
    label: 'Learn more',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right',
    to: '#about',
  }
])
const features = [
  'Swap skills or services seamlessly with a trusted community',
  'Post requests, respond to offers, and agree on fair swaps',
  'Built-in chat and scheduling tools to keep everything in one place',
]
</script>

<template>
  <UPageCTA
    title="Skill Swap"
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

  <section class="py-16" id="about">
    <UContainer>
      <div class="grid gap-10 lg:grid-cols-2 items-start">
        <!-- Left: About text -->
        <div class="space-y-6">
          <UBadge color="primary" variant="soft">
            About Skill Swap
          </UBadge>

          <h2 class="text-3xl font-semibold">
            Swap what you know for what you need
          </h2>

          <p class="text-gray-500 dark:text-gray-400">
            Skill Swap is a peer‑to‑peer platform that lets people exchange skills
            and services without traditional payments. Users match what they can
            offer with what they want to learn or get done.
          </p>

          <p class="text-gray-500 dark:text-gray-400">
            From design for development to language lessons for marketing help,
            Skill Swap makes it easy to create fair, transparent deals where both
            sides win.
          </p>
        </div>

        <!-- Right: Tutorial video -->
        <div class="space-y-4">
          <UCard>
            <h3 class="text-xl font-semibold mb-2">
              Watch how Skill Swap works
            </h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">
              This short walkthrough shows how to create your profile, find matches,
              and complete your first skill swap from start to finish.
            </p>

            <!-- Responsive video wrapper -->
            <div class="relative w-full overflow-hidden rounded-lg" style="padding-top: 56.25%;">
              <iframe
                class="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="Skill Swap tutorial"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
