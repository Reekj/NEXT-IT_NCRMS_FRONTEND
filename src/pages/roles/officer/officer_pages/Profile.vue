<!-- src/pages/roles/officer/officer_pages/Profile.vue -->
<template>
  <OfficerLayout :user="layoutUser">
    <Motion
      tag="div"
      class="space-y-7"
      :initial="{ opacity: 0, y: 10 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.35 }"
    >
      <h1 class="text-[22px] font-semibold text-[#1F2937]">Profile</h1>

      <section
        class="min-h-[540px] overflow-hidden rounded-[24px] bg-white px-6 py-8 shadow-[0_18px_45px_rgba(15,23,42,0.035)] sm:px-8 lg:px-9"
      >
        <div class="border-b border-[#E5E7EB]">
          <div class="flex items-center gap-10">
            <button
              type="button"
              class="relative px-4 pb-4 text-[16px] font-medium transition"
              :class="activeTab === 'edit' ? 'text-[#061A8D]' : 'text-[#9CA3AF] hover:text-[#111827]'"
              @click="activeTab = 'edit'"
            >
              Edit Profile
              <span
                v-if="activeTab === 'edit'"
                class="absolute bottom-[-1px] left-0 h-[3px] w-full rounded-full bg-[#061A8D]"
              />
            </button>

            <button
              type="button"
              class="relative px-4 pb-4 text-[16px] font-medium transition"
              :class="activeTab === 'security' ? 'text-[#061A8D]' : 'text-[#9CA3AF] hover:text-[#111827]'"
              @click="activeTab = 'security'"
            >
              Security
              <span
                v-if="activeTab === 'security'"
                class="absolute bottom-[-1px] left-0 h-[3px] w-full rounded-full bg-[#061A8D]"
              />
            </button>
          </div>
        </div>

        <form
          v-if="activeTab === 'edit'"
          class="pt-12"
          autocomplete="off"
          @submit.prevent="saveProfile"
        >
          <div class="grid grid-cols-1 gap-10 lg:grid-cols-[140px_1fr] xl:gap-12">
            <div class="flex justify-center lg:block">
              <div class="relative h-[112px] w-[112px]">
                <img
                  :src="profile.avatarUrl || fallbackAvatar"
                  alt="Officer profile photo"
                  class="h-[112px] w-[112px] rounded-full object-cover"
                  @error="profile.avatarUrl = fallbackAvatar"
                />

                <label
                  class="absolute bottom-1 right-0 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-[#061A8D] text-white shadow-lg transition hover:bg-[#020A3F]"
                  aria-label="Upload profile photo"
                >
                  <Pencil class="h-4 w-4" />
                  <input
                    ref="avatarInput"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    class="hidden"
                    @change="handleAvatarUpload"
                  />
                </label>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
              <FormField label="First Name" error-key="firstName">
                <input v-model.trim="profile.firstName" class="profile-input" type="text" autocomplete="given-name" />
              </FormField>

              <FormField label="Last Name" error-key="lastName">
                <input v-model.trim="profile.lastName" class="profile-input" type="text" autocomplete="family-name" />
              </FormField>

              <FormField label="Email" error-key="email">
                <input v-model.trim="profile.email" class="profile-input" type="email" autocomplete="email" />
              </FormField>

              <FormField label="Password" error-key="">
                <input value="**********" class="profile-input cursor-not-allowed" type="password" disabled />
              </FormField>

              <FormField label="Phone Number" error-key="phone">
                <input v-model.trim="profile.phone" class="profile-input" type="tel" autocomplete="tel" />
              </FormField>

              <FormField label="Date of Birth" error-key="dateOfBirth">
                <div class="relative">
                  <input
                    ref="dobInput"
                    v-model="profile.dateOfBirth"
                    class="profile-input pr-12"
                    type="date"
                    autocomplete="bday"
                  />

                  <button
                    type="button"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B8AC7] transition hover:text-[#061A8D]"
                    aria-label="Open date picker"
                    @click="openDatePicker"
                  >
                    <CalendarDays class="h-5 w-5" />
                  </button>
                </div>
              </FormField>

              <FormField label="Address" error-key="address">
                <input v-model.trim="profile.address" class="profile-input" type="text" autocomplete="street-address" />
              </FormField>

              <FormField label="State" error-key="state">
                <input v-model.trim="profile.state" class="profile-input" type="text" />
              </FormField>

              <FormField label="Station" error-key="station">
                <input v-model.trim="profile.station" class="profile-input" type="text" />
              </FormField>

              <FormField label="Badge No" error-key="badgeNo">
                <input v-model.trim="profile.badgeNo" class="profile-input" type="text" />
              </FormField>

              <FormField label="Rank" error-key="rank">
                <input v-model.trim="profile.rank" class="profile-input" type="text" />
              </FormField>
            </div>
          </div>

          <p v-if="formMessage" class="mt-6 text-[13px] font-medium" :class="formMessageTone">
            {{ formMessage }}
          </p>

          <div class="mt-8 flex justify-end">
            <button
              type="submit"
              class="h-[52px] w-full rounded-[10px] bg-[linear-gradient(90deg,#13289B_0%,#030A35_100%)] text-[16px] font-semibold text-white shadow-sm transition hover:opacity-95 active:scale-[0.99] sm:w-[190px]"
            >
              Save
            </button>
          </div>
        </form>

        <form
          v-else
          class="pt-9"
          autocomplete="off"
          @submit.prevent="saveSecurity"
        >
          <div class="max-w-[560px]">
            <h2 class="text-[18px] font-medium text-[#1F2937]">Two-factor Authentication</h2>

            <div class="mt-5 flex items-center gap-3">
              <button
                type="button"
                role="switch"
                :aria-checked="security.twoFactorEnabled"
                class="relative h-[26px] w-[50px] rounded-full transition"
                :class="security.twoFactorEnabled ? 'bg-[#5572F7]' : 'bg-[#D1D5DB]'"
                @click="toggleTwoFactor"
              >
                <span
                  class="absolute top-[3px] h-5 w-5 rounded-full bg-white shadow transition"
                  :class="security.twoFactorEnabled ? 'left-[27px]' : 'left-[3px]'"
                />
              </button>

              <span class="text-[15px] text-[#374151]">
                Enable or disable two factor authentication
              </span>
            </div>

            <h2 class="mt-10 text-[18px] font-medium text-[#1F2937]">Change Password</h2>

            <div class="mt-7 space-y-5">
              <FormField label="Current Password" error-key="currentPassword">
                <input
                  v-model.trim="security.currentPassword"
                  class="profile-input"
                  type="password"
                  autocomplete="current-password"
                  placeholder="**********"
                />
              </FormField>

              <FormField label="New Password" error-key="newPassword">
                <input
                  v-model.trim="security.newPassword"
                  class="profile-input"
                  type="password"
                  autocomplete="new-password"
                  placeholder="**********"
                />
              </FormField>
            </div>
          </div>

          <p v-if="securityMessage" class="mt-6 text-[13px] font-medium" :class="securityMessageTone">
            {{ securityMessage }}
          </p>

          <div class="mt-7 flex justify-end">
            <button
              type="submit"
              class="h-[52px] w-full rounded-[10px] bg-[linear-gradient(90deg,#13289B_0%,#030A35_100%)] text-[16px] font-semibold text-white shadow-sm transition hover:opacity-95 active:scale-[0.99] sm:w-[190px]"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </Motion>
  </OfficerLayout>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, reactive, ref } from "vue"
import { Motion } from "@motionone/vue"
import { CalendarDays, Pencil } from "lucide-vue-next"
import OfficerLayout from "../layout/Layout.vue"

const USER_KEY = "ncrms_officer_profile"
const SECURITY_KEY = "ncrms_officer_security_settings"
const USER_EVENT = "ncrms-officer-profile-updated"

const fallbackAvatar =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"

const activeTab = ref("edit")
const avatarInput = ref(null)
const dobInput = ref(null)

const errors = reactive({})
const formMessage = ref("")
const formMessageTone = ref("text-green-700")

const securityErrors = reactive({})
const securityMessage = ref("")
const securityMessageTone = ref("text-green-700")

const profile = reactive({
  firstName: "John",
  lastName: "Michealson",
  email: "michealson@gmail.com",
  phone: "09032343234",
  dateOfBirth: "1990-01-25",
  address: "45, Opebi Road, Ikeja",
  state: "Lagos",
  station: "Lagos State Police Command",
  badgeNo: "45783",
  rank: "Inspector General",
  avatarUrl: fallbackAvatar,
})

const security = reactive({
  twoFactorEnabled: true,
  currentPassword: "",
  newPassword: "",
})

const layoutUser = computed(() => ({
  name: `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "Officer",
  role: "Officer",
  avatarUrl: profile.avatarUrl || fallbackAvatar,
}))

function openDatePicker() {
  const input = dobInput.value
  if (!input) return

  if (typeof input.showPicker === "function") {
    input.showPicker()
  } else {
    input.focus()
    input.click()
  }
}

function safeRead(key) {
  try {
    const raw = localStorage.getItem(key)
    const parsed = raw ? JSON.parse(raw) : null
    return parsed && typeof parsed === "object" ? parsed : null
  } catch {
    return null
  }
}

function safeWrite(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value && typeof value === "object" ? value : {}))
  } catch {
    return false
  }

  return true
}

function clearErrors(target) {
  Object.keys(target).forEach((key) => delete target[key])
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim())
}

function validateProfile() {
  clearErrors(errors)

  if (!profile.firstName) errors.firstName = "First name is required."
  if (!profile.lastName) errors.lastName = "Last name is required."
  if (!profile.email || !isValidEmail(profile.email)) errors.email = "Enter a valid email address."
  if (!profile.phone || !/^[0-9+\-\s]{7,20}$/.test(profile.phone)) errors.phone = "Enter a valid phone number."
  if (!profile.dateOfBirth) errors.dateOfBirth = "Date of birth is required."
  if (!profile.address) errors.address = "Address is required."
  if (!profile.state) errors.state = "State is required."
  if (!profile.station) errors.station = "Station is required."
  if (!profile.badgeNo) errors.badgeNo = "Badge number is required."
  if (!profile.rank) errors.rank = "Rank is required."

  return Object.keys(errors).length === 0
}

function saveProfile() {
  formMessage.value = ""

  if (!validateProfile()) {
    formMessage.value = "Please correct the highlighted fields before saving."
    formMessageTone.value = "text-red-600"
    return
  }

  const payload = {
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phone: profile.phone,
    dateOfBirth: profile.dateOfBirth,
    address: profile.address,
    state: profile.state,
    station: profile.station,
    badgeNo: profile.badgeNo,
    rank: profile.rank,
    avatarUrl: profile.avatarUrl,
    updatedAt: new Date().toISOString(),
  }

  const saved = safeWrite(USER_KEY, payload)

  if (!saved) {
    formMessage.value = "Profile could not be saved in this browser session."
    formMessageTone.value = "text-red-600"
    return
  }

  window.dispatchEvent(new CustomEvent(USER_EVENT, { detail: payload }))

  formMessage.value = "Profile saved successfully."
  formMessageTone.value = "text-green-700"
}

function handleAvatarUpload(event) {
  const file = event.target.files?.[0]
  formMessage.value = ""

  if (!file) return

  const allowedTypes = ["image/png", "image/jpeg", "image/webp"]
  const maxSize = 1024 * 1024 * 2

  if (!allowedTypes.includes(file.type)) {
    formMessage.value = "Only PNG, JPG, or WEBP images are allowed."
    formMessageTone.value = "text-red-600"
    if (avatarInput.value) avatarInput.value.value = ""
    return
  }

  if (file.size > maxSize) {
    formMessage.value = "Profile image must be 2MB or less."
    formMessageTone.value = "text-red-600"
    if (avatarInput.value) avatarInput.value.value = ""
    return
  }

  const reader = new FileReader()

  reader.onload = () => {
    const result = typeof reader.result === "string" ? reader.result : ""
    if (result.startsWith("data:image/")) {
      profile.avatarUrl = result
    }
  }

  reader.readAsDataURL(file)
}

function toggleTwoFactor() {
  security.twoFactorEnabled = !security.twoFactorEnabled

  const existing = safeRead(SECURITY_KEY) || {}
  safeWrite(SECURITY_KEY, {
    ...existing,
    twoFactorEnabled: security.twoFactorEnabled,
    updatedAt: new Date().toISOString(),
  })
}

function validateSecurity() {
  clearErrors(securityErrors)

  const current = String(security.currentPassword || "")
  const next = String(security.newPassword || "")

  if (!current) securityErrors.currentPassword = "Current password is required."
  if (!next) securityErrors.newPassword = "New password is required."
  else if (next.length < 8) securityErrors.newPassword = "Password must be at least 8 characters."
  else if (!/[A-Z]/.test(next) || !/[a-z]/.test(next) || !/[0-9]/.test(next)) {
    securityErrors.newPassword = "Use uppercase, lowercase, and a number."
  }

  return Object.keys(securityErrors).length === 0
}

function saveSecurity() {
  securityMessage.value = ""

  if (!validateSecurity()) {
    securityMessage.value = "Please correct the highlighted fields before saving."
    securityMessageTone.value = "text-red-600"
    return
  }

  const saved = safeWrite(SECURITY_KEY, {
    twoFactorEnabled: security.twoFactorEnabled,
    passwordUpdatedAt: new Date().toISOString(),
  })

  if (!saved) {
    securityMessage.value = "Security settings could not be saved in this browser session."
    securityMessageTone.value = "text-red-600"
    return
  }

  security.currentPassword = ""
  security.newPassword = ""

  securityMessage.value = "Security settings saved successfully."
  securityMessageTone.value = "text-green-700"
}

function hydrate() {
  const savedProfile = safeRead(USER_KEY)
  if (savedProfile) {
    Object.assign(profile, {
      ...profile,
      ...savedProfile,
    })

    if (typeof profile.dateOfBirth === "string" && profile.dateOfBirth.includes("January")) {
      profile.dateOfBirth = "1990-01-25"
    }
  }

  const savedSecurity = safeRead(SECURITY_KEY)
  if (savedSecurity) {
    security.twoFactorEnabled = Boolean(savedSecurity.twoFactorEnabled)
  }
}

const FormField = defineComponent({
  name: "FormField",
  props: {
    label: { type: String, required: true },
    errorKey: { type: String, default: "" },
  },
  setup(props, { slots }) {
    return () => {
      const error = props.errorKey
        ? errors[props.errorKey] || securityErrors[props.errorKey]
        : ""

      return h("div", {}, [
        h("label", { class: "mb-2 block text-[16px] font-medium text-[#2B2B2B]" }, props.label),
        slots.default?.(),
        error ? h("p", { class: "mt-1 text-[12px] font-medium text-red-600" }, error) : null,
      ])
    }
  },
})

onMounted(() => {
  hydrate()
})
</script>

<style scoped>
.profile-input {
  height: 50px;
  width: 100%;
  border-radius: 15px;
  border: 1px solid #dbe7f4;
  background: #ffffff;
  padding: 0 20px;
  color: #6f8bc5;
  font-size: 15px;
  outline: none;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;
}

.profile-input:focus {
  border-color: #10259a;
  box-shadow: 0 0 0 4px rgba(16, 37, 154, 0.08);
}

.profile-input::placeholder {
  color: #6f8bc5;
}

.profile-input:disabled {
  background: #ffffff;
  opacity: 1;
}
</style>