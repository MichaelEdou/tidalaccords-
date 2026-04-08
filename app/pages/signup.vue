<template>
  <div class="login-page">
    <div class="login-left">
      <NuxtLink to="/" class="login-back-btn">
        <iconify-icon icon="lucide:arrow-left" style="font-size: 20px"></iconify-icon>
      </NuxtLink>
      <div class="login-form-wrapper">
        <!-- Logo -->
        <div class="login-logo">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L16 6L12 10L8 6L12 2Z" fill="#000" />
            <path d="M18 8L22 12L18 16L14 12L18 8Z" fill="#000" />
            <path d="M6 8L10 12L6 16L2 12L6 8Z" fill="#000" />
            <path d="M12 14L16 18L12 22L8 18L12 14Z" fill="#000" />
          </svg>
        </div>

        <!-- Heading -->
        <h1 class="login-title">Create your free account</h1>
        <p class="signup-subtitle">
          Create a free account to listen to free-through 40,000+ screens. No credit card required.
        </p>

        <!-- Social buttons -->
        <div class="login-social-buttons">
          <button class="login-social-btn" @click="handleSignup">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <!-- Divider -->
        <div class="login-divider">
          <span>or</span>
        </div>

        <!-- Email form -->
        <div class="login-email-form">
          <input type="email" class="login-input" placeholder="Enter email address" />
          <button class="login-submit-btn" @click="handleSignup">Continue</button>
        </div>

        <!-- Legal -->
        <p class="login-legal">
          By continuing, you agree to Phinaccords' <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>

        <!-- Already have account -->
        <p class="signup-login-link">
          Already have an account? <NuxtLink to="/login">Log in</NuxtLink>
        </p>

        <!-- Trusted by -->
        <div class="signup-trusted">
          <p class="signup-trusted-label">Trusted by teams at</p>
          <div class="signup-trusted-logos">
            <span class="trusted-logo">headspace</span>
            <span class="trusted-logo">airbnb</span>
            <span class="trusted-logo">Revolut</span>
            <span class="trusted-logo">duolingo</span>
          </div>
        </div>
      </div>
    </div>

    <div class="login-right">
      <div class="login-collage">
        <img src="https://storage.googleapis.com/banani-generated-images/generated-images/710c7250-e363-460d-a399-6e12dbabfe10.jpg" class="collage-img collage-1" alt="" />
        <img src="https://storage.googleapis.com/banani-generated-images/generated-images/2569b053-fc28-44f0-bc74-cc9c38301269.jpg" class="collage-img collage-2" alt="" />
        <img src="https://storage.googleapis.com/banani-generated-images/generated-images/a249017e-0419-4d7e-844d-c58521736af3.jpg" class="collage-img collage-3" alt="" />
        <img src="https://storage.googleapis.com/banani-generated-images/generated-images/38e28df2-f3ce-44b8-a9f3-8ad67b0cb439.jpg" class="collage-img collage-4" alt="" />
        <img src="https://storage.googleapis.com/banani-generated-images/generated-images/5ed5f22a-25f9-44af-8027-2ea9f0bf24a2.jpg" class="collage-img collage-5" alt="" />
        <img src="https://storage.googleapis.com/banani-generated-images/generated-images/a352c27b-5203-49e2-ba9a-ca1f72fae6a2.jpg" class="collage-img collage-6" alt="" />
        <img src="https://storage.googleapis.com/banani-generated-images/generated-images/6fc915da-b452-402d-b021-815b08834cb6.jpg" class="collage-img collage-7" alt="" />
        <img src="https://storage.googleapis.com/banani-generated-images/generated-images/d4c0a175-cf35-4218-9ba8-6d867d3c03f0.jpg" class="collage-img collage-8" alt="" />
        <img src="https://storage.googleapis.com/banani-generated-images/generated-images/ed36b66d-2637-4906-ac99-c79ab9c92d2b.jpg" class="collage-img collage-9" alt="" />
        <img src="https://storage.googleapis.com/banani-generated-images/generated-images/25d97154-6c8b-46e8-a773-c5a9dbdd8f48.jpg" class="collage-img collage-10" alt="" />
        <img src="https://storage.googleapis.com/banani-generated-images/generated-images/a9c0a019-09be-42c9-8cdc-54d8e395a696.jpg" class="collage-img collage-11" alt="" />
        <img src="https://storage.googleapis.com/banani-generated-images/generated-images/cf097847-3d77-4ee1-8852-5970aeffd2b3.jpg" class="collage-img collage-12" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { login } = useAuth()
const router = useRouter()

function handleSignup() {
  login()
  router.push('/')
}
</script>
