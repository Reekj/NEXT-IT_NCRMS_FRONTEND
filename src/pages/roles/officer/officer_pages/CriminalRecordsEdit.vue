<!-- src/pages/roles/officer/officer_pages/CriminalRecordsEdit.vue -->
<template>
    <OfficerLayout :user="user">
      <Motion :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: 0.35 }">
        <section class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
          <div class="border-b border-black/10 px-8 py-6">
            <h1 class="text-[20px] font-semibold text-black">Edit Criminal Records</h1>
          </div>
  
          <div class="px-8 py-8">
            <form class="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-3" @submit.prevent="update">
              <div>
                <label class="label">Criminal Record ID</label>
                <input v-model="form.criminalRecordId" class="input" />
              </div>
  
              <div>
                <label class="label">Linked Incident ID</label>
                <select v-model="form.linkedIncidentId" class="select">
                  <option value="" disabled>Select</option>
                  <option v-for="i in incidentOptions" :key="i" :value="i">{{ i }}</option>
                </select>
              </div>
  
              <div>
                <label class="label">Full Name</label>
                <input v-model="form.fullName" class="input" />
              </div>
  
              <div>
                <label class="label">Crime Type</label>
                <select v-model="form.crimeType" class="select">
                  <option value="" disabled>Select</option>
                  <option v-for="c in crimeTypes" :key="c" :value="c">{{ c }}</option>
                </select>
              </div>
  
              <div>
                <label class="label">Zone</label>
                <select v-model="form.zone" class="select">
                  <option value="" disabled>Select</option>
                  <option v-for="z in zones" :key="z" :value="z">{{ z }}</option>
                </select>
              </div>
  
              <div>
                <label class="label">State Command</label>
                <select v-model="form.stateCommand" class="select">
                  <option value="" disabled>Select</option>
                  <option v-for="s in states" :key="s" :value="s">{{ s }}</option>
                </select>
              </div>
  
              <div>
                <label class="label">LGA</label>
                <select v-model="form.lga" class="select">
                  <option value="" disabled>Select</option>
                  <option v-for="l in lgas" :key="l" :value="l">{{ l }}</option>
                </select>
              </div>
  
              <div>
                <label class="label">Division</label>
                <select v-model="form.division" class="select">
                  <option value="" disabled>Select</option>
                  <option v-for="d in divisions" :key="d" :value="d">{{ d }}</option>
                </select>
              </div>
  
              <div>
                <label class="label">Status</label>
                <select v-model="form.status" class="select">
                  <option value="" disabled>Select</option>
                  <option v-for="st in statuses" :key="st" :value="st">{{ st }}</option>
                </select>
              </div>
  
              <div>
                <label class="label">Date Reported</label>
                <input v-model="form.dateReported" class="input" />
              </div>
  
              <div class="md:col-span-2">
                <label class="label">Case Summary</label>
                <input v-model="form.caseSummary" class="input" />
              </div>
  
              <div class="md:col-span-3 pt-2">
                <div class="flex items-center gap-4">
                  <button
                    type="submit"
                    class="h-11 rounded-xl px-10 text-[14px] font-semibold text-white
                           bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                           shadow-sm hover:opacity-95 active:opacity-90"
                  >
                    Update
                  </button>
  
                  <button
                    type="button"
                    class="h-11 rounded-xl border border-black/10 bg-white px-8 text-[14px] font-medium text-black/80
                           shadow-sm hover:bg-black/[0.02] active:bg-black/[0.04]"
                    @click="cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </Motion>
    </OfficerLayout>
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import OfficerLayout from "../layout/Layout.vue"
  
  const router = useRouter()
  const route = useRoute()
  
  const user = ref({
    name: "James King",
    role: "Officer",
    avatarUrl: "",
  })
  
  const CR_KEY = "ncrms_officer_criminal_records"
  const CR_EVENT = "ncrms-officer-criminal-records-updated"
  
  function safeRead() {
    try {
      const raw = localStorage.getItem(CR_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  function safeWrite(next) {
    localStorage.setItem(CR_KEY, JSON.stringify(Array.isArray(next) ? next : []))
    window.dispatchEvent(new CustomEvent(CR_EVENT))
  }
  
  const incidentOptions = ["INC-0011", "INC-0012", "INC-0013"]
  const crimeTypes = ["Theft", "Fraud", "Assault", "Cybercrime", "Drug Abuse"]
  const zones = ["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5", "Zone 6", "Zone 7", "Zone 8", "Zone 9"]
  const states = ["Lagos", "Kano", "Abuja"]
  const lgas = ["Ikeja", "Nasarawa", "Eti-Osa"]
  const divisions = ["Operations", "Intelligence", "Forensic Services", "Special Crimes", "Legal & Compliance", "Criminal Investigation"]
  const statuses = ["Open", "Closed", "Under Investigation", "Archived"]
  
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
  
  function update() {
    const id = String(route.params.id || "")
    const next = safeRead().map((x) => (x.id === id ? { ...x, ...form.value, id } : x))
    safeWrite(next)
    router.push({ path: `/officer/criminal-records/${id}` })
  }
  
  function cancel() {
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
  .input,
  .select {
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
  .select {
    padding-right: 42px;
  }
  .input:focus,
  .select:focus {
    border-color: rgba(10, 35, 149, 0.55);
    box-shadow: 0 0 0 4px rgba(10, 35, 149, 0.08);
  }
  </style>
  