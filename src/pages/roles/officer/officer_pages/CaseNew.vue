<!-- src/pages/roles/officer/officer_pages/CaseNew.vue -->
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
            <h1 class="text-[20px] font-semibold text-[#1F2937]">Add New Case</h1>
          </div>
  
          <form autocomplete="off" class="px-[44px] py-[32px]" @submit.prevent="save">
            <div class="grid grid-cols-1 gap-x-[56px] gap-y-[28px] md:grid-cols-2">
              <FormField label="Case ID" error-key="caseId">
                <input v-model="form.caseId" readonly class="formInput text-[#6F8BC5]" />
              </FormField>
  
              <FormField label="Criminal Record ID" error-key="criminalRecordId">
                <input v-model.trim="form.criminalRecordId" class="formInput" />
              </FormField>
  
              <FormField label="Full Name" error-key="fullName">
                <input v-model.trim="form.fullName" class="formInput" />
              </FormField>
  
              <FormField label="Crime Type" error-key="crimeType">
                <input v-model.trim="form.crimeType" class="formInput" />
              </FormField>
  
              <FormField label="Zone" error-key="zone">
                <input v-model.trim="form.zone" class="formInput" />
              </FormField>
  
              <FormField label="State Command" error-key="stateCommand">
                <input v-model.trim="form.stateCommand" class="formInput" />
              </FormField>
  
              <FormField label="Department" error-key="department">
                <input v-model.trim="form.department" class="formInput" />
              </FormField>
  
              <FormField label="Division" error-key="division">
                <input v-model.trim="form.division" class="formInput" />
              </FormField>
  
              <FormField label="LGA" error-key="lga">
                <input v-model.trim="form.lga" class="formInput" />
              </FormField>
  
              <FormField label="NIN" error-key="nin">
                <input v-model.trim="form.nin" class="formInput" />
              </FormField>
  
              <FormField label="Date Reported" error-key="dateReported">
                <div class="relative">
                  <input
                    ref="dateReportedInput"
                    v-model="form.dateReported"
                    type="datetime-local"
                    class="formInput pr-12 text-[#6F8BC5]"
                  />
                  <button
                    type="button"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-black/65 transition hover:text-[#061A8D]"
                    aria-label="Open date picker"
                    @click="openPicker(dateReportedInput)"
                  >
                    <CalendarDays class="h-4 w-4" />
                  </button>
                </div>
              </FormField>
  
              <FormField label="Status" error-key="status">
                <input v-model.trim="form.status" class="formInput" />
              </FormField>
  
              <FormField label="Complexion" error-key="complexion">
                <input v-model.trim="form.complexion" class="formInput" />
              </FormField>
  
              <FormField label="Distinguishing Marks" error-key="distinguishingMarks">
                <input v-model.trim="form.distinguishingMarks" class="formInput" />
              </FormField>
  
              <FormField label="Address" error-key="address">
                <input v-model.trim="form.address" class="formInput" />
              </FormField>
  
              <FormField label="Date of Birth" error-key="dateOfBirth">
                <div class="relative">
                  <input
                    ref="dobInput"
                    v-model="form.dateOfBirth"
                    type="date"
                    class="formInput pr-12"
                  />
                  <button
                    type="button"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-black/65 transition hover:text-[#061A8D]"
                    aria-label="Open date picker"
                    @click="openPicker(dobInput)"
                  >
                    <!-- <CalendarDays class="h-4 w-4" /> -->
                  </button>
                </div>
              </FormField>
  
              <FormField label="Height" error-key="height">
                <input v-model.trim="form.height" class="formInput" />
              </FormField>
  
              <FormField label="Status" error-key="caseStatus">
                <div class="relative">
                  <select v-model="form.caseStatus" class="formInput appearance-none pr-12 text-[#6F8BC5]">
                    <option value="" disabled>Select</option>
                    <option>Open</option>
                    <option>Closed</option>
                    <option>Archived</option>
                    <option>Under Investigation</option>
                  </select>
                  <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A94A6]" />
                </div>
              </FormField>
  
              <FormField label="Officer" error-key="caseOfficer">
                <div class="relative">
                  <select v-model="form.caseOfficer" class="formInput appearance-none pr-12 text-[#6F8BC5]">
                    <option value="" disabled>Select</option>
                    <option>Officer John</option>
                    <option>James King</option>
                    <option>Micheal Jackson</option>
                    <option>Officer Helen</option>
                  </select>
                  <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A94A6]" />
                </div>
              </FormField>
  
              <FormField label="Description" error-key="description" class="md:col-span-2">
                <input v-model.trim="form.description" class="formInput" />
              </FormField>
  
              <div class="md:col-span-2">
                <label class="fieldLabel">Photo</label>
  
                <div class="flex h-[45px] w-full max-w-[365px] items-center rounded-[7px] border border-[#AFAFAF] bg-white px-3">
                  <button
                    type="button"
                    class="h-[25px] rounded-[2px] border border-[#5B6470] bg-[#EEF0F3] px-3 text-[12px] font-medium text-[#3F4652]"
                    @click="photoInput?.click()"
                  >
                    Choose File
                  </button>
  
                  <span class="ml-3 truncate text-[13px] text-[#9B9B9B]">
                    {{ form.photoName || "Upload File" }}
                  </span>
  
                  <input
                    ref="photoInput"
                    type="file"
                    class="hidden"
                    accept="image/png,image/jpeg,image/webp"
                    @change="handlePhoto"
                  />
                </div>
  
                <p v-if="errors.photo" class="mt-1 text-[12px] font-medium text-red-600">
                  {{ errors.photo }}
                </p>
              </div>
  
              <div class="md:col-span-2">
                <label class="fieldLabel">Evidence:</label>
  
                <div
                  class="mt-[10px] flex min-h-[135px] cursor-pointer flex-col items-center justify-center rounded-[13px] border border-[#DBE7F4] bg-white px-4 text-center transition hover:border-[#061A8D]/40"
                  @click="fileInput?.click()"
                  @dragover.prevent
                  @drop.prevent="handleDrop"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    class="hidden"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf,.mp4,image/jpeg,image/png,application/pdf,video/mp4"
                    @change="handleEvidence"
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
            </div>
  
            <p v-if="message" class="mt-5 text-[13px] font-semibold" :class="messageTone">
              {{ message }}
            </p>
  
            <div class="mt-[34px] flex items-center gap-3">
              <button type="submit" class="saveBtn">Save</button>
              <button type="button" class="cancelBtn" @click="cancel">Cancel</button>
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
  import { CalendarDays, ChevronDown, Upload } from "lucide-vue-next"
  import OfficerLayout from "../layout/Layout.vue"
  
  const router = useRouter()
  
  const user = ref({
    name: "James King",
    role: "Officer",
    avatarUrl: "",
  })
  
  const KEY = "ncrms_officer_cases"
  const EVT = "ncrms-officer-cases-updated"
  
  const dateReportedInput = ref(null)
  const dobInput = ref(null)
  const photoInput = ref(null)
  const fileInput = ref(null)
  
  const evidenceFiles = ref([])
  const errors = reactive({})
  const message = ref("")
  const messageTone = ref("text-red-600")
  
  const form = reactive({
    caseId: "",
    criminalRecordId: "",
    fullName: "",
    crimeType: "",
    zone: "",
    stateCommand: "",
    department: "",
    division: "",
    lga: "",
    nin: "",
    dateReported: "",
    status: "",
    complexion: "",
    distinguishingMarks: "",
    address: "",
    dateOfBirth: "",
    height: "",
    caseStatus: "",
    caseOfficer: "",
    description: "",
    photoName: "",
    photoUrl: "",
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
  
  function uid(prefix = "case") {
    return crypto?.randomUUID?.() || `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`
  }
  
  function nextCaseId(existing) {
    const nums = existing
      .map((item) => String(item.caseId || "").match(/^C-(\d+)$/i)?.[1])
      .filter(Boolean)
      .map(Number)
  
    const next = nums.length ? Math.max(...nums) + 1 : existing.length + 1
    return `C-${String(next).padStart(3, "0")}`
  }
  
  function openPicker(inputRef) {
    const input = inputRef?.value
    if (!input) return
  
    if (typeof input.showPicker === "function") {
      input.showPicker()
    } else {
      input.focus()
      input.click()
    }
  }
  
  function clearErrors() {
    Object.keys(errors).forEach((key) => delete errors[key])
  }
  
  function isValidFile(file) {
    const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf", "video/mp4"]
    const extensionAllowed = /\.(jpg|jpeg|png|webp|pdf|mp4)$/i.test(file.name)
    const maxSize = 10 * 1024 * 1024
  
    if (!allowed.includes(file.type) && !extensionAllowed) return false
    if (file.size > maxSize) return false
  
    return true
  }
  
  function fileToBase64(file) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "")
      reader.onerror = () => resolve("")
      reader.readAsDataURL(file)
    })
  }
  
  async function normalizeFile(file) {
    const dataUrl = await fileToBase64(file)
  
    return {
      id: uid("file"),
      name: file.name,
      type: file.type || "unknown",
      size: file.size,
      dataUrl,
    }
  }
  
  async function addEvidenceFiles(files) {
    errors.evidenceFiles = ""
  
    const selected = Array.from(files || [])
    const valid = selected.filter(isValidFile)
  
    if (selected.length !== valid.length) {
      errors.evidenceFiles = "Only JPG, PNG, WEBP, PDF, and MP4 files up to 10MB are allowed."
    }
  
    const normalized = await Promise.all(valid.map(normalizeFile))
    evidenceFiles.value = [...evidenceFiles.value, ...normalized]
  }
  
  async function handleEvidence(event) {
    await addEvidenceFiles(event.target.files)
    if (fileInput.value) fileInput.value.value = ""
  }
  
  async function handleDrop(event) {
    await addEvidenceFiles(event.dataTransfer.files)
  }
  
  function removeFile(id) {
    evidenceFiles.value = evidenceFiles.value.filter((file) => file.id !== id)
  }
  
  async function handlePhoto(event) {
    errors.photo = ""
  
    const file = event.target.files?.[0]
    if (!file) return
  
    const allowed = ["image/jpeg", "image/png", "image/webp"]
    const extensionAllowed = /\.(jpg|jpeg|png|webp)$/i.test(file.name)
    const maxSize = 2 * 1024 * 1024
  
    if ((!allowed.includes(file.type) && !extensionAllowed) || file.size > maxSize) {
      errors.photo = "Photo must be JPG, PNG, or WEBP and 2MB or less."
      event.target.value = ""
      return
    }
  
    form.photoName = file.name
    form.photoUrl = await fileToBase64(file)
  }
  
  function isPhone(value) {
    if (!value) return true
    return /^[0-9+\-\s]{7,20}$/.test(value)
  }
  
  function validate() {
    clearErrors()
  
    const required = [
      ["caseId", "Case ID is required."],
      ["criminalRecordId", "Criminal Record ID is required."],
      ["fullName", "Full name is required."],
      ["crimeType", "Crime type is required."],
      ["zone", "Zone is required."],
      ["stateCommand", "State Command is required."],
      ["department", "Department is required."],
      ["division", "Division is required."],
      ["lga", "LGA is required."],
      ["nin", "NIN is required."],
      ["dateReported", "Date reported is required."],
      ["status", "Status is required."],
      ["complexion", "Complexion is required."],
      ["distinguishingMarks", "Distinguishing marks are required."],
      ["address", "Address is required."],
      ["dateOfBirth", "Date of birth is required."],
      ["height", "Height is required."],
      ["caseStatus", "Case status is required."],
      ["caseOfficer", "Officer is required."],
      ["description", "Description is required."],
    ]
  
    required.forEach(([key, error]) => {
      if (!String(form[key] || "").trim()) errors[key] = error
    })
  
    const duplicate = safeRead().some(
      (item) => String(item.caseId || "").toLowerCase() === String(form.caseId || "").toLowerCase()
    )
  
    if (duplicate) errors.caseId = "Case ID already exists."
  
    return Object.keys(errors).length === 0
  }
  
  function normalizeDate(value) {
    if (!value) return ""
    return String(value).includes("T") ? String(value).split("T")[0] : String(value)
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
      caseId: form.caseId,
      criminalRecordId: form.criminalRecordId,
      fullName: form.fullName,
      crimeType: form.crimeType,
      zone: form.zone,
      stateCommand: form.stateCommand,
      department: form.department,
      division: form.division,
      lga: form.lga,
      nin: form.nin,
      dateReported: normalizeDate(form.dateReported),
      status: form.caseStatus || form.status,
      personalStatus: form.status,
      complexion: form.complexion,
      distinguishingMarks: form.distinguishingMarks,
      address: form.address,
      dateOfBirth: normalizeDate(form.dateOfBirth),
      height: form.height,
      caseOfficer: form.caseOfficer,
      description: form.description,
      photoName: form.photoName,
      photoUrl: form.photoUrl,
      evidenceFiles: evidenceFiles.value,
      closeReason: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  
    const saved = safeWrite([payload, ...safeRead()])
  
    if (!saved) {
      message.value = "Case could not be saved in this browser session."
      messageTone.value = "text-red-600"
      return
    }
  
    router.push("/officer/cases")
  }
  
  function cancel() {
    router.push("/officer/cases")
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
    form.caseId = nextCaseId(existing)
    form.dateReported = "2026-08-03T14:00"
    form.status = "Open"
    form.caseStatus = "Open"
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
  }
  </style>