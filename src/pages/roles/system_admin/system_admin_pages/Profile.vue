<!-- src/pages/roles/system_admin/system_admin_pages/Profile.vue -->
<template>
  <SystemAdminLayout :user="user">
    <h1 class="text-[22px] font-semibold text-black">Profile</h1>

    <section class="mt-6 rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
      <!-- Tabs -->
      <div class="flex items-center gap-12 border-b border-black/10 pb-4">
        <button
          type="button"
          class="relative text-[14px] font-medium"
          :class="activeTab === 'edit' ? 'text-[#0A2395]' : 'text-black/50 hover:text-black'"
          @click="activeTab = 'edit'"
        >
          Edit Profile
          <span
            v-if="activeTab === 'edit'"
            class="absolute -bottom-[17px] left-0 h-[3px] w-full rounded-full bg-[#0A2395]"
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
            class="absolute -bottom-[17px] left-0 h-[3px] w-full rounded-full bg-[#0A2395]"
          />
        </button>
      </div>

      <!-- Loading / Error bar -->
      <div v-if="isLoading" class="mt-6 rounded-xl border border-black/10 bg-white p-4 text-[13px] text-black/70">
        Loading profile…
      </div>

      <div
        v-else-if="errorMsg"
        class="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-[13px] text-red-700"
      >
        {{ errorMsg }}
        <div class="mt-4 flex gap-3">
          <button
            type="button"
            class="inline-flex h-10 items-center rounded-lg border border-black/10 bg-white px-4 text-[13px] font-medium text-black/70 hover:bg-black/[0.03]"
            @click="fetchProfile"
          >
            Retry
          </button>
        </div>
      </div>

      <!-- ================= EDIT PROFILE ================= -->
      <div
        v-else-if="activeTab === 'edit'"
        class="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]"
      >
        <!-- Avatar -->
        <div class="flex justify-center lg:justify-start">
          <div class="relative">
            <div class="h-[140px] w-[140px] rounded-full bg-black/5 overflow-hidden">
              <img v-if="avatarSrc" :src="avatarSrc" alt="Profile" class="h-full w-full object-cover" />
            </div>

            <button
              type="button"
              class="absolute left-[120px] top-[120px] grid h-10 w-10 -translate-x-[70%] -translate-y-[70%] place-items-center rounded-full
                     bg-[#0A2395] text-white shadow ring-4 ring-white hover:opacity-95 active:opacity-90"
              aria-label="Edit avatar"
              @click="triggerAvatarUpload"
            >
              <Pencil class="h-5 w-5" />
            </button>

            <input
              ref="avatarInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="onAvatarSelected"
            />
          </div>
        </div>

        <!-- Form -->
        <form class="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2" @submit.prevent="saveProfile">
          <div>
            <label class="mb-2 block text-[13px] font-medium text-black/70">First Name</label>
            <input
              v-model="form.firstName"
              class="h-12 w-full rounded-xl border border-[#DCE7FF] px-4 text-[13px] text-[#6E88C7]
                     outline-none focus:border-[#0A2395] focus:ring-2 focus:ring-[#0A2395]/10"
            />
          </div>

          <div>
            <label class="mb-2 block text-[13px] font-medium text-black/70">Last Name</label>
            <input
              v-model="form.lastName"
              class="h-12 w-full rounded-xl border border-[#DCE7FF] px-4 text-[13px] text-[#6E88C7]
                     outline-none focus:border-[#0A2395] focus:ring-2 focus:ring-[#0A2395]/10"
            />
          </div>

          <div>
            <label class="mb-2 block text-[13px] font-medium text-black/70">Email</label>
            <input
              v-model="form.email"
              class="h-12 w-full rounded-xl border border-[#DCE7FF] px-4 text-[13px] text-[#6E88C7]
                     outline-none focus:border-[#0A2395] focus:ring-2 focus:ring-[#0A2395]/10"
            />
          </div>

          <div>
            <label class="mb-2 block text-[13px] font-medium text-black/70">Password</label>
            <input
              type="password"
              value="************"
              disabled
              class="h-12 w-full rounded-xl border border-[#DCE7FF] bg-black/5 px-4 text-[13px] text-[#6E88C7] opacity-90"
            />
          </div>

          <div>
            <label class="mb-2 block text-[13px] font-medium text-black/70">Date of Birth</label>
            <input
              v-model="form.dob"
              class="h-12 w-full rounded-xl border border-[#DCE7FF] px-4 text-[13px] text-[#6E88C7]
                     outline-none focus:border-[#0A2395] focus:ring-2 focus:ring-[#0A2395]/10"
            />
          </div>

          <div>
            <label class="mb-2 block text-[13px] font-medium text-black/70">Present Address</label>
            <input
              v-model="form.presentAddress"
              class="h-12 w-full rounded-xl border border-[#DCE7FF] px-4 text-[13px] text-[#6E88C7]
                     outline-none focus:border-[#0A2395] focus:ring-2 focus:ring-[#0A2395]/10"
            />
          </div>

          <div>
            <label class="mb-2 block text-[13px] font-medium text-black/70">Permanent Address</label>
            <input
              v-model="form.permanentAddress"
              class="h-12 w-full rounded-xl border border-[#DCE7FF] px-4 text-[13px] text-[#6E88C7]
                     outline-none focus:border-[#0A2395] focus:ring-2 focus:ring-[#0A2395]/10"
            />
          </div>

          <div>
            <label class="mb-2 block text-[13px] font-medium text-black/70">City</label>
            <input
              v-model="form.city"
              class="h-12 w-full rounded-xl border border-[#DCE7FF] px-4 text-[13px] text-[#6E88C7]
                     outline-none focus:border-[#0A2395] focus:ring-2 focus:ring-[#0A2395]/10"
            />
          </div>

          <div>
            <label class="mb-2 block text-[13px] font-medium text-black/70">Postal Code</label>
            <input
              v-model="form.postalCode"
              class="h-12 w-full rounded-xl border border-[#DCE7FF] px-4 text-[13px] text-[#6E88C7]
                     outline-none focus:border-[#0A2395] focus:ring-2 focus:ring-[#0A2395]/10"
            />
          </div>

          <div>
            <label class="mb-2 block text-[13px] font-medium text-black/70">Country</label>
            <input
              v-model="form.country"
              class="h-12 w-full rounded-xl border border-[#DCE7FF] px-4 text-[13px] text-[#6E88C7]
                     outline-none focus:border-[#0A2395] focus:ring-2 focus:ring-[#0A2395]/10"
            />
          </div>

          <div class="md:col-span-2 flex justify-end">
            <button
              type="submit"
              class="mt-4 h-12 w-[200px] rounded-xl
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                     text-[14px] font-semibold text-white
                     shadow-sm transition hover:opacity-95 active:opacity-90"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <!-- ================= SECURITY ================= -->
      <div v-else class="mt-10 max-w-[720px]">
        <div>
          <h3 class="text-[16px] font-semibold text-black">Two-factor Authentication</h3>

          <div class="mt-4 flex items-center gap-3">
            <button
              type="button"
              class="relative h-7 w-14 rounded-full shadow-inner transition"
              :class="twoFAEnabled ? 'bg-[#0A2395]' : 'bg-black/20'"
              aria-label="Toggle 2FA"
              @click="toggle2FA"
            >
              <span
                class="absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all"
                :class="twoFAEnabled ? 'left-8' : 'left-1'"
              />
            </button>

            <span class="text-[13px] text-black/60">Enable or disable two factor authentication</span>
          </div>

          <div class="mt-3 text-[12px] text-black/45">
            Status: <span class="font-medium text-black/70">{{ twoFAEnabled ? "Enabled" : "Disabled" }}</span>
          </div>
        </div>

        <div class="mt-10">
          <h3 class="text-[16px] font-semibold text-black">Change Password</h3>

          <div class="mt-6 space-y-6">
            <div>
              <label class="mb-2 block text-[13px] font-medium text-black/70">Current Password</label>
              <input
                v-model="passwordForm.currentPassword"
                type="password"
                class="h-12 w-full rounded-xl border border-[#DCE7FF] px-4 text-[13px] text-[#6E88C7]
                       outline-none focus:border-[#0A2395] focus:ring-2 focus:ring-[#0A2395]/10"
              />
            </div>

            <div>
              <label class="mb-2 block text-[13px] font-medium text-black/70">New Password</label>
              <input
                v-model="passwordForm.newPassword"
                type="password"
                class="h-12 w-full rounded-xl border border-[#DCE7FF] px-4 text-[13px] text-[#6E88C7]
                       outline-none focus:border-[#0A2395] focus:ring-2 focus:ring-[#0A2395]/10"
              />
            </div>
          </div>

          <div
            v-if="passwordMsg"
            class="mt-5 rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-[13px] text-green-700"
          >
            {{ passwordMsg }}
          </div>

          <div
            v-if="passwordErr"
            class="mt-5 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-[13px] text-red-700"
          >
            {{ passwordErr }}
          </div>
        </div>

        <div class="mt-10 flex justify-end">
          <button
            type="button"
            class="h-12 w-[200px] rounded-xl
                   bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                   text-[14px] font-semibold text-white
                   shadow-sm transition hover:opacity-95 active:opacity-90
                   disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="isChangingPassword"
            @click="changePassword"
          >
            {{ isChangingPassword ? "Saving..." : "Save" }}
          </button>
        </div>
      </div>
    </section>
  </SystemAdminLayout>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Pencil } from "lucide-vue-next";
import { useRouter } from "vue-router";
import SystemAdminLayout from "../layout/Layout.vue";
import { api, getApiErrorMessage } from "../../../../services/api";

/**
 * NOTE:
 * We no longer use localStorage for profile truth.
 * The source of truth is GET /api/auth/profile
 */

const router = useRouter();

const avatarSrc = ref("");

const user = ref({
  name: "—",
  role: "System Administrator",
  avatarUrl: "",
});

const activeTab = ref("edit");
const isLoading = ref(false);
const errorMsg = ref("");

const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  dob: "",
  presentAddress: "",
  permanentAddress: "",
  city: "",
  postalCode: "",
  country: "",
});

const twoFAEnabled = ref(false);

const avatarInputRef = ref(null);

// Password change
const passwordForm = ref({
  currentPassword: "",
  newPassword: "",
});
const isChangingPassword = ref(false);
const passwordMsg = ref("");
const passwordErr = ref("");

function buildName(firstName, lastName, fallbackFullName) {
  const fn = String(firstName || "").trim();
  const ln = String(lastName || "").trim();
  const full = `${fn} ${ln}`.trim();
  return full || String(fallbackFullName || "—").trim() || "—";
}

async function fetchProfile() {
  errorMsg.value = "";
  isLoading.value = true;

  try {
    const res = await api.get("/api/auth/profile");

    // swagger doesn't show exact schema, so we tolerate common shapes
    const payload = res?.data?.user || res?.data?.admin || res?.data?.data || res?.data;

    if (!payload || typeof payload !== "object") {
      errorMsg.value = "Failed to load profile.";
      return;
    }

    const fullName = buildName(payload.firstName, payload.lastName, payload.fullName || payload.name);

    user.value = {
      ...user.value,
      name: fullName,
      role: payload.role || user.value.role,
      avatarUrl: payload.avatarUrl || payload.avatar || "",
    };

    avatarSrc.value = user.value.avatarUrl || "";

    // hydrate form
    form.value = {
      ...form.value,
      firstName: payload.firstName || (String(fullName).split(/\s+/)[0] || ""),
      lastName: payload.lastName || (String(fullName).split(/\s+/).slice(1).join(" ") || ""),
      email: payload.email || "",
      dob: payload.dob || payload.dateOfBirth || "",
      presentAddress: payload.presentAddress || payload.address || "",
      permanentAddress: payload.permanentAddress || "",
      city: payload.city || "",
      postalCode: payload.postalCode || "",
      country: payload.country || "",
    };
  } catch (err) {
    const status = err?.response?.status;
    if (status === 401) {
      // token missing/invalid
      router.push("/login"); // adjust if your login route differs
      return;
    }
    errorMsg.value = getApiErrorMessage(err);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchProfile);

function triggerAvatarUpload() {
  if (avatarInputRef.value) avatarInputRef.value.click();
}

function onAvatarSelected(e) {
  const file = e?.target?.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = String(reader.result || "");
    avatarSrc.value = dataUrl;

    // UI-only: backend update endpoint not provided yet for avatar
    user.value = { ...user.value, avatarUrl: dataUrl };
  };
  reader.readAsDataURL(file);

  // allow picking same file again later
  e.target.value = "";
}

function saveProfile() {
  // No swagger endpoint given for updating profile.
  // Keep UI-only so nothing breaks.
  const fullName = buildName(form.value.firstName, form.value.lastName, user.value.name);
  user.value = { ...user.value, name: fullName };
}

function toggle2FA() {
  twoFAEnabled.value = !twoFAEnabled.value;
}

async function changePassword() {
  passwordMsg.value = "";
  passwordErr.value = "";

  if (!passwordForm.value.currentPassword || !passwordForm.value.newPassword) {
    passwordErr.value = "Please enter your current password and a new password.";
    return;
  }

  isChangingPassword.value = true;
  try {
    // Endpoint provided by you:
    // POST /api/admin/change-password
    const res = await api.post("/api/admin/change-password", {
      currentPassword: passwordForm.value.currentPassword,
      newPassword: passwordForm.value.newPassword,
    });

    passwordMsg.value = res?.data?.message || "Password changed successfully.";
    passwordForm.value.currentPassword = "";
    passwordForm.value.newPassword = "";
  } catch (err) {
    passwordErr.value =
      err?.response?.data?.message || err?.response?.data?.error || getApiErrorMessage(err);
  } finally {
    isChangingPassword.value = false;
  }
}
</script>