<template>
    <div v-if="isFetching">Fetching...</div>
    <div v-else class="articles-list">
        <div v-for="item in data" :key="item.id" class="article">
            <!--<article v-for="item in data" :key="item.id" class="article">
            </article>-->
            <ArticleCard :article="item"/>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import api from '../api/client';
import ArticleCard from './ArticleCard.vue';

export default defineComponent({
    components: {
        ArticleCard,
    },
    setup() {
        const isFetching = ref(true);
        const data = ref([]);

        return {
            isFetching,
            data,
        }
    },
    async created() {
        this.isFetching = true;
        await api.get("/posts?populate=Hero").then((data) => {
            console.log(data.data.data)
            this.data.push(...data.data.data);
            console.log(this.data)
            this.isFetching = false;
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

<style lang="scss" scoped>
.articles-list {
  width: 90%;
  max-width: 1240px;
  margin: 0 auto;
  
  display: grid;
  
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 20px;
  
  @media (min-width: 30em) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (min-width: 60em) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
