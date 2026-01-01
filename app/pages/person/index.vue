<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui'

interface Person {
  id: string
  name: string
  email: string
  phone: number
  address: string
  url: string
  description: string
  createdAt: string
  updatedAt: string
  status: 'ACTIVE' | 'INACTIVE'
}  

  let persons = ref([]);

  const { pending, error } = await useLazyAsyncData(async () => {
    const getFeed = await fetch(`/person`).then((res) =>
      res.json()
    )

    persons.value = getFeed;
  }, { server: false });

const columns: ColumnDef<Person>[] = [
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
    accessorKey: 'email',
    header: 'Email',
    meta: {
      class: {
        th: 'text-left',
        td: 'text-left'
      }
    }
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    meta: {
      class: {
        th: 'text-left',
        td: 'text-left'
      }
    }
  },
  {
    accessorKey: 'address',
    header: 'Address',
    meta: {
      class: {
        th: 'text-left',
        td: 'text-left'
      }
    }
  },
  {
    accessorKey: 'url',
    header: 'URL',
    meta: {
      class: {
        th: 'text-left',
        td: 'text-left'
      }
    },
    cell: ({ row }) => {
      const url = row.getValue('url') as string | null

      if (!url) {
        return h(
          'span',
          { class: 'text-gray-400' },
          '—'
        )
      }

      return h(
        'a',
        {
          href: url,
          target: '_blank',
          rel: 'noopener noreferrer',
          class: 'text-primary underline decoration-dotted break-all'
        },
        url
      )
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    meta: {
      class: {
        th: 'text-center',
        td: 'text-center'
      }
    },
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const colorMap = {
        ACTIVE: 'text-success',
        INACTIVE: 'text-error'
      }
      return h(
        'span',
        {
          class: `font-semibold capitalize ${colorMap[status as keyof typeof colorMap]}`
        },
        status
      )
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
function handleRowSelect(_event: Event, row: TableRow<Person>) {
  navigateTo({
    name: 'person-id',
    params: { id: row.original.id }
  })
}

const router = useRouter();

</script>

<template>
  <div class="pt-6">
    <h1 class="text-center text-lg font-bold text-highlighted">
      Person
    </h1>
  </div>
  <main>
    <p v-if="pending">
      <span class="loading"></span>
      Loading Person...
    </p>
    <p v-else-if="error">Error while fetching Person 💔</p>
    <div v-else>
      <UTable
        :loading="pending"
        loading-color="primary"
        loading-animation="carousel"
        :data="persons || []"
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
    <NuxtLink to="/person/create">
      <UButton
        color="primary"
        variant="soft"
        size="md"
        icon="i-heroicons-plus"
        class="rounded-full px-5 shadow-sm hover:shadow-md transition-shadow"
      >
        Add new person
      </UButton>
      <UButton color="primary" variant="ghost" icon="i-lucide-arrow-left" @click="router.back()">
        Back
      </UButton>
    </NuxtLink>
  </div>
</template>
