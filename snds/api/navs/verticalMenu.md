## 实例

```html
<div class="main-sidebar" style="position: static;">
  <div class="sidebar">
    <sn-menu class="vertical" main-menu="main-menu">
      <sn-menu-item class="active">
        <t><i class="fa fa-dashboard"></i>板式</t>
      </sn-menu-item>
      <sn-menu-item class="open">
        <t><i class="fa fa-list-ul"></i>导航</t>
        <sn-menu-item2 ui-state="Console.Nav.HorizontalMenu">
          <t>横式菜单</t>
        </sn-menu-item2>
      </sn-menu-item>
      <sn-menu-item href="https://github.com">
        <t><i class="fa fa-github"></i>github</t>
      </sn-menu-item>
    </sn-menu>
  </div>
</div>
```

## 定义和用法

竖式菜单的标签结构与横式菜单相同（实际上这两个菜单是同一个指令在不同css式样下的不同展示效果）: sn-menu > sn-menu-item > sn-menu-item2 > sn-menu-item3，后者必须放在前者的标签内部。

如果菜单用于完整页面的左侧主菜单，最好放在 .main-sidebar > .sidebar 内部，即：
```html
<div class="main-sidebar">
  <div class="sidebar">
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
    <td>main-menu</td>
    <td>main-menu</td>
    <td>sn-menu</td>
    <td>
      main-menu="main-menu" <br>
      如果是左侧主菜单，加上该属性。在菜单内容变化或者点击菜单后，会重新计算页面的高度，保证菜单能够完全可见  
    </td>
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
    <td>* vertical</td>
    <td>sn-menu</td>
    <td>菜单成竖向排列</td>
  </tr>
  <tr>
    <td>active</td>
    <td>sn-menu-item<br>sn-menu-item2<br>sn-menu-item3</td>
    <td>菜单成激活状态</td>
  </tr>
  <tr>
    <td>open</td>
    <td>sn-menu-item</td>
    <td>如果该菜单还有子菜单，则该菜单初始状态为展开状态，子菜单全部可见</td>
  </tr>
</table>