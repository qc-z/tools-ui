<template>
  <div class="components">
    <div class="header">
      <div class="header_content">
        <span>{{ `组件库 ( ${getTotal(type)} )` }}</span>
        <el-input v-model="keyword"
                  size="small"
                  placeholder="在此搜索组件"
                  prefix-icon="el-icon-search"
                  clearable></el-input>
      </div>
    </div>
    <div class="category" v-if="result.length || keyword">
      <h3>搜索结果 ( {{ result.length }} )</h3>
      <ul>
        <li v-for="item in result"
            :key="`${item.type}-${item.name}-${item.file}`"
            class="item" @click="handleClick(item.type, item.file)">
          <span class="type">{{ item.type }}</span>
          <span class="name">{{ item.name }}</span>
          <span class="file">{{ item.file }}</span>
        </li>
      </ul>
    </div>


    <div class="category" v-for="(category, name) in data" :id="`category_${name}`" v-show="!result.length && !keyword">
      <h3>{{ name }} ( {{ getTotal(name) }} )</h3>
      <el-tabs :value="Object.keys(category)[0]">
        <el-tab-pane v-for="(items, key) in category"
                     :key="`${name}-${key}`"
                     :label="`${key} ( ${getTotal(name, key)} )`"
                     :name="key"
                     lazy>
          <ul>
            <li v-for="(item, file) in items"
                :key="`${item}-${file}`"
                class="item" @click="handleClick(name, file)">
              <span class="name">{{ item }}</span>
              <span class="file">{{ file }}</span>
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>

    </div>

  </div>
</template>

<script>
  import data from '../components.js'

  const categoryLinks = {
    element: '/element/',
    packages: '/packages/'
  }
  export default {
    name: 'ComponentList',
    props: {
      type: {
        type: String,
        default: 'element'
      }
    },
    data() {
      return {
        keyword: '',
        result: []
      }
    },
    computed: {
      data() {
        return {
          [this.type]: data[this.type]
        }
      }
    },
    watch: {
      keyword(val) {
        this.search(val)
      }
    },
    methods: {
      handleClick(name, file) {
        const path = categoryLinks[name] || ''
        const href = `${path}${file}`
        this.$router.push(href).catch(e => e)
      },
      getTotal(type, cate) {
        if (type && cate) {
          return Object.keys(this.data[type][cate]).length
        }
        const data = type ? this.data[type] : this.data
        let total = 0
        Object.values(data).forEach(t => {
          if (type) {
            total += Object.keys(t).length
          } else {
            Object.values(t).forEach(f => {
              total += Object.keys(f).length
            })
          }
        })

        return total
      },
      search(key) {
        if (!key) {
          this.result = []
          return
        }
        const data = this.data
        const result = []
        const query = key.toLowerCase()
        Object.entries(data).forEach(([tk, t]) => {

          Object.values(t).forEach(f => {
            Object.entries(f).forEach(([k, v]) => {
              if (v.includes(query) || k.toLowerCase().includes(query)) {
                result.push({
                  name: v,
                  file: k,
                  type: tk
                })
              }
            })
          })

        })
        this.result = result
      }
    }
  }
</script>

<style lang="scss" scoped>
  //@import "~element-ui/packages/theme-chalk/src/index";

  .el-input {
    margin: 15px 0;
    width: 400px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      position: relative;
    }
  }

  .item {
    width: 160px;
    height: 80px;
    background: #eee;
    margin: 0 10px 10px 0;
    text-align: center;
    cursor: pointer;
    display: inline-block;

    span {
      display: block;
    }

    .name {
      font-size: 18px;
      padding-top: 15px;
    }

    .file {
      font-size: 14px;
      color: #999;
    }

    .type {
      position: absolute;
      font-size: 12px;
      left: 0;
      top: 0;
      background: #fffbe6;
      padding: 0 3px;
      color: #faad14;
      border-radius: 0 0 2px 0;
      opacity: 0.7;
    }

    &:hover {
      background: #1890ff;
      color: #E6F7FF;

      .file {
        color: #69C0FF;
      }
    }
  }

  .header {
    position: relative;
    height: 3rem;
    color: #000;
    font-size: 1.14286rem;
    margin-bottom: 1rem;
    box-sizing: border-box;
    background: rgba(0, 0, 0, .04);
    border-left: .3rem solid #1890ff;

    &_content {
      position: absolute;
      left: 0;
      top: 50%;
      padding: 0 1rem;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      line-height: 1.3em;
    }
  }

</style>
