<!-- src/pages/roles/headquarters/headquarters_pages/Profile.vue -->
<template>
    <HeadquartersLayout :user="user">
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
  
        <!-- ================= EDIT PROFILE ================= -->
        <div
          v-if="activeTab === 'edit'"
          class="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]"
        >
          <!-- Avatar -->
          <div class="flex justify-center lg:justify-start">
            <div class="relative">
              <!-- If you don't have profile.jpg, this will still render with a fallback bg -->
              <div class="h-[140px] w-[140px] rounded-full bg-black/5 overflow-hidden">
                <img
                  v-if="avatarSrc"
                  :src="avatarSrc"
                  alt="Profile"
                  class="h-full w-full object-cover"
                />
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
              <!-- Toggle (NOW responsive) -->
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
  
              <span class="text-[13px] text-black/60">
                Enable or disable two factor authentication
              </span>
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
            <button
              type="button"
              class="h-12 w-[200px] rounded-xl
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                     text-[14px] font-semibold text-white
                     shadow-sm transition hover:opacity-95 active:opacity-90"
            >
              Save
            </button>
          </div>
        </div>
      </section>
    </HeadquartersLayout>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { Pencil } from "lucide-vue-next";
  import HeadquartersLayout from "../layout/Layout.vue";
  
  const USER_STORAGE_KEY = "ncrms_headquarters_current_user";
  
  // If you have no profile image, keep avatarSrc as "" and the UI still shows.
  const avatarSrc = ref("");
  
  const user = ref({
    name: "Headquarters User",
    role: "Headquarters",
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
    window.dispatchEvent(new CustomEvent("ncrms-hq-user-updated"));
  }
  
  const activeTab = ref("edit");
  
  const form = ref({
    firstName: "Headquarters",
    lastName: "User",
    email: "hq@gmail.com",
    dob: "25 January 1990",
    presentAddress: "Headquarters Address",
    permanentAddress: "Headquarters Address",
    city: "Abuja",
    postalCode: "900001",
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
  
    // optionally hydrate the form name/email from stored user name
    const parts = String(user.value.name || "").trim().split(/\s+/).filter(Boolean);
    if (parts.length) {
      form.value.firstName = parts[0] || form.value.firstName;
      form.value.lastName = parts.length > 1 ? parts.slice(1).join(" ") : form.value.lastName;
    }
  })();
  
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
  
  function saveProfile() {
    // Update the "logged in user" name so header matches profile
    const fullName = `${String(form.value.firstName || "").trim()} ${String(form.value.lastName || "").trim()}`.trim();
  
    user.value = {
      ...user.value,
      name: fullName || user.value.name,
    };
  
    writeCurrentUser(user.value);
  
    // UI-only for now
  }
  
  function toggle2FA() {
    twoFAEnabled.value = !twoFAEnabled.value;
  }
  </script>
  