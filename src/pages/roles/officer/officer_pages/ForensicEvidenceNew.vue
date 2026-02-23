<!-- src/pages/roles/officer/officer_pages/ForensicEvidenceNew.vue -->
<template>
    <OfficerLayout :user="user">
      <Motion
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
        class="rounded-2xl border border-black/10 bg-white shadow-[0_10px_30px_rgba(16,24,40,0.08)] overflow-hidden"
      >
        <div class="border-b border-black/10 px-7 py-6">
          <div class="text-[18px] font-semibold text-black">Add New Forensic Evidence</div>
        </div>
  
        <div class="px-7 py-8">
          <!-- form grid -->
          <div class="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-3">
            <FieldInput label="Evidence ID" v-model="model.evidenceId" placeholder="EV-0011" />
            <FieldInput label="Case ID" v-model="model.caseId" placeholder="C-0011" />
            <FieldInput label="Evidence Type" v-model="model.evidenceType" placeholder="" />
  
            <FieldSelect label="Zone" v-model="model.zone" :options="zones" placeholder="Select..." />
            <FieldDate label="Date Collected" v-model="model.dateCollected" />
            <FieldSelect label="Status" v-model="model.status" :options="statuses" placeholder="Select..." />
  
            <div class="lg:col-span-1">
              <FieldInput label="Evidence Count" v-model="model.evidenceCount" placeholder="" />
            </div>
  
            <div class="lg:col-span-2">
              <FieldInput label="Description/Summary" v-model="model.description" placeholder="" />
            </div>
          </div>
  
          <!-- Attach -->
          <div class="mt-10">
            <div class="text-[14px] font-medium text-black/80">Attach Evidence Files</div>
  
            <div class="mt-4 rounded-2xl border border-[#D7E3FF] bg-white p-6">
              <div
                class="relative flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-[#D7E3FF] bg-white"
                @dragover.prevent
                @drop.prevent="onDrop"
              >
                <input
                  ref="fileEl"
                  type="file"
                  class="hidden"
                  multiple
                  @change="onPick"
                />
  
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-5 py-3 text-[13px] font-medium text-black/60
                         shadow-sm hover:bg-black/[0.02]"
                  @click="browse"
                >
                  <Upload class="h-4 w-4 text-black/50" />
                  Drag & drop file here or <span class="font-semibold text-[#0A2395]">Browse</span>
                </button>
  
                <div class="mt-3 text-[12px] text-black/45">JPG, PNG, PDF, MP4, etc</div>
  
                <div v-if="files.length" class="mt-6 w-full max-w-[720px] px-2">
                  <div class="text-[12px] font-semibold text-black/60">Selected</div>
                  <div class="mt-2 grid gap-2">
                    <div
                      v-for="f in files"
                      :key="f.name + f.size"
                      class="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-[13px] text-black/70"
                    >
                      <Paperclip class="h-4 w-4 text-black/45" />
                      <div class="min-w-0 flex-1 truncate">{{ f.name }}</div>
                      <div class="text-[12px] text-black/40">{{ prettySize(f.size) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- actions -->
          <div class="mt-10 flex items-center gap-4">
            <Motion
              as="button"
              type="button"
              :whileHover="{ scale: 1.02 }"
              :whileTap="{ scale: 0.98 }"
              class="inline-flex h-11 items-center justify-center rounded-xl px-8 text-[14px] font-semibold text-white
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)] shadow-sm"
              @click="onUpload"
            >
              Upload
            </Motion>
  
            <button
              type="button"
              class="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-8 text-[14px] font-semibold text-black/70
                     shadow-sm hover:bg-black/[0.02]"
              @click="onCancel"
            >
              Cancel
            </button>
          </div>
        </div>
      </Motion>
    </OfficerLayout>
  </template>
  
  <script setup>
  import { h, defineComponent, ref } from "vue"
  import { useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import { Calendar, ChevronDown, Paperclip, Upload } from "lucide-vue-next"
  import OfficerLayout from "../layout/Layout.vue"
  
  const router = useRouter()
  
  const user = ref({ name: "James King", role: "Officer", avatarUrl: "" })
  
  /** storage */
  const FE_KEY = "ncrms_officer_forensic_evidence"
  const FE_EVENT = "ncrms-officer-forensic-evidence-updated"
  
  function safeRead() {
    try {
      const raw = localStorage.getItem(FE_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  function safeWrite(next) {
    localStorage.setItem(FE_KEY, JSON.stringify(Array.isArray(next) ? next : []))
    window.dispatchEvent(new CustomEvent(FE_EVENT))
  }
  function uid() {
    return `fe-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`
  }
  
  const zones = ["Zone 1","Zone 2","Zone 3","Zone 4","Zone 5","Zone 6","Zone 7","Zone 8","Zone 9"]
  const statuses = ["Verified", "Pending"]
  
  const model = ref({
    evidenceId: "EV-0011",
    caseId: "C-0011",
    evidenceType: "",
    description: "",
    zone: "",
    dateCollected: "",
    status: "",
    evidenceCount: "",
  })
  
  const fileEl = ref(null)
  const files = ref([])
  
  function browse() {
    if (fileEl.value) fileEl.value.click()
  }
  function onPick(e) {
    const list = Array.from(e?.target?.files || [])
    files.value = list
  }
  function onDrop(e) {
    const list = Array.from(e?.dataTransfer?.files || [])
    files.value = list
  }
  
  function prettySize(bytes) {
    const n = Number(bytes || 0)
    if (n < 1024) return `${n} B`
    if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`
    return `${Math.round(n / (1024 * 1024))} MB`
  }
  
  function onUpload() {
    const list = safeRead()
    const next = {
      id: uid(),
      ...model.value,
      dateCollected: model.value.dateCollected || new Date().toISOString().slice(0, 10),
      status: model.value.status || "Pending",
      evidenceCount: model.value.evidenceCount || "1",
      attachedFiles: files.value.map((f) => ({ name: f.name, size: f.size, type: f.type })),
    }
    safeWrite([next, ...list])
    router.push({ path: "/officer/forensic-evidence" })
  }
  
  function onCancel() {
    router.push({ path: "/officer/forensic-evidence" })
  }
  
  /** tiny safe field components */
  const BaseLabel = defineComponent({
    name: "BaseLabel",
    props: { text: { type: String, default: "" } },
    setup(props) {
      return () => h("label", { class: "mb-3 block text-[14px] font-medium text-black/80" }, props.text)
    },
  })
  
  const FieldInput = defineComponent({
    name: "FieldInput",
    props: { label: String, modelValue: String, placeholder: String },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
      return () =>
        h("div", [
          h(BaseLabel, { text: props.label || "" }),
          h("input", {
            value: props.modelValue || "",
            placeholder: props.placeholder || "",
            class:
              "h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]" +
              " outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10",
            onInput: (e) => emit("update:modelValue", e?.target?.value ?? ""),
          }),
        ])
    },
  })
  
  const FieldSelect = defineComponent({
    name: "FieldSelect",
    props: { label: String, modelValue: String, options: Array, placeholder: String },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
      return () =>
        h("div", [
          h(BaseLabel, { text: props.label || "" }),
          h("div", { class: "relative" }, [
            h(
              "select",
              {
                value: props.modelValue || "",
                class:
                  "h-14 w-full appearance-none rounded-2xl border border-[#D7E3FF] bg-white px-5 pr-12 text-[14px] text-[#111827]" +
                  " outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10",
                onChange: (e) => emit("update:modelValue", e?.target?.value ?? ""),
              },
              [
                h("option", { value: "" }, props.placeholder || "Select..."),
                ...(props.options || []).map((o) => h("option", { value: o, key: o }, o)),
              ]
            ),
            h(ChevronDown, {
              class: "pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]",
            }),
          ]),
        ])
    },
  })
  
  const FieldDate = defineComponent({
    name: "FieldDate",
    props: { label: String, modelValue: String },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
      return () =>
        h("div", [
          h(BaseLabel, { text: props.label || "" }),
          h("div", { class: "relative" }, [
            h("input", {
              value: props.modelValue || "",
              type: "date",
              class:
                "h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 pr-12 text-[14px] text-[#111827]" +
                " outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10",
              onInput: (e) => emit("update:modelValue", e?.target?.value ?? ""),
            }),
            h(Calendar, {
              class: "pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]",
            }),
          ]),
        ])
    },
  })
  </script>
  