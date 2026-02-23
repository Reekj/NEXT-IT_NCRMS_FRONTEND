<template>
    <StateCommandLayout :user="user">
      <div class="mb-6 text-[18px] font-semibold text-[#111827]">LAGOS</div>
  
      <Motion
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
        class="rounded-2xl border border-black/10 bg-white shadow-[0_8px_24px_rgba(16,24,40,0.08)]"
      >
        <!-- Header -->
        <div class="px-6 py-5 sm:px-8">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h1 class="text-[20px] font-semibold text-black">Divisional Coordinators</h1>
            </div>
  
            <Motion
              as="button"
              type="button"
              :whileHover="{ scale: 1.02 }"
              :whileTap="{ scale: 0.98 }"
              class="inline-flex h-10 items-center gap-2 rounded-lg px-4 text-[13px] font-medium text-white
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                     shadow-sm hover:opacity-95 active:opacity-90"
              @click="goNew"
            >
              <UserPlus class="h-4 w-4 text-white" />
              New
            </Motion>
          </div>
        </div>
  
        <!-- Toolbar -->
        <div class="border-t border-black/10 px-6 py-4 sm:px-8">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="relative">
                <Search class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                <input
                  v-model="q"
                  type="text"
                  placeholder="Search ..."
                  class="h-10 w-[260px] rounded-xl border border-black/10 bg-white pl-10 pr-4 text-[13px]
                         outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <button
                type="button"
                class="grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-white shadow-sm hover:bg-[#F9FAFB]"
                @click="refresh"
                aria-label="Refresh"
              >
                <RefreshCcw class="h-4 w-4 text-black/60" />
              </button>
            </div>
          </div>
        </div>
  
        <!-- Table -->
        <div class="overflow-x-auto border-t border-black/10">
          <table class="w-full min-w-[980px] text-left">
            <thead class="bg-[#FAFAFA]">
              <tr class="text-[13px] font-medium text-black/60">
                <th class="px-6 py-4">Coordinator ID</th>
                <th class="px-6 py-4">Name</th>
                <th class="px-6 py-4">Assigned Division</th>
                <th class="px-6 py-4">Email</th>
                <th class="px-6 py-4">Phone No.</th>
                <th class="px-6 py-4">Date Created</th>
                <th class="px-6 py-4">Status</th>
                <th class="px-6 py-4">Actions</th>
              </tr>
            </thead>
  
            <tbody>
              <tr
                v-for="row in filtered"
                :key="row.id"
                class="border-t border-black/10 text-[13px] text-black/70"
              >
                <td class="px-6 py-4">{{ row.coordinatorId }}</td>
                <td class="px-6 py-4">{{ row.fullName }}</td>
                <td class="px-6 py-4">{{ row.assignedDivision }}</td>
                <td class="px-6 py-4">{{ row.email }}</td>
                <td class="px-6 py-4">{{ row.phone }}</td>
                <td class="px-6 py-4">{{ formatDate(row.dateCreated) }}</td>
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-medium"
                    :class="row.status === 'Active'
                      ? 'border-green-300 bg-green-50 text-green-700'
                      : 'border-slate-300 bg-slate-50 text-slate-600'"
                  >
                    <span
                      class="h-2 w-2 rounded-full"
                      :class="row.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'"
                    />
                    {{ row.status }}
                  </span>
                </td>
  
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <button
                      type="button"
                      class="grid h-9 w-9 place-items-center rounded-lg hover:bg-black/5 active:bg-black/10"
                      @click="goView(row)"
                      aria-label="View"
                    >
                      <Eye class="h-4 w-4 text-black/60" />
                    </button>
  
                    <button
                      type="button"
                      class="grid h-9 w-9 place-items-center rounded-lg hover:bg-black/5 active:bg-black/10"
                      @click="goEdit(row)"
                      aria-label="Edit"
                    >
                      <Pencil class="h-4 w-4 text-black/60" />
                    </button>
  
                    <button
                      type="button"
                      class="grid h-9 w-9 place-items-center rounded-lg hover:bg-black/5 active:bg-black/10"
                      @click="removeRow(row)"
                      aria-label="Delete"
                    >
                      <Trash2 class="h-4 w-4 text-black/60" />
                    </button>
                  </div>
                </td>
              </tr>
  
              <tr v-if="!filtered.length">
                <td colspan="8" class="px-6 py-10 text-center text-[13px] text-black/45">
                  No records found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Pagination (UI only like your other tables) -->
        <div class="px-6 py-5 sm:px-8">
          <div class="flex items-center justify-center">
            <div class="inline-flex overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
              <button class="px-4 py-2 text-[13px] text-black/60 hover:bg-black/5">‹ Previous</button>
              <button class="px-4 py-2 text-[13px] bg-black/5">1</button>
              <button class="px-4 py-2 text-[13px] hover:bg-black/5">2</button>
              <button class="px-4 py-2 text-[13px] hover:bg-black/5">3</button>
              <button class="px-4 py-2 text-[13px] hover:bg-black/5">4</button>
              <button class="px-4 py-2 text-[13px] text-black/60 hover:bg-black/5">…</button>
              <button class="px-4 py-2 text-[13px] hover:bg-black/5">13</button>
              <button class="px-4 py-2 text-[13px] hover:bg-black/5">14</button>
              <button class="px-4 py-2 text-[13px] text-black/60 hover:bg-black/5">Next ›</button>
            </div>
          </div>
        </div>
      </Motion>
    </StateCommandLayout>
  </template>
  
  <script setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue"
import { useRouter } from "vue-router"
import { Motion } from "@motionone/vue"
import { Search, RefreshCcw, Eye, Pencil, Trash2, UserPlus } from "lucide-vue-next"
import StateCommandLayout from "../layout/Layout.vue"

const router = useRouter()

const user = ref({
  name: "Helena John",
  role: "State Command",
  avatarUrl: "",
})

/** ===============================
 * LOCAL STORAGE (inline, no _storage file)
 * =============================== */
const DIV_COORDS_KEY = "ncrms_sc_divisional_coordinators"
const DIV_COORDS_EVENT = "ncrms-sc-divisional-coordinators-updated"

function safeRead() {
  try {
    const raw = localStorage.getItem(DIV_COORDS_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function safeWrite(next) {
  localStorage.setItem(DIV_COORDS_KEY, JSON.stringify(Array.isArray(next) ? next : []))
  window.dispatchEvent(new CustomEvent(DIV_COORDS_EVENT))
}

function seedIfEmpty() {
  const existing = safeRead()
  if (existing.length) return

  safeWrite([
    {
      id: "dc-001",
      coordinatorId: "DC-001",
      fullName: "Micheal Jackson",
      assignedDivision: "Forensic Services",
      email: "micheal@gmail.com",
      phone: "07022001010",
      dateCreated: "2025-01-12",
      status: "Active",
      zone: "Zone 1",
    },
    {
      id: "dc-002",
      coordinatorId: "DC-002",
      fullName: "Micheal Jackson",
      assignedDivision: "Intelligence",
      email: "micheal@gmail.com",
      phone: "07022001010",
      dateCreated: "2025-01-12",
      status: "Inactive",
      zone: "Zone 1",
    },
  ])
}

/** ===============================
 * PAGE STATE
 * =============================== */
const q = ref("")
const rows = ref([])

function refresh() {
  rows.value = safeRead()
}

function goNew() {
  router.push({ path: "/state-command/divisional-coordinators/new" })
}
function goView(row) {
  router.push({ path: `/state-command/divisional-coordinators/${row.id}` })
}
function goEdit(row) {
  router.push({ path: `/state-command/divisional-coordinators/${row.id}/edit` })
}

function removeRow(row) {
  const next = safeRead().filter((x) => x.id !== row.id)
  safeWrite(next)
}

const filtered = computed(() => {
  const term = String(q.value || "").trim().toLowerCase()
  if (!term) return rows.value

  return rows.value.filter((r) => {
    const hay = [
      r.coordinatorId,
      r.fullName,
      r.assignedDivision,
      r.email,
      r.phone,
      r.status,
      r.zone,
    ]
      .join(" ")
      .toLowerCase()
    return hay.includes(term)
  })
})

function formatDate(iso) {
  if (!iso) return "-"
  const [y, m, d] = String(iso).split("-")
  if (!y || !m || !d) return iso
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  return `${Number(d)} ${months[Number(m) - 1]} ${y}`
}

function onUpdated() {
  refresh()
}

onMounted(() => {
  seedIfEmpty()
  refresh()
  window.addEventListener(DIV_COORDS_EVENT, onUpdated)
})

onBeforeUnmount(() => {
  window.removeEventListener(DIV_COORDS_EVENT, onUpdated)
})
</script>
