<!-- src/pages/roles/system_admin/system_admin_pages/ZonalAdminCreate.vue -->
<template>
  <SystemAdminLayout :user="user">
    <Motion
      tag="div"
      :initial="{ opacity: 0, y: 12 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.35, easing: 'ease-out' }"
    >
      <Motion
        tag="div"
        class="rounded-2xl border border-black/10 bg-white shadow-sm"
        :initial="{ opacity: 0, y: 10, scale: 0.99 }"
        :animate="{ opacity: 1, y: 0, scale: 1 }"
        :transition="{ duration: 0.25, easing: 'ease-out' }"
      >
        <div class="border-b border-black/10 px-7 py-5">
          <h1 class="text-[20px] font-semibold text-black">Add Zonal Admin</h1>
        </div>

        <div class="px-7 py-10">
          <div class="mx-auto w-full max-w-[980px]">
            <Motion
              tag="div"
              class="grid grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-2"
              :initial="{ opacity: 0 }"
              :animate="{ opacity: 1 }"
              :transition="{ staggerChildren: 0.06 }"
            >
              <!-- First Name -->
              <Motion
                tag="div"
                class="space-y-2"
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.2 }"
              >
                <div class="text-[13px] font-medium text-black/70">First Name</div>
                <input v-model.trim="form.firstName" class="input" type="text" />
              </Motion>

              <!-- Last Name -->
              <Motion
                tag="div"
                class="space-y-2"
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.2 }"
              >
                <div class="text-[13px] font-medium text-black/70">Last Name</div>
                <input v-model.trim="form.lastName" class="input" type="text" />
              </Motion>

              <!-- Email -->
              <Motion
                tag="div"
                class="space-y-2"
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.2 }"
              >
                <div class="text-[13px] font-medium text-black/70">Email Address</div>
                <input v-model.trim="form.email" class="input" type="email" />
              </Motion>

              <!-- Service Number -->
              <Motion
                tag="div"
                class="space-y-2"
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.2 }"
              >
                <div class="text-[13px] font-medium text-black/70">Service Number</div>
                <input
                  v-model.trim="form.serviceNumber"
                  class="input"
                  type="text"
                  placeholder="e.g. NP-12345"
                />
              </Motion>

              <!-- Password -->
              <Motion
                tag="div"
                class="space-y-2"
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.2 }"
              >
                <div class="text-[13px] font-medium text-black/70">Temporary Password</div>
                <input
                  v-model="form.password"
                  class="input"
                  type="password"
                  placeholder="Set a password"
                />
              </Motion>

              <!-- Assigned Zone -->
              <Motion
                tag="div"
                class="space-y-2"
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.2 }"
              >
                <div class="text-[13px] font-medium text-black/70">Assigned Zone</div>
                <div class="relative">
                  <select v-model="form.zone" class="input pr-10">
                    <option value="" disabled>Select zone</option>
                    <option>Zone 1</option>
                    <option>Zone 2</option>
                    <option>Zone 3</option>
                    <option>Zone 4</option>
                    <option>Zone 5</option>
                    <option>Zone 6</option>
                    <option>Zone 7</option>
                    <option>Zone 8</option>
                    <option>Zone 9</option>
                  </select>
                </div>
              </Motion>

              <!-- Role -->
              <Motion
                tag="div"
                class="space-y-2"
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.2 }"
              >
                <div class="text-[13px] font-medium text-black/70">Role</div>
                <div class="relative">
                  <select v-model="form.role" class="input pr-10">
                    <option value="" disabled>Select role</option>
                    <option value="headquarter">Headquarters</option>
                    <option value="zonal_admin">Zonal Admin</option>
                    <option value="officer">Officer</option>
                  </select>
                </div>
              </Motion>

              <!-- Account Status (UI-only) -->
              <Motion
                tag="div"
                class="space-y-2"
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.2 }"
              >
                <div class="text-[13px] font-medium text-black/70">Account Status</div>
                <div class="relative">
                  <select v-model="form.status" class="input pr-10">
                    <option value="" disabled>Select status</option>
                    <option>Active</option>
                    <option>Suspended</option>
                  </select>
                </div>
              </Motion>

              <!-- Date Created (UI-only) -->
              <Motion
                tag="div"
                class="space-y-2 md:col-span-1"
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.2 }"
              >
                <div class="text-[13px] font-medium text-black/70">Date Created</div>
                <div class="relative">
                  <input v-model="form.dateCreated" class="input pr-10" type="date" />
                </div>
              </Motion>
            </Motion>

            <div class="mt-12 flex items-center gap-4">
              <Motion
                tag="button"
                type="button"
                class="h-10 rounded-lg px-6 text-[13px] font-medium text-white
                     bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                     shadow-sm hover:opacity-95 active:opacity-90
                     disabled:cursor-not-allowed disabled:opacity-60"
                @click="save"
                :disabled="isSaving"
                :whileHover="isSaving ? {} : { scale: 1.03, y: -1 }"
                :whileTap="isSaving ? {} : { scale: 0.95 }"
                :transition="{ duration: 0.15 }"
              >
                {{ isSaving ? "Saving..." : "Save" }}
              </Motion>

              <Motion
                tag="button"
                type="button"
                class="h-10 rounded-lg border border-black/10 bg-white px-6 text-[13px] font-medium text-black/70
                     hover:bg-black/5 active:bg-black/10
                     disabled:cursor-not-allowed disabled:opacity-60"
                @click="cancel"
                :disabled="isSaving"
                :whileHover="isSaving ? {} : { scale: 1.02 }"
                :whileTap="isSaving ? {} : { scale: 0.95 }"
                :transition="{ duration: 0.15 }"
              >
                Cancel
              </Motion>
            </div>

            <div
              v-if="errorMsg"
              class="mt-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-[13px] text-red-700"
            >
              {{ errorMsg }}
            </div>
          </div>
        </div>
      </Motion>
    </Motion>
  </SystemAdminLayout>
</template>

<script setup>
import { reactive, ref } from "vue";
import { Motion } from "@motionone/vue";
import { useRouter } from "vue-router";
import SystemAdminLayout from "../layout/Layout.vue";

import { registerOfficer } from "../../../../services/auth.service";
import { getApiErrorMessage } from "../../../../services/api";

const router = useRouter();
const isSaving = ref(false);
const errorMsg = ref("");

const user = {
  name: "John Michaelson",
  role: "System Administrator",
  avatarUrl: "",
};

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  serviceNumber: "",
  password: "",
  zone: "",
  role: "headquarter",
  status: "Active",
  dateCreated: "",
});

async function save() {
  errorMsg.value = "";

  // API-required fields (per swagger /api/auth/register)
  if (
    !form.serviceNumber ||
    !form.password ||
    !form.firstName ||
    !form.lastName ||
    !form.email ||
    !form.role ||
    !form.zone
  ) {
    alert("Please fill all required fields.");
    return;
  }

  isSaving.value = true;

  try {
    // ✅ IMPORTANT FIX:
    // /api/auth/register expects role: string, zone: string
    // So we send exactly what the form selects (e.g. "headquarter", "Zone 1")
    await registerOfficer({
      serviceNumber: form.serviceNumber,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      role: form.role,
      zone: form.zone,
    });

    router.push("/system-admin/zonal-admins");
  } catch (err) {
    // show backend details to debug 500s
    console.log("REGISTER ERROR STATUS:", err?.response?.status);
    console.log("REGISTER ERROR BODY:", err?.response?.data);
    errorMsg.value =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      getApiErrorMessage(err);
  } finally {
    isSaving.value = false;
  }
}

function cancel() {
  router.push("/system-admin/zonal-admins");
}
</script>

<style scoped>
.input {
  height: 48px;
  width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(59, 130, 246, 0.18);
  background: #fff;
  padding: 0 16px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.7);
  outline: none;
}
.input:focus {
  border-color: rgba(59, 130, 246, 0.35);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.08);
}
</style>