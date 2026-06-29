<!-- src/pages/roles/officer/officer_pages/IncidentRecords.vue -->
<template>
  <OfficerLayout :user="user">
    <Motion
      tag="div"
      class="space-y-5"
      :initial="{ opacity: 0, y: 10 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.35 }"
    >
      <h1 class="text-[22px] font-semibold text-[#1F2937]">Incidents</h1>

      <div class="border-b border-[#E5E7EB]">
        <div class="flex items-center gap-10">
          <button type="button" class="tab-active" @click="activeTab = 'report'">
            Incident Report
          </button>

          <button
            type="button"
            class="relative px-4 pb-3 text-[16px] font-semibold text-[#6B7280] transition hover:text-[#061A8D]"
            @click="activeTab = 'records'"
          >
            Incident Records
          </button>
        </div>
      </div>

      <section class="overflow-hidden rounded-[16px] border border-[#D7D7D7] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
        <div class="flex flex-wrap items-center justify-between gap-4 px-6 py-5">
          <div class="flex flex-wrap items-center gap-5">
            <div class="relative">
              <input
                v-model="dateFilter"
                type="date"
                class="filterInput w-[150px] pr-10"
                aria-label="Date range"
              />
              <CalendarDays class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/70" />
            </div>

            <div class="relative">
              <input
                v-model.trim="q"
                type="text"
                placeholder="Search..."
                class="filterInput w-[205px] pr-10"
              />
              <Search class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/60" />
            </div>
          </div>

          <button type="button" class="newBtn" @click="goNew">
            <UserRoundPlus class="h-4 w-4" />
            New
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full min-w-[1180px] border-collapse">
            <thead>
              <tr>
                <th class="thCell">Incident ID</th>
                <th class="thCell">Full Name</th>
                <th class="thCell">Incident Type</th>
                <th class="thCell">Department</th>
                <th class="thCell">LGA</th>
                <th class="thCell">Status</th>
                <th class="thCell">Date of Incident</th>
                <th class="thCell thCell--last">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="row in pagedRows" :key="row.id">
                <td class="tdCell">{{ row.incidentId }}</td>
                <td class="tdCell">{{ row.name }}</td>
                <td class="tdCell">{{ row.incidentType }}</td>
                <td class="tdCell">{{ row.department }}</td>
                <td class="tdCell">{{ row.lga }}</td>
                <td class="tdCell">{{ row.status }}</td>
                <td class="tdCell">{{ formatDate(row.dateOfIncident) }}</td>

                <td class="tdCell tdCell--last">
                  <div class="flex items-center justify-center gap-3">
                    <button class="actionIcon" type="button" aria-label="Edit incident" @click="goEdit(row)">
                      <Pencil class="h-4 w-4" />
                    </button>

                    <button class="actionIcon" type="button" aria-label="View incident" @click="goView(row)">
                      <Eye class="h-4 w-4" />
                    </button>

                    <button
                      class="actionIcon"
                      type="button"
                      aria-label="Close incident"
                      title="Close incident"
                      @click="openCloseModal(row)"
                    >
                      <FileX class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="pagedRows.length === 0">
                <td colspan="8" class="tdCell tdCell--last text-center text-black/50">
                  No records found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-center px-6 py-6">
          <div class="inline-flex overflow-hidden rounded-lg border border-[#D7D7D7] bg-white">
            <button class="pageBtn" :disabled="page === 1" @click="prevPage">‹ Previous</button>

            <button
              v-for="p in pageButtons"
              :key="p.key"
              type="button"
              class="pageBtn"
              :class="p.type === 'page' && p.value === page ? 'active' : ''"
              :disabled="p.type === 'dots'"
              @click="p.type === 'page' ? (page = p.value) : null"
            >
              {{ p.label }}
            </button>

            <button class="pageBtn" :disabled="page === totalPages" @click="nextPage">Next ›</button>
          </div>
        </div>
      </section>

      <div v-if="closeTarget" class="fixed inset-0 z-50 grid place-items-center bg-black/20 px-4">
        <section class="relative w-full max-w-[415px] rounded-[4px] bg-white px-[37px] pb-[34px] pt-[45px] shadow-xl">
          <button
            type="button"
            class="absolute right-[21px] top-[20px] text-[#64748B] transition hover:text-black"
            aria-label="Close modal"
            @click="cancelClose"
          >
            <X class="h-5 w-5" />
          </button>

          <h2 class="text-[18px] font-bold text-black">Are you sure ?</h2>

          <div class="mt-[24px] rounded-[3px] border border-[#D6E4F4] px-[11px] py-[10px] text-[12px]">
            <div class="grid grid-cols-[160px_1fr] gap-y-[10px]">
              <span class="font-semibold text-black">Name:</span>
              <span class="font-semibold text-black">{{ closeTarget.name }}</span>

              <span class="font-semibold text-black">Incident ID:</span>
              <span class="font-semibold text-black">{{ closeTarget.incidentId }}</span>

              <span class="font-semibold text-black">Incident Type:</span>
              <span class="font-semibold text-black">{{ closeTarget.incidentType }}</span>
            </div>
          </div>

          <label class="mt-[23px] block text-[13px] font-medium text-black">Description</label>

          <input
            v-model.trim="closeReason"
            type="text"
            class="mt-[10px] h-[40px] w-full rounded-[20px] border border-[#D6E4F4] px-[20px] text-[13px] outline-none transition placeholder:text-[#C5C5C5] focus:border-[#061A8D] focus:ring-4 focus:ring-[#061A8D]/10"
            placeholder="Please input your reason"
          />

          <p v-if="closeError" class="mt-2 text-[12px] font-medium text-red-600">
            {{ closeError }}
          </p>

          <div class="mt-[18px] flex justify-end gap-[10px]">
            <button type="button" class="modalYes" @click="confirmClose">Yes</button>
            <button type="button" class="modalNo" @click="cancelClose">No</button>
          </div>
        </section>
      </div>
    </Motion>
  </OfficerLayout>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { Motion } from "@motionone/vue"
import {
  CalendarDays,
  Eye,
  FileX,
  Pencil,
  Search,
  UserRoundPlus,
  X,
} from "lucide-vue-next"
import OfficerLayout from "../layout/Layout.vue"

const router = useRouter()

const user = ref({
  name: "James King",
  role: "Officer",
  avatarUrl: "",
})

const KEY = "ncrms_officer_incident_records"
const EVT = "ncrms-officer-incident-records-updated"

const activeTab = ref("report")
const q = ref("")
const dateFilter = ref("")
const rows = ref([])
const page = ref(1)
const pageSize = 9

const closeTarget = ref(null)
const closeReason = ref("")
const closeError = ref("")

function uid() {
  return crypto?.randomUUID?.() || `inc-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function safeRead() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "[]")
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function safeWrite(next) {
  localStorage.setItem(KEY, JSON.stringify(Array.isArray(next) ? next : []))
  window.dispatchEvent(new CustomEvent(EVT))
}

function seedIfEmpty() {
  if (safeRead().length) return

  const seed = [
    ["INC-001", "Micheal Jackson", "Traffic Accident", "Operations", "Ikeja", "Open", "2025-01-12"],
    ["INC-002", "Micheal Jackson", "Domestic Disturbance", "Intelligence", "Surulere", "Open", "2025-01-12"],
    ["INC-003", "Micheal Jackson", "Theft", "Criminal Investigation", "Ikeja", "Open", "2025-01-12"],
    ["INC-004", "Micheal Jackson", "Traffic Accident", "Operations", "Ikeja", "Open", "2025-01-12"],
    ["INC-005", "Micheal Jackson", "Theft", "Criminal Investigation", "Ikeja", "Open", "2025-01-12"],
    ["INC-006", "Micheal Jackson", "Traffic Accident", "Operations", "Ikeja", "Open", "2025-01-12"],
    ["INC-007", "Micheal Jackson", "Traffic Accident", "Operations", "Ikeja", "Open", "2025-01-12"],
    ["INC-008", "Micheal Jackson", "Theft", "Criminal Investigation", "Ikeja", "Open", "2025-01-12"],
    ["INC-009", "Micheal Jackson", "Traffic Accident", "Operations", "Ikeja", "Open", "2025-01-12"],
  ]

  safeWrite(
    seed.map(([incidentId, name, incidentType, department, lga, status, dateOfIncident]) => ({
      id: uid(),
      incidentId,
      name,
      incidentType,
      department,
      zone: "Zone 1",
      stateCommand: "Lagos",
      lga,
      status,
      dateOfIncident,
      description: "Incident report created for officer review.",
      closureReason: "",
      closedAt: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
  )
}

function normalizeRow(row) {
  return {
    ...row,
    name: row.name || row.fullName || "Micheal Jackson",
    department: row.department || row.division || row.stateCommand || "Operations",
    incidentId: row.incidentId || "INC-001",
    incidentType: row.incidentType || "Traffic Accident",
    lga: row.lga || "Ikeja",
    status: row.status || "Open",
    dateOfIncident: row.dateOfIncident || "2025-01-12",
  }
}

function refresh() {
  rows.value = safeRead().map(normalizeRow)
}

const filteredRows = computed(() => {
  const term = q.value.toLowerCase()

  return rows.value.filter((row) => {
    const matchesSearch =
      !term ||
      [
        row.incidentId,
        row.name,
        row.incidentType,
        row.department,
        row.lga,
        row.status,
        row.dateOfIncident,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)

    const matchesDate = !dateFilter.value || row.dateOfIncident === dateFilter.value

    return matchesSearch && matchesDate
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / pageSize)))

const pagedRows = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredRows.value.slice(start, start + pageSize)
})

const pageButtons = computed(() => {
  const last = totalPages.value
  const buttons = []

  const addPage = (n) => {
    if (n >= 1 && n <= last) {
      buttons.push({ key: `p-${n}`, type: "page", value: n, label: String(n) })
    }
  }

  addPage(1)
  addPage(2)
  addPage(3)
  addPage(4)

  if (last > 6) buttons.push({ key: "dots", type: "dots", value: null, label: "..." })

  addPage(last - 1)
  addPage(last)

  return buttons.filter(
    (button, index, array) =>
      button.type === "dots" ||
      array.findIndex((item) => item.type === "page" && item.value === button.value) === index
  )
})

watch([q, dateFilter, activeTab], () => {
  page.value = 1
})

watch(
  () => filteredRows.value.length,
  () => {
    page.value = Math.min(page.value, totalPages.value)
    if (page.value < 1) page.value = 1
  }
)

function prevPage() {
  page.value = Math.max(1, page.value - 1)
}

function nextPage() {
  page.value = Math.min(totalPages.value, page.value + 1)
}

function goNew() {
  router.push("/officer/incident-records/new")
}

function goView(row) {
  router.push(`/officer/incident-records/${encodeURIComponent(row.id)}`)
}

function goEdit(row) {
  router.push(`/officer/incident-records/${encodeURIComponent(row.id)}/edit`)
}

function openCloseModal(row) {
  closeTarget.value = { ...row }
  closeReason.value = ""
  closeError.value = ""
}

function cancelClose() {
  closeTarget.value = null
  closeReason.value = ""
  closeError.value = ""
}

function confirmClose() {
  if (!closeTarget.value) return

  if (!closeReason.value.trim()) {
    closeError.value = "Please input your reason."
    return
  }

  const targetId = closeTarget.value.id

  const next = safeRead().map((item) =>
    item.id === targetId
      ? {
          ...item,
          status: "Closed",
          closureReason: closeReason.value,
          closedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      : item
  )

  safeWrite(next)
  cancelClose()
}

function formatDate(value) {
  if (!value) return "—"

  const [year, month, day] = String(value).split("-")
  if (!year || !month || !day) return value

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${Number(day)} ${months[Number(month) - 1]} ${year}`
}

onMounted(() => {
  seedIfEmpty()
  refresh()
  window.addEventListener(EVT, refresh)
})

onBeforeUnmount(() => {
  window.removeEventListener(EVT, refresh)
})
</script>

<style scoped>
.tab-active {
  position: relative;
  padding: 0 16px 12px;
  color: #061a8d;
  font-size: 16px;
  font-weight: 700;
}

.tab-active::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 3px;
  width: 100%;
  border-radius: 999px;
  background: #061a8d;
}

.newBtn {
  display: inline-flex;
  height: 38px;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: #061a8d;
  padding: 0 18px;
  color: white;
  font-size: 15px;
  font-weight: 700;
}

.filterInput {
  height: 38px;
  min-width: 146px;
  border-radius: 4px;
  border: 1px solid #d7d7d7;
  background: white;
  padding: 0 38px 0 14px;
  color: #777777;
  font-size: 13px;
  outline: none;
}

.thCell,
.tdCell {
  height: 58px;
  border-bottom: 1px solid #d7d7d7;
  border-right: 1px solid #d7d7d7;
  padding: 0 16px;
  text-align: left;
  color: #444444;
  white-space: nowrap;
}

.thCell {
  background: #f8f8f8;
  font-size: 14px;
  font-weight: 700;
}

.tdCell {
  background: #ffffff;
  font-size: 14px;
  font-weight: 700;
}

.thCell--last,
.tdCell--last {
  border-right: none;
  text-align: center;
}

.actionIcon {
  display: grid;
  height: 28px;
  width: 28px;
  place-items: center;
  color: #6b7280;
  transition: background 160ms ease;
}

.actionIcon:hover {
  background: #f3f4f6;
}

.pageBtn {
  height: 38px;
  min-width: 42px;
  border-right: 1px solid #d7d7d7;
  padding: 0 14px;
  font-size: 14px;
  font-weight: 700;
  color: #2f2f2f;
}

.pageBtn:last-child {
  border-right: none;
}

.pageBtn.active,
.pageBtn:hover:not(:disabled) {
  background: #f5f5f5;
}

.pageBtn:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.modalYes {
  height: 32px;
  border-radius: 4px;
  background: #16005b;
  padding: 0 18px;
  color: white;
  font-size: 13px;
  font-weight: 700;
}

.modalNo {
  height: 32px;
  border-radius: 4px;
  border: 1px solid #16005b;
  background: white;
  padding: 0 18px;
  color: #16005b;
  font-size: 13px;
  font-weight: 700;
}
</style>