<script setup lang="ts">
console.log('person detail page')
import type { TableColumn, TableRow } from '@nuxt/ui'
import { success } from 'zod'

interface Skill {
  id: string
  name: string
  level: string
  status: 'Willing' | 'Not Willing'
  description: string
  createdAt: string
  updatedAt: string
}
let person = ref({});
let skills = ref([]);

const router = useRouter();
const { params: { id } } = useRoute();

const { pending, error, refresh } = await useLazyAsyncData('person', async () => {
  let getpersons = await fetch(`/person/${id}`, {
    method: 'GET'
  }).then(res => res.json());

  person.value = getpersons;
}, { server: false });

const destroy = async (id) => {
  await fetch(`/person/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      router.push('/person');
    })
    .catch((error) => {
      console.error(error);
    });
}

const columns: ColumnDef<Skill>[] = [
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
    accessorKey: 'trait.name',
    header: 'Trait Name',
    meta: {
      class: {
        th: 'text-left',
        td: 'text-left'
      }
    }
  },
  {
    accessorKey: 'level',
    header: 'Level',
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
        WILLING: 'text-success',
        'NOT WILLING': 'text-error'
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
function handleRowSelect(_event: Event, row: TableRow<Skill>) {
  navigateTo({
    name: 'skill-id',
    params: { id: row.original.id }
  })
}

</script>

<template>
  <div class="pt-6">
    <h1 class="text-center text-lg font-bold text-highlighted">
      Skill
    </h1>
  </div>
  <main>
    <p v-if="pending">
      <span class="loading"></span>
      Loading Skill...
    </p>
    <p v-else-if="error">Error while fetching Skill 💔</p>
    <div v-else>
      <UTable :loading="pending" loading-color="primary" loading-animation="carousel" :data="person.skills || []"
        :columns="columns" class="w-full" :ui="{
          wrapper: { base: 'max-h-[500px] overflow-y-auto' },
          th: { base: 'sticky top-0 bg-white dark:bg-gray-900 z-10' }
        }" @select="handleRowSelect" />
    </div>
    <div class="flex gap-3 mt-6">
      <UButton color="error" variant="solid" icon="i-heroicons-trash" @click="destroy(person.id)">
        Delete Person
      </UButton>
      <UButton color="success" variant="solid" icon="i-heroicons-plus" :to="`/skill/create?id=${person.id}`">
        Create Skill
      </UButton>
      <UButton color="primary" variant="ghost" icon="i-lucide-arrow-left" @click="router.back()">
        Back
      </UButton>
    </div>
  </main>
</template>
