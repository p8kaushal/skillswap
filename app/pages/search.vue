<script setup lang="ts">
import { get } from 'http'
import { ref } from 'vue'
import type { an } from 'vue-router/dist/router-CWoNjPRp.mjs'
import person from '~~/server/routes/person'
const { data, getSession } = useAuth()


const toast = useToast() // if you use Nuxt UI toast; otherwise remove
const router = useRouter()

definePageMeta({
    auth: true,           // Redirect unauthenticated to /login
    middleware: 'auth' as any   // Custom role check
})

onMounted(() => {
    getSession()
})

const searchTerm = ref('')

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

const user = computed(() => data.value?.user)

async function createMatch(personB: any) {
    let skillA = null
    //find skillAId from personB based on searchTerm
    personB.skills.forEach((s: any) => {
        if (s?.trait?.name?.toLowerCase() === searchTerm.value.trim().toLowerCase()) {
            console.log('Matched skill for personB:', s)
            skillA = s
        }
    })
    const body = {
        personAId: user.value?.id,
        personBId: personB.id,
        skillAId: skillA?.id || null,
        skillBId: null,
        status: 'INVITE', //should only be invite, accept/decline handled elsewhere
    }
    console.log('Creating match with body:', body)
    try {
        await $fetch('/match', {
            method: 'POST',
            body: body
        })

        toast.add?.({ title: 'Match invite created', color: 'success' })
        router.push('/dashboard') // or wherever your list page is
    } catch (error) {
        console.error(error)
        toast.add?.({ title: 'Failed to create match invite', color: 'error' })
    }
}

    let invitationSent = ref<any[]>([]);

const getInvitationsSent = async () => {
    const res = await fetch(`/match?idA=${user.value?.id}&status=INVITE`);
    invitationSent.value = await res.json();

    return invitationSent;
}

    let invitationReceived = ref<any[]>([]);

const getInvitationsReceived = async () => {
    const res = await fetch(`/match?idB=${user.value?.id}&status=INVITE`);
    invitationReceived.value = await res.json();

    return invitationReceived;
}

    let acceptedInvitations = ref<any[]>([]);

const getAcceptedInvitations = async () => {
    const res = await fetch(`/match?idB=${user.value?.id}&status=ACCEPTED`);
    acceptedInvitations.value = await res.json();

    return acceptedInvitations;
}

const acceptMatch = async (matchId: number) => {
    console.log("Accepting match with ID:", matchId);
    try {
        await $fetch('/match/update', {
            method: 'POST',
            body: {
                id: matchId,
                status: 'ACCEPTED',
            }
        })

        toast.add?.({ title: 'Match invite accepted', color: 'success' })
        router.push('/dashboard') // or wherever your list page is
    } catch (error) {
        console.error(error)
        toast.add?.({ title: 'Failed to accept match invite', color: 'error' })
    }
}

const declineMatch = async (matchId: number) => {
    try {
        await $fetch('/match/update', {
            method: 'POST',
            body: {
                id: matchId,
                status: 'DECLINED',
            }
        })

        toast.add?.({ title: 'Match invite declined', color: 'success' })
        router.push('/dashboard') // or wherever your list page is
    } catch (error) {
        console.error(error)
        toast.add?.({ title: 'Failed to decline match invite', color: 'error' })
    }
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

                <div>
                    <UButton color="primary" variant="outline" block @click="createMatch(p)">
                        Send Match Request
                    </UButton>
                </div>
            </UCard>
        </div>

    </div>
    <div>
        <div>
        <UButton color="primary" variant="outline" block @click="getInvitationsSent()">
            Invitations sent
        </UButton>
                <!-- Sent list -->
        <div v-if="invitationSent && invitationSent.length" class="space-y-3">
            <UCard v-for="s in invitationSent" :key="s.id" class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <template #header>
                    <div class="flex items-center justify-between">
                        <p class="font-semibold">
                            {{ s.personB?.name }}
                        </p>
                    </div>
                </template>

                <div class="space-y-1 text-sm">
                    <p>
                        <span class="opacity-75">Trait Name:</span>
                        <span class="font-mono ms-1">
                            {{ s.skillA?.trait?.name }}
                        </span>
                    </p>
                </div>
            </UCard>
        </div>

        </div>
        <div>
        <UButton color="primary" variant="outline" block @click="getInvitationsReceived()">
            Invitations received
        </UButton>
                <div v-if="invitationReceived && invitationReceived.length" class="space-y-3">
            <UCard v-for="s in invitationReceived" :key="s.id" class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <template #header>
                    <div class="flex items-center justify-between">
                        <p class="font-semibold">
                            {{ s.personA?.name }}
                        </p>
                    </div>
                </template>

                <div class="space-y-1 text-sm">
                    <p>
                        <span class="opacity-75">Trait Name:</span>
                        <span class="font-mono ms-1">
                            {{ s.skillA?.trait?.name }}
                        </span>
                    </p>
                </div>
                <div>
                    <UButton color="primary" variant="outline" block @click="acceptMatch(s.id)">
                        Accept
                    </UButton>
                    <UButton color="error" variant="outline" block @click="declineMatch(s.id)">
                        Decline
                    </UButton>
                </div>
            </UCard>
        </div>
        </div>
                <div>
        <UButton color="primary" variant="outline" block @click="getAcceptedInvitations()">
            Accepted Invitations
        </UButton>
                <div v-if="acceptedInvitations && acceptedInvitations.length" class="space-y-3">
            <UCard v-for="s in acceptedInvitations" :key="s.id" class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <template #header>
                    <div class="flex items-center justify-between">
                        <p class="font-semibold">
                            {{ s.personB?.name }}
                        </p>
                    </div>
                </template>

                <div class="space-y-1 text-sm">
                    <p>
                        <span class="opacity-75">Trait Name:</span>
                        <span class="font-mono ms-1">
                            {{ s.skillA?.trait?.name }}
                        </span>
                    </p>
                </div>
                <div>
                    <p>
                        Title: {{ s.sessions[0]?.title }}
                    </p>
                    <p>
                        Session Scheduled at: {{ new Date(s.sessions[0]?.scheduledAt).toLocaleString() }}
                    </p>
                    <p>
                        Meeting URL: <a :href="s.sessions[0]?.url" target="_blank" class="text-blue-600 underline">{{ s.sessions[0]?.url }}</a>
                    </p>
                    <p>
                        Status: {{ s.sessions[0]?.status }}
                    </p>
                    <p>
                        Duration: {{ s.sessions[0]?.duration }} minutes
                    </p>
                </div>
            </UCard>
        </div>
        </div>
    </div>
</template>
