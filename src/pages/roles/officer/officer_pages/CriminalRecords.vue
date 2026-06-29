<!-- src/pages/roles/officer/officer_pages/CriminalRecords.vue -->
<template>
  <OfficerLayout :user="user">
    <Motion tag="div" class="space-y-6" :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }">
      <div class="flex items-center justify-between">
        <h1 class="text-[22px] font-semibold text-[#1F2937]">Criminal Records</h1>

        <button class="primary-btn" @click="goNew">
          <UserPlus class="h-4 w-4" />
          New Record
        </button>
      </div>

      <section class="overflow-hidden rounded-[18px] border border-[#D7DCE5] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
        <div class="flex flex-wrap items-center gap-5 border-b border-[#E5E7EB] px-6 py-5">
          <select v-model="zoneFilter" class="filter-input">
            <option value="">Zone</option>
            <option v-for="z in zones" :key="z" :value="z">{{ z }}</option>
          </select>

          <select v-model="stateFilter" class="filter-input">
            <option value="">State</option>
            <option v-for="s in states" :key="s" :value="s">{{ s }}</option>
          </select>

          <div class="relative">
            <Search class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4B5563]" />
            <input v-model.trim="q" class="filter-input w-[230px] pr-10" type="text" placeholder="Search..." />
          </div>

          <button class="secondary-icon" @click="refresh" aria-label="Refresh records">
            <RotateCw class="h-4 w-4" />
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full min-w-[1250px] border-collapse text-left">
            <thead>
              <tr>
                <th class="thCell">Criminal Record ID</th>
                <th class="thCell">Full Name</th>
                <th class="thCell">Crime Type</th>
                <th class="thCell">Zone</th>
                <th class="thCell">State Command</th>
                <th class="thCell">Division</th>
                <th class="thCell">LGA</th>
                <th class="thCell">Date Reported</th>
                <th class="thCell">Status</th>
                <th class="thCell thCell--last">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="row in paginatedRows" :key="row.id">
                <td class="tdCell">{{ row.criminalRecordId }}</td>
                <td class="tdCell font-semibold">{{ row.fullName }}</td>
                <td class="tdCell">{{ row.crimeType }}</td>
                <td class="tdCell">{{ row.zone }}</td>
                <td class="tdCell">{{ row.stateCommand }}</td>
                <td class="tdCell">{{ row.division }}</td>
                <td class="tdCell">{{ row.lga }}</td>
                <td class="tdCell">{{ row.dateReported }}</td>
                <td class="tdCell">
                  <span class="status-pill" :class="statusClass(row.status)">
                    {{ row.status }}
                  </span>
                </td>
                <td class="tdCell tdCell--last">
                  <div class="flex items-center justify-center gap-2">
                    <button class="action-btn" @click="goView(row)" aria-label="View record">
                      <Eye class="h-4 w-4" />
                    </button>
                    <button class="action-btn" @click="goEdit(row)" aria-label="Edit record">
                      <Pencil class="h-4 w-4" />
                    </button>
                    <button class="action-btn danger" @click="removeRow(row)" aria-label="Delete record">
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="paginatedRows.length === 0">
                <td colspan="10" class="tdCell tdCell--last text-center text-[#6B7280]">
                  No criminal records found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-center px-6 py-6">
          <div class="inline-flex overflow-hidden rounded-[8px] border border-[#D9DEE8] bg-white">
            <button class="page-btn" :disabled="page === 1" @click="page--">‹ Previous</button>
            <button
              v-for="p in totalPages"
              :key="p"
              class="page-btn"
              :class="p === page ? 'active' : ''"
              @click="page = p"
            >
              {{ p }}
            </button>
            <button class="page-btn" :disabled="page === totalPages" @click="page++">Next ›</button>
          </div>
        </div>
      </section>
    </Motion>
  </OfficerLayout>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { Motion } from "@motionone/vue"
import { Eye, Pencil, RotateCw, Search, Trash2, UserPlus } from "lucide-vue-next"
import OfficerLayout from "../layout/Layout.vue"

const router = useRouter()

const user = ref({
  name: "James King",
  role: "Officer",
  avatarUrl: "",
})

const CR_KEY = "ncrms_officer_criminal_records"
const CR_EVENT = "ncrms-officer-criminal-records-updated"

const q = ref("")
const zoneFilter = ref("")
const stateFilter = ref("")
const rows = ref([])
const page = ref(1)
const perPage = 9

const zones = ["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5", "Zone 6", "Zone 7", "Zone 8", "Zone 9"]
const states = ["Lagos", "Kano", "Abuja"]

function safeRead() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CR_KEY) || "[]")
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
  return crypto?.randomUUID?.() || `cr-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function seedIfEmpty() {
  if (safeRead().length) return

  const base = [
    ["CR-0011", "Micheal Jackson", "Theft", "Zone 1", "Lagos", "Operations", "Ikeja", "Open"],
    ["CR-0012", "Kay Bentley", "Fraud", "Zone 2", "Kano", "Intelligence", "Nasarawa", "Closed"],
    ["CR-0013", "Daniel Okafor", "Assault", "Zone 3", "Lagos", "Forensic Services", "Ikeja", "Under Investigation"],
    ["CR-0014", "Hassan Musa", "Cybercrime", "Zone 4", "Abuja", "Special Crimes", "Garki", "Open"],
    ["CR-0015", "Victor James", "Drug Abuse", "Zone 5", "Lagos", "Legal & Compliance", "Ikeja", "Archived"],
  ]

  safeWrite(
    base.map(([criminalRecordId, fullName, crimeType, zone, stateCommand, division, lga, status]) => ({
      id: uid(),
      criminalRecordId,
      linkedIncidentId: "INC-0011",
      fullName,
      crimeType,
      zone,
      stateCommand,
      division,
      lga,
      status,
      dateReported: "2025-01-12",
      caseSummary: "Record created for investigation tracking.",
    }))
  )
}

function refresh() {
  rows.value = safeRead()
}

const filteredRows = computed(() => {
  const term = q.value.toLowerCase()

  return rows.value.filter((r) => {
    const matchesSearch = !term || Object.values(r).join(" ").toLowerCase().includes(term)
    const matchesZone = !zoneFilter.value || r.zone === zoneFilter.value
    const matchesState = !stateFilter.value || r.stateCommand === stateFilter.value
    return matchesSearch && matchesZone && matchesState
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / perPage)))

const paginatedRows = computed(() => {
  const start = (page.value - 1) * perPage
  return filteredRows.value.slice(start, start + perPage)
})

watch([q, zoneFilter, stateFilter], () => {
  page.value = 1
})

function goNew() {
  router.push("/officer/criminal-records/new")
}

function goView(row) {
  router.push(`/officer/criminal-records/${encodeURIComponent(row.id)}`)
}

function goEdit(row) {
  router.push(`/officer/criminal-records/${encodeURIComponent(row.id)}/edit`)
}

function removeRow(row) {
  if (!window.confirm(`Delete criminal record "${row.criminalRecordId}"?`)) return
  safeWrite(safeRead().filter((item) => item.id !== row.id))
}

function statusClass(status) {
  if (status === "Closed") return "closed"
  if (status === "Archived") return "archived"
  if (status === "Under Investigation") return "investigation"
  return "open"
}

onMounted(() => {
  seedIfEmpty()
  refresh()
  window.addEventListener(CR_EVENT, refresh)
})

onBeforeUnmount(() => {
  window.removeEventListener(CR_EVENT, refresh)
})
</script>

<style scoped>
.filter-input {
  height: 38px;
  min-width: 150px;
  border-radius: 5px;
  border: 1px solid #d7dce5;
  background: #fff;
  padding: 0 14px;
  font-size: 13px;
  color: #374151;
  outline: none;
}

.primary-btn {
  display: inline-flex;
  height: 42px;
  align-items: center;
  gap: 8px;
  border-radius: 9px;
  background: linear-gradient(90deg, #13289b 0%, #030a35 100%);
  padding: 0 18px;
  color: white;
  font-size: 13px;
  font-weight: 700;
}

.secondary-icon,
.action-btn {
  display: grid;
  place-items: center;
  border-radius: 8px;
  transition: 0.2s ease;
}

.secondary-icon {
  height: 38px;
  width: 38px;
  border: 1px solid #d7dce5;
}

.action-btn {
  height: 34px;
  width: 34px;
  color: #4b5563;
}

.action-btn:hover {
  background: #f3f4f6;
}

.action-btn.danger {
  color: #dc2626;
}

.thCell,
.tdCell {
  height: 60px;
  border-bottom: 1px solid #d7dce5;
  border-right: 1px solid #d7dce5;
  padding: 0 18px;
  font-size: 14px;
  color: #4b5563;
  white-space: nowrap;
}

.thCell {
  background: #f7f7f8;
  font-weight: 700;
}

.thCell--last,
.tdCell--last {
  border-right: none;
  text-align: center;
}

.status-pill {
  display: inline-flex;
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: 700;
}

.status-pill.open {
  background: #dcfce7;
  color: #166534;
}

.status-pill.closed {
  background: #e0e7ff;
  color: #3730a3;
}

.status-pill.investigation {
  background: #fef3c7;
  color: #92400e;
}

.status-pill.archived {
  background: #f3f4f6;
  color: #374151;
}

.page-btn {
  min-width: 42px;
  height: 38px;
  border-right: 1px solid #d9dee8;
  padding: 0 13px;
  font-size: 13px;
  font-weight: 700;
}

.page-btn:last-child {
  border-right: none;
}

.page-btn.active {
  background: #f3f4f6;
  color: #111827;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>