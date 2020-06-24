<template>
    <div class="checkbox-group">
        <template v-for="(v,index) in initValues">
            <div :class="{'checkbox-label':true,'checkbox-label-checked':isChecked(v)}" :key="index"
                 @click="checkboxClick($event,v)">
                <span>{{(label&&label[index]) ? label[index] : v}}</span>
                <template v-if="initType === 'radio'">
                    <input :ref="'radio-'+v" type="radio" class="hidden" :value="v" v-model="selected" />
                </template>
                <template v-if="initType === 'checkbox'">
                    <input :ref="'checkbox-'+v" type="checkbox" class="hidden" :value="v" v-model="checked" />
                </template>
            </div>
        </template>
    </div>
</template>

<script>
export default {
  data () {
    return {
      initValues: this.values,
      initType: this.type === 'radio' ? 'radio' : 'checkbox',
      checked: [],
      selected: null
    }
  },
  name: 'CheckBox',
  props: {
    values: Array,
    label: Array,
    value: Number,
    type: String
  },
  methods: {
    checkboxClick: function (event, value) {
      if (this.initType === 'radio') {
        this.selected = value
        this.$emit('update-value', value)
      } else {
        let index = this.checked.indexOf(value)
        if (index >= 0) {
          this.checked.splice(index, 1)
        } else {
          this.checked.push(value)
        }
      }
    },
    isChecked: function (value) {
      if (this.initType === 'radio') {
        return this.selected === value
      } else {
        return this.checked.indexOf(value) >= 0
      }
    }
  },
  created () {
    if (this.value) {
      if (this.initType === 'radio') {
        this.selected = this.value
      } else {
        for (let i = 0; i < this.values.length; i++) {
          let v = this.values[i]
          if ((this.value & v) === v) {
            this.checked.push(v)
          }
        }
      }
    }
  },
  watch: {
    value: function () {
      if (this.initType === 'radio') {
        this.selected = this.value
      } else {
        let valuesArr = []
        for (let i = 0; i < this.values.length; i++) {
          let v = this.values[i]
          if ((this.value & v) === v) {
            valuesArr.push(v)
          }
        }
        this.checked = valuesArr
      }
    },
    checked: {
      handler: function (_new) {
        let result = 0
        for (let i = 0; i < _new.length; i++) {
          result = result | _new[i]
        }
        this.$emit('update-value', result)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.hidden {
    display: none;
}
.checkbox-label {
    width: 60px;
    height: 40px;
    border-radius: 3px;
    margin-left: 10px;
    margin-top: 10px;
    display: inline-block;
    text-align: center;
    background-color: rgba(221, 224, 230, 0.3);
    cursor: pointer;
}
.checkbox-label-checked {
    background-color: rgba(0, 230, 109, 0.3);
}
.checkbox-group {
}
</style>
