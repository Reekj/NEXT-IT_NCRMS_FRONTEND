<template>
    <DivisionalCoordinatorLayout :user="user">
      <div class="mb-6 text-[18px] font-semibold text-[#111827]">Surulere Division</div>
  
      <Motion
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
        class="rounded-2xl border border-black/10 bg-white shadow-[0_8px_24px_rgba(16,24,40,0.08)]"
      >
        <div class="border-b border-black/10 px-6 py-5 sm:px-8">
          <h2 class="text-[18px] font-semibold text-[#111827]">View Division Unit</h2>
        </div>
  
        <div v-if="row" class="px-6 py-7 sm:px-10 sm:py-10">
          <div class="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2">
            <Field label="Unit Name" :value="row.unitName" />
            <Field label="Unit Type" :value="row.unitType" />
            <Field label="Total Officers" :value="row.totalOfficers" />
            <Field label="Unit Head" :value="row.unitHead" />
            <Field label="Status" :value="row.status" />
            <Field label="Date Created" :value="row.dateCreated" />
          </div>
  
          <div class="mt-10 flex flex-wrap items-center gap-4">
            <Motion
              as="button"
              type="button"
              :whileHover="{ scale: 1.02 }"
              :whileTap="{ scale: 0.98 }"
              @click="goEdit"
              class="inline-flex h-11 items-center justify-center rounded-xl px-8 text-[14px] font-semibold text-white
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)] shadow-sm"
            >
              Edit
            </Motion>
  
            <Motion
              as="button"
              type="button"
              :whileHover="{ scale: 1.02 }"
              :whileTap="{ scale: 0.98 }"
              @click="goBack"
              class="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-8 text-[14px] font-semibold text-[#111827]
                     shadow-sm hover:bg-[#F9FAFB]"
            >
              Back
            </Motion>
          </div>
        </div>
  
        <div v-else class="px-6 py-10 sm:px-10">
          <div class="text-[13px] text-black/50">Loading...</div>
        </div>
      </Motion>
    </DivisionalCoordinatorLayout>
  </template>
  
  <script setup>
  import { h, onMounted, ref, defineComponent } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import DivisionalCoordinatorLayout from "../layout/Layout.vue"
  
  /** inline storage (same key as table/edit/create) */
  const UNITS_KEY = "ncrms_dc_division_units"
  
  function safeRead() {
    try {
      const raw = localStorage.getItem(UNITS_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  
  const router = useRouter()
  const route = useRoute()
  
  const user = ref({ name: "Helena John", role: "Divisional Coordinator", avatarUrl: "" })
  const row = ref(null)
  
  onMounted(() => {
    const id = String(route.params.id || "")
    const list = safeRead()
    row.value = list.find((x) => String(x.id) === id) || null
  
    if (!row.value) router.push({ path: "/divisional-coordinator/division-units" })
  })
  
  function goBack() {
    router.push({ path: "/divisional-coordinator/division-units" })
  }
  function goEdit() {
    if (!row.value) return
    router.push({ path: `/divisional-coordinator/division-units/${row.value.id}/edit` })
  }
  
  /** safer Field component (no fragile string template) */
  const Field = defineComponent({
    name: "Field",
    props: {
      label: { type: String, default: "" },
      value: { type: String, default: "" },
    },
    setup(props) {
      return () =>
        h("div", [
          h("label", { class: "mb-3 block text-[14px] font-medium text-[#111827]" }, props.label),
          h(
            "div",
            {
              class:
                "flex h-14 w-full items-center rounded-2xl border border-[#D7E3FF] bg-[#F9FAFB] px-5 text-[14px] text-[#667085]",
            },
            props.value || "-"
          ),
        ])
    },
  })
  </script>
  