<!-- src/pages/roles/officer/officer_pages/IncidentRecordView.vue -->
<template>
  <OfficerLayout :user="user">
    <Motion
      tag="div"
      :initial="{ opacity: 0, y: 10 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.35 }"
    >
      <section class="mx-auto w-full max-w-[980px] overflow-hidden rounded-[14px] border border-[#D8D8D8] bg-white">
        <div class="border-b border-[#E5E7EB] px-[27px] py-[20px]">
          <h1 class="text-[18px] font-medium text-[#1F2937]">Incident Record</h1>
        </div>

        <div class="px-[34px] py-[30px]">
          <div class="grid grid-cols-1 gap-x-[56px] gap-y-[26px] md:grid-cols-2">
            <ReadField label="Incident ID" :value="record.incidentId" />
            <ReadField label="Incident Type" :value="record.incidentType" />

            <ReadField label="Zone" :value="record.zone" />
            <ReadField label="Division" :value="record.department || record.division" />

            <ReadField label="State" :value="record.stateCommand" />
            <ReadField label="LGA" :value="record.lga" />

            <ReadField label="Status" :value="record.status" />
            <ReadField label="Date of Incident" :value="formatDate(record.dateOfIncident)" />

            <ReadField label="Lead Officer" :value="record.leadOfficer || record.name" />
            <ReadField label="Badge No." :value="record.badgeNo" />
          </div>

          <button type="button" class="miniBtn mt-[20px]" @click="goComments">
            View all comments
          </button>
          <div v-if="showComment" class="mt-4 rounded-[10px] border border-[#DBE7F4] px-4 py-3 text-[13px] text-[#4B5563]">
            {{ record.comment || record.description || "No comments available." }}
          </div>
        </div>

        <div class="border-t border-[#E5E7EB] px-[34px] py-[30px]">
          <h2 class="mb-[28px] text-[18px] font-semibold text-[#1F2937]">Victim</h2>

          <div class="grid grid-cols-1 gap-x-[56px] gap-y-[26px] md:grid-cols-2">
            <ReadField label="Name" :value="victim.name" />
            <ReadField label="Phone No." :value="victim.phone" />

            <ReadField label="Address" :value="victim.address" class="md:col-span-2" />
          </div>

          <button type="button" class="miniBtn mt-[20px]" @click="showVictimStatement = !showVictimStatement">
            View all statements
          </button>

          <div v-if="showVictimStatement" class="mt-4 rounded-[10px] border border-[#DBE7F4] px-4 py-3 text-[13px] text-[#4B5563]">
            {{ victim.statement || "No victim statement available." }}
          </div>
        </div>

        <div class="border-t border-[#E5E7EB] px-[34px] py-[30px]">
          <h2 class="mb-[28px] text-[18px] font-semibold text-[#1F2937]">Suspect</h2>

          <div class="grid grid-cols-1 gap-x-[56px] gap-y-[26px] md:grid-cols-2">
            <ReadField label="Name" :value="suspect.name" />
            <ReadField label="Phone No." :value="suspect.phone" />

            <ReadField label="Address" :value="suspect.address" class="md:col-span-2" />
          </div>

          <button type="button" class="miniBtn mt-[20px]" @click="showSuspectStatement = !showSuspectStatement">
            View all statements
          </button>

          <div v-if="showSuspectStatement" class="mt-4 rounded-[10px] border border-[#DBE7F4] px-4 py-3 text-[13px] text-[#4B5563]">
            {{ suspect.statement || "No suspect statement available." }}
          </div>

          <div class="mt-[28px]">
            <h3 class="mb-3 text-[14px] font-medium text-[#2B2B2B]">Evidence:</h3>

            <div class="space-y-3">
              <div
                v-for="file in evidenceFiles"
                :key="file.id"
                class="flex items-center justify-between border-b border-[#E5E7EB] pb-2 text-[13px]"
              >
                <div class="flex items-center gap-2 text-[#374151]">
                  <FileText class="h-4 w-4" />
                  <span>{{ file.name }}</span>
                </div>

                <button type="button" class="evidenceBtn" @click="viewEvidence(file)">
                  <Play class="h-3 w-3" />
                  View
                </button>
              </div>
            </div>
          </div>

          <div class="mt-[34px]">
            <h3 class="mb-3 text-[14px] font-medium text-[#2B2B2B]">DNA Sample Data</h3>

            <div class="grid grid-cols-1 border border-[#D8D8D8] md:grid-cols-[1fr_260px]">
              <div class="grid grid-cols-[130px_1fr] gap-y-4 px-7 py-6 text-[13px]">
                <span class="font-medium text-[#374151]">Sample ID:</span>
                <span class="text-black">DNA-1011</span>

                <span class="font-medium text-[#374151]">Lab Analysis:</span>
                <span class="text-black">In Progress</span>

                <span class="font-medium text-[#374151]">Match Status:</span>
                <span class="text-black">No Match</span>

                <span class="font-medium text-[#374151]">Description:</span>
                <span class="text-black">Hair residue</span>
              </div>

              <div class="p-4">
                <img
                  src="https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=500&q=80"
                  alt="DNA sample"
                  class="h-[140px] w-full object-cover"
                />
              </div>
            </div>
          </div>

          <button type="button" class="backBtn mt-[26px]" @click="back">
            Back
          </button>
        </div>
      </section>

      <div v-if="selectedEvidence" class="fixed inset-0 z-50 grid place-items-center bg-black/30 px-4" @click.self="selectedEvidence = null">
        <section class="w-full max-w-[420px] rounded-lg bg-white p-6 shadow-xl">
          <h2 class="text-[16px] font-semibold text-[#111827]">Evidence File</h2>
          <p class="mt-3 text-[14px] text-[#4B5563]">{{ selectedEvidence.name }}</p>

          <div class="mt-6 flex justify-end">
            <button type="button" class="backBtn" @click="selectedEvidence = null">Close</button>
          </div>
        </section>
      </div>
    </Motion>
  </OfficerLayout>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Motion } from "@motionone/vue"
import { FileText, Play } from "lucide-vue-next"
import OfficerLayout from "../layout/Layout.vue"

const router = useRouter()
const route = useRoute()

const user = ref({
  name: "James King",
  role: "Officer",
  avatarUrl: "",
})

const KEY = "ncrms_officer_incident_records"

const showComment = ref(false)
const showVictimStatement = ref(false)
const showSuspectStatement = ref(false)
const selectedEvidence = ref(null)

const record = ref({
  id: "",
  incidentId: "INC-001",
  name: "Micheal Jackson",
  incidentType: "Traffic Accident",
  department: "Operations",
  division: "Operations",
  zone: "Zone 1",
  stateCommand: "Lagos",
  lga: "Ikeja",
  status: "Open",
  dateOfIncident: "2025-01-12",
  leadOfficer: "Micheal Jackson",
  badgeNo: "45783",
  description: "",
  comment: "",
  victim: {
    name: "Micheal Jackson",
    phone: "07037592890",
    address: "45, Opebi Road, Ikeja",
    statement: "",
  },
  suspect: {
    name: "Micheal Jackson",
    phone: "07037592890",
    address: "45, Opebi Road, Ikeja",
    statement: "",
  },
  evidenceFiles: [],
})

const routeId = computed(() => decodeURIComponent(String(route.params.id || "")))

const victim = computed(() => ({
  name: record.value.victim?.name || record.value.name || "Micheal Jackson",
  phone: record.value.victim?.phone || "07037592890",
  address: record.value.victim?.address || "45, Opebi Road, Ikeja",
  statement: record.value.victim?.statement || "",
}))

const suspect = computed(() => ({
  name: record.value.suspect?.name || "Micheal Jackson",
  phone: record.value.suspect?.phone || "07037592890",
  address: record.value.suspect?.address || "45, Opebi Road, Ikeja",
  statement: record.value.suspect?.statement || "",
}))

const evidenceFiles = computed(() => {
  const saved = Array.isArray(record.value.evidenceFiles) ? record.value.evidenceFiles : []

  if (saved.length) return saved

  return [
    { id: "evidence-1", name: "crime_scene_photo.jpg", type: "image/jpeg" },
    { id: "evidence-2", name: "witness_statement.pdf", type: "application/pdf" },
    { id: "evidence-3", name: "cctv_footage.mp4", type: "video/mp4" },
  ]
})

function safeRead() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "[]")
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function loadRecord() {
  const found = safeRead().find((item) => {
    return String(item.id || "") === routeId.value || String(item.incidentId || "") === routeId.value
  })

  if (!found) return

  record.value = {
    ...record.value,
    ...found,
    department: found.department || found.division || "Operations",
    division: found.division || found.department || "Operations",
    leadOfficer: found.leadOfficer || found.name || "Micheal Jackson",
    badgeNo: found.badgeNo || "45783",
    victim: {
      ...record.value.victim,
      ...(found.victim || {}),
      name: found.victim?.name || found.name || "Micheal Jackson",
    },
    suspect: {
      ...record.value.suspect,
      ...(found.suspect || {}),
    },
  }
}

function formatDate(value) {
  if (!value) return "—"

  const [year, month, day] = String(value).split("-")
  if (!year || !month || !day) return value

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return `${Number(day)} ${months[Number(month) - 1]} ${year}`
}

function viewEvidence(file) {
  selectedEvidence.value = file
}

function goComments() {
  const targetId = record.value.id || routeId.value
  router.push(`/officer/incident-records/${encodeURIComponent(targetId)}/comments`)
}

function back() {
  router.push("/officer/incident-records")
}

const ReadField = defineComponent({
  name: "ReadField",
  props: {
    label: { type: String, default: "" },
    value: { type: [String, Number], default: "" },
  },
  setup(props, { attrs }) {
    return () =>
      h("div", attrs, [
        h("label", { class: "fieldLabel" }, props.label),
        h("div", { class: "readInput" }, props.value || "—"),
      ])
  },
})

onMounted(loadRecord)
</script>

<style scoped>
.fieldLabel {
  display: block;
  margin-bottom: 10px;
  color: #2b2b2b;
  font-size: 13px;
  font-weight: 500;
}

.readInput {
  display: flex;
  height: 39px;
  width: 100%;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #dbe7f4;
  background: #ffffff;
  padding: 0 16px;
  color: #8a8a8a;
  font-size: 12px;
  font-weight: 600;
}

.miniBtn,
.backBtn {
  height: 30px;
  border-radius: 5px;
  background: #061a8d;
  padding: 0 14px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
}

.evidenceBtn {
  display: inline-flex;
  height: 26px;
  min-width: 76px;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 4px;
  background: #16005b;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
}
</style>