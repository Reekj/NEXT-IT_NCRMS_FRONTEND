<!-- src/pages/roles/officer/officer_pages/IncidentRecordNew.vue -->
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
          <h1 class="text-[20px] font-medium text-[#1F2937]">Add New Incident Record</h1>
        </div>

        <form autocomplete="off" @submit.prevent="save">
          <div class="px-[34px] py-[32px]">
            <div class="grid grid-cols-1 gap-x-[56px] gap-y-[28px] md:grid-cols-2">
              <FormField label="Incident ID" error-key="incidentId">
                <input v-model.trim="form.incidentId" class="formInput text-[#6F8BC5]" type="text" readonly />
              </FormField>

              <FormField label="Incident Type" error-key="incidentType">
                <input v-model.trim="form.incidentType" class="formInput" type="text" />
              </FormField>

              <FormField label="Zone" error-key="zone">
                <input v-model.trim="form.zone" class="formInput" type="text" />
              </FormField>

              <FormField label="Division" error-key="division">
                <input v-model.trim="form.division" class="formInput" type="text" />
              </FormField>

              <FormField label="State" error-key="stateCommand">
                <input v-model.trim="form.stateCommand" class="formInput" type="text" />
              </FormField>

              <FormField label="LGA" error-key="lga">
                <input v-model.trim="form.lga" class="formInput" type="text" />
              </FormField>

              <FormField label="Status" error-key="status">
                <input v-model.trim="form.status" class="formInput" type="text" />
              </FormField>

              <FormField label="Date of Incident" error-key="dateOfIncident">
                <div class="relative">
                  <input
                    ref="dateInput"
                    v-model="form.dateOfIncident"
                    class="formInput pr-12 text-[#6F8BC5]"
                    type="datetime-local"
                  />

                  <button
                    type="button"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-black/65 transition hover:text-[#061A8D]"
                    aria-label="Open date picker"
                    @click="openDatePicker"
                  >
                    <!-- <CalendarDays class="h-4 w-4" /> -->
                  </button>
                </div>
              </FormField>

              <FormField label="Lead Officer" error-key="leadOfficer">
                <input v-model.trim="form.leadOfficer" class="formInput" type="text" />
              </FormField>

              <FormField label="Badge No." error-key="badgeNo">
                <input v-model.trim="form.badgeNo" class="formInput" type="text" />
              </FormField>

              <FormField label="Comment" error-key="comment" class="md:col-span-2">
                <input v-model.trim="form.comment" class="formInput" type="text" />
              </FormField>
            </div>
          </div>

          <div class="border-t border-[#E5E7EB] px-[34px] py-[32px]">
            <h2 class="mb-[30px] text-[18px] font-semibold text-[#1F2937]">Victim</h2>

            <div class="grid grid-cols-1 gap-x-[56px] gap-y-[28px] md:grid-cols-2">
              <FormField label="Name" error-key="victimName">
                <input v-model.trim="form.victimName" class="formInput" type="text" />
              </FormField>

              <FormField label="Phone No." error-key="victimPhone">
                <input v-model.trim="form.victimPhone" class="formInput" type="tel" />
              </FormField>

              <FormField label="Address" error-key="victimAddress" class="md:col-span-2">
                <input v-model.trim="form.victimAddress" class="formInput" type="text" />
              </FormField>

              <FormField label="Statement" error-key="victimStatement" class="md:col-span-2">
                <input v-model.trim="form.victimStatement" class="formInput" type="text" />
              </FormField>
            </div>
          </div>

          <div class="border-t border-[#E5E7EB] px-[34px] pb-[34px] pt-[32px]">
            <h2 class="mb-[30px] text-[18px] font-semibold text-[#1F2937]">Suspect</h2>

            <div class="grid grid-cols-1 gap-x-[56px] gap-y-[28px] md:grid-cols-2">
              <FormField label="Name" error-key="suspectName">
                <input v-model.trim="form.suspectName" class="formInput" type="text" />
              </FormField>

              <FormField label="Phone No." error-key="suspectPhone">
                <input v-model.trim="form.suspectPhone" class="formInput" type="tel" />
              </FormField>

              <FormField label="Address" error-key="suspectAddress" class="md:col-span-2">
                <input v-model.trim="form.suspectAddress" class="formInput" type="text" />
              </FormField>

              <div class="md:col-span-2">
                <label class="fieldLabel">Attach Evidence Files</label>

                <div
                  class="mt-[10px] flex min-h-[135px] cursor-pointer flex-col items-center justify-center rounded-[13px] border border-[#DBE7F4] bg-white px-4 text-center transition hover:border-[#061A8D]/40"
                  @click="triggerFilePicker"
                  @dragover.prevent
                  @drop.prevent="handleDrop"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    class="hidden"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf,.mp4,image/jpeg,image/png,application/pdf,video/mp4"
                    @change="handleFileChange"
                  />

                  <div class="inline-flex items-center gap-2 rounded-[6px] border border-[#D6D8E7] px-4 py-2 text-[13px] text-[#64748B]">
                    <Upload class="h-4 w-4" />
                    <span>
                      Drag &amp; drop file here or
                      <span class="font-semibold text-[#061A8D]">Browse</span>
                    </span>
                  </div>

                  <p class="mt-4 text-[13px] text-[#6B7280]">JPG, PNG, PDF, MP4, etc</p>
                </div>

                <div v-if="evidenceFiles.length" class="mt-3 space-y-2">
                  <div
                    v-for="file in evidenceFiles"
                    :key="file.id"
                    class="flex items-center justify-between rounded-lg border border-[#DBE7F4] px-3 py-2 text-[13px] text-[#374151]"
                  >
                    <span class="truncate">{{ file.name }}</span>
                    <button type="button" class="text-red-600" @click="removeFile(file.id)">Remove</button>
                  </div>
                </div>

                <p v-if="errors.evidenceFiles" class="mt-1 text-[12px] font-medium text-red-600">
                  {{ errors.evidenceFiles }}
                </p>
              </div>

              <FormField label="Description" error-key="evidenceDescription" class="md:col-span-2">
                <input
                  v-model.trim="form.evidenceDescription"
                  class="formInput"
                  type="text"
                  placeholder="Input evidence details"
                />
              </FormField>
            </div>

            <p v-if="message" class="mt-5 text-[13px] font-semibold" :class="messageTone">
              {{ message }}
            </p>

            <div class="mt-[24px] flex items-center gap-[14px]">
              <button type="submit" class="saveBtn">Save</button>
              <button type="button" class="cancelBtn" @click="cancel">Cancel</button>
            </div>
          </div>
        </form>
      </section>
    </Motion>
  </OfficerLayout>
</template>

<script setup>
import { defineComponent, h, onMounted, reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { Motion } from "@motionone/vue"
import { CalendarDays, Upload } from "lucide-vue-next"
import OfficerLayout from "../layout/Layout.vue"

const router = useRouter()

const user = ref({
  name: "James King",
  role: "Officer",
  avatarUrl: "",
})

const KEY = "ncrms_officer_incident_records"
const EVT = "ncrms-officer-incident-records-updated"

const dateInput = ref(null)
const fileInput = ref(null)
const evidenceFiles = ref([])
const errors = reactive({})
const message = ref("")
const messageTone = ref("text-red-600")

const form = reactive({
  incidentId: "",
  incidentType: "",
  zone: "",
  division: "",
  stateCommand: "",
  lga: "",
  status: "",
  dateOfIncident: "",
  leadOfficer: "",
  badgeNo: "",
  comment: "",
  victimName: "",
  victimPhone: "",
  victimAddress: "",
  victimStatement: "",
  suspectName: "",
  suspectPhone: "",
  suspectAddress: "",
  evidenceDescription: "",
})

function safeRead() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "[]")
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function safeWrite(next) {
  try {
    localStorage.setItem(KEY, JSON.stringify(Array.isArray(next) ? next : []))
    window.dispatchEvent(new CustomEvent(EVT))
    return true
  } catch {
    return false
  }
}

function uid(prefix = "inc") {
  return crypto?.randomUUID?.() || `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function nextIncidentId(existing) {
  const nums = existing
    .map((item) => String(item.incidentId || "").match(/INC-(\d+)/i)?.[1])
    .filter(Boolean)
    .map(Number)

  const next = nums.length ? Math.max(...nums) + 1 : existing.length + 1
  return `INC-${String(next).padStart(3, "0")}`
}

function openDatePicker() {
  const input = dateInput.value
  if (!input) return

  if (typeof input.showPicker === "function") {
    input.showPicker()
  } else {
    input.focus()
    input.click()
  }
}

function triggerFilePicker() {
  fileInput.value?.click()
}

function normalizeFile(file) {
  return {
    id: uid("file"),
    name: file.name,
    type: file.type || "unknown",
    size: file.size,
  }
}

function validateFiles(files) {
  const allowed = ["image/jpeg", "image/png", "application/pdf", "video/mp4"]
  const maxSize = 10 * 1024 * 1024

  const safe = []

  Array.from(files || []).forEach((file) => {
    const extensionAllowed = /\.(jpg|jpeg|png|pdf|mp4)$/i.test(file.name)

    if (!allowed.includes(file.type) && !extensionAllowed) {
      errors.evidenceFiles = "Only JPG, PNG, PDF, and MP4 files are allowed."
      return
    }

    if (file.size > maxSize) {
      errors.evidenceFiles = "Each evidence file must be 10MB or less."
      return
    }

    safe.push(normalizeFile(file))
  })

  return safe
}

function handleFileChange(event) {
  errors.evidenceFiles = ""
  const selected = validateFiles(event.target.files)
  evidenceFiles.value = [...evidenceFiles.value, ...selected]

  if (fileInput.value) fileInput.value.value = ""
}

function handleDrop(event) {
  errors.evidenceFiles = ""
  const selected = validateFiles(event.dataTransfer.files)
  evidenceFiles.value = [...evidenceFiles.value, ...selected]
}

function removeFile(id) {
  evidenceFiles.value = evidenceFiles.value.filter((file) => file.id !== id)
}

function clearErrors() {
  Object.keys(errors).forEach((key) => delete errors[key])
}

function isPhone(value) {
  if (!value) return true
  return /^[0-9+\-\s]{7,20}$/.test(value)
}

function validate() {
  clearErrors()

  const required = [
    ["incidentId", "Incident ID is required."],
    ["incidentType", "Incident type is required."],
    ["zone", "Zone is required."],
    ["division", "Division is required."],
    ["stateCommand", "State is required."],
    ["lga", "LGA is required."],
    ["status", "Status is required."],
    ["dateOfIncident", "Date of incident is required."],
    ["leadOfficer", "Lead officer is required."],
    ["badgeNo", "Badge number is required."],
    ["victimName", "Victim name is required."],
    ["victimAddress", "Victim address is required."],
    ["victimStatement", "Victim statement is required."],
    ["suspectName", "Suspect name is required."],
    ["suspectAddress", "Suspect address is required."],
  ]

  required.forEach(([key, error]) => {
    if (!String(form[key] || "").trim()) errors[key] = error
  })

  if (!isPhone(form.victimPhone)) errors.victimPhone = "Enter a valid victim phone number."
  if (!isPhone(form.suspectPhone)) errors.suspectPhone = "Enter a valid suspect phone number."

  const duplicate = safeRead().some(
    (item) => String(item.incidentId).toLowerCase() === String(form.incidentId).toLowerCase()
  )

  if (duplicate) errors.incidentId = "Incident ID already exists."

  return Object.keys(errors).length === 0
}

function save() {
  message.value = ""

  if (!validate()) {
    message.value = "Please complete all required fields correctly."
    messageTone.value = "text-red-600"
    return
  }

  const payload = {
    id: uid(),
    incidentId: form.incidentId,
    name: form.victimName,
    fullName: form.victimName,
    incidentType: form.incidentType,
    department: form.division,
    division: form.division,
    zone: form.zone,
    stateCommand: form.stateCommand,
    lga: form.lga,
    status: form.status,
    dateOfIncident: form.dateOfIncident.includes("T")
      ? form.dateOfIncident.split("T")[0]
      : form.dateOfIncident,
    description: form.comment || form.victimStatement || "—",
    leadOfficer: form.leadOfficer,
    badgeNo: form.badgeNo,
    comment: form.comment,
    victim: {
      name: form.victimName,
      phone: form.victimPhone,
      address: form.victimAddress,
      statement: form.victimStatement,
    },
    suspect: {
      name: form.suspectName,
      phone: form.suspectPhone,
      address: form.suspectAddress,
    },
    evidenceFiles: evidenceFiles.value,
    evidenceDescription: form.evidenceDescription,
    closureReason: "",
    closedAt: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const saved = safeWrite([payload, ...safeRead()])

  if (!saved) {
    message.value = "Incident record could not be saved in this browser session."
    messageTone.value = "text-red-600"
    return
  }

  router.push("/officer/incident-records")
}

function cancel() {
  router.push("/officer/incident-records")
}

const FormField = defineComponent({
  name: "FormField",
  props: {
    label: { type: String, required: true },
    errorKey: { type: String, default: "" },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h("div", attrs, [
        h("label", { class: "fieldLabel" }, props.label),
        slots.default?.(),
        props.errorKey && errors[props.errorKey]
          ? h("p", { class: "mt-1 text-[12px] font-medium text-red-600" }, errors[props.errorKey])
          : null,
      ])
  },
})

onMounted(() => {
  const existing = safeRead()
  form.incidentId = nextIncidentId(existing)
  form.dateOfIncident = "2025-01-12T00:00"
  form.status = "Open"
})
</script>

<style scoped>
.fieldLabel {
  display: block;
  margin-bottom: 10px;
  color: #2b2b2b;
  font-size: 14px;
  font-weight: 500;
}

.formInput {
  height: 45px;
  width: 100%;
  border-radius: 14px;
  border: 1px solid #dbe7f4;
  background: #ffffff;
  padding: 0 18px;
  color: #1f2937;
  font-size: 14px;
  outline: none;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.formInput::placeholder {
  color: #c5cbd6;
}

.formInput:focus {
  border-color: #061a8d;
  box-shadow: 0 0 0 4px rgba(6, 26, 141, 0.08);
}

.formInput[readonly] {
  color: #6f8bc5;
}

.saveBtn {
  height: 38px;
  border-radius: 7px;
  background: #061a8d;
  padding: 0 25px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  transition:
    opacity 160ms ease,
    transform 160ms ease;
}

.saveBtn:hover {
  opacity: 0.95;
}

.saveBtn:active {
  transform: scale(0.98);
}

.cancelBtn {
  height: 38px;
  border-radius: 7px;
  border: 1px solid #d7dce5;
  background: #ffffff;
  padding: 0 20px;
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  transition: background 160ms ease;
}

.cancelBtn:hover {
  background: #f9fafb;
}
</style>