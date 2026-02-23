<template>
    <StateCommandLayout>
      <div class="mb-6 text-[18px] font-semibold text-[#111827]">Lagos</div>
  
      <Motion
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
        class="rounded-2xl border border-black/10 bg-white shadow-[0_8px_24px_rgba(16,24,40,0.08)]"
      >
        <!-- Title -->
        <div class="px-6 pt-7 sm:px-8">
          <h1 class="text-[22px] font-semibold text-[#111827]">Division Units</h1>
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
            Add New Unit
          </Motion>
        </div>
  
        <!-- Table -->
        <div class="overflow-x-auto px-6 pb-6 sm:px-8">
          <table class="w-full table-fixed border border-[#D9D9D9] text-left">
            <thead class="bg-[#FAFAFA]">
              <tr>
                <th class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] font-medium text-[#475467]">Unit Name</th>
                <th class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] font-medium text-[#475467]">Unit Type</th>
                <th class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] font-medium text-[#475467]">Total Officers</th>
                <th class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] font-medium text-[#475467]">Unit Head</th>
                <th class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] font-medium text-[#475467]">Date Created</th>
                <th class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] font-medium text-[#475467]">Status</th>
                <th class="border-b border-[#D9D9D9] px-5 py-4 text-[13px] font-medium text-[#475467]">Actions</th>
              </tr>
            </thead>
  
            <tbody>
              <tr v-for="row in filteredRows" :key="row.id" class="bg-white hover:bg-[#FBFBFD]">
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  {{ row.unitName }}
                </td>
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  {{ row.unitType }}
                </td>
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  {{ row.totalOfficers }}
                </td>
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  {{ row.unitHead }}
                </td>
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4 text-[13px] text-[#475467]">
                  {{ row.dateCreatedLabel }}
                </td>
  
                <td class="border-b border-r border-[#D9D9D9] px-5 py-4">
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
  
                <td class="border-b border-[#D9D9D9] px-5 py-4">
                  <div class="flex items-center gap-4">
                    <button class="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F2F4F7]" @click="goView(row.id)">
                      <Eye class="h-4 w-4" />
                    </button>
                    <button class="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F2F4F7]" @click="goEdit(row.id)">
                      <Pencil class="h-4 w-4" />
                    </button>
                    <button class="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#F2F4F7]" @click="onDelete(row.id)">
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
  
              <tr v-if="filteredRows.length === 0">
                <td colspan="7" class="px-6 py-10 text-center text-[13px] text-[#667085]">
                  No division units found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <!-- Pagination UI -->
        <div class="px-6 pb-7 sm:px-8">
          <div class="flex justify-center">
            <div class="inline-flex overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
              <button class="px-4 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">‹ Previous</button>
              <button class="px-3 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">1</button>
              <button class="bg-[#F2F4F7] px-3 py-2 text-[13px] text-[#111827]">2</button>
              <button class="px-3 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">3</button>
              <span class="px-3 py-2 text-[13px] text-[#667085]">…</span>
              <button class="px-3 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">14</button>
              <button class="px-4 py-2 text-[13px] text-[#111827] hover:bg-[#F9FAFB]">Next ›</button>
            </div>
          </div>
        </div>
      </Motion>
    </StateCommandLayout>
  </template>
  
  <script setup>
  import { computed, ref } from "vue"
  import { useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { Eye, Pencil, RefreshCw, Search, Trash2, UserPlus } from "lucide-vue-next"
  import StateCommandLayout from "../layout/Layout.vue"
  
  const router = useRouter()
  const q = ref("")
  
  const STORAGE_KEY = "ncrms_sc_division_units"
  const STORAGE_EVENT = "ncrms-sc-division-units-updated"
  
  function formatDateLabel(dateISO) {
    if (!dateISO) return ""
    try {
      const d = new Date(dateISO)
      const day = String(d.getDate()).padStart(2, "0")
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
      return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`
    } catch {
      return dateISO
    }
  }
  
  function seedIfEmpty() {
    const existing = localStorage.getItem(STORAGE_KEY)
    if (existing) return
    const seeded = [
      { id: "DU-001", unitName: "Intelligence Unit", unitType: "Intelligence", totalOfficers: "16", unitHead: "Micheal Jackson", dateCreated: "2025-01-12", status: "Active" },
      { id: "DU-002", unitName: "Forensics Unit", unitType: "Forensics", totalOfficers: "16", unitHead: "Micheal Jackson", dateCreated: "2025-01-12", status: "Inactive" },
      { id: "DU-003", unitName: "Operations Unit", unitType: "Operations", totalOfficers: "4", unitHead: "Micheal Jackson", dateCreated: "2025-01-12", status: "Active" },
      { id: "DU-004", unitName: "Administration Units", unitType: "Administration", totalOfficers: "4", unitHead: "Micheal Jackson", dateCreated: "2025-01-12", status: "Active" },
    ]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
  }
  
  function readUnits() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  
  function writeUnits(next) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT))
  }
  
  seedIfEmpty()
  
  const rows = ref(readUnits())
  
  window.addEventListener(STORAGE_EVENT, () => {
    rows.value = readUnits()
  })
  
  const enrichedRows = computed(() =>
    rows.value.map((r) => ({
      ...r,
      dateCreatedLabel: r.dateCreatedLabel || formatDateLabel(r.dateCreated),
    }))
  )
  
  const filteredRows = computed(() => {
    const s = q.value.trim().toLowerCase()
    if (!s) return enrichedRows.value
    return enrichedRows.value.filter((r) =>
      [r.unitName, r.unitType, r.totalOfficers, r.unitHead, r.dateCreatedLabel, r.status]
        .map((x) => String(x || "").toLowerCase())
        .some((v) => v.includes(s))
    )
  })
  
  function onRefresh() {
    q.value = ""
    rows.value = readUnits()
  }
  
  function goNew() {
    router.push({ name: "sc-division-units-create" })
  }
  function goView(id) {
    router.push({ name: "sc-division-units-view", params: { id } })
  }
  function goEdit(id) {
    router.push({ name: "sc-division-units-edit", params: { id } })
  }
  function onDelete(id) {
    const next = readUnits().filter((r) => r.id !== id)
    writeUnits(next)
    rows.value = next
  }
  </script>
  