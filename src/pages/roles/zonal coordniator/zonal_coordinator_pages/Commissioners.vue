<!-- src/pages/roles/zonal coordniator/zonal_coordinator_pages/Commissioners.vue -->
<template>
    <ZonalCoordinatorLayout>
      <div class="mb-6 text-[18px] font-semibold text-[#111827]">South-West</div>
  
      <Motion
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
        class="rounded-2xl border border-black/10 bg-white shadow-[0_8px_24px_rgba(16,24,40,0.08)]"
      >
        <div class="px-6 pt-7 sm:px-8">
          <h1 class="text-[22px] font-semibold text-[#111827]">Commissioners</h1>
        </div>
  
        <!-- Toolbar -->
        <div class="flex flex-col gap-4 px-6 pb-6 pt-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div class="flex items-center gap-3">
            <div class="relative w-full max-w-[320px]">
              <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />
              <input
                v-model="q"
                type="text"
                placeholder="Search ..."
                class="h-10 w-full rounded-xl border border-black/10 bg-white pl-9 pr-3 text-[13px] text-[#111827]
                       outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
              />
            </div>
  
            <Motion
              as="button"
              type="button"
              :whileHover="{ scale: 1.02 }"
              :whileTap="{ scale: 0.98 }"
              @click="onRefresh"
              class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white shadow-sm hover:bg-[#F9FAFB]"
              aria-label="Refresh"
              title="Refresh"
            >
              <RefreshCw class="h-4 w-4 text-[#111827]" />
            </Motion>
          </div>
  
          <Motion
            as="button"
            type="button"
            :whileHover="{ scale: 1.02 }"
            :whileTap="{ scale: 0.98 }"
            @click="goNew"
            class="inline-flex h-10 items-center gap-2 rounded-xl px-5 text-[13px] font-semibold text-white
                   bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)] shadow-sm"
          >
            <UserPlus class="h-4 w-4" />
            New
          </Motion>
        </div>
  
        <!-- Desktop table -->
        <div class="hidden overflow-x-auto px-6 pb-6 sm:px-8 lg:block">
          <table class="w-full table-fixed border border-[#D9D9D9] text-left">
            <thead class="bg-[#FAFAFA]">
              <tr>
                <th
                  v-for="(h, idx) in headers"
                  :key="h"
                  class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] font-medium text-[#475467]"
                  :class="idx === headers.length - 1 ? 'border-r-0' : ''"
                >
                  {{ h }}
                </th>
              </tr>
            </thead>
  
            <tbody>
              <tr v-for="row in filteredRows" :key="row.id" class="bg-white hover:bg-[#FBFBFD]">
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  {{ row.commissionerId }}
                </td>
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  {{ row.fullName }}
                </td>
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  {{ row.assignedState }}
                </td>
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  {{ row.email }}
                </td>
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  {{ row.phone }}
                </td>
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  {{ formatDate(row.dateCreated) }}
                </td>
  
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  <span
                    class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-medium"
                    :class="row.status === 'Active'
                      ? 'border-[#16A34A] bg-[#ECFDF3] text-[#16A34A]'
                      : 'border-[#98A2B3] bg-[#F2F4F7] text-[#667085]'"
                  >
                    <span class="h-2 w-2 rounded-full" :class="row.status === 'Active' ? 'bg-[#16A34A]' : 'bg-[#98A2B3]'" />
                    {{ row.status }}
                  </span>
                </td>
  
                <td class="border-b border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  <div class="flex items-center gap-4">
                    <button
                      class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#111827] hover:bg-[#F2F4F7]"
                      @click="goView(row.id)"
                      title="View"
                      aria-label="View"
                    >
                      <Eye class="h-4 w-4" />
                    </button>
  
                    <button
                      class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#111827] hover:bg-[#F2F4F7]"
                      @click="goEdit(row.id)"
                      title="Edit"
                      aria-label="Edit"
                    >
                      <Pencil class="h-4 w-4" />
                    </button>
  
                    <button
                      class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#111827] hover:bg-[#F2F4F7]"
                      @click="onDelete(row.id)"
                      title="Delete"
                      aria-label="Delete"
                    >
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
  
              <tr v-if="filteredRows.length === 0">
                <td :colspan="headers.length" class="px-6 py-10 text-center text-[13px] text-[#667085]">
                  No commissioners found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Mobile cards -->
        <div class="space-y-4 px-6 pb-6 sm:px-8 lg:hidden">
          <Motion
            v-for="row in filteredRows"
            :key="row.id"
            :initial="{ opacity: 0, y: 8 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.25 }"
            class="rounded-2xl border border-black/10 bg-white p-4 shadow-sm"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="text-[14px] font-semibold text-[#111827]">{{ row.fullName }}</div>
                <div class="mt-1 text-[12px] text-[#667085]">{{ row.commissionerId }} • {{ row.assignedState }}</div>
              </div>
  
              <span
                class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-medium"
                :class="row.status === 'Active'
                  ? 'border-[#16A34A] bg-[#ECFDF3] text-[#16A34A]'
                  : 'border-[#98A2B3] bg-[#F2F4F7] text-[#667085]'"
              >
                <span class="h-2 w-2 rounded-full" :class="row.status === 'Active' ? 'bg-[#16A34A]' : 'bg-[#98A2B3]'" />
                {{ row.status }}
              </span>
            </div>
  
            <div class="mt-4 grid grid-cols-2 gap-3 text-[12px]">
              <div class="col-span-2">
                <div class="text-[#667085]">Email</div>
                <div class="font-medium text-[#111827] break-all">{{ row.email }}</div>
              </div>
  
              <div class="col-span-2">
                <div class="text-[#667085]">Phone No.</div>
                <div class="font-medium text-[#111827]">{{ row.phone }}</div>
              </div>
  
              <div>
                <div class="text-[#667085]">Date Created</div>
                <div class="font-medium text-[#111827]">{{ formatDate(row.dateCreated) }}</div>
              </div>
  
              <div>
                <div class="text-[#667085]">Assigned State</div>
                <div class="font-medium text-[#111827]">{{ row.assignedState }}</div>
              </div>
            </div>
  
            <div class="mt-4 flex flex-wrap items-center gap-3">
              <Motion
                as="button"
                type="button"
                :whileTap="{ scale: 0.98 }"
                class="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-[12px] font-semibold text-[#111827] shadow-sm hover:bg-[#F9FAFB]"
                @click="goView(row.id)"
              >
                <Eye class="h-4 w-4" /> View
              </Motion>
  
              <Motion
                as="button"
                type="button"
                :whileTap="{ scale: 0.98 }"
                class="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-[12px] font-semibold text-[#111827] shadow-sm hover:bg-[#F9FAFB]"
                @click="goEdit(row.id)"
              >
                <Pencil class="h-4 w-4" /> Edit
              </Motion>
  
              <Motion
                as="button"
                type="button"
                :whileTap="{ scale: 0.98 }"
                class="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2 text-[12px] font-semibold text-[#111827] shadow-sm hover:bg-[#F9FAFB]"
                @click="onDelete(row.id)"
              >
                <Trash2 class="h-4 w-4" /> Delete
              </Motion>
            </div>
          </Motion>
  
          <div v-if="filteredRows.length === 0" class="rounded-2xl border border-black/10 bg-white p-6 text-center text-[13px] text-[#667085]">
            No commissioners found.
          </div>
        </div>
  
        <!-- Pagination (static UI) -->
        <div class="px-6 pb-7 sm:px-8">
          <div class="flex justify-center">
            <div class="inline-flex overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
              <button class="px-4 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">‹ Previous</button>
              <button class="px-3 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">1</button>
              <button class="bg-[#F2F4F7] px-3 py-2 text-[13px] text-[#111827]">2</button>
              <button class="px-3 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">3</button>
              <button class="px-3 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">4</button>
              <span class="px-3 py-2 text-[13px] text-[#667085]">…</span>
              <button class="px-3 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">13</button>
              <button class="px-3 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">14</button>
              <button class="px-4 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">Next ›</button>
            </div>
          </div>
        </div>
      </Motion>
    </ZonalCoordinatorLayout>
  </template>
  
  <script setup>
  import { computed, onMounted, ref } from "vue"
  import { useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { Eye, Pencil, RefreshCw, Search, Trash2, UserPlus } from "lucide-vue-next"
  import ZonalCoordinatorLayout from "../layout/Layout.vue"
  
  const STORAGE_KEY = "zc_commissioners"
  
  const router = useRouter()
  const q = ref("")
  const rows = ref([])
  
  const headers = [
    "Commissioner ID",
    "Name",
    "Assigned State",
    "Email",
    "Phone No.",
    "Date Created",
    "Status",
    "Actions",
  ]
  
  function seedIfEmpty() {
    const existing = safeRead()
    if (existing.length) return
    const seed = [
      {
        id: "CO-001",
        commissionerId: "CO-001",
        fullName: "Micheal Jackson",
        zone: "South-West",
        assignedState: "Lagos",
        email: "micheal@gmail.com",
        phone: "07022001010",
        status: "Active",
        dateCreated: "2025-01-12",
      },
      { id: "CO-002", commissionerId: "CO-002", fullName: "Micheal Jackson", zone: "South-West", assignedState: "Lagos", email: "micheal@gmail.com", phone: "07022001010", status: "Inactive", dateCreated: "2025-01-12" },
      { id: "CO-003", commissionerId: "CO-003", fullName: "Micheal Jackson", zone: "South-West", assignedState: "Lagos", email: "micheal@gmail.com", phone: "07022001010", status: "Active", dateCreated: "2025-01-12" },
    ]
    safeWrite(seed)
  }
  
  function safeRead() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  
  function safeWrite(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }
  
  function load() {
    rows.value = safeRead()
  }
  
  onMounted(() => {
    seedIfEmpty()
    load()
  })
  
  const filteredRows = computed(() => {
    const s = q.value.trim().toLowerCase()
    if (!s) return rows.value
    return rows.value.filter((r) => {
      return (
        String(r.commissionerId || "").toLowerCase().includes(s) ||
        String(r.fullName || "").toLowerCase().includes(s) ||
        String(r.assignedState || "").toLowerCase().includes(s) ||
        String(r.email || "").toLowerCase().includes(s) ||
        String(r.phone || "").toLowerCase().includes(s) ||
        String(r.status || "").toLowerCase().includes(s) ||
        formatDate(String(r.dateCreated || "")).toLowerCase().includes(s)
      )
    })
  })
  
  function formatDate(iso) {
    // expects YYYY-MM-DD
    if (!iso || typeof iso !== "string") return ""
    const parts = iso.split("-")
    if (parts.length !== 3) return iso
    const [y, m, d] = parts.map((x) => parseInt(x, 10))
    if (!y || !m || !d) return iso
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    return `${d} ${months[m - 1]} ${y}`
  }
  
  function onRefresh() {
    q.value = ""
    load()
  }
  
  function goNew() {
    router.push({ name: "zc-commissioners-create" })
  }
  function goView(id) {
    router.push({ name: "zc-commissioners-view", params: { id } })
  }
  function goEdit(id) {
    router.push({ name: "zc-commissioners-edit", params: { id } })
  }
  function onDelete(id) {
    const next = rows.value.filter((r) => r.id !== id)
    rows.value = next
    safeWrite(next)
  }
  </script>
  