<template>
  <div class="orbiter">
    <div
      v-for="(day, index) in week"
      :key="day.contact_date"
      :class="['day', `day${index + 1}`]"
      :style="{
        // bottom: `calc((100% / 8 * ${index + 1} - 2px) / 2)`
      }">
      <div v-for="(person, personIndex) in day.array" :key="person.id" class="person" :style="{
        transform:
`rotate(${getRotate(day, index, personIndex)}) rotate(calc(180deg / ${
          day.array.length
        } * ${personIndex} * -1))`
      }">
        <img :src="person.img"  alt="person"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Orbiter',
  data() {
    return {
      week: [],
    };
  },
  mounted() {
    axios
      .get('https://xwmi-5dlx-wkyj.t7.xano.io/api:oUvfVMO5/receive_week?start_date=2024-01-02')
      .then((response) => {
        this.week = response.data;
        console.log(this.week);
      });
  },

  methods: {
    getRotate(day: any, index: any, personIndex: any) {
      return `calc(180deg / ${
        day.array.length + 1
      } * ${personIndex + 1})) translateX(calc(((200vh - 100px) / 8 * ${
        index + 1
      } - 2px) /2 * -1)`;
    },
  },
});
</script>

<style lang="scss" scoped>
  .day {
    position: absolute;
    border-radius: 50%;
    border: 1px solid #fff;
    aspect-ratio: 1;
  }

  .day1 {
    height: calc((200vh - 100px) / 8 * 1 - 2px);
    opacity: 0;
  }

  .day2 {
    height: calc((200vh - 100px) / 8 * 2 - 2px);
  }

  .day3 {
    height: calc((200vh - 100px) / 8 * 3 - 2px);
  }

  .day4 {
    height: calc((200vh - 100px) / 8 * 4 - 2px);
  }

  .day5 {
    height: calc((200vh - 100px) / 8 * 5 - 2px);
  }

  .day6 {
    height: calc((200vh - 100px) / 8 * 6 - 2px);
  }

  .day7 {
    height: calc((200vh - 100px) / 8 * 7 - 2px);
  }

  .day8 {
    height: calc((200vh - 100px) / 8 * 8);
  }

  .orbiter {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: -50%;
  }

  .person {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: absolute;
    left: calc(50% - 30px);
    top: calc(50% - 30px);

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
</style>
