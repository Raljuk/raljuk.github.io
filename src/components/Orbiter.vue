<template>
  <div class="orbiter">

    <div
      v-for="(day, index) in week"
      :key="day.contact_date"
      :class="['day', `day${orbiter[index]}`]"
      :style="getDayStyles(index)">

      <div v-if="orbiter[index] === week.length - 1" class="date">
        <span class="dateText">
          {{ getDate(day) }}
        </span>
      </div>

      <div
        v-for="(person, personIndex) in day.array"
        :key="person.id"
        class="person"
        :style="getPersonStyles(day, index, personIndex)"
      >
        <img
          class="photo"
          :src="person.img"
          alt="person"
        />
      </div>

    </div>

    <button class="button">
      <img alt="button" src="../assets/button.svg">
    </button>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { Data, Day } from '@/components/types';
import { API_URL, ORBITER_ORDER } from './constants';

export default defineComponent({
  name: 'Orbiter',

  data() {
    return {
      week: [],
      inProcess: false,
      orbiter: ORBITER_ORDER,
    } as Data;
  },

  mounted() {
    this.fetchWeek();

    window.addEventListener('wheel', this.onScroll);
  },

  unmounted() {
    window.removeEventListener('wheel', this.onScroll);
  },

  methods: {
    onScroll(event: Event & { deltaY: number }): void {
      if (this.inProcess) {
        return;
      }

      this.inProcess = true;

      setTimeout(() => {
        if (event.deltaY < 0) {
          this.orbiter.unshift(this.orbiter.pop());
        } else {
          this.orbiter.push(this.orbiter.shift());
        }

        this.inProcess = false;
      }, 500);
    },

    getPersonStyles(day: Day, index: number, personIndex: number): { transform: string } {
      return {
        transform:
          this.orbiter[index] === this.week.length - 1
          && day.array.length % 2 !== 0
          && personIndex === Math.floor(day.array.length / 2)
            ? this.getShiftedTransform(day, index, personIndex)
            : this.getTransform(day, index, personIndex),
      };
    },

    getTransform(day: Day, index: number, personIndex: number): string {
      return `rotate(${
        this.getRotate(day, index, personIndex)
      }) ${this.getTranslate(index)} rotate(calc(${
        this.getRotate(day, index, personIndex)
      } * -1))`;
    },

    getRotate(day: Day, index: number, personIndex: number): string {
      return `calc(180deg / ${day.array.length + 1} * ${personIndex + 1})`;
    },

    getShiftedTransform(day: Day, index: number, personIndex: number): string {
      return `rotate(${
        this.getShiftedRotate(day, index, personIndex)
      }) ${this.getTranslate(index)} rotate(calc(${
        this.getShiftedRotate(day, index, personIndex)
      } * -1))`;
    },

    getShiftedRotate(day: Day, index: number, personIndex: number): string {
      return `calc(180deg / ${day.array.length + 2} * ${personIndex + 1})`;
    },

    getTranslate(index: number): string {
      return `translateX(calc(((200vh - 100px) / 8 * ${this.orbiter[index]} - 2px) / 2 * -1))`;
    },

    getDayStyles(index: number): { height: string, zIndex: number } {
      return {
        height: `calc((200vh - 100px) / ${this.week.length - 1} * ${this.orbiter[index]} - 2px)`,
        zIndex: this.week.length - (this.orbiter[index] || 0),
      };
    },

    async fetchWeek(): Promise<void> {
      const response = await axios.get(`${API_URL}?start_date=${new Date().toISOString()}`);

      this.week = response.data;
    },

    getDate(day: Day): string {
      const date = new Date(day.contact_date).toDateString().slice(0, 10);
      const todayDate = new Date().toDateString().slice(0, 10);

      return date === todayDate ? 'Today' : date;
    },
  },
});
</script>

<style lang="scss" scoped>
  .day {
    position: absolute;
    aspect-ratio: 1;
    background-image: linear-gradient(white 20%, black 50%);
    background-origin: border-box;
    background-clip: border-box;
    border: 1px solid transparent;
    border-radius: 50%;
    transition: all 0.5s ease;

    &:before {
      width: 100%;
      height: 100%;
      position: absolute;
      background: #000;
      background-clip: border-box;
      border-radius: 50%;
      content: "";
      left: 0;
      top: 0;
    }
  }

  .day1, .day9 {
    opacity: 0;
  }

  .orbiter {
    width: 100%;
    height: 100%;
    position: relative;
    align-items: center;
    bottom: -50%;
    display: flex;
    justify-content: center;
  }

  .person {
    width: 60px;
    height: 60px;
    padding: 5px;
    position: absolute;
    background: #000;
    border-radius: 50%;
    left: calc(50% - 36px);
    top: calc(50% - 36px);
    transition: all 0.5s ease;
    z-index: 11;
  }

  .photo {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(white, black), linear-gradient(to bottom, white, black);
    background-origin: border-box;
    background-clip: content-box, border-box;
    border: 1px solid transparent;
    border-radius: 50%;
    object-fit: cover;
  }

  .date {
    position: relative;
    color: #fff;
    display: flex;
    justify-content: center;
    z-index: 10;
  }

  .dateText {
    margin-top: -20px;
    padding: 10px;
    background: #000;
  }

  .button {
    position: absolute;
    background: #000;
    border: none;
    bottom: calc(50% + 30px);
    cursor: pointer;
    z-index: 12;
  }
</style>
