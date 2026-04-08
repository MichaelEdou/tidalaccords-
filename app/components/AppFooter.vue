<template>
  <footer class="footer">
    <div class="footer-cols">
      <div class="footer-col">
        <h4>Phinaccords</h4>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Press</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Jobs</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Features</h4>
        <ul>
          <li><a href="#">HiFi Plus</a></li>
          <li><a href="#">HiFi</a></li>
          <li><a href="#">Connect</a></li>
          <li><a href="#">DJ</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Resources</h4>
        <ul>
          <li><a href="#">Support</a></li>
          <li><a href="#">Web Player</a></li>
          <li><a href="#">Download</a></li>
          <li><a href="#">Gift Cards</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Cookie Policy</a></li>
          <li><a href="#">Accessibility</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-text">
        Phinaccords is a global music streaming platform that brings artists and fans together through music.
        Experience high-fidelity sound quality and discover new music every day.
      </div>
      <div class="footer-socials">
        <iconify-icon icon="lucide:twitter" style="font-size: 20px; color: var(--muted-foreground); cursor: pointer"></iconify-icon>
        <iconify-icon icon="lucide:instagram" style="font-size: 20px; color: var(--muted-foreground); cursor: pointer"></iconify-icon>
        <iconify-icon icon="lucide:facebook" style="font-size: 20px; color: var(--muted-foreground); cursor: pointer"></iconify-icon>
        <iconify-icon icon="lucide:youtube" style="font-size: 20px; color: var(--muted-foreground); cursor: pointer"></iconify-icon>
      </div>
    </div>
    <div class="footer-sub">
      <span>&copy; {{ new Date().getFullYear() }} Phinaccords. All rights reserved.</span>
      <div class="footer-sub-links">
        <a href="#">Legal</a>
        <a href="#">Privacy</a>
        <a href="#">Cookies</a>
        <a href="#">Accessibility</a>
      </div>
    </div>
  </footer>
</template>
