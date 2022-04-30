<template>
    <div v-if="isFetching" class="loader">

    </div>
    <div v-else>
        <div ref="hero_image" class="hero-nav" :style="{
    'background-image': `url(https://genshin.forevka.dev/${article.attributes.Hero.data.attributes.formats.large.url})`,
    }">
            <div class="hero-nav__inner">
                <h1>{{ article.attributes.Title }}</h1>
                <div class="hero-nav__button">
                    <a href="#" class="btn"></a>
                </div>
            </div>
        </div>
        <br>
        <div class="article-content" v-html="unescapeHtml(article.attributes.Content)"></div>
    </div>
</template>

<script lang="ts">
import '../css/article.scss'
import { defineComponent, ref } from 'vue'
import api from '../api/client';
import Meta from '../api/models/meta';
import Article from '../api/models/article';
import { AxiosResponse } from 'axios';

export default defineComponent({
    setup() {
        const isFetching = ref(true);
        const article = ref({} as Article);
        const firstRender = ref(true);

        return {
            isFetching,
            article,
            firstRender,
        }
    },
    async created() {
        this.isFetching = true;
        await api.get(`/posts/${this.$route.params.id}?populate=Hero`).then((data: AxiosResponse<Meta<Article>, any>) => {
            console.log(data)
            this.article = data.data.data;
            this.isFetching = false;
        });
    },
    updated() {
        if (this.firstRender) {
            this.$refs.hero_image.style.height = `${this.article.attributes.Hero.data.attributes.formats.large.height}px`;

            this.firstRender = false;
        }
    },
    async mounted() {
        window.addEventListener('scroll', () => {
            if (this.isFetching === true)
                return;

            let hero = this.$refs.hero_image;
            let heroHeight = this.article.attributes.Hero.data.attributes.formats.large.height;

            var scrollOffset = window.scrollY;
            if (scrollOffset < heroHeight) {
                hero.style.height = `${heroHeight - scrollOffset}px`;
            }
            /*if (scrollOffset > (heroHeight - 215)) {
                hero.classList.add('fixme');
            } else {
                hero.classList.remove('fixme');
            };*/
        });
    },
    methods: {
        unescapeHtml(unsafe) {
            return unsafe
                .replace(/&amp;/g, "&")
                .replace(/&lt;/g, "<")
                .replace(/&gt;/g, ">")
                .replace(/&quot;/g, "\"")
                .replace(/&#039;/g, "'");
        },
    }
})
</script>