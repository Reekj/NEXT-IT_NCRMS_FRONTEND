<template>
    <main class="min-h-screen bg-[#F3F3F3]">
      <div class="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <!-- LEFT: Form panel -->
        <section class="flex items-center justify-center bg-[#FCFCFC] px-6 py-10">
          <div class="w-full max-w-[520px]">
            <!-- Illustration -->
            <div class="flex justify-center pt-6">
              <img
                :src="illustration"
                alt="Forgot password"
                class="w-full max-w-[420px] select-none object-contain"
                draggable="false"
              />
            </div>
  
            <!-- Title + subtitle -->
            <div class="mt-8 text-center">
              <h1 class="text-[16px] font-semibold text-black">Forgot Password</h1>
              <p class="mx-auto mt-2 max-w-[420px] text-[12px] leading-5 text-black/60">
                Enter your email address to receive a reset link and regain access<br />
                to your account
              </p>
            </div>
  
            <!-- Form -->
            <form class="mx-auto mt-8 w-full max-w-[502px]" @submit.prevent="onSubmit">
              <label class="text-[12px] font-medium text-black/70">Email Address</label>
  
              <input
                v-model.trim="email"
                type="email"
                autocomplete="email"
                placeholder="Enter your email address"
                class="mt-2 h-[43px] w-full rounded-md border border-black/15 bg-white px-4 text-[12px]
                       outline-none transition focus:border-black/30 focus:ring-2 focus:ring-black/5"
              />
  
              <button
                type="submit"
                class="mt-6 h-10 w-full rounded-md
                       bg-[linear-gradient(90deg,#0A2395_0%,#030B2F_100%)]
                       text-[12px] font-semibold text-white
                       shadow-sm transition hover:opacity-95 active:opacity-90"
              >
                Enter
              </button>
  
              <div class="mt-5 text-center text-[12px] text-black/60">
                Back to
                <RouterLink to="/roles" class="font-medium text-black/70 underline">
                  Login
                </RouterLink>
              </div>
            </form>
  
            <!-- Security Notice -->
            <div class="mt-10 flex justify-center">
              <div
                class="w-full max-w-[560px] rounded-xl border border-black/15 bg-white px-5 py-4 shadow-sm"
              >
                <div class="flex items-start gap-3">
                  <div class="mt-[2px] grid h-9 w-9 place-items-center rounded-lg bg-black/5">
                    <ShieldCheck class="h-5 w-5 text-black/70" />
                  </div>
  
                  <div>
                    <div class="text-[12px] font-semibold text-black">
                      Security Notice :
                    </div>
                    <p class="mt-2 text-[11px] leading-5 text-black/60">
                      This system contains sensitive criminal record information. Unauthorized access is
                      prohibited and monitored. All activities are logged and audited for security
                      compliance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Security Notice -->
          </div>
        </section>
  
        <!-- RIGHT: Image panel -->
        <aside class="relative hidden lg:block">
          <div
            class="absolute inset-0 bg-cover bg-center"
            :style="{ backgroundImage: `url(${rightImage})` }"
            aria-label="NCRMS background"
          />
        </aside>
      </div>
    </main>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { RouterLink, useRouter } from "vue-router";
  import { ShieldCheck } from "lucide-vue-next";
  
  import rightImage from "../assets/login_image.jpg";
  
  /**
   * IMPORTANT:
   * Export the left illustration from Figma and place it in:
   *   src/assets/forgot_password_illustration.png
   * If your filename differs, change the import below to match.
   */
  import illustration from "../assets/forgot_password_illustration.png";
  
  const router = useRouter();
  const email = ref("");
  
  function onSubmit() {
    // UI-only for now (backend later). You can add validation + API call later.
    // Keeping it clean and non-blocking.
    router.push("/roles");
  }
  </script>
  