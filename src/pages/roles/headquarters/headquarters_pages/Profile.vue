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

      <!-- Loading -->
      <div
        v-if="isLoading"
        class="mt-6 rounded-xl border border-black/10 bg-white p-4 text-[13px] text-black/70"
      >
        Loading profile…
      </div>

      <!-- Error -->
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

          <!-- ✅ Date picker -->
          <div>
            <label class="mb-2 block text-[13px] font-medium text-black/70">Date of Birth</label>
            <input
              v-model="form.dob"
              type="date"
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
                     shadow-sm transition hover:opacity-95 active:opacity-90
                     disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="isSavingProfile"
            >
              {{ isSavingProfile ? "Saving..." : "Save" }}
            </button>
          </div>

          <div v-if="profileMsg" class="md:col-span-2">
            <div class="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[13px] text-green-700">
              {{ profileMsg }}
            </div>
          </div>

          <div v-if="profileErr" class="md:col-span-2">
            <div class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
              {{ profileErr }}
            </div>
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

          <div v-if="passwordMsg" class="mt-5 rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-[13px] text-green-700">
            {{ passwordMsg }}
          </div>

          <div v-if="passwordErr" class="mt-5 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-[13px] text-red-700">
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
  </HeadquartersLayout>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Pencil } from "lucide-vue-next";
import HeadquartersLayout from "../layout/Layout.vue";

import { api, getApiErrorMessage } from "../../../../services/api";

const router = useRouter();

const activeTab = ref("edit");

const isLoading = ref(false);
const errorMsg = ref("");

const avatarSrc = ref("");
const avatarInputRef = ref(null);

const user = ref({
  name: "—",
  role: "Headquarters",
  avatarUrl: "",
});

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  dob: "", // ✅ YYYY-MM-DD for <input type="date">
  presentAddress: "",
  permanentAddress: "",
  city: "",
  postalCode: "",
  country: "",
});

const twoFAEnabled = ref(false);

const isSavingProfile = ref(false);
const profileMsg = ref("");
const profileErr = ref("");

const passwordForm = reactive({
  currentPassword: "",
  newPassword: "",
});
const isChangingPassword = ref(false);
const passwordMsg = ref("");
const passwordErr = ref("");

const HQ_CURRENT_USER_KEY = "ncrms_hq_current_user_key";
const HQ_USER_CACHE_KEY = "ncrms_hq_user_cache";
const HQ_PROFILE_DRAFTS_KEY = "ncrms_hq_profile_drafts";
const HQ_UPDATE_EVENT = "ncrms-hq-user-updated";

const userKey = ref("");

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function pickProfilePayload(res) {
  return res?.data?.user || res?.data?.admin || res?.data?.data || res?.data || null;
}

function buildFullName(payload) {
  const fn = String(payload?.firstName || "").trim();
  const ln = String(payload?.lastName || "").trim();
  const full = `${fn} ${ln}`.trim();
  return full || String(payload?.fullName || payload?.name || "—").trim() || "—";
}

function deriveUserKey(payload) {
  return (
    String(payload?.id || payload?._id || "").trim() ||
    String(payload?.serviceNumber || "").trim() ||
    String(payload?.email || "").trim()
  );
}

function setCurrentUserKey(key) {
  localStorage.setItem(HQ_CURRENT_USER_KEY, key);
}

function emitHeaderSync() {
  window.dispatchEvent(new CustomEvent(HQ_UPDATE_EVENT));
}

function getCache() {
  const cache = readJson(HQ_USER_CACHE_KEY, {});
  return cache && typeof cache === "object" ? cache : {};
}

function upsertCacheForKey(key, patch) {
  const cache = getCache();
  const prev = cache[key] && typeof cache[key] === "object" ? cache[key] : {};

  cache[key] = {
    name: patch?.name ?? prev.name ?? "User",
    role: patch?.role ?? prev.role ?? "Headquarters",
    avatarUrl: patch?.avatarUrl ?? prev.avatarUrl ?? "",
  };

  writeJson(HQ_USER_CACHE_KEY, cache);
}

function applyLocalOverridesIfAny(key, baseUser) {
  const cached = getCache()?.[key];
  if (!cached) return baseUser;

  return {
    ...baseUser,
    name: cached?.name || baseUser.name,
    role: cached?.role || baseUser.role,
    avatarUrl: cached?.avatarUrl || baseUser.avatarUrl,
  };
}

/**
 * ✅ Date normalization: convert various formats to YYYY-MM-DD for input[type=date]
 */
function toDateInputValue(anyDate) {
  if (!anyDate) return "";

  // already YYYY-MM-DD
  const s = String(anyDate).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;

  // ISO date-time
  if (/^\d{4}-\d{2}-\d{2}T/.test(s)) return s.slice(0, 10);

  // Try parsing as Date
  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) {
    const yyyy = String(d.getFullYear()).padStart(4, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  return "";
}

function getDrafts() {
  const drafts = readJson(HQ_PROFILE_DRAFTS_KEY, {});
  return drafts && typeof drafts === "object" ? drafts : {};
}

function readDraftForKey(key) {
  const d = getDrafts()?.[key];
  return d && typeof d === "object" ? d : null;
}

function writeDraftForKey(key, draftPatch) {
  const drafts = getDrafts();
  const prev = drafts[key] && typeof drafts[key] === "object" ? drafts[key] : {};

  drafts[key] = {
    dob: draftPatch?.dob ?? prev.dob ?? "",
    presentAddress: draftPatch?.presentAddress ?? prev.presentAddress ?? "",
    permanentAddress: draftPatch?.permanentAddress ?? prev.permanentAddress ?? "",
    city: draftPatch?.city ?? prev.city ?? "",
    postalCode: draftPatch?.postalCode ?? prev.postalCode ?? "",
    country: draftPatch?.country ?? prev.country ?? "",
  };

  writeJson(HQ_PROFILE_DRAFTS_KEY, drafts);
}

function applyDraftToForm(draft) {
  if (!draft) return;

  if (draft.dob) form.dob = toDateInputValue(draft.dob);
  if (draft.presentAddress) form.presentAddress = draft.presentAddress;
  if (draft.permanentAddress) form.permanentAddress = draft.permanentAddress;
  if (draft.city) form.city = draft.city;
  if (draft.postalCode) form.postalCode = draft.postalCode;
  if (draft.country) form.country = draft.country;
}

async function fetchProfile() {
  errorMsg.value = "";
  isLoading.value = true;

  try {
    const res = await api.get("/api/auth/profile");
    const payload = pickProfilePayload(res);

    if (!payload || typeof payload !== "object") {
      errorMsg.value = "Failed to load profile.";
      return;
    }

    const key = deriveUserKey(payload);
    if (!key) {
      errorMsg.value = "Profile loaded, but no user identifier was returned (id/serviceNumber/email missing).";
      return;
    }

    userKey.value = key;
    setCurrentUserKey(key);

    const fullName = buildFullName(payload);
    const role = String(payload?.role || "Headquarters").trim();
    const serverAvatar = String(payload?.avatarUrl || payload?.avatar || "").trim();

    const existing = getCache()?.[key];
    upsertCacheForKey(key, {
      name: fullName,
      role,
      avatarUrl: serverAvatar || existing?.avatarUrl || "",
    });

    const baseUser = { ...user.value, name: fullName, role, avatarUrl: serverAvatar || "" };
    const finalUser = applyLocalOverridesIfAny(key, baseUser);

    user.value = finalUser;
    avatarSrc.value = finalUser.avatarUrl || "";

    // hydrate backend-known fields
    form.firstName = payload?.firstName || (String(finalUser.name).split(/\s+/)[0] || "");
    form.lastName = payload?.lastName || (String(finalUser.name).split(/\s+/).slice(1).join(" ") || "");
    form.email = payload?.email || "";

    // if backend ever sends dob/dateOfBirth, normalize it to YYYY-MM-DD
    if (payload?.dob || payload?.dateOfBirth) {
      form.dob = toDateInputValue(payload?.dob || payload?.dateOfBirth);
    }

    if (payload?.presentAddress || payload?.address) form.presentAddress = payload?.presentAddress || payload?.address;
    if (payload?.permanentAddress) form.permanentAddress = payload?.permanentAddress;
    if (payload?.city) form.city = payload?.city;
    if (payload?.postalCode) form.postalCode = payload?.postalCode;
    if (payload?.country) form.country = payload?.country;

    // apply local drafts last
    applyDraftToForm(readDraftForKey(key));

    emitHeaderSync();
  } catch (err) {
    const status = err?.response?.status;
    if (status === 401) {
      router.replace("/login/headquarters");
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
    user.value = { ...user.value, avatarUrl: dataUrl };

    const key = userKey.value || String(localStorage.getItem(HQ_CURRENT_USER_KEY) || "").trim();
    if (key) {
      upsertCacheForKey(key, { name: user.value.name, role: user.value.role, avatarUrl: dataUrl });
      setCurrentUserKey(key);
      emitHeaderSync();
    }
  };

  reader.readAsDataURL(file);
  e.target.value = "";
}

async function saveProfile() {
  profileMsg.value = "";
  profileErr.value = "";
  isSavingProfile.value = true;

  try {
    const fullName = `${String(form.firstName || "").trim()} ${String(form.lastName || "").trim()}`.trim();
    const name = fullName || user.value.name || "User";
    user.value = { ...user.value, name };

    const key = userKey.value || String(localStorage.getItem(HQ_CURRENT_USER_KEY) || "").trim();
    if (key) {
      upsertCacheForKey(key, { name, role: user.value.role, avatarUrl: user.value.avatarUrl || "" });

      // ✅ persist fields (dob is already YYYY-MM-DD from date input)
      writeDraftForKey(key, {
        dob: String(form.dob || "").trim(),
        presentAddress: String(form.presentAddress || "").trim(),
        permanentAddress: String(form.permanentAddress || "").trim(),
        city: String(form.city || "").trim(),
        postalCode: String(form.postalCode || "").trim(),
        country: String(form.country || "").trim(),
      });

      setCurrentUserKey(key);
      emitHeaderSync();
    }

    profileMsg.value = "Saved. (Stored locally until backend provides an update endpoint.)";
  } catch {
    profileErr.value = "Unable to save profile right now.";
  } finally {
    isSavingProfile.value = false;
  }
}

function toggle2FA() {
  twoFAEnabled.value = !twoFAEnabled.value;
}

async function changePassword() {
  passwordMsg.value = "";
  passwordErr.value = "";

  if (!passwordForm.currentPassword || !passwordForm.newPassword) {
    passwordErr.value = "Please enter your current password and a new password.";
    return;
  }

  isChangingPassword.value = true;

  try {
    const res = await api.post("/api/admin/change-password", {
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    });

    passwordMsg.value = res?.data?.message || "Password changed successfully.";
    passwordForm.currentPassword = "";
    passwordForm.newPassword = "";
  } catch (err) {
    passwordErr.value = getApiErrorMessage(err);
  } finally {
    isChangingPassword.value = false;
  }
}
</script>