# Create directories if they don't exist
New-Item -ItemType Directory -Force -Path "hero"
New-Item -ItemType Directory -Force -Path "projects"
New-Item -ItemType Directory -Force -Path "features"
New-Item -ItemType Directory -Force -Path "testimonials"
New-Item -ItemType Directory -Force -Path "blog"

# Hero Section
Move-Item "headway-5QgIuuBxKwM-unsplash.jpg" "hero/hero-banner.jpg"
Move-Item "luca-bravo-XJXWbfSo2f0-unsplash.jpg" "hero/hero-pattern.jpg"

# Projects Section
Move-Item "rahul-mishra-Zs5X1KnHUzw-unsplash.jpg" "projects/project-ai-learning.jpg"
Move-Item "rahul-mishra-glmeeU0zabw-unsplash.jpg" "projects/project-interactive-course.jpg"
Move-Item "pankaj-patel-4oAFasAPftg-unsplash.jpg" "projects/project-adaptive-learning.jpg"
Move-Item "pankaj-patel-yEAOfWSdzgM-unsplash.jpg" "projects/project-educational-analytics.jpg"

# Features Section
Move-Item "altumcode-dsOvZnqGawg-unsplash.jpg" "features/feature-ai.jpg"
Move-Item "victor-aznabaev-pjTU9Edzc1g-unsplash.jpg" "features/feature-interactive.jpg"
Move-Item "luke-peters-B6JINerWMz0-unsplash.jpg" "features/feature-analytics.jpg"
Move-Item "mitchell-luo-p_56ld8PF2Q-unsplash.jpg" "features/feature-community.jpg"

# Testimonials Section
Move-Item "brooke-cagle-g1Kr4Ozfoac-unsplash.jpg" "testimonials/testimonial-1.jpg"
Move-Item "kaur-kristjan-CpPF4W5PB1c-unsplash.jpg" "testimonials/testimonial-2.jpg"
Move-Item "praveen-thirumurugan-Pkn_rlsBmzo-unsplash.jpg" "testimonials/testimonial-3.jpg"

# Blog Section
Move-Item "stanley-dai-73OZYNjVoNI-unsplash.jpg" "blog/blog-1.jpg"
Move-Item "jakub-zerdzicki-bDzS6bx-_Pg-unsplash.jpg" "blog/blog-2.jpg"
Move-Item "jakub-zerdzicki-OtkSQm0Iu6k-unsplash.jpg" "blog/blog-3.jpg"

# Remove remaining unsplash images
Remove-Item *-unsplash.jpg 