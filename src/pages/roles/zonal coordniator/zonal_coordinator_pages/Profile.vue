<!-- src/pages/roles/zonalcoordinator/zonalcoordinator_pages/Profile.vue -->
<template>
    <ZonalCoordinatorLayout :user="user">
      <Motion
        tag="div"
        :initial="{ opacity: 0, y: 12 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.35, easing: 'ease-out' }"
      >
        <h1 class="text-[22px] font-semibold text-black">Profile</h1>
  
        <Motion
          tag="section"
          class="mt-6 rounded-3xl border border-black/10 bg-white p-6 sm:p-8 shadow-sm"
          :initial="{ opacity: 0, y: 10, scale: 0.995 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :transition="{ duration: 0.25, easing: 'ease-out' }"
        >
          <!-- Tabs -->
          <div class="flex items-center gap-12 border-b border-black/10 pb-4">
            <Motion
              tag="button"
              type="button"
              class="relative text-[14px] font-medium"
              :class="activeTab === 'edit' ? 'text-[#0A2395]' : 'text-black/50 hover:text-black'"
              @click="activeTab = 'edit'"
              :whileHover="{ y: -1 }"
              :whileTap="{ scale: 0.98 }"
              :transition="{ duration: 0.12 }"
            >
              Edit Profile
              <span
                v-if="activeTab === 'edit'"
                class="absolute -bottom-[17px] left-0 h-[3px] w-full rounded-full bg-[#0A2395]"
              />
            </Motion>
  
            <Motion
              tag="button"
              type="button"
              class="relative text-[14px] font-medium"
              :class="activeTab === 'security' ? 'text-[#0A2395]' : 'text-black/50 hover:text-black'"
              @click="activeTab = 'security'"
              :whileHover="{ y: -1 }"
              :whileTap="{ scale: 0.98 }"
              :transition="{ duration: 0.12 }"
            >
              Security
              <span
                v-if="activeTab === 'security'"
                class="absolute -bottom-[17px] left-0 h-[3px] w-full rounded-full bg-[#0A2395]"
              />
            </Motion>
          </div>
  
          <!-- ================= EDIT PROFILE ================= -->
          <div
            v-if="activeTab === 'edit'"
            class="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]"
          >
            <!-- Avatar -->
            <div class="flex justify-center lg:justify-start">
              <div class="relative">
                <div class="h-[140px] w-[140px] rounded-full bg-black/5 overflow-hidden">
                  <img
                    v-if="avatarSrc"
                    :src="avatarSrc"
                    alt="Profile"
                    class="h-full w-full object-cover"
                  />
                  <div
                    v-else
                    class="grid h-full w-full place-items-center text-[18px] font-semibold text-black/45"
                  >
                    {{ initials }}
                  </div>
                </div>
  
                <Motion
                  tag="button"
                  type="button"
                  class="absolute left-[120px] top-[120px] grid h-10 w-10 -translate-x-[70%] -translate-y-[70%] place-items-center rounded-full
                         bg-[#0A2395] text-white shadow ring-4 ring-white hover:opacity-95 active:opacity-90"
                  aria-label="Edit avatar"
                  @click="triggerAvatarUpload"
                  :whileHover="{ scale: 1.05 }"
                  :whileTap="{ scale: 0.95 }"
                  :transition="{ duration: 0.12 }"
                >
                  <Pencil class="h-5 w-5" />
                </Motion>
  
                <!-- Hidden file input for avatar upload -->
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
            <form
              class="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2"
              @submit.prevent="saveProfile"
            >
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
                <Motion
                  tag="button"
                  type="submit"
                  class="mt-4 h-12 w-full sm:w-[200px] rounded-xl
                         bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                         text-[14px] font-semibold text-white
                         shadow-sm transition hover:opacity-95 active:opacity-90
                         disabled:cursor-not-allowed disabled:opacity-70"
                  :disabled="saving"
                  :whileHover="saving ? {} : { scale: 1.02, y: -1 }"
                  :whileTap="saving ? {} : { scale: 0.96 }"
                  :transition="{ duration: 0.14 }"
                >
                  {{ saving ? "Saving..." : "Save" }}
                </Motion>
              </div>
            </form>
          </div>
  
          <!-- ================= SECURITY ================= -->
          <div v-else class="mt-10 max-w-[720px]">
            <div>
              <h3 class="text-[16px] font-semibold text-black">Two-factor Authentication</h3>
  
              <div class="mt-4 flex items-center gap-3">
                <Motion
                  tag="button"
                  type="button"
                  class="relative h-7 w-14 rounded-full shadow-inner transition"
                  :class="twoFAEnabled ? 'bg-[#0A2395]' : 'bg-black/20'"
                  aria-label="Toggle 2FA"
                  @click="toggle2FA"
                  :whileTap="{ scale: 0.98 }"
                  :transition="{ duration: 0.12 }"
                >
                  <span
                    class="absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all"
                    :class="twoFAEnabled ? 'left-8' : 'left-1'"
                  />
                </Motion>
  
                <span class="text-[13px] text-black/60">
                  Enable or disable two factor authentication
                </span>
              </div>
  
              <div class="mt-3 text-[12px] text-black/45">
                Status:
                <span class="font-medium text-black/70">{{ twoFAEnabled ? "Enabled" : "Disabled" }}</span>
              </div>
            </div>
  
            <div class="mt-10">
              <h3 class="text-[16px] font-semibold text-black">Change Password</h3>
  
              <div class="mt-6 space-y-6">
                <div>
                  <label class="mb-2 block text-[13px] font-medium text-black/70">Current Password</label>
                  <input
                    type="password"
                    class="h-12 w-full rounded-xl border border-[#DCE7FF] px-4 text-[13px] text-[#6E88C7]
                           outline-none focus:border-[#0A2395] focus:ring-2 focus:ring-[#0A2395]/10"
                  />
                </div>
  
                <div>
                  <label class="mb-2 block text-[13px] font-medium text-black/70">New Password</label>
                  <input
                    type="password"
                    class="h-12 w-full rounded-xl border border-[#DCE7FF] px-4 text-[13px] text-[#6E88C7]
                           outline-none focus:border-[#0A2395] focus:ring-2 focus:ring-[#0A2395]/10"
                  />
                </div>
              </div>
            </div>
  
            <div class="mt-10 flex justify-end">
              <Motion
                tag="button"
                type="button"
                class="h-12 w-full sm:w-[200px] rounded-xl
                       bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                       text-[14px] font-semibold text-white
                       shadow-sm transition hover:opacity-95 active:opacity-90"
                :whileHover="{ scale: 1.02, y: -1 }"
                :whileTap="{ scale: 0.96 }"
                :transition="{ duration: 0.14 }"
              >
                Save
              </Motion>
            </div>
          </div>
        </Motion>
  
        <!-- tiny toast -->
        <Motion
          v-if="toast.show"
          tag="div"
          class="fixed bottom-6 right-6 z-[60] w-[min(92vw,360px)] rounded-2xl border border-black/10 bg-white p-4 shadow-xl"
          :initial="{ opacity: 0, y: 10, scale: 0.98 }"
          :animate="{ opacity: 1, y: 0, scale: 1 }"
          :exit="{ opacity: 0, y: 10 }"
          :transition="{ duration: 0.18 }"
        >
          <div class="flex items-start gap-3">
            <div class="grid h-10 w-10 place-items-center rounded-xl bg-green-50 border border-green-200">
              <Check class="h-5 w-5 text-green-700" />
            </div>
            <div class="min-w-0">
              <div class="text-[13px] font-semibold text-black">Saved</div>
              <div class="mt-0.5 text-[13px] text-black/60">Profile updated successfully.</div>
            </div>
  
            <button
              type="button"
              class="ml-auto grid h-9 w-9 place-items-center rounded-lg hover:bg-black/5 active:bg-black/10"
              @click="toast.show = false"
              aria-label="Close"
            >
              <X class="h-4 w-4 text-black/60" />
            </button>
          </div>
        </Motion>
      </Motion>
    </ZonalCoordinatorLayout>
  </template>
  
  <script setup>
  import { computed, ref } from "vue";
  import { Motion } from "@motionone/vue";
  import { Pencil, Check, X } from "lucide-vue-next";
  import ZonalCoordinatorLayout from "../layout/Layout.vue";
  
  const USER_STORAGE_KEY = "ncrms_zc_current_user";
  
  // If you have no profile image, keep avatarSrc as "" and the UI still shows.
  const avatarSrc = ref("");
  
  const user = ref({
    name: "John John",
    role: "Zonal Coordinator",
    avatarUrl: "",
  });
  
  function readCurrentUser() {
    try {
      const raw = localStorage.getItem(USER_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed && typeof parsed === "object") return parsed;
      return null;
    } catch {
      return null;
    }
  }
  
  function writeCurrentUser(nextUser) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    // IMPORTANT: mirror the same header sync behavior
    window.dispatchEvent(new CustomEvent("ncrms-zc-user-updated"));
  }
  
  const activeTab = ref("edit");
  const saving = ref(false);
  
  const form = ref({
    firstName: "John",
    lastName: "John",
    email: "john@gmail.com",
    dob: "25 January 1990",
    presentAddress: "Zonal Coordinator Address",
    permanentAddress: "Zonal Coordinator Address",
    city: "Lagos",
    postalCode: "100001",
    country: "Nigeria",
  });
  
  const twoFAEnabled = ref(false);
  
  const avatarInputRef = ref(null);
  
  (function init() {
    const stored = readCurrentUser();
    if (stored) {
      user.value = {
        name: stored.name || user.value.name,
        role: stored.role || user.value.role,
        avatarUrl: stored.avatarUrl || "",
      };
      avatarSrc.value = user.value.avatarUrl || "";
    } else {
      // seed storage once so header + profile always stay in sync
      writeCurrentUser(user.value);
    }
  
    // hydrate form name/email from stored user name
    const parts = String(user.value.name || "").trim().split(/\s+/).filter(Boolean);
    if (parts.length) {
      form.value.firstName = parts[0] || form.value.firstName;
      form.value.lastName = parts.length > 1 ? parts.slice(1).join(" ") : form.value.lastName;
    }
  })();
  
  const initials = computed(() => {
    const n = `${String(form.value.firstName || "").trim()} ${String(form.value.lastName || "").trim()}`.trim();
    const parts = n.split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] || "U";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  });
  
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
  
      user.value = {
        ...user.value,
        avatarUrl: dataUrl,
      };
  
      writeCurrentUser(user.value);
    };
    reader.readAsDataURL(file);
  
    // allow picking the same file again later
    e.target.value = "";
  }
  
  const toast = ref({ show: false });
  
  async function saveProfile() {
    saving.value = true;
  
    // tiny delay for better button feel
    await new Promise((r) => setTimeout(r, 300));
  
    const fullName = `${String(form.value.firstName || "").trim()} ${String(form.value.lastName || "").trim()}`.trim();
  
    user.value = {
      ...user.value,
      name: fullName || user.value.name,
    };
  
    writeCurrentUser(user.value);
  
    toast.value.show = true;
    setTimeout(() => (toast.value.show = false), 2200);
  
    saving.value = false;
  }
  
  function toggle2FA() {
    twoFAEnabled.value = !twoFAEnabled.value;
  }
  </script>
  