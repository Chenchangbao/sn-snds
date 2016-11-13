## 实例

```html
<div class="main-header">
  <div class="navbar">
    <sn-menu class="horizontal">
      <sn-menu-item class="active"><t>标签一</t></sn-menu-item>
      <sn-menu-item ui-state="Console.Nav.Tabs"><t>页签</t></sn-menu-item>
      <sn-menu-item href="http://www.suning.com"><t>苏宁易购</t></sn-menu-item>
    </sn-menu>
  </div>
</div>
```

## 定义和用法

横式菜单的标签结构为  sn-menu > sn-menu-item > sn-menu-item2 > sn-menu-item3，后者必须放在前者的标签内部。  

如果菜单用于完整页面的顶部，最好放在 .main-header > .navbar 内部，即：
```html
<div class="main-header">
  <div class="navbar">
    <sn-menu>
      <sn-menu-item>
        <sn-menu-item1>
          <sn-menu-item2>
          </sn-menu-item2>
        </sn-menu-item1>
      </sn-menu-item>
    </sn-menu>
  </div>
</div>
```

`t`标签，用在`sn-menu-item`、`sn-menu-item2`、`sn-menu-item3`标签内部，在`t`内的内容，出现在菜单的标题内。

> *!* 菜单是否横向展示、是否有2、3级下拉菜单、以及下拉菜单的展示方式，均通过`sn-menu-item`等标签和相关的class式样控制，不需要额外的属性配置。

## 可配置的属性和预置的class式样

### 可配置的属性

<table class="table table-bordered">
  <tr>
    <th width="20%">属性</th>
    <th width="20%">值</th>
    <th width="20%">适用的标签</th>
    <th width="40%">描述</th>
  </tr>
  <tr>
    <td>ui-state</td>
    <td>ui-router配置的路由state值</td>
    <td>sn-menu-item<br>sn-menu-item2<br>sn-menu-item3</td>
    <td>ui-state="Console.Portal"</td>
  </tr>
  <tr>
    <td>ui-state-param</td>
    <td>ui-state跳转时传入的参数值</td>
    <td>sn-menu-item<br>sn-menu-item2<br>sn-menu-item3</td>
    <td>ui-state-param="{id:1}"</td>
  </tr>
  <tr>
    <td>relations</td>
    <td>数组形式，元素为ui-router配置的路由state字符串<br>或者是正则表达式</td>
    <td>sn-menu-item<br>sn-menu-item2<br>sn-menu-item3</td>
    <td>
      用来控制是否给当前菜单添加.active式样<br>
      当前页面的router状态等于该菜单的ui-state属性或能匹配到relations的某一元素<br>
      relations="['Console.Portal', 'Console.Components.Tab']"<br>
      PS:由于ng的parser不能直接赋值RegExp，所以relations的内容，最好在controller中赋值在$scope内，这里直接给变量：relations="relations"
    </td>
  </tr>
  <tr>
    <td>href</td>
    <td>超链接地址</td>
    <td>sn-menu-item<br>sn-menu-item2<br>sn-menu-item3</td>
    <td>href="http://suning.com"</td>
  </tr>
</table>

### 预置的class式样

<table class="table table-bordered">
  <tr>
    <th width="20%">属性</th>
    <th width="30%">适用的标签</th>
    <th width="40%">描述</th>
  </tr>
  <tr>
    <td>* horizontal</td>
    <td>sn-menu</td>
    <td>菜单成横向排列</td>
  </tr>
  <tr>
    <td>active</td>
    <td>sn-menu-item<br>sn-menu-item2<br>sn-menu-item3</td>
    <td>菜单成激活状态</td>
  </tr>
  <tr>
    <td>vertical</td>
    <td>sn-menu-item</td>
    <td>该1级菜单下的所有2级菜单竖向排列，3级菜单在2级菜单右侧显示。<br>每次只显示1个2级菜单的3级菜单<br>（默认是2级菜单横向排列，每个2级菜单下面展示自己的3级菜单内容）</td>
  </tr>
  <tr>
    <td>right-align</td>
    <td>sn-menu-item</td>
    <td>该1级菜单的2级菜单，以右对齐的方式展现（默认是左对齐）</td>
  </tr>
</table>