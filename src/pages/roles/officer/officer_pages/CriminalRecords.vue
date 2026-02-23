<!-- src/pages/roles/officer/officer_pages/CriminalRecords.vue -->
<template>
    <OfficerLayout :user="user">
      <Motion
        tag="div"
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
        class="space-y-6"
      >
        <h1 class="text-[22px] font-semibold text-black">Criminal Records</h1>
  
        <section class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
          <!-- Toolbar -->
          <div class="flex items-center justify-between gap-4 px-6 py-5 sm:px-8">
            <div class="flex items-center gap-3">
              <div class="relative">
                <Search class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />
                <input
                  v-model.trim="q"
                  type="text"
                  placeholder="Search ..."
                  class="h-10 w-[260px] rounded-xl border border-black/10 bg-white pl-10 pr-4 text-[13px]
                         text-black/70 outline-none placeholder:text-black/35
                         transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <button
                type="button"
                class="grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-white shadow-sm
                       hover:bg-black/[0.02] active:bg-black/[0.04]"
                @click="refresh"
                aria-label="Refresh"
              >
                <RotateCw class="h-4 w-4 text-black/55" />
              </button>
            </div>
  
            <Motion
              tag="button"
              type="button"
              class="inline-flex h-10 items-center gap-2 rounded-lg px-4 text-[13px] font-semibold text-white
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                     shadow-sm hover:opacity-95 active:opacity-90"
              :whileHover="{ scale: 1.02 }"
              :whileTap="{ scale: 0.98 }"
              @click="goNew"
            >
              <UserPlus class="h-4 w-4 text-white" />
              New
            </Motion>
          </div>
  
          <div class="border-t border-black/10" />
  
          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="min-w-[1200px] w-full border-collapse text-left">
              <thead>
                <tr class="bg-[#FAFAFA]">
                  <th class="thCell">Criminal Record ID</th>
                  <th class="thCell">Full Name</th>
                  <th class="thCell">Crime Type</th>
                  <th class="thCell">Zone</th>
                  <th class="thCell">State Command</th>
                  <th class="thCell">Division</th>
                  <th class="thCell">LGA</th>
                  <th class="thCell">Date Reported</th>
                  <th class="thCell">Status</th>
                  <th class="thCell thCell--last">Action</th>
                </tr>
              </thead>
  
              <tbody>
                <tr v-for="row in filtered" :key="row.id" class="hover:bg-black/[0.01]">
                  <td class="tdCell">{{ row.criminalRecordId }}</td>
                  <td class="tdCell">{{ row.fullName }}</td>
                  <td class="tdCell">{{ row.crimeType }}</td>
                  <td class="tdCell">{{ row.zone }}</td>
                  <td class="tdCell">{{ row.stateCommand }}</td>
                  <td class="tdCell">{{ row.division }}</td>
                  <td class="tdCell">{{ row.lga }}</td>
                  <td class="tdCell">{{ row.dateReported }}</td>
                  <td class="tdCell">{{ row.status }}</td>
  
                  <td class="tdCell tdCell--last">
                    <div class="flex items-center justify-center gap-2">
                      <!-- View -->
                      <button
                        type="button"
                        class="grid h-9 w-9 place-items-center rounded-lg hover:bg-black/5 active:bg-black/10"
                        @click="goView(row)"
                        aria-label="View"
                      >
                        <Eye class="h-4 w-4 text-black/55" />
                      </button>
  
                      <!-- Edit -->
                      <button
                        type="button"
                        class="grid h-9 w-9 place-items-center rounded-lg hover:bg-black/5 active:bg-black/10"
                        @click="goEdit(row)"
                        aria-label="Edit"
                      >
                        <Pencil class="h-4 w-4 text-black/55" />
                      </button>
  
                      <!-- Delete -->
                      <button
                        type="button"
                        class="grid h-9 w-9 place-items-center rounded-lg hover:bg-red-50 active:bg-red-100"
                        @click="removeRow(row)"
                        aria-label="Delete"
                      >
                        <Trash2 class="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
  
                <tr v-if="filtered.length === 0">
                  <td colspan="10" class="tdCell tdCell--last text-center text-black/50">
                    No records found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Pagination (UI only like Figma) -->
          <div class="px-6 py-6 sm:px-8">
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
        </section>
      </Motion>
    </OfficerLayout>
  </template>
  
  <script setup>
  import { computed, onMounted, onBeforeUnmount, ref } from "vue"
  import { useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { Search, RotateCw, Eye, UserPlus, Pencil, Trash2 } from "lucide-vue-next"
  import OfficerLayout from "../layout/Layout.vue"
  
  const router = useRouter()
  
  const user = ref({
    name: "James King",
    role: "Officer",
    avatarUrl: "",
  })
  
  /** ===============================
   * LOCAL STORAGE (inline)
   * =============================== */
  const CR_KEY = "ncrms_officer_criminal_records"
  const CR_EVENT = "ncrms-officer-criminal-records-updated"
  
  function safeRead() {
    try {
      const raw = localStorage.getItem(CR_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  
  function safeWrite(next) {
    localStorage.setItem(CR_KEY, JSON.stringify(Array.isArray(next) ? next : []))
    window.dispatchEvent(new CustomEvent(CR_EVENT))
  }
  
  function uid() {
    return `cr-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`
  }
  
  function seedIfEmpty() {
    const existing = safeRead()
    if (existing.length) return
  
    const base = [
      { crimeType: "Theft", zone: "Zone 1", stateCommand: "Lagos", division: "Operations", lga: "Ikeja", status: "Open" },
      { crimeType: "Fraud", zone: "Zone 2", stateCommand: "Kano", division: "Intelligence", lga: "Nasarawa", status: "Closed" },
      { crimeType: "Assault", zone: "Zone 3", stateCommand: "Lagos", division: "Forensic Services", lga: "Ikeja", status: "Under Investigation" },
      { crimeType: "Assault", zone: "Zone 4", stateCommand: "Lagos", division: "Special Crimes", lga: "Ikeja", status: "Under Investigation" },
      { crimeType: "Assault", zone: "Zone 5", stateCommand: "Lagos", division: "Legal & Compliance", lga: "Ikeja", status: "Closed" },
      { crimeType: "Fraud", zone: "Zone 6", stateCommand: "Lagos", division: "Special Crimes", lga: "Ikeja", status: "Open" },
      { crimeType: "Fraud", zone: "Zone 7", stateCommand: "Lagos", division: "Criminal Investigation", lga: "Ikeja", status: "Under Investigation" },
      { crimeType: "Theft", zone: "Zone 8", stateCommand: "Lagos", division: "Criminal Investigation", lga: "Ikeja", status: "Closed" },
      { crimeType: "Theft", zone: "Zone 9", stateCommand: "Lagos", division: "Intelligence", lga: "Ikeja", status: "Closed" },
    ]
  
    safeWrite(
      base.map((b) => ({
        id: uid(),
        criminalRecordId: "CR-001",
        linkedIncidentId: "INC-001",
        fullName: "Micheal Jackson",
        dateReported: "12 Jan 2025",
        caseSummary: "—",
        ...b,
      }))
    )
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
    router.push({ path: "/officer/criminal-records/new" })
  }
  function goView(row) {
    router.push({ path: `/officer/criminal-records/${row.id}` })
  }
  function goEdit(row) {
    router.push({ path: `/officer/criminal-records/${row.id}/edit` })
  }
  
  function removeRow(row) {
    const ok = window.confirm(`Delete criminal record "${row.criminalRecordId}"?`)
    if (!ok) return
    const next = safeRead().filter((x) => x.id !== row.id)
    safeWrite(next)
  }
  
  const filtered = computed(() => {
    const term = String(q.value || "").trim().toLowerCase()
    if (!term) return rows.value
  
    return rows.value.filter((r) =>
      [
        r.criminalRecordId,
        r.fullName,
        r.crimeType,
        r.zone,
        r.stateCommand,
        r.division,
        r.lga,
        r.dateReported,
        r.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    )
  })
  
  function onUpdated() {
    refresh()
  }
  
  onMounted(() => {
    seedIfEmpty()
    refresh()
    window.addEventListener(CR_EVENT, onUpdated)
  })
  onBeforeUnmount(() => {
    window.removeEventListener(CR_EVENT, onUpdated)
  })
  </script>
  
  <style scoped>
  .thCell {
    height: 58px;
    text-align: left;
    padding: 0 18px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.55);
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    background: rgba(0, 0, 0, 0.02);
    white-space: nowrap;
  }
  .thCell--last {
    border-right: none;
  }
  
  .tdCell {
    height: 64px;
    padding: 0 18px;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.72);
    border-bottom: 1px solid rgba(0, 0, 0, 0.10);
    border-right: 1px solid rgba(0, 0, 0, 0.10);
    vertical-align: middle;
    background: #fff;
    white-space: nowrap;
  }
  .tdCell--last {
    border-right: none;
  }
  </style>
  