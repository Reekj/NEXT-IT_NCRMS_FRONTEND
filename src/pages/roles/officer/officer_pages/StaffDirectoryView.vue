<!-- src/pages/roles/officer/officer_pages/StaffDirectoryView.vue -->
<template>
    <OfficerLayout :user="user">
      <Motion
        tag="div"
        class="space-y-7"
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
      >
        <section
          class="min-h-[540px] overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white px-6 py-8 shadow-[0_18px_45px_rgba(15,23,42,0.035)] sm:px-8 lg:px-9"
        >
          <div class="border-b border-[#E5E7EB] pb-5">
            <h1 class="text-[20px] font-semibold text-[#1F2937]">Staff Directory</h1>
          </div>
  
          <div class="pt-12">
            <div class="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
              <FormField label="Full Name">
                <div class="profile-input">{{ staff.fullName }}</div>
              </FormField>
  
              <FormField label="Staff Type">
                <div class="profile-input">{{ staff.staffType }}</div>
              </FormField>
  
              <FormField label="Email">
                <div class="profile-input">{{ staff.email }}</div>
              </FormField>
  
              <FormField label="Phone">
                <div class="profile-input">{{ staff.phone }}</div>
              </FormField>
  
              <FormField label="Date of Birth">
                <div class="profile-input">{{ staff.dateOfBirth }}</div>
              </FormField>
  
              <FormField label="Address">
                <div class="profile-input">{{ staff.address }}</div>
              </FormField>
  
              <FormField label="State">
                <div class="profile-input">{{ staff.state }}</div>
              </FormField>
  
              <FormField label="LGA">
                <div class="profile-input">{{ staff.lga }}</div>
              </FormField>
  
              <FormField label="Gender">
                <div class="profile-input">{{ staff.gender }}</div>
              </FormField>
  
              <FormField label="Rank">
                <div class="profile-input">{{ staff.rank }}</div>
              </FormField>
  
              <FormField label="Division">
                <div class="profile-input">{{ staff.division }}</div>
              </FormField>
  
              <FormField label="Zone">
                <div class="profile-input">{{ staff.zone }}</div>
              </FormField>
  
              <FormField label="Badge No.">
                <div class="profile-input">{{ staff.badgeNo }}</div>
              </FormField>
  
              <FormField label="Station">
                <div class="profile-input">{{ staff.station }}</div>
              </FormField>
  
              <div>
                <label class="mb-2 block text-[16px] font-medium text-[#2B2B2B]">Photo</label>
  
                <div
                  class="flex h-[50px] w-full items-center rounded-[8px] border border-[#AFAFAF] bg-white px-3"
                >
                  <button
                    type="button"
                    class="h-[27px] rounded-[2px] border border-[#5B6470] bg-[#EEF0F3] px-3 text-[12px] font-medium text-[#3F4652]"
                    @click="triggerPhotoInput"
                  >
                    Choose File
                  </button>
  
                  <span class="ml-3 truncate text-[13px] text-[#9B9B9B]">
                    {{ staff.photoName }}
                  </span>
  
                  <input
                    ref="photoInput"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    class="hidden"
                    @change="handlePhotoChange"
                  />
                </div>
  
                <img
                  :src="staff.photoUrl"
                  alt="Staff photo"
                  class="mt-4 h-[310px] w-[220px] object-cover"
                  @error="staff.photoUrl = fallbackPhoto"
                />
  
                <button
                  type="button"
                  class="mt-8 h-[40px] rounded-[7px] bg-[#061A8D] px-8 text-[14px] font-semibold text-white transition hover:bg-[#030A35] active:scale-[0.98]"
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
  import { defineComponent, h, onMounted, reactive, ref } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { Motion } from "@motionone/vue"
  import OfficerLayout from "../layout/Layout.vue"
  
  const router = useRouter()
  const route = useRoute()
  const photoInput = ref(null)
  
  const user = {
    name: "James King",
    role: "Officer",
    avatarUrl: "",
  }
  
  const STAFF_VIEW_KEY = "ncrms_officer_staff_directory_view"
  const KEY_ZONAL_COORDINATORS = "ncrms_headquarters_zonal_coordinators"
  const KEY_HQ_OFFICERS = "ncrms_headquarters_hq_officers"
  
  const fallbackPhoto =
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80"
  
  const staff = reactive({
    id: "",
    fullName: "Kay Bentley",
    staffType: "Zonal Coordinator",
    email: "bentley@gmail.com",
    phone: "09082763545",
    dateOfBirth: "20 Jul 1990",
    address: "45, Opebi Road, Ikeja",
    state: "Lagos",
    lga: "Ikeja",
    gender: "Male",
    rank: "Inspector general",
    division: "Operations",
    zone: "Zone 1",
    badgeNo: "33454",
    station: "Police Headquarters, Abuja",
    photoName: "michealjackson.dp",
    photoUrl: fallbackPhoto,
  })
  
  function readArray(key) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "[]")
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }
  
  function buildId(prefix, value) {
    return `${prefix}:${value || ""}`
  }
  
  function normalizeHqOfficer(record) {
    return {
      id: buildId("hq", record?.id),
      fullName: record?.fullName || "Micheal Jackson",
      staffType: "HQ Officer",
      email: record?.email || "bentley@gmail.com",
      phone: record?.phone || "09082763545",
      dateOfBirth: record?.dateOfBirth || "20 Jul 1990",
      address: record?.address || "45, Opebi Road, Ikeja",
      state: record?.state || "Lagos",
      lga: record?.lga || "Ikeja",
      gender: record?.gender || "Male",
      rank: record?.rank || "Inspector",
      division: record?.division || "Operations",
      zone: record?.zone || "Zone 1",
      badgeNo: record?.badgeNo || "33454",
      station: record?.station || "Police Headquarters, Abuja",
      photoName: record?.photoName || "michealjackson.dp",
      photoUrl: record?.photoUrl || record?.avatarUrl || fallbackPhoto,
    }
  }
  
  function normalizeZonalCoordinator(record) {
    return {
      id: buildId("zc", record?.id || record?.coordinatorId),
      fullName: record?.fullName || "Kay Bentley",
      staffType: "Zonal Coordinator",
      email: record?.email || "bentley@gmail.com",
      phone: record?.phone || "09082763545",
      dateOfBirth: record?.dateOfBirth || "20 Jul 1990",
      address: record?.address || "45, Opebi Road, Ikeja",
      state: record?.state || "Lagos",
      lga: record?.lga || "Ikeja",
      gender: record?.gender || "Male",
      rank: record?.rank || "Inspector general",
      division: record?.division || "Operations",
      zone: record?.zone || "Zone 1",
      badgeNo: record?.badgeNo || "33454",
      station: record?.station || "Police Headquarters, Abuja",
      photoName: record?.photoName || "michealjackson.dp",
      photoUrl: record?.photoUrl || record?.avatarUrl || fallbackPhoto,
    }
  }
  
  function hydrate() {
    const routeId = String(route.params.id || "")
  
    try {
      const selected = JSON.parse(sessionStorage.getItem(STAFF_VIEW_KEY) || "{}")
  
      if (selected && typeof selected === "object" && (!routeId || selected.id === routeId)) {
        Object.assign(staff, selected)
        return
      }
    } catch {
      // Continue to localStorage lookup.
    }
  
    const allStaff = [
      ...readArray(KEY_HQ_OFFICERS).map(normalizeHqOfficer),
      ...readArray(KEY_ZONAL_COORDINATORS).map(normalizeZonalCoordinator),
    ]
  
    const found = allStaff.find((item) => item.id === routeId)
  
    if (found) {
      Object.assign(staff, found)
    }
  }
  
  function triggerPhotoInput() {
    photoInput.value?.click()
  }
  
  function handlePhotoChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
  
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"]
    const maxSize = 2 * 1024 * 1024
  
    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG, JPG, and WEBP images are allowed.")
      event.target.value = ""
      return
    }
  
    if (file.size > maxSize) {
      alert("Image must be 2MB or less.")
      event.target.value = ""
      return
    }
  
    const reader = new FileReader()
  
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : ""
  
      if (result.startsWith("data:image/")) {
        staff.photoUrl = result
        staff.photoName = file.name
  
        sessionStorage.setItem(
          STAFF_VIEW_KEY,
          JSON.stringify({
            ...staff,
            photoUrl: result,
            photoName: file.name,
          })
        )
      }
    }
  
    reader.readAsDataURL(file)
  }
  
  function goBack() {
    router.push("/officer/staff-directory")
  }
  
  const FormField = defineComponent({
    name: "FormField",
    props: {
      label: { type: String, required: true },
    },
    setup(props, { slots }) {
      return () =>
        h("div", {}, [
          h("label", { class: "mb-2 block text-[16px] font-medium text-[#2B2B2B]" }, props.label),
          slots.default?.(),
        ])
    },
  })
  
  onMounted(hydrate)
  </script>
  
  <style scoped>
  .profile-input {
    display: flex;
    height: 50px;
    width: 100%;
    align-items: center;
    border-radius: 15px;
    border: 1px solid #dbe7f4;
    background: #ffffff;
    padding: 0 20px;
    color: #6f8bc5;
    font-size: 15px;
    font-weight: 600;
    outline: none;
  }
  </style>