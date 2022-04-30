<template>
    <div v-if="isFetching">Fetching...</div>
    <div v-else class="articles-list">
        <div v-for="item in data" :key="item.id" class="article">
            <!--<article v-for="item in data" :key="item.id" class="article">
            </article>-->
            <router-link :to="'/article/' + item.id">{{item.attributes.Title}}</router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import api from '../api/client';

export default defineComponent({
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
        await api.get("/posts").then((data) => {
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
.delimiter {
    height: 20px;
    border-color: red;
}
</style>
