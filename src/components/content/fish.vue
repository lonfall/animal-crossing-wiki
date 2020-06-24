<template>
    <div class="content">
        <el-collapse-transition>
            <div class="search-form" v-if="searchFormVisible">
                <el-form class="form-overflow"
                         :model="searchFormData"
                         :label-width="dialogLabelWidth">
                    <el-form-item label="区域">
                        <CheckBox :values="region_values" :label="region_labels"
                                  type="radio" :value="searchFormData.region"
                                  v-on:update-value="updateRegion"></CheckBox>
                    </el-form-item>
                    <el-form-item label="时间">
                        <TimeRangeSelector v-on:update-time="updateTime"
                                           style="margin-bottom: -24px"
                                           :value="searchFormData.time"></TimeRangeSelector>
                    </el-form-item>
                    <el-form-item label="月份">
                        <CheckBox :values="month_values" :label="month_labels"
                                  type="checkbox" :value="searchFormData.month"
                                  v-on:update-value="updateMonth"></CheckBox>
                    </el-form-item>
                    <el-form-item label="场所">
                        <CheckBox :values="place_values" :label="place_labels"
                                  type="radio" :value="searchFormData.place"
                                  v-on:update-value="updatePlace"></CheckBox>
                    </el-form-item>
                    <el-form-item label="已捕捉">
                        <CheckBox :values="have_values" :label="have_labels"
                                  type="radio" :value="searchFormData.have"
                                  v-on:update-value="updateHave"></CheckBox>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">完成</el-button>
                        <el-button @click="refresh">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-collapse-transition>
        <div class="search" v-on:click="search">
            筛选<i :class="search_ico"></i>
        </div>
        <template v-for="n in dataRow">
            <el-row :key="n" class="row" :gutter="20">
                <template v-for="(data,index) in dataCols(n)">
                    <el-col :key="'row_' + n + '_col_' + index" :span="6">
                        <div class="fish-item" v-on:click="fishItemClick(data)">
                            <el-image
                                    class="fish-img"
                                    :src="fishImg"
                                    fit="scale-down"></el-image>
                            <el-image
                                    v-if="data.have"
                                    class="have-img"
                                    :src="haveImg"
                                    fit="scale-down"></el-image>
                            <div class="fish-item-text">
                                <div style="text-align:center">{{data.name}}</div>
                                <div class="price">
                                    <el-tag class="price-tag" size="small">{{data.price}}</el-tag>
                                </div>
                                <div v-if="isLogin" @click.stop="">
                                    <el-switch class="fish-switch"
                                               disabled
                                               @click.native="changeSwitch(data)"
                                               v-model="data.have">
                                    </el-switch>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </template>
            </el-row>
        </template>

        <el-dialog title="详情" :visible.sync="dialogItemVisible"
                   :width="dialogWidth">
            <div>
                <div class="item-info-row">
                    <div class="item-info-label"><i class="el-icon-edit"></i> 名称</div>
                    <div class="item-info-content">{{dialogItemData.name}}</div>
                </div>
                <div class="item-info-row">
                    <div class="item-info-label"><i class="el-icon-money"></i> 价格</div>
                    <div class="item-info-content">{{dialogItemData.price}}</div>
                </div>
                <div class="item-info-row">
                    <div class="item-info-label"><i class="el-icon-date"></i> 出现月份</div>
                    <div class="item-info-content">
                        <div>北半球 {{dialogItemData.north_month}}</div>
                        <div>南半球 {{dialogItemData.south_month}}</div>
                    </div>
                </div>
                <div class="item-info-row">
                    <div class="item-info-label"><i class="el-icon-time"></i> 时间段</div>
                    <div class="item-info-content">{{dialogItemData.time}}</div>
                </div>
                <div class="item-info-row">
                    <div class="item-info-label"><i class="el-icon-location-outline"></i> 场所</div>
                    <div class="item-info-content">{{dialogItemData.place}}</div>
                </div>
                <div class="item-info-row">
                    <div class="item-info-label"><i class="el-icon-star-off"></i> 鱼影</div>
                    <div class="item-info-content">{{dialogItemData.size}}</div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import icon from '@/assets/luyu.png'
    import CheckBox from '../utils/CheckBox'
    import TimeRangeSelector from '../utils/TimeRangeSelector'
    import have from '@/assets/have.png'

    export default {
        data() {
            return {
                fishImg: icon,
                haveImg: have,
                fishSwitch: false,
                fishData: [],
                dialogItemVisible: false,
                dialogItemData: {},
                dialogWidth: '500px',
                dialogLabelWidth: '100px',
                searchFormData: {
                    region: 0,
                    time: 0,
                    month: 0,
                    place: 0,
                    have: null
                },
                searchFormVisible: false,
                search_ico: 'el-icon-bottom',
                month_values: [1 << 0, 1 << 1, 1 << 2, 1 << 3, 1 << 4, 1 << 5, 1 << 6, 1 << 7, 1 << 8, 1 << 9, 1 << 10, 1 << 11],
                month_labels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                region_values: [1, 2],
                region_labels: ['北半球', '南半球'],
                place_values: [1, 2, 3, 4, 5, 6],
                place_labels: ['河流', '水池', '悬崖上', '出海口', '大海', '码头'],
                have_values: [0, 1],
                have_labels: ['未拥有', '已拥有'],
            }
        },
        name: "fish",
        components: {
            CheckBox,
            TimeRangeSelector
        },
        created() {
            this.getData()
        },
        computed: {
            isLogin() {
                return this.$store.getters.getUser != null
            },
            dataRow() {
                return Math.ceil(this.fishData.length / 4)
            }
        },
        methods: {
            getData() {
                this.$axiox.get('/fish/list', {
                    params: {
                        region: this.searchFormData.region,
                        time: this.searchFormData.time,
                        month: this.searchFormData.month,
                        place: this.searchFormData.place,
                        have: this.searchFormData.have
                    }
                })
                    .then((response) => {
                        if (response.data.code === 200) {
                            this.fishData = response.data.data
                        } else if (response.data.msg) {
                            this.$message.error(response.data.msg)
                        }
                    })
                    .catch((error) => {
                        console.log('error:' + error)
                    })
            },
            dataCols(rowIndex) {
                let result = []
                for (let i = (rowIndex - 1) * 4; i < this.fishData.length && i < rowIndex * 4; i++) {
                    result.push(this.fishData[i])
                }
                return result
            },
            changeSwitch(value) {
                console.log("switchChange:", value)
                // this.fishSwitch = !value
            },
            fishItemClick(data) {
                console.log("fishItemClick:", data)
                this.dialogItemData = data
                this.dialogItemVisible = true
            },
            updateRegion(value) {
                this.searchFormData.region = value
            },
            updateTime(value) {
                this.searchFormData.time = value
            },
            updateMonth(value) {
                this.searchFormData.month = value
            },
            updatePlace(value) {
                this.searchFormData.place = value
            },
            updateHave(value) {
                this.searchFormData.have = value
            },
            search() {
                if (this.searchFormVisible) {
                    this.searchFormVisible = false
                    this.search_ico = 'el-icon-bottom'
                } else {
                    this.searchFormVisible = true
                    this.search_ico = 'el-icon-top'
                }
            },
            onSubmit() {
                this.getData()
            },
            refresh() {
                this.searchFormData = {
                    region: 0,
                    time: 0,
                    month: 0,
                    place: 0,
                    have: null
                }
            }
        }
    }
</script>

<style>
    .fish-switch.is-disabled .el-switch__core, .fish-switch.is-disabled .el-switch__label {
        cursor: pointer !important;
    }

    .el-dialog__header {
        border-bottom: 1px solid #f0f0f0;
        box-shadow: 0 0 10px rgba(26, 26, 26, .1);
    }
</style>
<style scoped>
    .content {
        padding: 20px;
    }

    .fish-item {
        position: relative;
        width: auto;
        height: 100px;
        padding: 10px;
        border: 1px solid #dddddd;
        border-radius: 10px;
        cursor: pointer;
    }

    .fish-item:hover {
        background-color: #f8f8f8;
    }

    .fish-img {
        height: 100px;
        width: 40%;
        float: left;
    }

    .fish-item-text {
        position: relative;
        height: 100px;
        width: 60%;
        float: left;
    }

    .price {
        padding: 16px 0px;
        text-align: center
    }

    .price-tag {
        background-color: #ffeed6;
        border-color: #fddaa8;
        color: #e6a23c;
        border-radius: 20px;
    }

    .fish-switch {
        float: right;
    }

    .row {
        margin-bottom: 20px;
    }

    .item-info-row {
        height: 50px;
        padding-top: 10px;
        position: relative;
        display: block;
        border-bottom-color: rgb(221, 224, 230);
        border-bottom-width: 1px;
        border-bottom-style: solid;
    }

    .item-info-row:last-child {
        border-bottom-width: 0px;
    }

    .item-info-label {
        display: inline;
        font-size: 16px;
    }

    .item-info-content {
        display: inline;
        float: right;
        font-size: 16px;
    }

    /*.item-info-row:after {*/
    /*    content: "";*/
    /*    width: 90%;*/
    /*    height: 1px;*/
    /*    display: inline;*/
    /*    position: absolute;*/
    /*    left: 5%;*/
    /*    top: 20px;*/
    /*    background-color: #444444;*/
    /*}*/
    .search {
        height: 36px;
        border-bottom-color: rgb(221, 224, 230);
        border-bottom-width: 1px;
        border-bottom-style: solid;
        cursor: pointer;
        text-align: center;
        margin: -20px -20px 20px -20px;
        padding-top: 10px;
    }

    .search:hover {
        background-color: #f8f8f8;
    }

    .search-form {
        margin: 0px -20px 20px -20px;
        border-bottom-color: rgb(221, 224, 230);
        border-bottom-width: 1px;
        border-bottom-style: solid;
    }

    .have-img {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 80px;
    }
</style>
