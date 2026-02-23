<!-- src/pages/roles/officer/officer_pages/CriminalRecordsView.vue -->
<template>
    <OfficerLayout :user="user">
      <Motion :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: 0.35 }">
        <section class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
          <div class="border-b border-black/10 px-8 py-6">
            <h1 class="text-[20px] font-semibold text-black">View Criminal Records</h1>
          </div>
  
          <div class="px-8 py-8">
            <div class="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-3">
              <div>
                <label class="label">Criminal Record ID</label>
                <input v-model="form.criminalRecordId" class="input" disabled />
              </div>
  
              <div>
                <label class="label">Linked Incident ID</label>
                <div class="selectLike">
                  <span class="text-[14px] text-[#5B7BE0]">{{ form.linkedIncidentId || "—" }}</span>
                  <ChevronDown class="h-4 w-4 text-black/45" />
                </div>
              </div>
  
              <div>
                <label class="label">Full Name</label>
                <input v-model="form.fullName" class="input" disabled />
              </div>
  
              <div>
                <label class="label">Crime Type</label>
                <div class="selectLike">
                  <span class="text-[14px] text-[#5B7BE0]">{{ form.crimeType || "—" }}</span>
                  <ChevronDown class="h-4 w-4 text-black/45" />
                </div>
              </div>
  
              <div>
                <label class="label">Zone</label>
                <div class="selectLike">
                  <span class="text-[14px] text-[#5B7BE0]">{{ form.zone || "—" }}</span>
                  <ChevronDown class="h-4 w-4 text-black/45" />
                </div>
              </div>
  
              <div>
                <label class="label">State Command</label>
                <div class="selectLike">
                  <span class="text-[14px] text-[#5B7BE0]">{{ form.stateCommand || "—" }}</span>
                  <ChevronDown class="h-4 w-4 text-black/45" />
                </div>
              </div>
  
              <div>
                <label class="label">LGA</label>
                <div class="selectLike">
                  <span class="text-[14px] text-[#5B7BE0]">{{ form.lga || "—" }}</span>
                  <ChevronDown class="h-4 w-4 text-black/45" />
                </div>
              </div>
  
              <div>
                <label class="label">Division</label>
                <div class="selectLike">
                  <span class="text-[14px] text-[#5B7BE0]">{{ form.division || "—" }}</span>
                  <ChevronDown class="h-4 w-4 text-black/45" />
                </div>
              </div>
  
              <div>
                <label class="label">Status</label>
                <div class="selectLike">
                  <span class="text-[14px] text-[#5B7BE0]">{{ form.status || "—" }}</span>
                  <ChevronDown class="h-4 w-4 text-black/45" />
                </div>
              </div>
  
              <div>
                <label class="label">Date Reported</label>
                <input v-model="form.dateReported" class="input" disabled />
              </div>
  
              <div class="md:col-span-2">
                <label class="label">Case Summary</label>
                <input v-model="form.caseSummary" class="input" disabled />
              </div>
  
              <div class="md:col-span-3 pt-2">
                <button
                  type="button"
                  class="h-11 rounded-xl px-10 text-[14px] font-semibold text-white
                         bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                         shadow-sm hover:opacity-95 active:opacity-90"
                  @click="goBack"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </section>
      </Motion>
    </OfficerLayout>
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { ChevronDown } from "lucide-vue-next"
  import OfficerLayout from "../layout/Layout.vue"
  
  const router = useRouter()
  const route = useRoute()
  
  const user = ref({
    name: "James King",
    role: "Officer",
    avatarUrl: "",
  })
  
  const CR_KEY = "ncrms_officer_criminal_records"
  
  function safeRead() {
    try {
      const raw = localStorage.getItem(CR_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  
  const form = ref({
    id: "",
    criminalRecordId: "",
    linkedIncidentId: "",
    fullName: "",
    crimeType: "",
    zone: "",
    stateCommand: "",
    lga: "",
    division: "",
    status: "",
    dateReported: "",
    caseSummary: "",
  })
  
  function load() {
    const id = String(route.params.id || "")
    const found = safeRead().find((x) => x.id === id)
    if (!found) {
      router.replace("/officer/criminal-records")
      return
    }
    form.value = { ...found }
  }
  
  function goBack() {
    router.push({ path: "/officer/criminal-records" })
  }
  
  onMounted(load)
  </script>
  
  <style scoped>
  .label {
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.8);
  }
  .input {
    width: 100%;
    height: 54px;
    border-radius: 16px;
    border: 1px solid rgba(59, 130, 246, 0.22);
    background: #fff;
    padding: 0 18px;
    font-size: 14px;
    color: rgba(59, 130, 246, 0.9);
    outline: none;
  }
  .input:disabled {
    opacity: 1;
  }
  .selectLike {
    width: 100%;
    height: 54px;
    border-radius: 16px;
    border: 1px solid rgba(59, 130, 246, 0.22);
    background: #fff;
    padding: 0 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  </style>
  