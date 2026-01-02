<script setup lang="ts">
import { ref } from 'vue'
import type { an } from 'vue-router/dist/router-CWoNjPRp.mjs'

const searchTerm = ref('')

// Lazy fetch so it runs only when we call execute()
// const {
//     data: persons,
//     pending,
//     error,
//     execute: runSearch
// } = useLazyFetch('/person/search', {
//     query: () => ({ trait: searchTerm.value }),
//     transform: (data: any[]) => data || [],
//     server: false
// })

const pending = ref(false)
const persons = ref<any[]>([])
const error = ref<string | null>(null)

const hasSearched = ref(false)

const handleSearch = async () => {
    console.log('Search term:', searchTerm.value)
    if (!searchTerm.value.trim()) {
        persons.value = []
        hasSearched.value = false
        return
    }

    pending.value = true
    error.value = null

    try {
        const data = await $fetch(`/person/search`, {
            method: 'GET',
            query: { trait: searchTerm.value },
        })
        persons.value = (data as any[]) || []
        hasSearched.value = true
    } catch (e: any) {
        error.value = e?.message ?? String(e)
    } finally {
        pending.value = false
    }
}

const clearSearch = () => {
    searchTerm.value = ''
    persons.value = []
    error.value = null
    hasSearched.value = false
}
</script>

<template>
    <div class="p-6 max-w-2xl mx-auto">
        <h1 class="text-2xl font-semibold mb-4">Search Persons by Trait</h1>

        <!-- Search box + button -->
        <div class="flex gap-2 mb-4">
            <input v-model="searchTerm" type="text" placeholder="Enter trait (e.g. coding)"
                class="border rounded px-3 py-2 flex-1" />
            <button class="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                :disabled="!searchTerm.trim() || pending" @click="handleSearch">
                {{ pending ? 'Searching…' : 'Search' }}
            </button>
            <button v-if="searchTerm" class="border px-3 py-2 rounded" @click="clearSearch">
                Clear
            </button>
        </div>

        <!-- Error -->
        <p v-if="error" class="text-red-600 mb-4">
            Error: {{ error }}
        </p>

        <!-- No results after a search -->
        <p v-else-if="hasSearched && (!persons || !persons.length) && !pending" class="text-gray-600">
            No persons found with trait "{{ searchTerm }}".
        </p>

        <!-- Results list -->
        <!-- <ul v-else-if="persons && persons.length" class="space-y-3">
            <li
                v-for="p in persons"
                :key="p.id"
                class="border rounded px-3 py-2"
            >
                <div class="font-medium">{{ p.name }}</div>
                <div class="text-sm text-blue-700">
                    Email: <span class="font-mono">{{ p.email }}</span>
                </div>
            </li>
        </ul> -->

        <!-- Results list -->
        <div v-else-if="persons && persons.length" class="space-y-3">
            <UCard v-for="p in persons" :key="p.id" class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <template #header>
                    <div class="flex items-center justify-between">
                        <p class="font-semibold">
                            {{ p.name }}
                        </p>
                        <UBadge color="primary" variant="soft">
                            Person
                        </UBadge>
                    </div>
                </template>

                <div class="space-y-1 text-sm">
                    <p>
                        <span class="opacity-75">Email:</span>
                        <span class="font-mono ms-1">
                            {{ p.email }}
                        </span>
                    </p>
                </div>
            </UCard>
        </div>

    </div>
</template>
