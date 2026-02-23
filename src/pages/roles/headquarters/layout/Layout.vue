```vue
<!-- src/pages/roles/headquarters/layout/Layout.vue -->
<template>
  <div class="min-h-screen bg-[#F6F7FB]">
    <div class="flex">
      <!-- Sidebar (DESKTOP ONLY) -->
      <div class="hidden lg:block">
        <HeadquartersSidebar />
      </div>

      <!-- MOBILE DRAWER -->
      <div v-if="mobileNavOpen" class="fixed inset-0 z-50 lg:hidden">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40" @click="closeMobileNav" />

        <!-- Drawer -->
        <div
          class="absolute left-0 top-0 h-full w-[280px] max-w-[85vw] bg-white shadow-2xl"
          @click.stop
        >
          <!-- Drawer header -->
          <div class="flex items-center justify-between border-b border-black/10 px-5 py-4">
            <div class="text-[14px] font-semibold text-black">Menu</div>

            <button
              type="button"
              class="grid h-10 w-10 place-items-center rounded-lg hover:bg-black/5 active:bg-black/10"
              aria-label="Close menu"
              @click="closeMobileNav"
            >
              <X class="h-5 w-5 text-black/70" />
            </button>
          </div>

          <!-- Drawer content -->
          <div class="h-[calc(100%-64px)] overflow-y-auto">
            <HeadquartersSidebar @navigate="closeMobileNav" />

            <div class="px-4 pb-6">
              <button
                type="button"
                class="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3
                       text-[13px] font-semibold text-red-600 hover:bg-red-50 active:bg-red-100"
                @click="logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 8V6a2 2 0 012-2h5" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 16v2a2 2 0 002 2h5" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main column -->
      <div class="flex min-h-screen flex-1 flex-col">
        <!-- Topbar -->
        <header class="relative h-[76px] border-b border-[#0A2395]/10 bg-white">
          <!-- subtle brand glow -->
          <div
            class="pointer-events-none absolute inset-0 opacity-100"
            style="
              background:
                radial-gradient(circle at 12% 30%, rgba(10,35,149,0.10), transparent 40%),
                radial-gradient(circle at 88% 0%, rgba(3,11,47,0.06), transparent 45%);
            "
          />

          <div class="relative flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
            <!-- LEFT: Mobile Hamburger + Desktop Logout -->
            <div class="flex items-center gap-3">
              <!-- Mobile hamburger -->
              <button
                type="button"
                class="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-black/5 active:bg-black/10 lg:hidden"
                aria-label="Open menu"
                @click="openMobileNav"
              >
                <Menu class="h-5 w-5 text-black/70" />
              </button>

              <!-- Desktop logout -->
              <button
                type="button"
                class="hidden lg:inline-flex h-9 items-center gap-2 rounded-lg px-3
                       text-[13px] font-medium text-red-600
                       hover:bg-red-50 active:bg-red-100"
                @click="logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 8V6a2 2 0 012-2h5" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 16v2a2 2 0 002 2h5" />
                </svg>
                Logout
              </button>
            </div>

            <!-- RIGHT: User -->
            <div class="flex items-center gap-3">
              <!-- Avatar -->
              <div class="h-11 w-11 overflow-hidden rounded-full bg-black/10">
                <img
                  v-if="headerUser?.avatarUrl"
                  :src="headerUser.avatarUrl"
                  alt="User avatar"
                  class="h-full w-full object-cover"
                />
                <div v-else class="grid h-full w-full place-items-center text-[12px] font-semibold text-black/60">
                  {{ initials }}
                </div>
              </div>

              <!-- Name + role -->
              <div class="leading-tight">
                <div class="text-[13px] font-semibold text-black">
                  {{ headerUser?.name || "User" }}
                </div>
                <div class="text-[12px] text-black/50">
                  {{ headerUser?.role || "Role" }}
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Page (brand background + soft glow) -->
        <!-- IMPORTANT: add bottom padding so content doesn't hide behind fixed footer -->
        <main class="relative flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 pb-[92px]">
          <div
            class="pointer-events-none absolute inset-0 -z-10"
            style="
              background:
                radial-gradient(circle at 18% 18%, rgba(10,35,149,0.08), transparent 42%),
                radial-gradient(circle at 82% 10%, rgba(3,11,47,0.06), transparent 45%),
                linear-gradient(180deg, #F8FAFF 0%, #EEF2FF 100%);
            "
          />
          <slot></slot>
        </main>

        <!-- FIXED BLUE BANNER FOOTER (ONLY THIS REMAINS) -->
        <!-- <footer
          class="fixed bottom-0 left-0 z-40 w-full border-t border-white/10
                 bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                 text-white shadow-[0_-12px_28px_rgba(3,11,47,0.22)]"
        >
          <div class="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-4">
            <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-center gap-3">
                <span class="h-2.5 w-2.5 rounded-full bg-white/85" />
                <div class="text-[12px] font-semibold text-white/95">NCRMS Headquarters</div>
                <div class="text-[12px] text-white/70">Authorized access only</div>
              </div>

              <div class="text-[12px] text-white/70">
                © {{ new Date().getFullYear() }} NCRMS • All activity is logged and audited.
              </div>
            </div>
          </div>
        </footer> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Menu, X } from "lucide-vue-next";
import HeadquartersSidebar from "./Sidenav.vue";

const router = useRouter();
const route = useRoute();

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const USER_STORAGE_KEY = "ncrms_headquarters_current_user";

const headerUser = ref({
  name: props.user?.name || "User",
  role: props.user?.role || "Headquarters",
  avatarUrl: props.user?.avatarUrl || "",
});

const mobileNavOpen = ref(false);

function openMobileNav() {
  mobileNavOpen.value = true;
}
function closeMobileNav() {
  mobileNavOpen.value = false;
}

watch(
  () => route.fullPath,
  () => {
    mobileNavOpen.value = false;
  }
);

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
}

function syncHeaderUserFromStorage() {
  const stored = readCurrentUser();
  if (stored) {
    headerUser.value = {
      name: stored.name || headerUser.value.name,
      role: stored.role || headerUser.value.role,
      avatarUrl: stored.avatarUrl || "",
    };
  } else {
    // seed once so HQ header always has a source of truth
    writeCurrentUser(headerUser.value);
  }
}

onMounted(() => {
  syncHeaderUserFromStorage();
  window.addEventListener("ncrms-hq-user-updated", syncHeaderUserFromStorage);
});

const initials = computed(() => {
  const parts = String(headerUser.value?.name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const first = parts[0]?.[0] || "U";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
});

function logout() {
  localStorage.clear();
  sessionStorage.clear();
  router.replace("/login/headquarters");
}
</script>
```
