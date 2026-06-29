<!-- src/pages/roles/officer/officer_pages/IncidentRecordEdit.vue -->
<template>
  <OfficerLayout :user="user">
    <Motion
      tag="div"
      :initial="{ opacity: 0, y: 10 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.35 }"
    >
      <section class="mx-auto w-full max-w-[1030px] overflow-hidden rounded-[16px] border border-[#CFCFCF] bg-white">
        <div class="border-b border-[#E5E7EB] px-[32px] py-[42px]">
          <h1 class="text-[22px] font-medium text-[#1F2937]">Edit Incident Record</h1>
        </div>

        <AccordionSection title="Lead Officer" :open="openSection === 'lead'" @toggle="toggleSection('lead')">
          <div class="grid grid-cols-1 gap-x-[56px] gap-y-[30px] md:grid-cols-2">
            <FormField label="Incident ID">
              <input v-model.trim="form.incidentId" class="formInput text-[#8A8A8A]" />
            </FormField>

            <FormField label="Incident Type">
              <input v-model.trim="form.incidentType" class="formInput" />
            </FormField>

            <FormField label="Zone">
              <input v-model.trim="form.zone" class="formInput" />
            </FormField>

            <FormField label="Division">
              <input v-model.trim="form.division" class="formInput" />
            </FormField>

            <FormField label="State">
              <input v-model.trim="form.stateCommand" class="formInput" />
            </FormField>

            <FormField label="LGA">
              <input v-model.trim="form.lga" class="formInput" />
            </FormField>

            <FormField label="Status">
              <input v-model.trim="form.status" class="formInput" />
            </FormField>

            <FormField label="Date of Incident">
              <input v-model.trim="form.dateDisplay" class="formInput" />
            </FormField>

            <FormField label="Lead Officer">
              <input v-model.trim="form.leadOfficer" class="formInput" />
            </FormField>

            <FormField label="Badge No.">
              <input v-model.trim="form.badgeNo" class="formInput" />
            </FormField>

            <FormField label="Additional Comment" class="md:col-span-2">
              <input
                v-model.trim="form.comment"
                class="formInput"
                placeholder="Input new information or comment..."
              />
            </FormField>
          </div>

          <button type="button" class="updateBtn mt-[28px]" @click="save">
            Update
          </button>
        </AccordionSection>

        <AccordionSection title="Victim" :open="openSection === 'victim'" @toggle="toggleSection('victim')">
          <div class="grid grid-cols-1 gap-x-[56px] gap-y-[30px] md:grid-cols-2">
            <FormField label="Name">
              <input v-model.trim="form.victimName" class="formInput" />
            </FormField>

            <FormField label="Phone No.">
              <input v-model.trim="form.victimPhone" class="formInput" />
            </FormField>

            <FormField label="Address" class="md:col-span-2">
              <input v-model.trim="form.victimAddress" class="formInput" />
            </FormField>

            <FormField label="Additional Statement" class="md:col-span-2">
              <input
                v-model.trim="form.victimStatement"
                class="formInput"
                placeholder="Input new information or statement..."
              />
            </FormField>
          </div>

          <button type="button" class="updateBtn mt-[28px]" @click="save">
            Update
          </button>
        </AccordionSection>

        <AccordionSection title="Suspect" :open="openSection === 'suspect'" @toggle="toggleSection('suspect')">
          <div class="grid grid-cols-1 gap-x-[56px] gap-y-[30px] md:grid-cols-2">
            <FormField label="Name">
              <input v-model.trim="form.suspectName" class="formInput" />
            </FormField>

            <FormField label="Phone No.">
              <input v-model.trim="form.suspectPhone" class="formInput" />
            </FormField>

            <FormField label="Address" class="md:col-span-2">
              <input v-model.trim="form.suspectAddress" class="formInput" />
            </FormField>

            <FormField label="Additional Statement" class="md:col-span-2">
              <input
                v-model.trim="form.suspectStatement"
                class="formInput"
                placeholder="Input new information or statement..."
              />
            </FormField>
          </div>

          <button type="button" class="updateBtn mt-[28px]" @click="save">
            Update
          </button>
        </AccordionSection>
      </section>
    </Motion>
  </OfficerLayout>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, reactive, ref } from "vue"
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

const KEY = "ncrms_officer_incident_records"
const EVT = "ncrms-officer-incident-records-updated"

const openSection = ref("lead")
const id = computed(() => decodeURIComponent(String(route.params.id || "")))

const form = reactive({
  id: "",
  incidentId: "",
  incidentType: "",
  zone: "",
  division: "",
  stateCommand: "",
  lga: "",
  status: "",
  dateOfIncident: "",
  dateDisplay: "",
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
  suspectStatement: "",
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

function toggleSection(section) {
  openSection.value = openSection.value === section ? "" : section
}

function formatDateDisplay(value) {
  if (!value) return "12/01/25 12:00am"

  const [year, month, day] = String(value).split("-")
  if (!year || !month || !day) return value

  return `${month}/${day}/${String(year).slice(2)} 12:00am`
}

function parseDateDisplay(value) {
  const raw = String(value || "").trim()
  const match = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})/)

  if (!match) return form.dateOfIncident || "2025-01-12"

  const month = match[1].padStart(2, "0")
  const day = match[2].padStart(2, "0")
  const year = match[3].length === 2 ? `20${match[3]}` : match[3]

  return `${year}-${month}-${day}`
}

function load() {
  const found = safeRead().find((item) => String(item.id) === id.value || String(item.incidentId) === id.value)

  if (!found) {
    router.replace("/officer/incident-records")
    return
  }

  Object.assign(form, {
    id: found.id || id.value,
    incidentId: found.incidentId || "",
    incidentType: found.incidentType || "",
    zone: found.zone || "",
    division: found.division || found.department || "",
    stateCommand: found.stateCommand || "",
    lga: found.lga || "",
    status: found.status || "",
    dateOfIncident: found.dateOfIncident || "",
    dateDisplay: formatDateDisplay(found.dateOfIncident),
    leadOfficer: found.leadOfficer || found.name || "Micheal Jackson",
    badgeNo: found.badgeNo || "45783",
    comment: found.comment || "",
    victimName: found.victim?.name || found.name || "Micheal Jackson",
    victimPhone: found.victim?.phone || "07037592890",
    victimAddress: found.victim?.address || "45, Opebi Road, Ikeja",
    victimStatement: found.victim?.statement || "",
    suspectName: found.suspect?.name || "Micheal Jackson",
    suspectPhone: found.suspect?.phone || "07037592890",
    suspectAddress: found.suspect?.address || "45, Opebi Road, Ikeja",
    suspectStatement: found.suspect?.statement || "",
  })
}

function save() {
  const all = safeRead()
  const index = all.findIndex((item) => String(item.id) === id.value || String(item.incidentId) === id.value)

  if (index === -1) {
    router.replace("/officer/incident-records")
    return
  }

  const dateOfIncident = parseDateDisplay(form.dateDisplay)

  all[index] = {
    ...all[index],
    incidentId: form.incidentId,
    incidentType: form.incidentType,
    zone: form.zone,
    division: form.division,
    department: form.division,
    stateCommand: form.stateCommand,
    lga: form.lga,
    status: form.status,
    dateOfIncident,
    leadOfficer: form.leadOfficer,
    badgeNo: form.badgeNo,
    comment: form.comment,
    name: form.victimName || all[index].name,
    fullName: form.victimName || all[index].fullName,
    description: form.comment || form.victimStatement || all[index].description,
    victim: {
      ...(all[index].victim || {}),
      name: form.victimName,
      phone: form.victimPhone,
      address: form.victimAddress,
      statement: form.victimStatement,
    },
    suspect: {
      ...(all[index].suspect || {}),
      name: form.suspectName,
      phone: form.suspectPhone,
      address: form.suspectAddress,
      statement: form.suspectStatement,
    },
    updatedAt: new Date().toISOString(),
  }

  safeWrite(all)
  router.push("/officer/incident-records")
}

const FormField = defineComponent({
  name: "FormField",
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

const AccordionSection = defineComponent({
  name: "AccordionSection",
  props: {
    title: { type: String, required: true },
    open: { type: Boolean, default: false },
  },
  emits: ["toggle"],
  setup(props, { emit, slots }) {
    return () =>
      h("div", { class: "border-b border-[#E5E7EB] last:border-b-0" }, [
        h(
          "button",
          {
            type: "button",
            class: "flex h-[82px] w-full items-center justify-between px-[32px] text-left",
            onClick: () => emit("toggle"),
          },
          [
            h("span", { class: "text-[22px] font-medium text-[#1F2937]" }, props.title),
            h(ChevronDown, {
              class: [
                "h-7 w-7 text-[#1F2937] transition-transform duration-200",
                props.open ? "rotate-180" : "",
              ],
            }),
          ]
        ),
        props.open
          ? h("div", { class: "px-[32px] pb-[34px] pt-[10px]" }, slots.default?.())
          : null,
      ])
  },
})

onMounted(load)
</script>

<style scoped>
.fieldLabel {
  display: block;
  margin-bottom: 12px;
  color: #2b2b2b;
  font-size: 16px;
  font-weight: 500;
}

.formInput {
  height: 50px;
  width: 100%;
  border-radius: 14px;
  border: 1px solid #dbe7f4;
  background: #ffffff;
  padding: 0 20px;
  color: #8a8a8a;
  font-size: 15px;
  font-weight: 600;
  outline: none;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.formInput::placeholder {
  color: #aec4ec;
  font-weight: 500;
}

.formInput:focus {
  border-color: #061a8d;
  box-shadow: 0 0 0 4px rgba(6, 26, 141, 0.08);
}

.updateBtn {
  height: 42px;
  border-radius: 8px;
  background: #061a8d;
  padding: 0 24px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  transition:
    opacity 160ms ease,
    transform 160ms ease;
}

.updateBtn:hover {
  opacity: 0.95;
}

.updateBtn:active {
  transform: scale(0.98);
}
</style>