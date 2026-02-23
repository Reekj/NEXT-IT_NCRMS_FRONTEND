<!-- src/pages/roles/officer/officer_pages/Cases.vue -->
<template>
    <OfficerLayout :user="user">
      <Motion
        tag="div"
        class="space-y-6"
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
      >
        <!-- Page title -->
        <h1 class="text-[22px] font-semibold text-black">Cases</h1>
  
        <!-- Card -->
        <section class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
          <!-- Toolbar -->
          <div class="border-b border-black/10 px-6 py-4 sm:px-8">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <div class="relative">
                  <Search class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />
                  <input
                    v-model="q"
                    type="text"
                    placeholder="Search ..."
                    class="h-10 w-[260px] rounded-xl border border-black/10 bg-white pl-10 pr-4 text-[13px]
                           text-black/70 outline-none placeholder:text-black/35
                           transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
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
          <div class="overflow-x-auto">
            <table class="w-full min-w-[1180px] border-collapse text-left">
              <thead>
                <tr class="bg-white">
                  <th class="thCell">Criminal Record ID</th>
                  <th class="thCell">Full Name</th>
                  <th class="thCell">Crime Type</th>
                  <th class="thCell">Zone</th>
                  <th class="thCell">State Command</th>
                  <th class="thCell">LGA</th>
                  <th class="thCell">Date Reported</th>
                  <th class="thCell">Status</th>
                  <th class="thCell thCell--last">Action</th>
                </tr>
              </thead>
  
              <tbody>
                <tr
                  v-for="row in filtered"
                  :key="row.id"
                  class="hover:bg-black/[0.01]"
                >
                  <td class="tdCell">{{ row.criminalRecordId }}</td>
                  <td class="tdCell">{{ row.fullName }}</td>
                  <td class="tdCell">{{ row.crimeType }}</td>
                  <td class="tdCell">{{ row.zone }}</td>
                  <td class="tdCell">{{ row.stateCommand }}</td>
                  <td class="tdCell">{{ row.lga }}</td>
                  <td class="tdCell">{{ formatDate(row.dateReported) }}</td>
                  <td class="tdCell">{{ row.status }}</td>
                  <td class="tdCell tdCell--last">
                    <button
                      type="button"
                      class="grid h-9 w-9 place-items-center rounded-lg hover:bg-black/5 active:bg-black/10"
                      aria-label="Action"
                      @click="onAction(row)"
                    >
                      <Archive class="h-4 w-4 text-black/55" />
                    </button>
                  </td>
                </tr>
  
                <tr v-if="filtered.length === 0">
                  <td class="tdCell tdCell--last text-center text-black/50" colspan="9">
                    No records found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Pagination (UI only) -->
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
        </section>
      </Motion>
    </OfficerLayout>
  </template>
  
  <script setup>
  import { computed, onBeforeUnmount, onMounted, ref } from "vue"
  import { Motion } from "@motionone/vue"
  import { Search, RefreshCcw, Archive } from "lucide-vue-next"
  import OfficerLayout from "../layout/Layout.vue"
  
  const user = ref({
    name: "James King",
    role: "Officer",
    avatarUrl: "",
  })
  
  /** ===============================
   * LOCAL STORAGE (inline, synced)
   * =============================== */
  const CASES_KEY = "ncrms_officer_cases"
  const CASES_EVENT = "ncrms-officer-cases-updated"
  
  function safeRead() {
    try {
      const raw = localStorage.getItem(CASES_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  
  function safeWrite(next) {
    localStorage.setItem(CASES_KEY, JSON.stringify(Array.isArray(next) ? next : []))
    window.dispatchEvent(new CustomEvent(CASES_EVENT))
  }
  
  function uid() {
    return `oc-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`
  }
  
  function seedIfEmpty() {
    const existing = safeRead()
    if (existing.length) return
  
    safeWrite([
      { id: uid(), criminalRecordId: "CR-001", fullName: "Micheal Jackson", crimeType: "Theft", zone: "Zone 1", stateCommand: "Lagos", lga: "Ikeja", dateReported: "2025-01-12", status: "Open" },
      { id: uid(), criminalRecordId: "CR-001", fullName: "Micheal Jackson", crimeType: "Fraud", zone: "Zone 2", stateCommand: "Kano", lga: "Nasarawa", dateReported: "2025-01-12", status: "Archived" },
      { id: uid(), criminalRecordId: "CR-001", fullName: "Micheal Jackson", crimeType: "Assault", zone: "Zone 3", stateCommand: "Lagos", lga: "Ikeja", dateReported: "2025-01-12", status: "Under Investigation" },
      { id: uid(), criminalRecordId: "CR-001", fullName: "Micheal Jackson", crimeType: "Assault", zone: "Zone 4", stateCommand: "Lagos", lga: "Ikeja", dateReported: "2025-01-12", status: "Under Investigation" },
      { id: uid(), criminalRecordId: "CR-001", fullName: "Micheal Jackson", crimeType: "Assault", zone: "Zone 5", stateCommand: "Lagos", lga: "Ikeja", dateReported: "2025-01-12", status: "Archived" },
      { id: uid(), criminalRecordId: "CR-001", fullName: "Micheal Jackson", crimeType: "Fraud", zone: "Zone 6", stateCommand: "Lagos", lga: "Ikeja", dateReported: "2025-01-12", status: "Open" },
      { id: uid(), criminalRecordId: "CR-001", fullName: "Micheal Jackson", crimeType: "Fraud", zone: "Zone 7", stateCommand: "Lagos", lga: "Ikeja", dateReported: "2025-01-12", status: "Under Investigation" },
      { id: uid(), criminalRecordId: "CR-001", fullName: "Micheal Jackson", crimeType: "Theft", zone: "Zone 8", stateCommand: "Lagos", lga: "Ikeja", dateReported: "2025-01-12", status: "Archived" },
      { id: uid(), criminalRecordId: "CR-001", fullName: "Micheal Jackson", crimeType: "Theft", zone: "Zone 9", stateCommand: "Lagos", lga: "Ikeja", dateReported: "2025-01-12", status: "Archived" },
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
  
  function onAction(row) {
    // UI only (keeps action button interactive like Figma)
    // You can hook this to view/archive later.
    rows.value = [...rows.value]
  }
  
  const filtered = computed(() => {
    const term = String(q.value || "").trim().toLowerCase()
    if (!term) return rows.value
  
    return rows.value.filter((r) => {
      const hay = [
        r.criminalRecordId,
        r.fullName,
        r.crimeType,
        r.zone,
        r.stateCommand,
        r.lga,
        r.dateReported,
        r.status,
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
    window.addEventListener(CASES_EVENT, onUpdated)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener(CASES_EVENT, onUpdated)
  })
  </script>
  
  <style scoped>
  /* MUST: show table cell borders (vertical + horizontal) */
  .thCell {
    height: 58px;
    text-align: left;
    padding: 0 18px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.45);
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
    color: rgba(0, 0, 0, 0.70);
    border-bottom: 1px solid rgba(0, 0, 0, 0.10);
    border-right: 1px solid rgba(0, 0, 0, 0.10);
    background: #fff;
    vertical-align: middle;
    white-space: nowrap;
  }
  
  .tdCell--last {
    border-right: none;
  }
  </style>
  