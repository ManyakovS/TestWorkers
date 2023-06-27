<template>
    <div>
        <div>
            Здесь будет список работников
            <router-link to="/workers/1/about">Profile workers</router-link>
        </div>
        <transition>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Transition } from 'vue'

const workers = [
    {
    "current_page": 1,
    "data": [
        {
            "id": 103,
            "login": "Jennyfer_1472",
            "name": "Майя Владимировна Григорьева",
            "email": "mcclure.clara@yahoo.com",
            "image": "https://test.atwinta.online/storage/avatars/c5461b3086ea88068342d38dbf0a4467.jpg"
        },
        {
            "id": 104,
            "login": "Coty_1147",
            "name": "Александров Валерий Иванович",
            "email": "reuben.ohara@yahoo.com",
            "image": "https://test.atwinta.online/storage/avatars/cfceb4e16d1502bf0d6fa66ef7a25b70.jpg"
        },
        {
            "id": 105,
            "login": "Giles_601",
            "name": "Георгий Львович Гуляев",
            "email": "xspinka@gmail.com",
            "image": "https://test.atwinta.online/storage/avatars/a383c0a9a813e8fdc05cc63159572256.jpg"
        },
        {
            "id": 106,
            "login": "Rosalind_1742",
            "name": "Альбина Владимировна Шилова",
            "email": "romaine.kohler@raynor.com",
            "image": "https://test.atwinta.online/storage/avatars/ae61d17ca611c91b8858d803acc8bf9b.jpg"
        },
        {
            "id": 107,
            "login": "Arjun_953",
            "name": "Большаков Аким Львович",
            "email": "tomasa81@hotmail.com",
            "image": "https://test.atwinta.online/storage/avatars/4d7eac8b7eeca70c94c4ad861c9fc51a.jpg"
        },
        {
            "id": 108,
            "login": "Ashly_1183",
            "name": "Лидия Сергеевна Дьячкова",
            "email": "larue.fadel@yahoo.com",
            "image": "https://test.atwinta.online/storage/avatars/87217ad06afb9ec80860335b17f2a8f4.jpg"
        },
        {
            "id": 109,
            "login": "Jolie_563",
            "name": "Изольда Дмитриевна Сергеева",
            "email": "hilpert.arch@gmail.com",
            "image": "https://test.atwinta.online/storage/avatars/178474123ef33fd7f3c89a0f49a12479.jpg"
        },
        {
            "id": 110,
            "login": "Thea_311",
            "name": "Елисеева Светлана Алексеевна",
            "email": "kaleb.breitenberg@hotmail.com",
            "image": "https://test.atwinta.online/storage/avatars/baf3d85d41cdad5fda5cb25fe3440b3d.jpg"
        },
        {
            "id": 111,
            "login": "Evelyn_1741",
            "name": "Полина Романовна Анисимова",
            "email": "quinn.mitchell@schmitt.com",
            "image": "https://test.atwinta.online/storage/avatars/2d4bdfe33610a94f8007784c7b23a84f.jpg"
        },
        {
            "id": 112,
            "login": "Marc_1352",
            "name": "Никодим Фёдорович Анисимов",
            "email": "randy.smith@hotmail.com",
            "image": "https://test.atwinta.online/storage/avatars/5eed9cf416dae6a3f46545c276445980.jpg"
        },
        {
            "id": 113,
            "login": "Chaz_535",
            "name": "Евгений Романович Устинов",
            "email": "karl.emard@hotmail.com",
            "image": "https://test.atwinta.online/storage/avatars/ddb7c62ef5f1f8b5bf40ccb6aba46083.jpg"
        },
        {
            "id": 114,
            "login": "Euna_548",
            "name": "Панфилова Елизавета Андреевна",
            "email": "terry.cummings@zieme.info",
            "image": "https://test.atwinta.online/storage/avatars/561ebc26a5d2075d33aaf5ba75bbf913.jpg"
        }
    ],
    "first_page_url": "https://test.atwinta.online/api/v1/workers?page=1",
    "from": 1,
    "last_page": 9,
    "last_page_url": "https://test.atwinta.online/api/v1/workers?page=9",
    "next_page_url": "https://test.atwinta.online/api/v1/workers?page=2",
    "path": "https://test.atwinta.online/api/v1/workers",
    "per_page": 12,
    "prev_page_url": null,
    "to": 12,
    "total": 100
}
]

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity .9s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>