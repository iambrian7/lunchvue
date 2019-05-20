<template>
    <div>
        {{ welcome }}
    </div>
</template>

<script>
export default {
    name: 'Profile',
    props: ['msg'],
    data() {
        return {
            welcome: 'This is your profile'
        }
    },
    mounted() {
        if (this.msg) {
            this.welcome = this.msg    
        }

    }
}
</script>