
        const BLOG_URL = 'https://newonetry-demo.blogspot.com/'; // Replace with your blog URL
        const NUM_POSTS = 5; // Number of random posts to display
        const AUTO_SLIDE_INTERVAL = 3000; // 3 seconds for auto slide

        const carousel = document.getElementById('carousel');
        let currentIndex = 0;

        // Fetch random posts from Blogger RSS feed
        async function fetchRandomPosts() {
            const response = await fetch(`${BLOG_URL}/feeds/posts/default?alt=json`);
            const data = await response.json();
            const posts = data.feed.entry;

            // Randomize the posts array
            const randomPosts = posts.sort(() => 0.5 - Math.random()).slice(0, NUM_POSTS);
            return randomPosts;
        }

        // Create carousel item for each post
        function createCarouselItem(post) {
            const item = document.createElement('div');
            item.classList.add('carousel-item');

            // Extract the post image or use a placeholder if there's no image
            let imgSrc = 'https://via.placeholder.com/400x250?text=No+Image'; // Placeholder if no image
            const postContent = post.content ? post.content.$t : '';

            const imageMatch = postContent.match(/<img.*?src="(.*?)"/);
            if (imageMatch && imageMatch[1]) {
                imgSrc = imageMatch[1];
            }

            item.innerHTML = `<img src="${imgSrc}" alt="Post Image">`;

            return item;
        }

        // Load the random posts into the carousel
        async function loadPostsIntoCarousel() {
            const posts = await fetchRandomPosts();
            posts.forEach(post => {
                const item = createCarouselItem(post);
                carousel.appendChild(item);
            });
            // Set initial position of the carousel
            updateCarouselPosition();
            // Start the auto-slider
            startAutoSlide();
        }

        // Update the carousel position
        function updateCarouselPosition() {
            const offset = -currentIndex * 100;
            carousel.style.transform = `translateX(${offset}%)`;
        }

        // Next and Previous button functionality
        document.getElementById('nextBtn').addEventListener('click', () => {
            const totalItems = document.querySelectorAll('.carousel-item').length;
            if (currentIndex < totalItems - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarouselPosition();
        });

        document.getElementById('prevBtn').addEventListener('click', () => {
            const totalItems = document.querySelectorAll('.carousel-item').length;
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = totalItems - 1;
            }
            updateCarouselPosition();
        });

        // Auto-slide functionality
        function startAutoSlide() {
            setInterval(() => {
                const totalItems = document.querySelectorAll('.carousel-item').length;
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarouselPosition();
            }, AUTO_SLIDE_INTERVAL);
        }

        // Initialize the carousel on page load
        loadPostsIntoCarousel();

