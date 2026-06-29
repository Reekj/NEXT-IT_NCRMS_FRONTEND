<!-- src/pages/roles/officer/officer_pages/CaseEdit.vue -->
<template>
    <OfficerLayout :user="user">
      <Motion tag="div" :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: 0.35 }">
        <section class="mx-auto w-full max-w-[980px] overflow-hidden rounded-[14px] border border-[#D8D8D8] bg-white">
          <div class="border-b border-[#E5E7EB] px-[27px] py-[20px]">
            <h1 class="text-[20px] font-semibold text-[#1F2937]">Edit Case</h1>
          </div>
  
          <form class="px-[44px] py-[32px]" @submit.prevent="updateCase">
            <div class="grid grid-cols-1 gap-x-[56px] gap-y-[28px] md:grid-cols-2">
              <Field label="Criminal Record ID"><input v-model.trim="form.criminalRecordId" class="formInput" /></Field>
              <Field label="Full Name"><input v-model.trim="form.fullName" class="formInput" /></Field>
              <Field label="Crime Type"><input v-model.trim="form.crimeType" class="formInput" /></Field>
              <Field label="Zone"><input v-model.trim="form.zone" class="formInput" /></Field>
              <Field label="State Command"><input v-model.trim="form.stateCommand" class="formInput" /></Field>
              <Field label="Department"><input v-model.trim="form.department" class="formInput" /></Field>
              <Field label="Division"><input v-model.trim="form.division" class="formInput" /></Field>
              <Field label="LGA"><input v-model.trim="form.lga" class="formInput" /></Field>
              <Field label="NIN"><input v-model.trim="form.nin" class="formInput" /></Field>
              <Field label="Date Reported"><input v-model.trim="form.dateReportedDisplay" class="formInput" /></Field>
              <Field label="Status"><input v-model.trim="form.personalStatus" class="formInput" /></Field>
              <Field label="Complexion"><input v-model.trim="form.complexion" class="formInput" /></Field>
              <Field label="Distinguishing Marks"><input v-model.trim="form.distinguishingMarks" class="formInput" /></Field>
              <Field label="Address"><input v-model.trim="form.address" class="formInput" /></Field>
              <Field label="Date of Birth"><input v-model.trim="form.dateOfBirthDisplay" class="formInput" /></Field>
              <Field label="Height"><input v-model.trim="form.height" class="formInput" /></Field>
  
              <Field label="Status">
                <div class="relative">
                  <select v-model="form.status" class="formInput appearance-none pr-12 text-[#6F8BC5]">
                    <option>Open</option>
                    <option>Closed</option>
                    <option>Archived</option>
                    <option>Under Investigation</option>
                  </select>
                  <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A94A6]" />
                </div>
              </Field>
  
              <Field label="Case Officer">
                <div class="relative">
                  <select v-model="form.caseOfficer" class="formInput appearance-none pr-12 text-[#6F8BC5]">
                    <option>Officer John</option>
                    <option>James King</option>
                    <option>Micheal Jackson</option>
                    <option>Officer Helen</option>
                  </select>
                  <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A94A6]" />
                </div>
              </Field>
  
              <Field label="Description" class="md:col-span-2">
                <textarea v-model.trim="form.description" class="textareaInput" />
              </Field>
  
              <div class="md:col-span-2">
                <label class="fieldLabel">Photo</label>
                <div class="flex h-[45px] w-full max-w-[365px] items-center rounded-[7px] border border-[#AFAFAF] bg-white px-3">
                  <button type="button" class="chooseBtn" @click="photoInput?.click()">Choose File</button>
                  <span class="ml-3 truncate text-[13px] text-[#9B9B9B]">{{ form.photoName || "Upload File" }}</span>
                  <input ref="photoInput" type="file" class="hidden" accept="image/png,image/jpeg,image/webp" @change="handlePhoto" />
                </div>
              </div>
  
              <div class="md:col-span-2">
                <label class="fieldLabel">Evidence:</label>
                <div class="mt-[10px] flex min-h-[135px] cursor-pointer flex-col items-center justify-center rounded-[13px] border border-[#DBE7F4] bg-white px-4 text-center" @click="fileInput?.click()" @dragover.prevent @drop.prevent="handleDrop">
                  <input ref="fileInput" type="file" class="hidden" multiple accept=".jpg,.jpeg,.png,.pdf,.mp4,image/jpeg,image/png,application/pdf,video/mp4" @change="handleEvidence" />
                  <div class="inline-flex items-center gap-2 rounded-[6px] border border-[#D6D8E7] px-4 py-2 text-[13px] text-[#64748B]">
                    <Upload class="h-4 w-4" />
                    <span>Drag &amp; drop file here or <span class="font-semibold text-[#061A8D]">Browse</span></span>
                  </div>
                  <p class="mt-4 text-[13px] text-[#6B7280]">JPG, PNG, PDF, MP4, etc</p>
                </div>
              </div>
            </div>
  
            <div class="mt-[34px] flex items-center gap-3">
              <button type="submit" class="updateBtn">Update</button>
              <button type="button" class="cancelBtn" @click="cancel">Cancel</button>
            </div>
          </form>
        </section>
      </Motion>
    </OfficerLayout>
  </template>
  
  <script setup>
  import { defineComponent, h, onMounted, reactive, ref } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { ChevronDown, Upload } from "lucide-vue-next"
  import OfficerLayout from "../layout/Layout.vue"
  
  const router = useRouter()
  const route = useRoute()
  
  const user = ref({ name: "James King", role: "Officer", avatarUrl: "" })
  const KEY = "ncrms_officer_cases"
  const EVT = "ncrms-officer-cases-updated"
  
  const photoInput = ref(null)
  const fileInput = ref(null)
  const currentId = String(route.params.id || "")
  
  const form = reactive({
    id: "",
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
    dateReportedDisplay: "",
    personalStatus: "",
    complexion: "",
    distinguishingMarks: "",
    address: "",
    dateOfBirth: "",
    dateOfBirthDisplay: "",
    height: "",
    status: "",
    caseOfficer: "",
    description: "",
    photoName: "",
    photoUrl: "",
    evidenceFiles: [],
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
    localStorage.setItem(KEY, JSON.stringify(Array.isArray(next) ? next : []))
    window.dispatchEvent(new CustomEvent(EVT))
  }
  
  function fileToBase64(file) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "")
      reader.onerror = () => resolve("")
      reader.readAsDataURL(file)
    })
  }
  
  function formatDateDisplay(value) {
    if (!value) return ""
    const [y, m, d] = String(value).split("-")
    if (!y || !m || !d) return value
    return `${m}/${d}/${String(y).slice(2)} 2:00pm`
  }
  
  function loadCase() {
    const found = safeRead().find((item) => String(item.id) === currentId || String(item.caseId) === currentId)
  
    if (!found) {
      router.replace("/officer/cases")
      return
    }
  
    Object.assign(form, {
      id: found.id,
      caseId: found.caseId || "",
      criminalRecordId: found.criminalRecordId || "CR-001",
      fullName: found.fullName || "Micheal Jackson",
      crimeType: found.crimeType || "Fraud",
      zone: found.zone || "Zone 1",
      stateCommand: found.stateCommand || "Lagos",
      department: found.department || "Operations",
      division: found.division || "Operations",
      lga: found.lga || "Ikeja",
      nin: found.nin || "12343432345",
      dateReported: found.dateReported || "2026-08-03",
      dateReportedDisplay: formatDateDisplay(found.dateReported || "2026-08-03"),
      personalStatus: found.personalStatus || "Closed",
      complexion: found.complexion || "Lightskinned",
      distinguishingMarks: found.distinguishingMarks || "Tattoos on the left arm",
      address: found.address || "No 17, Adewale street, Lagos, Nigeria.",
      dateOfBirth: found.dateOfBirth || "1989-01-12",
      dateOfBirthDisplay: found.dateOfBirthDisplay || "Lightskinned",
      height: found.height || "170.18cm",
      status: found.status || "Archived",
      caseOfficer: found.caseOfficer || "Officer John",
      description: found.description || "",
      photoName: found.photoName || "michealjackson.dp",
      photoUrl: found.photoUrl || "",
      evidenceFiles: Array.isArray(found.evidenceFiles) ? found.evidenceFiles : [],
    })
  }
  
  async function handlePhoto(event) {
    const file = event.target.files?.[0]
    if (!file) return
    form.photoName = file.name
    form.photoUrl = await fileToBase64(file)
  }
  
  async function normalizeFile(file) {
    return {
      id: crypto?.randomUUID?.() || `file-${Date.now()}-${Math.random()}`,
      name: file.name,
      type: file.type,
      size: file.size,
      dataUrl: await fileToBase64(file),
    }
  }
  
  async function addEvidence(files) {
    const selected = await Promise.all(Array.from(files || []).map(normalizeFile))
    form.evidenceFiles = [...form.evidenceFiles, ...selected]
  }
  
  async function handleEvidence(event) {
    await addEvidence(event.target.files)
    if (fileInput.value) fileInput.value.value = ""
  }
  
  async function handleDrop(event) {
    await addEvidence(event.dataTransfer.files)
  }
  
  function updateCase() {
    const next = safeRead().map((item) =>
      String(item.id) === currentId || String(item.caseId) === currentId
        ? {
            ...item,
            ...form,
            updatedAt: new Date().toISOString(),
          }
        : item
    )
  
    safeWrite(next)
    router.push("/officer/cases")
  }
  
  function cancel() {
    router.push("/officer/cases")
  }
  
  const Field = defineComponent({
    name: "Field",
    props: { label: { type: String, required: true } },
    setup(props, { slots, attrs }) {
      return () => h("div", attrs, [h("label", { class: "fieldLabel" }, props.label), slots.default?.()])
    },
  })
  
  onMounted(loadCase)
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
    background: #fff;
    padding: 0 18px;
    color: #6f8bc5;
    font-size: 14px;
    font-weight: 700;
    outline: none;
  }
  .textareaInput {
    min-height: 86px;
    width: 100%;
    resize: none;
    border-radius: 14px;
    border: 1px solid #dbe7f4;
    background: #fff;
    padding: 18px;
    color: #8a9ab8;
    font-size: 13px;
    font-weight: 700;
    outline: none;
  }
  .chooseBtn {
    height: 25px;
    border-radius: 2px;
    border: 1px solid #5b6470;
    background: #eef0f3;
    padding: 0 12px;
    font-size: 12px;
    color: #3f4652;
  }
  .updateBtn {
    height: 38px;
    border-radius: 7px;
    background: #061a8d;
    padding: 0 18px;
    color: white;
    font-size: 14px;
    font-weight: 700;
  }
  .cancelBtn {
    height: 38px;
    border-radius: 7px;
    border: 1px solid #d7dce5;
    background: #fff;
    padding: 0 18px;
    color: #111827;
    font-size: 14px;
    font-weight: 600;
  }
  </style>