<!-- src/pages/roles/officer/officer_pages/Profile.vue -->
<template>
    <OfficerLayout :user="user">
      <Motion
        tag="div"
        class="space-y-6"
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35 }"
      >
        <h1 class="text-[22px] font-semibold text-black">Profile</h1>
  
        <section class="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
          <!-- Tabs -->
          <div class="border-b border-black/10 px-6 py-5 sm:px-8">
            <div class="flex items-center gap-10">
              <button
                type="button"
                class="relative text-[14px] font-medium"
                :class="activeTab === 'edit' ? 'text-[#0A2395]' : 'text-black/50 hover:text-black'"
                @click="activeTab = 'edit'"
              >
                Edit Profile
                <span
                  v-if="activeTab === 'edit'"
                  class="absolute -bottom-[19px] left-0 h-[2px] w-10 rounded-full bg-[#0A2395]"
                />
              </button>
  
              <button
                type="button"
                class="relative text-[14px] font-medium"
                :class="activeTab === 'security' ? 'text-[#0A2395]' : 'text-black/50 hover:text-black'"
                @click="activeTab = 'security'"
              >
                Security
                <span
                  v-if="activeTab === 'security'"
                  class="absolute -bottom-[19px] left-0 h-[2px] w-10 rounded-full bg-[#0A2395]"
                />
              </button>
            </div>
          </div>
  
          <!-- Edit Profile -->
          <div v-if="activeTab === 'edit'" class="px-6 py-7 sm:px-8 sm:py-10">
            <div class="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2">
              <div>
                <label class="mb-3 block text-[14px] font-medium text-[#111827]">Full Name</label>
                <input
                  v-model="model.fullName"
                  type="text"
                  class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                         outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <div>
                <label class="mb-3 block text-[14px] font-medium text-[#111827]">Officer ID</label>
                <input
                  v-model="model.officerId"
                  type="text"
                  class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                         outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <div>
                <label class="mb-3 block text-[14px] font-medium text-[#111827]">Email Address</label>
                <input
                  v-model="model.email"
                  type="email"
                  class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                         outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <div>
                <label class="mb-3 block text-[14px] font-medium text-[#111827]">Phone No.</label>
                <input
                  v-model="model.phone"
                  type="text"
                  class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                         outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <div>
                <label class="mb-3 block text-[14px] font-medium text-[#111827]">Rank</label>
                <div class="relative">
                  <select
                    v-model="model.rank"
                    class="h-14 w-full appearance-none rounded-2xl border border-[#D7E3FF] bg-white px-5 pr-12 text-[14px] text-[#111827]
                           outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                  >
                    <option value="">Select...</option>
                    <option v-for="r in ranks" :key="r" :value="r">{{ r }}</option>
                  </select>
                  <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]" />
                </div>
              </div>
  
              <div>
                <label class="mb-3 block text-[14px] font-medium text-[#111827]">Division</label>
                <input
                  v-model="model.division"
                  type="text"
                  class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                         outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <div>
                <label class="mb-3 block text-[14px] font-medium text-[#111827]">Unit</label>
                <input
                  v-model="model.unit"
                  type="text"
                  class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 text-[14px] text-[#111827]
                         outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                />
              </div>
  
              <div>
                <label class="mb-3 block text-[14px] font-medium text-[#111827]">Status</label>
                <div class="relative">
                  <select
                    v-model="model.status"
                    class="h-14 w-full appearance-none rounded-2xl border border-[#D7E3FF] bg-white px-5 pr-12 text-[14px] text-[#111827]
                           outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                  >
                    <option value="">Select...</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                  <ChevronDown class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#667085]" />
                </div>
              </div>
            </div>
  
            <div class="mt-10 flex flex-wrap items-center gap-4">
              <Motion
                as="button"
                type="button"
                :whileHover="{ scale: 1.02 }"
                :whileTap="{ scale: 0.98 }"
                @click="onSave"
                class="inline-flex h-11 items-center justify-center rounded-xl px-8 text-[14px] font-semibold text-white
                       bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)] shadow-sm"
              >
                Save
              </Motion>
  
              <Motion
                as="button"
                type="button"
                :whileHover="{ scale: 1.02 }"
                :whileTap="{ scale: 0.98 }"
                @click="onReset"
                class="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-8 text-[14px] font-semibold text-[#111827]
                       shadow-sm hover:bg-[#F9FAFB]"
              >
                Reset
              </Motion>
            </div>
          </div>
  
          <!-- Security -->
          <div v-else class="px-6 py-7 sm:px-8 sm:py-10">
            <div class="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-2">
              <div>
                <label class="mb-3 block text-[14px] font-medium text-[#111827]">New Password</label>
                <div class="relative">
                  <input
                    v-model="security.newPassword"
                    :type="showNew ? 'text' : 'password'"
                    class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 pr-12 text-[14px] text-[#111827]
                           outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-black/45 hover:text-black/70"
                    @click="showNew = !showNew"
                    :aria-label="showNew ? 'Hide password' : 'Show password'"
                  >
                    <Eye v-if="!showNew" class="h-5 w-5" />
                    <EyeOff v-else class="h-5 w-5" />
                  </button>
                </div>
              </div>
  
              <div>
                <label class="mb-3 block text-[14px] font-medium text-[#111827]">Confirm Password</label>
                <div class="relative">
                  <input
                    v-model="security.confirmPassword"
                    :type="showConfirm ? 'text' : 'password'"
                    class="h-14 w-full rounded-2xl border border-[#D7E3FF] bg-white px-5 pr-12 text-[14px] text-[#111827]
                           outline-none transition focus:border-[#0A2395] focus:ring-4 focus:ring-[#0A2395]/10"
                    placeholder="Re-enter new password"
                  />
                  <button
                    type="button"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-black/45 hover:text-black/70"
                    @click="showConfirm = !showConfirm"
                    :aria-label="showConfirm ? 'Hide password' : 'Show password'"
                  >
                    <Eye v-if="!showConfirm" class="h-5 w-5" />
                    <EyeOff v-else class="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
  
            <div class="mt-10 flex flex-wrap items-center gap-4">
              <Motion
                as="button"
                type="button"
                :whileHover="{ scale: 1.02 }"
                :whileTap="{ scale: 0.98 }"
                @click="onUpdatePassword"
                class="inline-flex h-11 items-center justify-center rounded-xl px-8 text-[14px] font-semibold text-white
                       bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)] shadow-sm"
              >
                Update
              </Motion>
  
              <Motion
                as="button"
                type="button"
                :whileHover="{ scale: 1.02 }"
                :whileTap="{ scale: 0.98 }"
                @click="onClearSecurity"
                class="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-8 text-[14px] font-semibold text-[#111827]
                       shadow-sm hover:bg-[#F9FAFB]"
              >
                Cancel
              </Motion>
            </div>
  
            <div v-if="securityError" class="mt-6 text-[13px] font-medium text-red-600">
              {{ securityError }}
            </div>
          </div>
        </section>
      </Motion>
    </OfficerLayout>
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue"
  import { Motion } from "@motionone/vue"
  import { ChevronDown, Eye, EyeOff } from "lucide-vue-next"
  import OfficerLayout from "../layout/Layout.vue"
  
  const USER_KEY = "ncrms_officer_profile"
  const USER_EVENT = "ncrms-officer-profile-updated"
  
  function safeRead() {
    try {
      const raw = localStorage.getItem(USER_KEY)
      const parsed = raw ? JSON.parse(raw) : null
      return parsed && typeof parsed === "object" ? parsed : null
    } catch {
      return null
    }
  }
  
  function safeWrite(next) {
    localStorage.setItem(USER_KEY, JSON.stringify(next && typeof next === "object" ? next : {}))
    window.dispatchEvent(new CustomEvent(USER_EVENT))
  }
  
  const user = ref({
    name: "James King",
    role: "Officer",
    avatarUrl: "",
  })
  
  const activeTab = ref("edit")
  
  const ranks = [
    "Constable",
    "Corporal",
    "Sergeant",
    "Inspector",
    "Assistant Superintendent",
    "Superintendent",
  ]
  
  const model = ref({
    fullName: "James King",
    officerId: "OF-001",
    email: "jamesking@gmail.com",
    phone: "07022001010",
    rank: "Sergeant",
    division: "Surulere Division",
    unit: "Operations",
    status: "Active",
  })
  
  function seedIfEmpty() {
    const existing = safeRead()
    if (existing) return
    safeWrite({ ...model.value })
  }
  
  function hydrate() {
    const existing = safeRead()
    if (!existing) return
    model.value = { ...model.value, ...existing }
  
    // keep layout user in sync with saved profile
    user.value = {
      ...user.value,
      name: existing.fullName || user.value.name,
      role: user.value.role,
      avatarUrl: existing.avatarUrl || user.value.avatarUrl,
    }
  }
  
  function onSave() {
    safeWrite({ ...model.value })
    // sync header name immediately
    user.value = { ...user.value, name: model.value.fullName || user.value.name }
  }
  
  function onReset() {
    hydrate()
  }
  
  /** Security tab (UI-only; stores demo password hash string so it's "synced" like others) */
  const security = ref({
    newPassword: "",
    confirmPassword: "",
  })
  
  const showNew = ref(false)
  const showConfirm = ref(false)
  const securityError = ref("")
  
  function onUpdatePassword() {
    securityError.value = ""
  
    const a = String(security.value.newPassword || "").trim()
    const b = String(security.value.confirmPassword || "").trim()
  
    if (!a || !b) {
      securityError.value = "Please fill in both password fields."
      return
    }
    if (a.length < 6) {
      securityError.value = "Password must be at least 6 characters."
      return
    }
    if (a !== b) {
      securityError.value = "Passwords do not match."
      return
    }
  
    const existing = safeRead() || {}
    safeWrite({ ...existing, passwordUpdatedAt: new Date().toISOString() })
  
    security.value.newPassword = ""
    security.value.confirmPassword = ""
    showNew.value = false
    showConfirm.value = false
  }
  
  function onClearSecurity() {
    securityError.value = ""
    security.value.newPassword = ""
    security.value.confirmPassword = ""
    showNew.value = false
    showConfirm.value = false
  }
  
  onMounted(() => {
    seedIfEmpty()
    hydrate()
  })
  </script>
  