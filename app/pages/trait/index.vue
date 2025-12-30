<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui'

interface Trait {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}  

  let traits = ref([]);

  const { pending, error } = await useLazyAsyncData(async () => {
    const getFeed = await fetch(`/trait`).then((res) =>
      res.json()
    )

    traits.value = getFeed;
  }, { server: false });

const columns: ColumnDef<Trait>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    meta: {
      class: {
        th: 'text-center font-semibold',
        td: 'text-center font-mono'
      }
    }
  },
  {
    accessorKey: 'name',
    header: 'Name',
    meta: {
      class: {
        th: 'text-left',
        td: 'text-left'
      }
    }
  },  
  {
    accessorKey: 'description',
    header: 'Description',
    meta: {
      class: {
        th: 'text-left',
        td: 'text-left'
      }
    }
  }, 
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      return new Date(row.getValue('createdAt')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => {
      return new Date(row.getValue('updatedAt')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  },  
]  

// handle row click via @select event
function handleRowSelect(_event: Event, row: TableRow<Trait>) {
  navigateTo({
    name: 'trait-id',
    params: { id: row.original.id }
  })
}

</script>

<template>
  <div class="pt-6">
    <h1 class="text-center text-lg font-bold text-highlighted">
      Trait
    </h1>
  </div>
  <main>
    <p v-if="pending">
      <span class="loading"></span>
      Loading Trait...
    </p>
    <p v-else-if="error">Error while fetching Trait 💔</p>
    <div v-else>
      <UTable
        :loading="pending"
        loading-color="primary"
        loading-animation="carousel"
        :data="traits || []"
        :columns="columns"
        class="w-full"
        :ui="{
          wrapper: { base: 'max-h-[500px] overflow-y-auto' },
          th: { base: 'sticky top-0 bg-white dark:bg-gray-900 z-10' }
        }"
        @select="handleRowSelect"
      />
    </div>
  </main>
  <div class="pt-4 flex justify-center">
    <NuxtLink to="/trait/create">
      <UButton
        color="primary"
        variant="soft"
        size="md"
        icon="i-heroicons-plus"
        class="rounded-full px-5 shadow-sm hover:shadow-md transition-shadow"
      >
        Add new trait
      </UButton>
        <UButton color="gray" variant="ghost" icon="i-lucide-arrow-left" :to="`/`">
        Back
      </UButton>
    </NuxtLink>
  </div>
</template>
