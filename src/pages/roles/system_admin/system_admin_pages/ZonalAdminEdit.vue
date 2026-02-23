<!-- src/pages/roles/system_admin/system_admin_pages/ZonalAdminEdit.vue -->
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
          <h1 class="text-[20px] font-semibold text-black">Edit Zonal Admin</h1>
        </div>

        <div class="px-7 py-10">
          <div class="mx-auto w-full max-w-[980px]">
            <!-- If record not found -->
            <Motion
              v-if="notFound"
              tag="div"
              class="rounded-xl border border-black/10 bg-white p-6 text-[13px] text-black/70"
              :initial="{ opacity: 0, y: 8 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.2, easing: 'ease-out' }"
            >
              Zonal Admin not found.
              <Motion
                tag="button"
                type="button"
                class="mt-4 inline-flex h-10 items-center rounded-lg border border-black/10 px-4 text-[13px] font-medium hover:bg-black/[0.03]"
                @click="cancel"
                :whileHover="{ scale: 1.03 }"
                :whileTap="{ scale: 0.95 }"
                :transition="{ duration: 0.15 }"
              >
                Back to list
              </Motion>
            </Motion>

            <!-- Form -->
            <div v-else>
              <Motion
                tag="div"
                class="grid grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-2"
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :transition="{ staggerChildren: 0.06 }"
              >
                <!-- Full Name -->
                <Motion
                  tag="div"
                  class="space-y-2"
                  :initial="{ opacity: 0, y: 8 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.2 }"
                >
                  <div class="text-[13px] font-medium text-black/70">Full Name</div>
                  <input v-model.trim="form.fullName" class="input" type="text" />
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
                    <!-- <ChevronDown
                      class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"
                    /> -->
                  </div>
                </Motion>

                <!-- Account Status -->
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
                    <!-- <ChevronDown
                      class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"
                    /> -->
                  </div>
                </Motion>

                <!-- Date Created -->
                <Motion
                  tag="div"
                  class="space-y-2 md:col-span-1"
                  :initial="{ opacity: 0, y: 8 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.2 }"
                >
                  <div class="text-[13px] font-medium text-black/70">Date Created</div>
                  <div class="relative">
                    <!-- Use native date picker -->
                    <input v-model="form.dateCreated" class="input pr-10" type="date" />
                    <!-- <Calendar
                      class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40"
                    /> -->
                  </div>
                </Motion>
              </Motion>

              <div class="mt-12 flex items-center gap-4">
                <Motion
                  tag="button"
                  type="button"
                  class="h-10 rounded-lg px-6 text-[13px] font-medium text-white
                       bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                       shadow-sm hover:opacity-95 active:opacity-90"
                  @click="update"
                  :whileHover="{ scale: 1.03, y: -1 }"
                  :whileTap="{ scale: 0.95 }"
                  :transition="{ duration: 0.15 }"
                >
                  Update
                </Motion>

                <Motion
                  tag="button"
                  type="button"
                  class="h-10 rounded-lg border border-black/10 bg-white px-6 text-[13px] font-medium text-black/70
                       hover:bg-black/5 active:bg-black/10"
                  @click="cancel"
                  :whileHover="{ scale: 1.02 }"
                  :whileTap="{ scale: 0.95 }"
                  :transition="{ duration: 0.15 }"
                >
                  Cancel
                </Motion>
              </div>

              <!-- tiny dev hint (optional) -->
              <Motion
                tag="div"
                class="mt-6 text-[11px] text-black/40"
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :transition="{ delay: 0.25 }"
              >
              </Motion>
            </div>
          </div>
        </div>
      </Motion>
    </Motion>
  </SystemAdminLayout>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { Motion } from "@motionone/vue";
import { useRouter, useRoute } from "vue-router";
import SystemAdminLayout from "../layout/Layout.vue";
import { ChevronDown, Calendar } from "lucide-vue-next";

const router = useRouter();
const route = useRoute();

const user = { name: "John Michaelson", role: "System Administrator", avatarUrl: "" };

const STORAGE_KEY = "ncrms_system_admin_zonal_admins";
const id = String(route.params.id || "");

const notFound = ref(false);

const form = reactive({
  id: id,
  fullName: "",
  email: "",
  zone: "",
  status: "",
  dateCreated: "", // YYYY-MM-DD
});

function readRows() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRows(next) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function toISODateMaybe(value) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(String(value || ""))) return value;

  const d = new Date(String(value || ""));
  if (!Number.isNaN(d.getTime())) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  return "";
}

onMounted(() => {
  if (!id) {
    notFound.value = true;
    return;
  }

  const rows = readRows();
  const found = rows.find((r) => String(r.id) === id);

  if (!found) {
    notFound.value = true;
    return;
  }

  form.id = String(found.id);
  form.fullName = found.fullName || "";
  form.email = found.email || "";
  form.zone = found.zone || "";
  form.status = found.status || "";
  form.dateCreated = toISODateMaybe(found.dateCreated);
});

function update() {
  if (!form.fullName || !form.email || !form.zone || !form.status) {
    alert("Please fill all fields.");
    return;
  }

  const rows = readRows();
  const idx = rows.findIndex((r) => String(r.id) === id);

  if (idx === -1) {
    alert("Record not found.");
    return;
  }

  const next = [...rows];
  next[idx] = {
    ...next[idx],
    fullName: form.fullName,
    email: form.email,
    zone: form.zone,
    status: form.status,
    dateCreated: form.dateCreated || "—",
  };

  writeRows(next);
  router.push("/system-admin/zonal-admins");
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
