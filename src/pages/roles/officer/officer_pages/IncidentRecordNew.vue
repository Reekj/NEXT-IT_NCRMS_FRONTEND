<!-- src/pages/roles/officer/officer_pages/IncidentRecordNew.vue -->
<template>
    <OfficerLayout :user="user">
      <Motion
        tag="div"
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
      >
        <section class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
          <div class="border-b border-black/10 px-6 py-5 sm:px-8">
            <div class="text-[20px] font-medium text-black">Add New Incident Record</div>
          </div>
  
          <div class="px-6 py-8 sm:px-10 sm:py-10">
            <div class="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-3">
              <!-- Incident ID -->
              <div>
                <label class="text-[14px] font-medium text-black/80">Incident ID</label>
                <input
                  v-model="form.incidentId"
                  type="text"
                  class="mt-3 h-12 w-full rounded-xl border border-[#D7E6FF] bg-white px-5 text-[14px] text-[#5E7BD6]
                         outline-none focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <!-- Incident Type -->
              <div>
                <label class="text-[14px] font-medium text-black/80">Incident Type</label>
                <input
                  v-model="form.incidentType"
                  type="text"
                  class="mt-3 h-12 w-full rounded-xl border border-[#D7E6FF] bg-white px-5 text-[14px] text-black/80
                         outline-none focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <!-- Date of Incident -->
              <div>
                <label class="text-[14px] font-medium text-black/80">Date of Incident</label>
                <div class="relative mt-3">
                  <input
                    v-model="form.dateOfIncident"
                    type="date"
                    class="h-12 w-full rounded-xl border border-[#D7E6FF] bg-white px-5 pr-12 text-[14px] text-black/80
                           outline-none focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                  />
                  <Calendar class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/35" />
                </div>
              </div>
  
              <!-- Zone -->
              <div>
                <label class="text-[14px] font-medium text-black/80">Zone</label>
                <div class="relative mt-3">
                  <select
                    v-model="form.zone"
                    class="h-12 w-full appearance-none rounded-xl border border-[#D7E6FF] bg-white px-5 pr-12 text-[14px] text-black/70
                           outline-none focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                  >
                    <option value="" disabled>Select</option>
                    <option v-for="z in zones" :key="z" :value="z">{{ z }}</option>
                  </select>
                  <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/35" />
                </div>
              </div>
  
              <!-- State Command -->
              <div>
                <label class="text-[14px] font-medium text-black/80">State Command</label>
                <div class="relative mt-3">
                  <select
                    v-model="form.stateCommand"
                    class="h-12 w-full appearance-none rounded-xl border border-[#D7E6FF] bg-white px-5 pr-12 text-[14px] text-black/70
                           outline-none focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                  >
                    <option value="" disabled>Select</option>
                    <option v-for="s in states" :key="s" :value="s">{{ s }}</option>
                  </select>
                  <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/35" />
                </div>
              </div>
  
              <!-- LGA -->
              <div>
                <label class="text-[14px] font-medium text-black/80">LGA</label>
                <div class="relative mt-3">
                  <select
                    v-model="form.lga"
                    class="h-12 w-full appearance-none rounded-xl border border-[#D7E6FF] bg-white px-5 pr-12 text-[14px] text-black/70
                           outline-none focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                  >
                    <option value="" disabled>Select</option>
                    <option v-for="l in lgas" :key="l" :value="l">{{ l }}</option>
                  </select>
                  <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/35" />
                </div>
              </div>
  
              <!-- Status -->
              <div>
                <label class="text-[14px] font-medium text-black/80">Status</label>
                <div class="relative mt-3">
                  <select
                    v-model="form.status"
                    class="h-12 w-full appearance-none rounded-xl border border-[#D7E6FF] bg-white px-5 pr-12 text-[14px] text-black/70
                           outline-none focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                  >
                    <option value="" disabled>Select</option>
                    <option>Open</option>
                    <option>Closed</option>
                    <option>Under Investigation</option>
                  </select>
                  <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/35" />
                </div>
              </div>
  
              <!-- Incident Description -->
              <div class="md:col-span-2">
                <label class="text-[14px] font-medium text-black/80">Incident Description</label>
                <input
                  v-model="form.description"
                  type="text"
                  class="mt-3 h-12 w-full rounded-xl border border-[#D7E6FF] bg-white px-5 text-[14px] text-black/75
                         outline-none focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
            </div>
  
            <div class="mt-10 flex items-center gap-4">
              <button
                type="button"
                class="h-11 rounded-xl px-8 text-[14px] font-semibold text-white
                       bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                       shadow-sm hover:opacity-95 active:opacity-90"
                @click="save"
              >
                Save
              </button>
  
              <button
                type="button"
                class="h-11 rounded-xl border border-black/10 bg-white px-6 text-[14px] font-medium text-black/80
                       shadow-sm hover:bg-black/5"
                @click="cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </section>
      </Motion>
    </OfficerLayout>
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue"
  import { useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { Calendar, ChevronDown } from "lucide-vue-next"
  import OfficerLayout from "../layout/Layout.vue"
  
  const router = useRouter()
  
  const user = ref({
    name: "James King",
    role: "Officer",
    avatarUrl: "",
  })
  
  /** storage */
  const KEY = "ncrms_officer_incident_records"
  const EVT = "ncrms-officer-incident-records-updated"
  
  function safeRead() {
    try {
      const raw = localStorage.getItem(KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  function safeWrite(next) {
    localStorage.setItem(KEY, JSON.stringify(Array.isArray(next) ? next : []))
    window.dispatchEvent(new CustomEvent(EVT))
  }
  function uid() {
    return `inc-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`
  }
  function nextIncidentId(existing) {
    // keeps it simple + predictable for demo UI
    const n = existing.length + 1
    return `INC-${String(n).padStart(3, "0")}`
  }
  
  /** selects (demo options) */
  const zones = ["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5", "Zone 6", "Zone 7", "Zone 8", "Zone 9"]
  const states = ["Lagos", "Kano", "Abuja"]
  const lgas = ["Ikeja", "Nasarawa", "Maitama"]
  
  const form = ref({
    incidentId: "",
    incidentType: "",
    dateOfIncident: "",
    zone: "",
    stateCommand: "",
    lga: "",
    status: "",
    description: "",
  })
  
  onMounted(() => {
    const existing = safeRead()
    form.value.incidentId = nextIncidentId(existing)
    form.value.dateOfIncident = "2025-01-12"
  })
  
  function save() {
    const payload = {
      id: uid(),
      incidentId: String(form.value.incidentId || "").trim(),
      incidentType: String(form.value.incidentType || "").trim(),
      dateOfIncident: String(form.value.dateOfIncident || "").trim(),
      zone: String(form.value.zone || "").trim(),
      stateCommand: String(form.value.stateCommand || "").trim(),
      lga: String(form.value.lga || "").trim(),
      status: String(form.value.status || "").trim(),
      description: String(form.value.description || "").trim(),
    }
  
    const next = [payload, ...safeRead()]
    safeWrite(next)
    router.replace("/officer/incident-records")
  }
  
  function cancel() {
    router.back()
  }
  </script>
  