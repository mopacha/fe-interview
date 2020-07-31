2020.07.28

## vue 通信方式

1. props/$emit
2. $children / $parent 
3. ref/refs
4. provide/ inject
5. eventBus
6. Vuex
7. $attrs和$listeners
8. localStorage / sessionStorage

父子组件通信: props; $parent / $children; provide / inject ; ref ; $attrs / $listeners
兄弟组件通信：eventBus  Vuex
跨级通信: eventBus；Vuex；provide / inject 、$attrs / $listeners

## 双向通信
v-model: 子组件不能修改prop => 赋值给data => watch data => this.$emit('input', newVal)
.sync: 子组件不能修改prop => 赋值给data => watch data => this.$emit('update:prop', newVal)
关键：  
1. 子组件watch 父组件props => update 子组件 data
2. 子组件watch 本组件data => this.$emit 触发父组件数据更新

2020.07.30

# Flex 布局



























