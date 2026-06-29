<!-- src/pages/roles/officer/officer_pages/Cases.vue -->
<template>
  <OfficerLayout :user="user">
    <Motion tag="div" class="space-y-5" :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: 0.35 }">
      <h1 class="text-[22px] font-semibold text-[#111827]">Cases</h1>

      <section class="overflow-hidden rounded-[16px] border border-[#D7D7D7] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
        <div class="flex items-center justify-between px-6 py-5">
          <div class="flex items-center gap-5">
            <div class="relative">
              <input v-model="dateFilter" type="date" class="filterInput w-[150px] pr-10" />
              <CalendarDays class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/70" />
            </div>

            <div class="relative">
              <input v-model.trim="q" type="text" placeholder="Search..." class="filterInput w-[205px] pr-10" />
              <Search class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/60" />
            </div>
          </div>

          <button class="newBtn" type="button" @click="goNew">
            <UserRoundPlus class="h-4 w-4" />
            New
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full min-w-[1180px] border-collapse">
            <thead>
              <tr>
                <th class="thCell">Case ID</th>
                <th class="thCell">Full Name</th>
                <th class="thCell">Crime Type</th>
                <th class="thCell">Zone</th>
                <th class="thCell">State</th>
                <th class="thCell">LGA</th>
                <th class="thCell">Date Reported</th>
                <th class="thCell">Status</th>
                <th class="thCell thCell--last">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="row in pagedRows" :key="row.id">
                <td class="tdCell">{{ row.caseId }}</td>
                <td class="tdCell">{{ row.fullName }}</td>
                <td class="tdCell">{{ row.crimeType }}</td>
                <td class="tdCell">{{ row.zone }}</td>
                <td class="tdCell">{{ row.stateCommand }}</td>
                <td class="tdCell">{{ row.lga }}</td>
                <td class="tdCell">{{ formatDate(row.dateReported) }}</td>
                <td class="tdCell">{{ row.status }}</td>

                <td class="tdCell tdCell--last">
                  <div class="flex items-center justify-center gap-3">
                    <button class="actionIcon" type="button" @click="goEdit(row)" aria-label="Edit case">
                      <Pencil class="h-4 w-4" />
                    </button>

                    <button class="actionIcon" type="button" @click="goView(row)" aria-label="View case">
                      <Eye class="h-4 w-4" />
                    </button>

                    <button class="actionIcon" type="button" @click="openCloseModal(row)" aria-label="Close case">
                      <FileX class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="pagedRows.length === 0">
                <td colspan="9" class="tdCell tdCell--last text-center text-black/50">No cases found.</td>
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

      <div v-if="closeTarget" class="fixed inset-0 z-50 grid place-items-center bg-black/55 px-4">
        <section class="relative w-full max-w-[520px] rounded-[8px] bg-white px-[36px] pb-[32px] pt-[42px] shadow-xl">
          <button class="absolute right-[20px] top-[18px] text-[#64748B] hover:text-black" type="button" @click="cancelClose">
            <X class="h-5 w-5" />
          </button>

          <h2 class="text-[24px] font-bold text-black">Are you sure you want to close this case?</h2>

          <div class="mt-[24px] rounded-[4px] border border-[#D6E4F4] px-[12px] py-[11px] text-[12px]">
            <div class="grid grid-cols-[150px_1fr] gap-y-[10px]">
              <span class="font-semibold text-black">Name:</span>
              <span class="font-semibold text-black">{{ closeTarget.fullName }}</span>

              <span class="font-semibold text-black">Case ID:</span>
              <span class="font-semibold text-black">{{ closeTarget.caseId }}</span>

              <span class="font-semibold text-black">Crime Type:</span>
              <span class="font-semibold text-black">{{ closeTarget.crimeType }}</span>
            </div>
          </div>

          <label class="mt-[22px] block text-[13px] font-semibold text-black">Comment</label>
          <input
            v-model.trim="closeReason"
            class="mt-[10px] h-[40px] w-full rounded-[20px] border border-[#D6E4F4] px-[20px] text-[13px] outline-none placeholder:text-[#C5C5C5] focus:border-[#061A8D]"
            placeholder="Please input your reason"
          />

          <p v-if="closeError" class="mt-2 text-[12px] font-medium text-red-600">{{ closeError }}</p>

          <div class="mt-[34px] flex justify-end gap-[10px]">
            <button class="modalYes" type="button" @click="confirmClose">Yes</button>
            <button class="modalNo" type="button" @click="cancelClose">No</button>
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
import { CalendarDays, Eye, FileX, Pencil, Search, UserRoundPlus, X } from "lucide-vue-next"
import OfficerLayout from "../layout/Layout.vue"

const router = useRouter()
const user = ref({ name: "James King", role: "Officer", avatarUrl: "" })

const KEY = "ncrms_officer_cases"
const EVT = "ncrms-officer-cases-updated"

const q = ref("")
const dateFilter = ref("")
const rows = ref([])
const page = ref(1)
const pageSize = 9
const closeTarget = ref(null)
const closeReason = ref("")
const closeError = ref("")

function uid() {
  return crypto?.randomUUID?.() || `case-${Date.now()}-${Math.random().toString(16).slice(2)}`
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

function nextCaseIdFromIndex(index) {
  return `C-${String(index + 1).padStart(3, "0")}`
}

function normalizeCase(row, index) {
  const caseId =
    row?.caseId ||
    row?.criminalCaseId ||
    row?.caseNumber ||
    row?.criminalRecordId ||
    nextCaseIdFromIndex(index)

  return {
    id: row?.id || uid(),
    ...row,
    caseId,
    fullName: row?.fullName || row?.name || "Micheal Jackson",
    crimeType: row?.crimeType || row?.offence || row?.incidentType || "Theft",
    zone: row?.zone || "Zone 1",
    stateCommand: row?.stateCommand || row?.state || "Lagos",
    lga: row?.lga || "Ikeja",
    dateReported: row?.dateReported || row?.createdAt?.slice?.(0, 10) || "2025-01-12",
    status: row?.status || row?.caseStatus || "Open",
  }
}

function seedIfEmpty() {
  if (safeRead().length) return

  const seed = [
    ["C-001", "Micheal Jackson", "Theft", "Open"],
    ["C-002", "Micheal Jackson", "Fraud", "Archived"],
    ["C-003", "Micheal Jackson", "Assault", "Open"],
    ["C-004", "Micheal Jackson", "Assault", "Open"],
    ["C-005", "Micheal Jackson", "Assault", "Archived"],
    ["C-006", "Micheal Jackson", "Fraud", "Open"],
    ["C-007", "Micheal Jackson", "Fraud", "Open"],
    ["C-008", "Micheal Jackson", "Theft", "Open"],
    ["C-009", "Micheal Jackson", "Theft", "Open"],
  ]

  safeWrite(seed.map(([caseId, fullName, crimeType, status]) => ({
    id: uid(),
    caseId,
    criminalRecordId: "CR-001",
    fullName,
    crimeType,
    zone: "Zone 1",
    stateCommand: "Lagos",
    department: "Operations",
    division: "Operations",
    lga: "Ikeja",
    nin: "12343432345",
    dateReported: "2025-01-12",
    status,
    complexion: "Lightskinned",
    distinguishingMarks: "Tattoos on the left arm",
    address: "No 17, Adewale street, Lagos, Nigeria.",
    dateOfBirth: "1989-01-12",
    height: "170.18cm",
    caseOfficer: "Officer John",
    description: "The suspect was reported for involvement in fraudulent activities within Ikeja LGA, Lagos State.",
    photoName: "michealjackson.dp",
    photoUrl: "",
    evidenceFiles: [],
    closeReason: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })))
}

function refresh() {
  const normalized = safeRead().map(normalizeCase)

  const needsWriteBack = normalized.some((row) => !safeRead().find((item) => item.id === row.id)?.caseId)

  rows.value = normalized

  if (needsWriteBack) {
    safeWrite(normalized)
  }
}

const filteredRows = computed(() => {
  const term = q.value.toLowerCase()

  return rows.value.filter((row) => {
    const matchesSearch =
      !term ||
      [row.caseId, row.fullName, row.crimeType, row.zone, row.stateCommand, row.lga, row.status]
        .join(" ")
        .toLowerCase()
        .includes(term)

    const matchesDate = !dateFilter.value || row.dateReported === dateFilter.value
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
  const addPage = (n) => n >= 1 && n <= last && buttons.push({ key: `p-${n}`, type: "page", value: n, label: String(n) })

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

watch([q, dateFilter], () => {
  page.value = 1
})

function prevPage() {
  page.value = Math.max(1, page.value - 1)
}

function nextPage() {
  page.value = Math.min(totalPages.value, page.value + 1)
}

function goNew() {
  router.push("/officer/new-case")
}

function goView(row) {
  router.push(`/officer/cases/${encodeURIComponent(row.id)}`)
}

function goEdit(row) {
  router.push(`/officer/cases/${encodeURIComponent(row.id)}/edit`)
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
  const next = safeRead().map((item, index) => {
    const normalized = normalizeCase(item, index)

    return normalized.id === targetId
      ? { ...normalized, status: "Archived", closeReason: closeReason.value, updatedAt: new Date().toISOString() }
      : normalized
  })

  safeWrite(next)
  cancelClose()
}

function formatDate(value) {
  if (!value) return "—"
  const [year, month, day] = String(value).split("-")
  if (!year || !month || !day) return value
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
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
  color: #777;
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
  color: #444;
  white-space: nowrap;
}
.thCell {
  background: #f8f8f8;
  font-size: 14px;
  font-weight: 500;
}
.tdCell {
  background: #fff;
  font-size: 14px;
  font-weight: 500;
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
  color: #4b5563;
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
  color: #2f2f2f;
}
.pageBtn:last-child {
  border-right: none;
}
.pageBtn.active,
.pageBtn:hover:not(:disabled) {
  background: #eef4ff;
  color: #061a8d;
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