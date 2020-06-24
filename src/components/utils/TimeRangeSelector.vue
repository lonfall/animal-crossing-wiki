<template>
    <div>
        <div class="time-range" @dragstart.prevent="onDragStart" @mouseup="onMouseUp"
             @mouseleave="onMouseLeave" @mouseover="onMouseOver">
            <div :class="['time-selector' ,'with',isActive(0)]" @mousedown="onMouseDown(0)"
                 @mouseenter="onMouseEnter('time-0',0)">
                <div class="time-line" />
            </div>
            <div :class="['time-selector' ,'with',isActive(1)]" @mousedown="onMouseDown(1)"
                 @mouseenter="onMouseEnter('time-1',1)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(2)]" @mousedown="onMouseDown(2)"
                 @mouseenter="onMouseEnter('time-2',2)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(3)]" @mousedown="onMouseDown(3)"
                 @mouseenter="onMouseEnter('time-3',3)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(4)]" @mousedown="onMouseDown(4)"
                 @mouseenter="onMouseEnter('time-4',4)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(5)]" @mousedown="onMouseDown(5)"
                 @mouseenter="onMouseEnter('time-5',5)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(6)]" @mousedown="onMouseDown(6)"
                 @mouseenter="onMouseEnter('time-6',6)">
                <div class="time-line" />
            </div>
            <div :class="['time-selector' ,'with',isActive(7)]" @mousedown="onMouseDown(7)"
                 @mouseenter="onMouseEnter('time-7',7)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(8)]" @mousedown="onMouseDown(8)"
                 @mouseenter="onMouseEnter('time-8',8)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(9)]" @mousedown="onMouseDown(9)"
                 @mouseenter="onMouseEnter('time-9',9)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(10)]" @mousedown="onMouseDown(10)"
                 @mouseenter="onMouseEnter('time-10',10)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(11)]" @mousedown="onMouseDown(11)"
                 @mouseenter="onMouseEnter('time-11',11)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(12)]" @mousedown="onMouseDown(12)"
                 @mouseenter="onMouseEnter('time-12',12)">
                <div class="time-line" />
            </div>
            <div :class="['time-selector' ,'with',isActive(13)]" @mousedown="onMouseDown(13)"
                 @mouseenter="onMouseEnter('time-13',13)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(14)]" @mousedown="onMouseDown(14)"
                 @mouseenter="onMouseEnter('time-14',14)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(15)]" @mousedown="onMouseDown(15)"
                 @mouseenter="onMouseEnter('time-15',15)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(16)]" @mousedown="onMouseDown(16)"
                 @mouseenter="onMouseEnter('time-16',16)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(17)]" @mousedown="onMouseDown(17)"
                 @mouseenter="onMouseEnter('time-17',17)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(18)]" @mousedown="onMouseDown(18)"
                 @mouseenter="onMouseEnter('time-18',18)">
                <div class="time-line" />
            </div>
            <div :class="['time-selector' ,'with',isActive(19)]" @mousedown="onMouseDown(19)"
                 @mouseenter="onMouseEnter('time-19',19)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(20)]" @mousedown="onMouseDown(20)"
                 @mouseenter="onMouseEnter('time-20',20)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(21)]" @mousedown="onMouseDown(21)"
                 @mouseenter="onMouseEnter('time-21',21)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(22)]" @mousedown="onMouseDown(22)"
                 @mouseenter="onMouseEnter('time-22',22)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,'with',isActive(23)]" @mousedown="onMouseDown(23)"
                 @mouseenter="onMouseEnter('time-23',23)">
                <div class="time-line time-line-short" />
            </div>
            <div :class="['time-selector' ,isActive(24)]" @mousedown="onMouseDown(24)"
                 @mouseenter="onMouseEnter('time-24',24)">
                <div class="time-line" />
            </div>
        </div>
        <div class="select-text">{{selectText}}</div>
        <div class="select-time" :style="{'display':selectTimeDisplay,'left':selectTimeLeft+'px'}">{{mouseEnterValue}}
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isMouseDown: false,
      dragStart: -1,
      dragEnd: -1,
      mouseEnterValue: -1,
      selectTimeLeft: 6,
      selectTimeDisplay: 'none',
      selected: []
    }
  },
  props: {
    value: Number
  },
  created () {
    let values = []
    for (let i = 0; i <= 24; i++) {
      if (this.value & (1 << i)) {
        values.push(i)
      }
    }
    this.selected = values
  },
  name: 'TimeRangeSelector',
  computed: {
    selectText: function () {
      let result = ''
      let start = -1
      for (let i = 0; i <= 24; i++) {
        let index = this.selected.indexOf(i)
        if (index !== -1) {
          if (start === -1) {
            start = i
          }
          if (i === 24) {
            if (start !== -1) {
              if (start === 0) {
                result += '全天'
              } else if (start === i) {
                result += i + '点 '
              } else {
                result += start + '点-' + i + '点 '
              }
              start = -1
            }
          }
        } else {
          if (i > 0 && start !== -1) {
            if (start === i - 1) {
              result += (i - 1) + '点 '
            } else {
              result += start + '点-' + (i - 1) + '点 '
            }
            start = -1
          }
        }
      }
      return result
    }
  },
  watch: {
    value: function () {
      let values = []
      for (let i = 0; i <= 24; i++) {
        if (this.value & (1 << i)) {
          values.push(i)
        }
      }
      this.selected = values
    },
    selected: {
      handler: function () {
        let result = 0
        for (let i = 0; i <= 24; i++) {
          let index = this.selected.indexOf(i)
          if (index >= 0) {
            result = result | (1 << i)
          }
        }
        this.$emit('update-time', result)
      },
      deep: true
    }
  },
  methods: {
    onMouseDown: function (value) {
      this.isMouseDown = true
      this.dragStart = value
      this.dragEnd = value
    },
    onMouseUp: function () {
      this.isMouseDown = false

      let min, max
      if (this.dragStart < this.dragEnd) {
        min = this.dragStart
        max = this.dragEnd
      } else {
        min = this.dragEnd
        max = this.dragStart
      }
      for (let i = min; i <= max; i++) {
        let index = this.selected.indexOf(i)
        if (index >= 0) {
          this.selected.splice(index, 1)
        } else {
          this.selected.push(i)
        }
      }

      this.dragStart = -1
      this.dragEnd = -1
    },
    onMouseEnter: function (ref, value) {
      this.mouseEnterValue = value
      this.selectTimeLeft = 6 + value * 10
      if (this.isMouseDown) {
        this.dragEnd = value
      }
    },
    onMouseOver: function () {
      this.selectTimeDisplay = 'flex'
    },
    onMouseLeave: function () {
      if (this.isMouseDown) {
        this.isMouseDown = false
        this.dragStart = -1
        this.dragEnd = -1
      }
      this.selectTimeDisplay = 'none'
    },
    onDragStart: function () {
    },
    isActive: function (value) {
      let index = this.selected.indexOf(value)
      if (this.isMouseDown) {
        let min, max
        if (this.dragStart < this.dragEnd) {
          min = this.dragStart
          max = this.dragEnd
        } else {
          min = this.dragEnd
          max = this.dragStart
        }
        if (value >= min && value <= max) {
          if (index >= 0) {
            return ''
          }
          if (min === max) {
            return 'active-end'
          }
          if (value === min) {
            return 'active'
          }
          if (value === max && max < 24) {
            return 'active-end'
          }
          return 'active'
        }
      }
      if (index >= 0) {
        if (value < 24) {
          let indexNext = this.selected.indexOf(value + 1)
          if (indexNext === -1) {
            return 'active-end'
          }
        }
        return 'active'
      }
      return ''
    }
  }
}
</script>

<style scoped>
.time-range {
    height: 40px;
    width: 280px;
    border-color: rgb(221, 224, 230);
    border-width: 1px;
    border-radius: 20px;
    border-style: solid;
    margin-bottom: 34px;
}
.time-selector {
    height: 38px;
    float: left;
    cursor: pointer;
    position: relative;
}
.time-selector.active {
    background-color: rgba(0, 230, 109, 0.3);
}
.time-selector.active-end {
    background-color: rgba(0, 230, 109, 0.3);
}
.time-selector.active-start {
    background-color: rgba(0, 230, 109, 0.3);
}
.time-selector.active .time-line {
    background-color: rgb(0, 230, 25);
}
.time-selector.active-end .time-line {
    background-color: rgb(0, 230, 25);
}
.time-selector.active-start .time-line {
    background-color: rgb(0, 230, 25);
}
.time-selector.with:after {
    content: '';
    height: 38px;
    width: 8px;
    background-color: #ffffff;
    display: inline-block;
}
.time-selector.active:after {
    visibility: hidden;
}
.time-selector.active-start:after {
    visibility: hidden;
}
.time-range .time-selector:first-child {
    padding-left: 18px;
    border-radius: 20px 0px 0px 20px;
}
.time-range .time-selector:last-child {
    padding-right: 18px;
    border-radius: 0px 20px 20px 0px;
}
.time-line {
    background-color: rgb(221, 224, 230);
    height: 30px;
    width: 1px;
    margin-top: 8px;
    margin-left: 1px;
    display: inline-block;
}
.time-line-short {
    height: 10px;
    margin-top: 28px;
}
.time-selector:hover .time-line {
    background-color: rgb(0, 230, 25);
    height: 38px;
    width: 2px;
    margin-top: 0px;
    margin-left: 0px;
}
.select-time {
    position: absolute;
    line-height: normal;
    width: 24px;
    height: 24px;
    border-color: rgb(221, 224, 230);
    border-width: 1px;
    border-radius: 10px;
    border-style: solid;
    background-color: #e4e4e4;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50px;
    left: 6px;
}
.select-text {
    position: absolute;
    line-height: normal;
    top: 50px;
    left: 6px;
}
</style>
