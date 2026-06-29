<!-- src/pages/roles/officer/officer_pages/IncidentRecordComments.vue -->
<template>
    <OfficerLayout :user="user">
      <Motion
        tag="div"
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
      >
        <section class="mx-auto w-full max-w-[980px] overflow-hidden rounded-[14px] border border-[#D8D8D8] bg-white">
          <div class="border-b border-[#E5E7EB] px-[32px] py-[32px]">
            <h1 class="text-[22px] font-medium text-[#1F2937]">
              Comments - Lead Officer
            </h1>
          </div>
  
          <div class="px-[56px] py-[42px]">
            <div class="w-full max-w-[610px] rounded-[14px] border border-[#CFCFCF] px-[30px] py-[34px]">
              <div v-for="(comment, index) in comments" :key="comment.id" class="mb-[28px] last:mb-0">
                <h2 class="mb-[14px] text-[16px] font-medium text-[#1F2937]">
                  Comment {{ index + 1 }}
                </h2>
  
                <div
                  class="min-h-[76px] rounded-[14px] border border-[#DBE7F4] px-[20px] py-[12px] text-[15px] font-medium leading-[1.25] text-[#6F8BC5]"
                >
                  {{ comment.text }}
                </div>
              </div>
            </div>
  
            <button type="button" class="mt-[40px] h-[42px] rounded-[8px] bg-[#061A8D] px-[26px] text-[15px] font-bold text-white" @click="goBack">
              Back
            </button>
          </div>
        </section>
      </Motion>
    </OfficerLayout>
  </template>
  
  <script setup>
  import { computed, onMounted, ref } from "vue"
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
  
  const KEY = "ncrms_officer_incident_records"
  
  const record = ref(null)
  const routeId = computed(() => decodeURIComponent(String(route.params.id || "")))
  
  const fallbackComment =
    "On January 15, 2024, at approximately 2:45 PM, a traffic accident occurred at Ikeja Underbridge, Lagos. A car (Toyota Corolla) collided with a motorcycle. Minor damages reported, no fatalities."
  
  const comments = computed(() => {
    const current = record.value || {}
  
    const list = [
      current.comment,
      current.description,
      current.additionalComment,
      current.leadOfficerComment,
    ]
      .filter(Boolean)
      .map((text, index) => ({
        id: `comment-${index + 1}`,
        text,
      }))
  
    return list.length
      ? list
      : [
          { id: "demo-1", text: fallbackComment },
          { id: "demo-2", text: fallbackComment },
          { id: "demo-3", text: fallbackComment },
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
  
    if (found) record.value = found
  }
  
  function goBack() {
    router.push(`/officer/incident-records/${encodeURIComponent(routeId.value)}`)
  }
  
  onMounted(loadRecord)
  </script>