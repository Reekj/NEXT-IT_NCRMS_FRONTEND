<!-- src/pages/roles/officer/officer_pages/CaseView.vue -->
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
            <h1 class="text-[20px] font-semibold text-[#1F2937]">Case</h1>
          </div>
  
          <div class="px-[44px] py-[32px]">
            <div class="grid grid-cols-1 gap-x-[56px] gap-y-[28px] md:grid-cols-2">
              <Field label="Criminal Record ID">
                <input :value="record.criminalRecordId" readonly class="formInput" />
              </Field>
  
              <Field label="Full Name">
                <input :value="record.fullName" readonly class="formInput" />
              </Field>
  
              <Field label="Crime Type">
                <input :value="record.crimeType" readonly class="formInput" />
              </Field>
  
              <Field label="Zone">
                <input :value="record.zone" readonly class="formInput" />
              </Field>
  
              <Field label="State Command">
                <input :value="record.stateCommand" readonly class="formInput" />
              </Field>
  
              <Field label="Department">
                <input :value="record.department" readonly class="formInput" />
              </Field>
  
              <Field label="Division">
                <input :value="record.division" readonly class="formInput" />
              </Field>
  
              <Field label="LGA">
                <input :value="record.lga" readonly class="formInput" />
              </Field>
  
              <Field label="NIN">
                <input :value="record.nin" readonly class="formInput" />
              </Field>
  
              <Field label="Date Reported">
                <input :value="formatDateTime(record.dateReported)" readonly class="formInput" />
              </Field>
  
              <Field label="Status">
                <input :value="record.personalStatus || 'Closed'" readonly class="formInput" />
              </Field>
  
              <Field label="Complexion">
                <input :value="record.complexion" readonly class="formInput" />
              </Field>
  
              <Field label="Distinguishing Marks">
                <input :value="record.distinguishingMarks" readonly class="formInput" />
              </Field>
  
              <Field label="Address">
                <input :value="record.address" readonly class="formInput" />
              </Field>
  
              <Field label="Date of Birth">
                <input :value="formatDate(record.dateOfBirth)" readonly class="formInput" />
              </Field>
  
              <Field label="Height">
                <input :value="record.height" readonly class="formInput" />
              </Field>
  
              <Field label="Status">
                <input :value="record.status" readonly class="formInput" />
              </Field>
  
              <Field label="Case Officer">
                <input :value="record.caseOfficer" readonly class="formInput" />
              </Field>
  
              <Field label="Description" class="md:col-span-2">
                <textarea :value="record.description" readonly class="textareaInput" />
              </Field>
  
              <div class="md:col-span-2">
                <label class="fieldLabel">Photo</label>
  
                <div class="flex h-[45px] w-full max-w-[365px] items-center rounded-[7px] border border-[#AFAFAF] bg-white px-3">
                  <button type="button" class="chooseBtn">Choose File</button>
                  <span class="ml-3 truncate text-[13px] text-[#9B9B9B]">
                    {{ record.photoName || "michealjackson.dp" }}
                  </span>
                </div>
  
                <img
                  v-if="record.photoUrl"
                  :src="record.photoUrl"
                  class="mt-[18px] h-[310px] w-[210px] object-cover"
                  alt="Case person"
                />
  
                <img
                  v-else
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80"
                  class="mt-[18px] h-[310px] w-[210px] object-cover"
                  alt="Case person"
                />
              </div>
  
              <div class="md:col-span-2">
                <label class="fieldLabel">Evidence:</label>
  
                <div class="space-y-2">
                  <div
                    v-for="file in evidenceFiles"
                    :key="file.id"
                    class="flex min-h-[44px] items-center justify-between border-b border-[#E5E7EB] text-[14px]"
                  >
                    <div class="flex items-center gap-3">
                      <FileText class="h-4 w-4 text-black" />
                      <span>{{ file.name }}</span>
                    </div>
  
                    <button type="button" class="evidenceBtn" @click="viewEvidence(file)">
                      <Play v-if="file.type !== 'application/pdf'" class="h-4 w-4" />
                      {{ file.type === "application/pdf" ? "Download" : "View" }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
  
            <button type="button" class="backBtn mt-[42px]" @click="back">
              Back
            </button>
          </div>
        </section>
  
        <div
          v-if="selectedEvidence"
          class="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4"
          @click.self="selectedEvidence = null"
        >
          <section class="w-full max-w-[560px] rounded-lg bg-white p-6">
            <h2 class="text-[16px] font-semibold">{{ selectedEvidence.name }}</h2>
  
            <img
              v-if="isImage(selectedEvidence) && selectedEvidence.dataUrl"
              :src="selectedEvidence.dataUrl"
              class="mt-5 max-h-[380px] w-full object-contain"
            />
  
            <video
              v-else-if="isVideo(selectedEvidence) && selectedEvidence.dataUrl"
              :src="selectedEvidence.dataUrl"
              controls
              class="mt-5 max-h-[380px] w-full"
            />
  
            <iframe
              v-else-if="isPdf(selectedEvidence) && selectedEvidence.dataUrl"
              :src="selectedEvidence.dataUrl"
              class="mt-5 h-[420px] w-full"
            />
  
            <p v-else class="mt-4 text-[13px] text-[#6B7280]">
              Preview unavailable in this session.
            </p>
  
            <div class="mt-6 flex justify-end">
              <button class="backBtn" @click="selectedEvidence = null">Close</button>
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
  
  const KEY = "ncrms_officer_cases"
  
  const selectedEvidence = ref(null)
  
  const record = ref({
    id: "",
    caseId: "",
    criminalRecordId: "CR-001",
    fullName: "Micheal Jackson",
    crimeType: "Fraud",
    zone: "Zone 1",
    stateCommand: "Lagos",
    department: "Operations",
    division: "Operations",
    lga: "Ikeja",
    nin: "12343432345",
    dateReported: "2026-08-03",
    personalStatus: "Closed",
    status: "Archived",
    complexion: "Lightskinned",
    distinguishingMarks: "Tattoos on the left arm",
    address: "No 17, Adewale street, Lagos, Nigeria.",
    dateOfBirth: "1989-01-12",
    height: "170.18cm",
    caseOfficer: "Officer John",
    description:
      "The suspect was reported for involvement in fraudulent activities within Ikeja LGA, Lagos State. The incident was documented by the Operations Department and is currently under investigation. Relevant details and supporting information have been recorded for further review.",
    photoName: "michealjackson.dp",
    photoUrl: "",
    evidenceFiles: [],
  })
  
  const evidenceFiles = computed(() => {
    const saved = Array.isArray(record.value.evidenceFiles) ? record.value.evidenceFiles : []
  
    if (saved.length) return saved
  
    return [
      { id: "e1", name: "crime_scene_photo.jpg", type: "image/jpeg" },
      { id: "e2", name: "witness_statement.pdf", type: "application/pdf" },
      { id: "e3", name: "cctv_footage.mp4", type: "video/mp4" },
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
  
  function loadCase() {
    const id = decodeURIComponent(String(route.params.id || ""))
    const found = safeRead().find((item) => String(item.id) === id || String(item.caseId) === id)
  
    if (!found) return
  
    record.value = {
      ...record.value,
      ...found,
      division: found.division || found.department || "Operations",
      personalStatus: found.personalStatus || "Closed",
    }
  }
  
  function formatDate(value) {
    if (!value) return "—"
  
    const [year, month, day] = String(value).split("-")
    if (!year || !month || !day) return value
  
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
    return `${Number(day)} ${months[Number(month) - 1]} ${year}`
  }
  
  function formatDateTime(value) {
    if (!value) return "—"
    return `${formatDate(value)} 2:00pm`
  }
  
  function viewEvidence(file) {
    selectedEvidence.value = file
  }
  
  function isImage(file) {
    return String(file.type || "").startsWith("image/")
  }
  
  function isVideo(file) {
    return String(file.type || "").startsWith("video/")
  }
  
  function isPdf(file) {
    return String(file.type || "").includes("pdf")
  }
  
  function back() {
    router.push("/officer/cases")
  }
  
  const Field = defineComponent({
    name: "Field",
    props: {
      label: { type: String, required: true },
    },
    setup(props, { slots, attrs }) {
      return () =>
        h("div", attrs, [
          h("label", { class: "fieldLabel" }, props.label),
          slots.default?.(),
        ])
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
    color: #6f8bc5;
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
  
  .evidenceBtn {
    display: inline-flex;
    height: 34px;
    min-width: 88px;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border-radius: 7px;
    background: #16005b;
    padding: 0 16px;
    color: white;
    font-size: 13px;
  }
  
  .backBtn {
    height: 38px;
    border-radius: 7px;
    background: #061a8d;
    padding: 0 22px;
    color: white;
    font-size: 14px;
    font-weight: 700;
  }
  </style>