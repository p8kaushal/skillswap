<template>
    <!-- @to-do make the footer appear at the bottom of the page always -->
    <footer class="app-footer" role="contentinfo" aria-label="Footer">
        <div class="container">
            <span class="copyright">© {{ year }} SkillSwap. All rights reserved.</span>
            <nav class="contact" aria-label="Contact">
                <a class="contact-link" href="mailto:hello@skillswap.example" rel="noopener">hello@skillswap.example</a>
                <span class="divider" aria-hidden="true">·</span>
                <a class="contact-link" href="tel:+10000000000">+1 (000) 000-0000</a>
            </nav>
        </div>
    </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    background: #f8f9fb;
    color: #333;
    border-top: 1px solid #e6e9ee;
}
.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}
.contact {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.95rem;
}
.contact-link {
    color: #0366d6;
    text-decoration: none;
}
.contact-link:hover,
.contact-link:focus {
    text-decoration: underline;
}
.divider {
    color: #999;
    margin: 0 6px;
}
@media (max-width: 560px) {
    .container {
        flex-direction: column;
        text-align: center;
    }
    .divider { display: none; }
}
</style>