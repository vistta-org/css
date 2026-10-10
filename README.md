# **VISTTA CSS Library**

[Project Name] description

## **Getting Started**

### **Install**

```sh
npm install @vistta/css
```

### **Usage**

Usage with `@vistta/js`:

```javascript
import style from "@vistta/css/style";

export const config = {
  styles: [style],
};

// OR

import style from "@vistta/css/style";

export default class Page extends Component {
  render() {
    return <div {...style}>Hello World</div>;
  }
}
```

You can use other bundlers importing `@vistta/css`

### **Elements**

#### **Buttons**

Buttons include simple button styles for actions in different types and sizes.

###### Basic

```html
<button>button</button>
<button disabled>disabled</button>
<a class="button">a.button</a>
```

###### Raw

```html
<button class="raw">raw</button>
<button class="raw" disabled>disabled</button>
<a class="button:raw">a.button</a>
```

###### Soft

```html
<button class="soft">soft</button>
<button class="soft" disabled>disabled</button>
<a class="button:soft">a.button</a>
```

###### Outlined

```html
<button class="outlined">outlined</button>
<button class="outlined" disabled>disabled</button>
<a class="button:outlined">a.button</a>
```

###### Size Variants

```html
<button class="small">small</button> <button class="large">large</button>
```

###### Style Variants

```html
<button class="primary">primary</button>
<a class="button:secondary">secondary</a>
<button class="soft tertiary">tertiary</button>
<a class="button:soft:light">light</a>
<button class="raw dark">dark</button>
<a class="button:raw:info">info</a>
<button class="outlined success">success</button>
<a class="button:outlined:warning">warning</a>
<a class="button:error">error</a>
```

#### **Cards**

Cards are flexible content containers.

```html
<card>card</card>
```

###### Variants

```html
<card class="primary">primary</card>
<div class="card-primary">div.primary</div>
<card class="secondary">secondary</card>
<div class="card-secondary">div.secondary</div>
<card class="info">info</card>
<div class="card-info">div.info</div>
<card class="success">success</card>
<div class="card-success">div.success</div>
<card class="warning">warning</card>
<div class="card-warning">div.warning</div>
<card class="error">error</card>
<div class="card-error">div.error</div>
```

#### **Dialogs**

###### Simple dialog

```html
<div>
  <button id="anchor-3" popovertarget="mypopover1">Open</button>
  <dialog anchor="anchor-3" id="mypopover1" popover>
    <p>Simple dialog</p>
    <button popovertarget="mypopover1">Close</button>
  </dialog>
</div>
```

###### Modal dialog

```html
<div>
  <button popovertarget="mypopover2">Open</button>
  <dialog class="modal" id="mypopover2" popover>
    <p>Modal dialog</p>
    <button popovertarget="mypopover2">Close</button>
  </dialog>
</div>
```

#### **Forms**

Forms provide the most common control styles used in forms, including input, textarea, select.

```html
<input placeholder="text"></input>
<input placeholder="disabled" disabled></input>
<input placeholder="readonly" readonly></input>
```

###### Textarea

```html
<textarea></textarea>
```

###### Select

```html
<select>
  <option>1</option>
  <option>2</option>
  <option>3</option>
</select>
```

###### Input Types

```html
<p>
  <label>Password:</label>
  <input type="password"></input>
</p>
<p>
  <label>Email:</label>
  <input type="email"></input>
</p>
<p>
  <label>Telephone:</label>
  <input type="tel"></input>
</p>
<p>
  <label>Search:</label>
  <input type="search"></input>
</p>
<p>
  <label>Date:</label>
  <input type="date"></input>
</p>
<p>
  <label>Time:</label>
  <input type="time"></input>
</p>
<p>
  <label>Checkbox:</label>
  <input type="checkbox"></input>
</p>
<p>
  <label>Radio:</label>
  <input type="radio"></input>
</p>
<p>
  <label>Range:</label>
  <input type="range"></input>
</p>
<p>
  <label>File:</label>
  <input type="file"></input>
</p>
<p>
  <label>Color:</label>
  <input type="color"></input>
</p>
<p>
  <label>Submit:</label>
  <input type="submit"></input>
</p>
```

#### **Labels**

Labels are formatted text tags for highlighted, informative information.

```html
<label>label</label>
```

```html
<label class="primary">primary</label>
<a class="label-primary">a.primary</a>
<label class="secondary">secondary</label>
<a class="label-secondary">a.secondary</a>
<label class="info">info</label>
<a class="label-info">a.info</a>
<label class="success">success</label>
<a class="label-success">a.success</a>
<label class="warning">warning</label>
<a class="label-warning">a.warning</a>
<label class="error">error</label>
<a class="label-error">a.error</a>
```

#### **Menu**

Menus are vertical list of items, links or buttons for information, actions and navigation.

```html
<div>
  <menu>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
    <li><button>Item 4</button></li>
  </menu>
</div>
```

Menus can have sub-menus included

```html
<div>
  <menu>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>
      Item 3
      <menu>
        <li>Sub-item 1</li>
        <li>Sub-item 2</li>
        <li>Sub-item 3</li>
      </menu>
    </li>
  </menu>
</div>
```

Combine it with card for a more unique look.

```html
<div>
  <menu class="card">
    <li><button>Item 1</button></li>
    <li><button>Item 2</button></li>
    <li><button>Item 3</button></li>
    <li>Item 4</li>
  </menu>
</div>
```

#### **Meters**

Meters represent the value within the known range.
Meter is green when low < value < high.

```html
<div>
  <meter value="30" min="0" low="{30}" optimum="{60}" high="{80}" max="100"></meter>
  <meter value="60" min="0" low="{30}" optimum="{60}" high="{80}" max="100"></meter>
</div>
```

Meter is yellow when value < low or high < value

```html
<div>
  <meter value="29" min="0" low="{30}" high="{80}" max="100"></meter>
  <meter value="81" min="0" low="{30}" high="{80}" max="100"></meter>
</div>
```

Meter is red when value < low < high < optimum or optimum < low < high < value

```html
<div>
  <meter value="20" min="0" low="{30}" optimum="{90}" high="{80}" max="100"></meter>
  <meter value="90" min="0" low="{30}" optimum="{20}" high="{80}" max="100"></meter>
</div>
```

#### **Pre/Code**

```html
<div>
  <pre data-lang="javascript">
    <code>console.log();</code>
  </pre>
</div>
```

#### **Progress**

The Progress indicates the progress completion of a task.

```html
<div>
  <progress value="75" max="100"></progress>
  <progress value="50" max="100"></progress>
  <progress value="25" max="100"></progress>
  <progress max="100"></progress>
</div>
```

#### **Table**

```html
<table>
  <thead>
    <tr>
      <th>date</th>
      <th>vehicle</th>
      <th>time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2022-10-28</td>
      <td>Mercedes-AMG One</td>
      <td>6:30.705</td>
    </tr>
    <tr>
      <td>2021-06-14</td>
      <td>Porsche 911 GT2 RS MR</td>
      <td>6:38.835</td>
    </tr>
    <tr>
      <td>2020-11-04</td>
      <td>Mercedes-AMG GT Black Series</td>
      <td>6:43.616</td>
    </tr>
    <tr>
      <td>2018-07-26</td>
      <td>Lamborghini Aventador SVJ LP770-4</td>
      <td>6:44.97</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Fastest Lap</td>
      <td></td>
      <td>6:30.705</td>
    </tr>
  </tfoot>
</table>
```

#### **Typography**

Typography sets default styles for headings, paragraphs, semantic text, blockquote and lists elements.

###### Headings

```html
<h1>H1 Heading</h1>
<h2>H2 Heading</h2>
<h3>H3 Heading</h3>
<h4>H4 Heading</h4>
<h5>H5 Heading</h5>
<h6>H6 Heading</h6>
```

###### Paragraphs

```html
<div>
  <p>Lorem ipsum dolor sit amet, ...</p>
  <p></p>
</div>
```

###### Semantic text elements

```html
<div class="container gap-6">
  <abbr>I18N</abbr>
  <strong>Bold</strong>
  <b>Bold</b>
  <cite>Citation</cite>
  <code>Hello World!</code>
  <del>Deleted</del>
  <em>Emphasis</em>
  <i>Italic</i>
  <ins>Inserted</ins>
  <kbd>Ctrl + S</kbd>
  <mark>Highlighted</mark>
  <ruby>漢kan字ji</ruby>
  <s>Strikethrough</s>
  <samp>Sample</samp>
  <p>Text <sub>Subscripted</sub></p>
  <p>Text <sup>Superscripted</sup></p>
  <time>20:00</time>
  <u>Underline</u>
  <var>x = y + 2</var>
</div>
```

### **Utilities**

#### **Anchors**

Anchors utilities are used for anchoring fixed or absolute elements to other elements.
You can either use `anchor` html attribute to reference a element id, if you are using `@vistta/js`, or class `anchor-[1-16]` and `anchor-to-[1-16]`

```html
<p id="anchor-1">anchor</p>
<div><div anchor="anchor-1">fixed</div></div>
<p class="anchor-1">anchor</p>
<div><div class="anchor-to-1">fixed</div></div>
```

###### Position

```html
<p id="anchor-2">anchor</p>
<div>
  <div anchor="anchor-2" class="anchor-top-left">anchor-top-left</div>
  <div anchor="anchor-2" class="anchor-top">anchor-top</div>
  <div anchor="anchor-2" class="anchor-top-right">anchor-top-right</div>
  <div anchor="anchor-2" class="anchor-right">anchor-right</div>
  <div anchor="anchor-2" class="anchor-bottom-left">anchor-bottom-left</div>
  <div anchor="anchor-2" class="anchor-bottom">anchor-bottom</div>
  <div anchor="anchor-2" class="anchor-bottom-right">anchor-bottom-right</div>
  <div anchor="anchor-2" class="anchor-left">anchor-left</div>
</div>
```

#### **Backgrounds**

Color utilities are used for changing Background colors.
If color shading is active you can also add `-[100-900]`, `-[100-900]` to each color option for more customization.

###### Background Colors

```html
<p class="background:default">default background</p>
<p class="background:primary">primary background</p>
<p class="background:primary-contrast">primary contrast background</p>
<p class="background:secondary">secondary background</p>
<p class="background:secondary-contrast">secondary contrast background</p>
<p class="background:dark">dark background</p>
<p class="background:neutral">neutral background</p>
<p class="background:light">light background</p>
<p class="background:info">info background</p>
<p class="background:success">success background</p>
<p class="background:warning">warning background</p>
<p class="background:error">error background</p>
```

###### Remove

```html
<p class="background:none">Remove background</p>
```

###### Auto

Using `background` or `background:auto` will dynamicly adjust with use.

```html
<div class="background">
  <div class="background">auto</div>
</div>
```

#### **Border**

Border utilities are used for setting border for specific sides and colors.
You can combine both `border:left:primary`.
If color shading is active you can also add `-[100-900]`, `-[100-900]` to each color option for more customization.

###### Sides

```html
<p class="border">border all sides</p>
<p class="border:top">border top</p>
<p class="border:right">border right</p>
<p class="border:bottom">border bottom</p>
<p class="border:left">border left</p>
<p class="border:x">border top and bottom</p>
<p class="border:y">border right and left</p>
```

###### Colors

```html
<p class="border:primary">border primary</p>
<p class="border:secondary">border secondary</p>
<p class="border:light">border light</p>
<p class="border:dark">border dark</p>
<p class="border:neutral">border neutral</p>
<p class="border:info">border info</p>
<p class="border:success">border success</p>
<p class="border:warning">border warning</p>
<p class="border:error">border error</p>
```

###### Remove

```html
<p class="border border:none">remove border all sides</p>
<p class="border border:top:none">remove border top</p>
<p class="border border:right:none">remove border right</p>
<p class="border border:bottom:none">remove border bottom</p>
<p class="border border:left:none">remove border left</p>
<p class="border border:x:none">remove border top and bottom</p>
<p class="border border:y:none">remove border right and left</p>
```

#### **Colors**

Color utilities are used for changing text colors.
If color shading is active you can also add `-[100-900]`, `-[100-900]` to each color option for more customization.

###### Text Colors

```html
<p class="color">default color</p>
<p class="color:primary">primary color</p>
<p class="color:primary-contrast">primary contrast color</p>
<p class="color:secondary">secondary color</p>
<p class="color:secondary-contrast">secondary contrast color</p>
<p class="color:dark">dark color</p>
<p class="color:neutral">neutral color</p>
<p class="color:light">light color</p>
<p class="color:info">info color</p>
<p class="color:success">success color</p>
<p class="color:warning">warning color</p>
<p class="color:error">error color</p>
```

#### **Cursors**

Cursor utilities specify which mouse cursor to display when mouseover.

```html
<p class="cursor">cursor default</p>
<p class="cursor:pointer">cursor pointer</p>
<p class="cursor:move">cursor move</p>
<p class="cursor:zoom-in">cursor zoom-in</p>
<p class="cursor:zoom-out">cursor zoom-out</p>
<p class="cursor:not-allowed">cursor not-allowed</p>
<p class="cursor:help">cursor help</p>
<p class="cursor:auto">cursor auto</p>
```

#### **Displays**

Display utilities are used for display and hide elements.
Responsive design can be achieved by prefixing the class with `sm:`, `md:`, `lg:`, `xl:`, or `xxl:` to target specific screen sizes.

```html
<!-- display: block; -->
<div class="block"></div>
<!-- display: inline; -->
<div class="inline"></div>
<!-- display: inline-block; -->
<div class="inline-block"></div>
<!-- display: flex; -->
<div class="flex"></div>
<!-- display: inline-flex; -->
<div class="inline-flex"></div>
<!-- display: table; -->
<div class="table"></div>
<!-- display: inline-table; -->
<div class="inline-table"></div>
<!-- display: grid; -->
<div class="grid"></div>
<!-- display: inline-grid; -->
<div class="inline-grid"></div>
<!-- display: contents; -->
<div class="contents"></div>
<!-- display: list-item; -->
<div class="list-item"></div>
<!-- display: none; -->
<div class="hidden"></div>
```

#### **Dividers**

Divider is used to separate elements.
Responsive design can be achieved by prefixing the class with `sm:`, `md:`, `lg:`, `xl:`, or `xxl:` to target specific screen sizes.

```html
<div>
  <p>Section 1</p>
  <div class="divider"></div>
  <p>Section 2</p>
</div>
```

```html
<div>
  <p>Section 1</p>
  <div class="divider:horizontal" data-content="OR"></div>
  <p>Section 2</p>
</div>
```

```html
<div class="container gap-4">
  <p class="py-8">Section 1</p>
  <div class="divider:vertical" data-content="OR"></div>
  <p class="py-8">Section 2</p>
</div>
```

#### **Group**

Group is used to join elements.

```html
<div class="group">
  <input type="search" />
  <button class="raw action" data-icon="" />
  <button class="raw action" data-icon="" />
</div>
```

#### **Highlights**

Highlight utilities are used to highlight a element.
You can combine both `highlight:primary`.
If color shading is active you can also add `-[100-900]`, `-[100-900]` to each color option for more customization.

###### Highlight Colors

```html
<p class="highlight">highlight default</p>
<p class="highlight:primary">highlight primary</p>
<p class="highlight:secondary">highlight secondary</p>
<p class="highlight:info">highlight info</p>
<p class="highlight:success">highlight success</p>
<p class="highlight:warning">highlight warning</p>
<p class="highlight:error">highlight error</p>
```

#### **Icons**

This project uses `<a href="https://fonts.google.com/icons?selected=Material+Icons" target="_blank" rel="noreferrer">`Google Fonts Material Icons`</a>`.
Use the attribute `data-icon` with the value `&#x«code point»;` (HTML) or `\u«code point»;` (JSX)

```html
<div class="container gap-4">
  <button class="action" data-icon="" />
  <button class="action" data-icon="" />
  <button class="action" data-icon="" />
  <button class="action" data-icon="" />
  <button class="action" data-icon="" />
  <button class="action" data-icon="" />
</div>
```

###### Icon Sizes

Use `.font-s`, `.font-large` classes to increase icon sizes. You can set `font-size` to have different icon sizes.

```html
<p class="font-s" data-icon=""></p>
<p class="font-large" data-icon=""></p>
```

#### **Layouts**

Layout includes auto flex/grid wrap based responsive layout system with 12 columns.
Add `container` to a container element and add any element you want with the `col` to take advantage of it.
For more sizes you can use `col:[1-12]`. You can also add `:auto` for automatic sizing.

```html
<div class="container">
  <div class="background:auto col:1">col 1</div>
  <div class="background:auto col:11">col 11</div>
  <div class="background:auto col:2">col 2</div>
  <div class="background:auto col:10">col 10</div>
  <div class="background:auto col:3">col 3</div>
  <div class="background:auto col:9">col 9</div>
  <div class="background:auto col:4">col 4</div>
  <div class="background:auto col:8">col 8</div>
  <div class="background:auto col:5">col 5</div>
  <div class="background:auto col:7">col 7</div>
  <div class="background:auto col:3">col 3</div>
  <div class="background:auto col:3">col 3</div>
  <div class="background:auto col:3">col 3</div>
  <div class="background:auto col:3">col 3</div>
  <div class="background:auto col:4">col 4</div>
  <div class="background:auto col:4">col 4</div>
  <div class="background:auto col:4">col 4</div>
  <div class="background:auto col:6">col 6</div>
  <div class="background:auto col:6">col 6</div>
  <div class="background:auto col:12">col 12</div>
</div>
```

Remove the wrap functionality by adding any overflow option.

```html
<div class="container overflow">
  <div class="col:8">col 8</div>
  <div class="col:8">col 8</div>
</div>
```

Control the gap size with `gap:[o/h/0-16]`.

```html
<div class="container gap:0">
  <div class="col:6 background:auto">col 6</div>
  <div class="col:6 background:auto">col 6</div>
</div>
<div class="container gap:6">
  <div class="col:6 background:auto">col 6</div>
  <div class="col:6 background:auto">col 6</div>
</div>
<div class="container gap:12">
  <div class="col:6 background:auto">col 6</div>
  <div class="col:6 background:auto">col 6</div>
</div>
```

You have multiple options for grid alignment using the `align:<horizontal>:<vertical>` class.
Horizontal alignment options include `top`, `center`, `bottom`, `space-around`, `space-between`, and `space-evenly`.
Vertical alignment options include `left`, `center`, `right`, `space-around`, `space-between`, and `space-evenly`.
Responsive design can be achieved by prefixing the class with `sm:`, `md:`, `lg:`, `xl:`, or `xxl:` to target specific screen sizes.

```html
<div class="container align:top:left background:auto" style="height: var(--unit-16);">
  <div class="col:auto background:primary p:1 rounded">top:left</div>
</div>
<div class="container align:center background:auto" style="height: var(--unit-16);">
  <div class="col:auto background:primary p:1 rounded">center</div>
</div>
<div class="container align:bottom:right background:auto" style="height: var(--unit-16);">
  <div class="col:auto background:primary p:1 rounded">bottom:right</div>
</div>
<div class="container align:space-evenly background:auto" style="height: var(--unit-16);">
  <div class="col:auto background:primary p:1 rounded">space</div>
  <div class="col:auto background:primary p:1 rounded">evenly</div>
</div>
```

Controlling the with is possible in either the container, row or col by adding `:sm`, `:md`, `:lg`, `:xl`, or `:xxl`

```html
<div class="container:xl" style="height: var(--unit-16);">
  <div class="col:md background:primary p:1 rounded">top:left</div>
</div>
<div class="container:md" style="height: var(--unit-16);">
  <div class="row:sm background:primary p:1 rounded">center</div>
</div>
```

#### **Loading**

Loading indicator is used for loading or updating. You can add the `loading` class to a container for loading status.
Add `:[small/large]` for more sizes.

```html
<div class="loading"></div>
<div class="loading:small"></div>
<div class="loading:large"></div>
```

#### **Overflow**

Overflow utilities are used for changing element overflow.

```html
<!-- auto overflow -->
<div class="overflow"></div>
<div class="overflow:auto"></div>
<!-- visible overflow -->
<div class="overflow:visible"></div>
<!-- no overflow -->
<div class="overflow:none"></div>
<div class="overflow:clip"></div>
<!-- scroll -->
<div class="scroll"></div>
<div class="overflow:scroll"></div>
```

Add `-x` or `-y` to control just one axis.

```html
<!-- visible overflow -->
<div class="overflow:x"></div>
<div class="overflow:y"></div>
<div class="overflow:x:visible"></div>
<div class="overflow:y:visible"></div>
<!-- auto overflow -->
<div class="overflow:x:auto"></div>
<div class="overflow:y:auto"></div>
<!-- no overflow -->
<div class="overflow:x:none"></div>
<div class="overflow:y:none"></div>
<div class="overflow:x:clip"></div>
<div class="overflow:y:clip"></div>
<!-- scroll -->
<div class="scroll-x"></div>
<div class="scroll-y"></div>
<div class="overflow:x:scroll"></div>
<div class="overflow:y:scroll"></div>
```

#### **Positions**

Position utilities are used for defining float, position and inset/top/right/bottom/left utilities.
You can add `:auto`, `:o`, `:h` and `:0` to `:16` for units on inset/top/right/bottom/left utilities.

```html
<!-- clear float -->
<div class="clearfix"></div>
<!-- float: left and right -->
<div class="float:start"></div>
<div class="float:end"></div>
<div class="float:left"></div>
<div class="float:right"></div>
<div class="float:center"></div>
<!-- position: relative, absolute, fixed and sticky -->
<div class="relative"></div>
<div class="absolute"></div>
<div class="fixed"></div>
<div class="sticky"></div>
<!-- inset/top/right/bottom/left -->
<div class="inset"></div>
<div class="inset:3"></div>
<div class="top"></div>
<div class="top:6"></div>
<div class="right"></div>
<div class="right:9"></div>
<div class="bottom"></div>
<div class="bottom:12"></div>
<div class="left"></div>
<div class="left:15"></div>
```

Responsive design can be achieved by prefixing the class with `sm:`, `md:`, `lg:`, `xl:`, or `xxl:` to target specific screen sizes.

```html
<div class="sm:clearfix"></div>
<div class="md:float:left"></div>
<div class="lg:relative"></div>
<div class="sm:inset"></div>
<div class="md:top:4"></div>
<div class="lg:right:8"></div>
<div class="xl:bottom:12"></div>
<div class="xxl:left:16"></div>
```

#### **Radius**

Radius utilities are used for changing element radius.

```html
<div>
  <div class="background:neutral edged">edged</div>
  <div class="background:neutral radius:edged">edged</div>
  <div class="background:neutral rounded">rounded</div>
  <div class="background:neutral radius:rounded">rounded</div>
  <div class="background:neutral circle">circle</div>
  <div class="background:neutral radius:circle">circle</div>
</div>
```

Use `radius:auto` to dynamicly adjust with use.

```html
<div class="background:neutral radius:auto">
  <div class="background:dark radius:auto">auto</div>
</div>
```

#### **Shadows**

Shadow utilities are used for adding shadow to elements.

```html
<div class="shadow">shadow</div>
<div class="shadow:inset">inset shadow</div>
```

#### **Spacing**

Spacing utilities are used for defining margin/padding spacing.
You can add `t`, `r`, `b`, `l`, `x` an `y` for directions and `:auto`, `:o`, `:h` and `:0` to `:16` for units.

```html
<!-- margin -->
<div class="m:auto"></div>
<div class="pt:o"></div>
<div class="mr:h"></div>
<div class="pl:3"></div>
<div class="mb:6"></div>
<div class="px:12"></div>
<div class="my:16"></div>
```

Responsive design can be achieved by prefixing the class with `sm:`, `md:`, `lg:`, `xl:`, or `xxl:` to target specific screen sizes.

```html
<div class="sm:mt:0"></div>
<div class="md:pr:4"></div>
<div class="lg:pb:8"></div>
<div class="xl:ml:12"></div>
<div class="xxl:mx:16"></div>
```

#### **Text**

Text utilities are used for text alignment, styles and overflow things.

###### Alignment

```html
<div class="text:left">left aligned text</div>
<div class="text:center">center aligned text</div>
<div class="text:right">right aligned text</div>
<div class="text:justify">justified text</div>
```

Responsive design can be achieved by prefixing the class with `sm:`, `md:`, `lg:`, `xl:`, or `xxl:` to target specific screen sizes.

###### Transformation

```html
<div class="text:lowercase">Lowercased text</div>
<div class="text:uppercase">Uppercased text</div>
<div class="text:capitalize">Capitalized text</div>
```

###### Size

```html
<div class="font:default">default font size</div>
<div class="font:large">Large font size</div>
<div class="font:small">Small font size</div>
```

Responsive design can be achieved by prefixing the class with `sm:`, `md:`, `lg:`, `xl:`, or `xxl:` to target specific screen sizes.

###### Weight/Style

```html
<div class="font:normal">Normal weight font</div>
<div class="font:lighter">Lighter weight font</div>
<div class="font:light">Light weight font</div>
<div class="font:regular">Regular weight font</div>
<div class="font:medium">Medium weight font</div>
<div class="font:bold">Bold weight font</div>
<div class="font:bolder">Bolder weight font</div>
<div class="font:italic">Italicized font</div>
<div class="font:muted">Muted font</div>
```

###### Other

```html
<div class="ellipsis">Text Ellipsis</div>
<div class="clip">Text Clip</div>
<div class="break">Text Break</div>
```

Responsive design can be achieved by prefixing the class with `sm:`, `md:`, `lg:`, `xl:`, or `xxl:` to target specific screen sizes.

#### **Tooltips**

Tooltips provide context information labels that appear on hover and focus. Tooltips component is built entirely in CSS.
Add the `data-tooltip` attribute with the text that you want to display.

```html
<button data-tooltip="Tooltip Text">tooltip</button>
```

Or for a different positioning you can add the `tooltip:top`, `tooltip:right`, `tooltip:bottom` or `tooltip:left` class to define the position of a tooltip.
By default, the tooltip appears above the element.

```html
<button class="tooltip:top" data-tooltip="Top Tooltip Text">top tooltip</button>
<button class="tooltip:right" data-tooltip="Right Tooltip Text">right tooltip</button>
<button class="tooltip:bottom" data-tooltip="Bottom Tooltip Text">bottom tooltip</button>
<button class="tooltip:left" data-tooltip="Left Tooltip Text ">left tooltip</button>
```

###### Multiline tooltips

Add the `\n` string between any text for multiline tooltips.

```html
<button data-tooltip="First Line Tooltip Text\nSecond Line Tooltip Text\nThird Line Tooltip Text">tooltip</button>
```

#### **Visibility**

Display utilities are used for display and hide elements.

```html
<!-- visibility: visible; -->
<div class="visible"></div>
<!-- visibility: hidden; -->
<div class="invisible"></div>
<!-- visibility: collpase; -->
<div class="collpase"></div>
```

Responsive design can be achieved by prefixing the class with `sm:`, `md:`, `lg:`, `xl:`, or `xxl:` to target specific screen sizes.

```html
<div class="sm:visible"></div>
<div class="md:invisible"></div>
<div class="lg:collpase"></div>
<div class="xl:visible"></div>
<div class="xxl:invisible"></div>
```

## **License**

Licensed under the GNU General Public License version 3 only (`GPL-3.0-only`). See [LICENSE](LICENSE) for the full terms.

## **Contributing**

Thank you for your interest in contributing to this project! Please ensure that any contributions respect the licensing terms specified. If you encounter any issues or have suggestions, feel free to report them. All issues will be well received and addressed to the best of our ability. We appreciate your support and contributions!

### **Authors**

- [Tiago Terenas Almeida](https://github.com/tiagomta)
