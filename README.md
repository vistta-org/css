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

```html preview
<button>button</button>
<button disabled>disabled</button>
<a className="button">a.button</a>
```

###### Raw

```html preview
<button className="raw">raw</button>
<button className="raw" disabled>disabled</button>
<a className="button:raw">a.button</a>
```

###### Outlined

```html preview
<button className="outlined">outlined</button>
<button className="outlined" disabled>disabled</button>
<a className="button:outlined">a.button</a>
```

###### Size Variants

```html preview
<button className="small">small</button>
<button className="large">large</button>
```

###### Style Variants

```html preview
<button className="primary">primary</button>
<a className="button:primary">a.primary</a>
<button className="secondary">secondary</button>
<a className="button:secondary">a.secondary</a>
<button className="info">info</button>
<a className="button:info">a.info</a>
<button className="success">success</button>
<a className="button:success">a.success</a>
<button className="warning">error</button>
<a className="button:warning">a.error</a>
<button className="error">error</button>
<a className="button:error">a.error</a>
```

###### Raw Style Variants

```html preview
<button className="raw primary">primary</button>
<a className="button:raw:primary">a.primary</a>
<button className="raw secondary">secondary</button>
<a className="button:raw:secondary">a.secondary</a>
<button className="raw info">info</button>
<a className="button:raw:info">a.info</a>
<button className="raw success">success</button>
<a className="button:raw:success">a.success</a>
<button className="raw warning">error</button>
<a className="button:raw:warning">a.error</a>
<button className="raw error">error</button>
<a className="button:raw:error">a.error</a>
```

###### Outlined Style Variants

```html preview
<button className="outlined primary">primary</button>
<a className="button:outlined:primary">a.primary</a>
<button className="outlined secondary">secondary</button>
<a className="button:outlined:secondary">a.secondary</a>
<button className="info outlined">info</button>
<a className="button:outlined:info">a.info</a>
<button className="success outlined">success</button>
<a className="button:outlined:success">a.success</a>
<button className="warning outlined">error</button>
<a className="button:outlined:warning">a.error</a>
<button className="error outlined">error</button>
<a className="button:outlined:error">a.error</a>
```

#### **Cards**

Cards are flexible content containers.

```html preview
<card>card</card>
```

###### Variants

```html preview
<card className="primary">primary</card>
<div className="card-primary">div.primary</div>
<card className="secondary">secondary</card>
<div className="card-secondary">div.secondary</div>
<card className="info">info</card>
<div className="card-info">div.info</div>
<card className="success">success</card>
<div className="card-success">div.success</div>
<card className="warning">warning</card>
<div className="card-warning">div.warning</div>
<card className="error">error</card>
<div className="card-error">div.error</div>
```

#### **Dialogs**

###### Simple dialog

```html preview
<div>
  <button id="anchor-3" popovertarget="mypopover1">Open</button>
  <dialog anchor="anchor-3" id="mypopover1" popover>
    <p>Simple dialog</p>
    <button popovertarget="mypopover1">Close</button>
  </dialog>
</div>
```

###### Modal dialog

```html preview
<div>
  <button popovertarget="mypopover2">Open</button>
  <dialog className="modal" id="mypopover2" popover>
    <p>Modal dialog</p>
    <button popovertarget="mypopover2">Close</button>
  </dialog>
</div>
```

#### **Forms**

Forms provide the most common control styles used in forms, including input, textarea, select.

```html preview
<input placeholder="text"></input>
<input placeholder="disabled" disabled></input>
<input placeholder="readonly" readonly></input>
```

###### Textarea

```html preview
<textarea></textarea>
```

###### Select

```html preview
<select>
  <option>1</option>
  <option>2</option>
  <option>3</option>
</select>
```

###### Input Types

```html preview
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

```html preview
<label>label</label>
```

```html preview "Variants:" className="gap-6 center">
<label className="primary">primary</label>
<a className="label-primary">a.primary</a>
<label className="secondary">secondary</label>
<a className="label-secondary">a.secondary</a>
<label className="info">info</label>
<a className="label-info">a.info</a>
<label className="success">success</label>
<a className="label-success">a.success</a>
<label className="warning">warning</label>
<a className="label-warning">a.warning</a>
<label className="error">error</label>
<a className="label-error">a.error</a>
```

#### **Menu**

Menus are vertical list of items, links or buttons for information, actions and navigation.

```html preview
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

```html preview
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

You can also combine it with card for a more unique look.

```html preview
<div>
  <menu className="card">
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

```html preview
<div>
  <meter
    value="30"
    min="0"
    low="{30}"
    optimum="{60}"
    high="{80}"
    max="100"
  ></meter>
  <meter
    value="60"
    min="0"
    low="{30}"
    optimum="{60}"
    high="{80}"
    max="100"
  ></meter>
</div>
```

Meter is yellow when value < low or high < value

```html preview
<div>
  <meter value="29" min="0" low="{30}" high="{80}" max="100"></meter>
  <meter value="81" min="0" low="{30}" high="{80}" max="100"></meter>
</div>
```

Meter is red when value < low < high < optimum or optimum < low < high < value

```html preview
<div>
  <meter
    value="20"
    min="0"
    low="{30}"
    optimum="{90}"
    high="{80}"
    max="100"
  ></meter>
  <meter
    value="90"
    min="0"
    low="{30}"
    optimum="{20}"
    high="{80}"
    max="100"
  ></meter>
</div>
```

#### **Pre/Code**

```html preview
<div>
  <pre data-lang="javascript">
    <code>console.log();</code>
  </pre>
</div>
```

#### **Progress**

The Progress indicates the progress completion of a task.

```html preview
<div>
  <progress value="75" max="100"></progress>
  <progress value="50" max="100"></progress>
  <progress value="25" max="100"></progress>
  <progress max="100"></progress>
</div>
```

#### **Table**

```html preview
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

```html preview
<h1>H1 Heading</h1>
<h2>H2 Heading</h2>
<h3>H3 Heading</h3>
<h4>H4 Heading</h4>
<h5>H5 Heading</h5>
<h6>H6 Heading</h6>
```

###### Paragraphs

```html preview
<div>
  <p>Lorem ipsum dolor sit amet, ...</p>
  <p></p>
</div>
```

###### Semantic text elements

```html preview
<div className="container gap-6">
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

```html preview
<p id="anchor-1">anchor</p>
<div><div anchor="anchor-1">fixed</div></div>
<p className="anchor-1">anchor</p>
<div><div className="anchor-to-1">fixed</div></div>
```

###### Position

```html preview
<p id="anchor-2">anchor</p>
<div>
  <div anchor="anchor-2" className="anchor-top-left">anchor-top-left</div>
  <div anchor="anchor-2" className="anchor-top">anchor-top</div>
  <div anchor="anchor-2" className="anchor-top-right">anchor-top-right</div>
  <div anchor="anchor-2" className="anchor-right">anchor-right</div>
  <div anchor="anchor-2" className="anchor-bottom-left">anchor-bottom-left</div>
  <div anchor="anchor-2" className="anchor-bottom">anchor-bottom</div>
  <div anchor="anchor-2" className="anchor-bottom-right">
    anchor-bottom-right
  </div>
  <div anchor="anchor-2" className="anchor-left">anchor-left</div>
</div>
```

#### **Backgrounds**

Color utilities are used for changing Background colors.
If color shading is active you can also add `-[100-900]`, `-[100-900]` to each color option for more customization.

###### Background Colors

```html preview
<p className="background:default">default background</p>
<p className="background:primary">primary background</p>
<p className="background:primary-contrast">primary contrast background</p>
<p className="background:secondary">secondary background</p>
<p className="background:secondary-contrast">secondary contrast background</p>
<p className="background:dark">dark background</p>
<p className="background:neutral">neutral background</p>
<p className="background:light">light background</p>
<p className="background:info">info background</p>
<p className="background:success">success background</p>
<p className="background:warning">warning background</p>
<p className="background:error">error background</p>
```

###### Remove

```html preview
<p className="background:none">Remove background</p>
```

###### Auto

You can also use a more dynamic `background` or `background:auto` which adjusts with use.

```html preview
<div className="background">
  <div className="background">auto</div>
</div>
```

#### **Border**

Border utilities are used for setting border for specific sides and colors.
You can combine both `border-l:primary`.
If color shading is active you can also add `-[100-900]`, `-[100-900]` to each color option for more customization.

###### Sides

```html preview
<p className="border">border all sides</p>
<p className="border-top">border top</p>
<p className="border-right">border right</p>
<p className="border-bottom">border bottom</p>
<p className="border-left">border left</p>
<p className="border-x">border top and bottom</p>
<p className="border-y">border right and left</p>
```

###### Colors

```html preview
<p className="border:primary">border primary</p>
<p className="border:secondary">border secondary</p>
<p className="border:light">border light</p>
<p className="border:dark">border dark</p>
<p className="border:neutral">border neutral</p>
<p className="border:info">border info</p>
<p className="border:success">border success</p>
<p className="border:warning">border warning</p>
<p className="border:error">border error</p>
```

###### Remove

```html preview
<p className="border border:none">remove border all sides</p>
<p className="border border-top:none">remove border top</p>
<p className="border border-right:none">remove border right</p>
<p className="border border-bottom:none">remove border bottom</p>
<p className="border border-left:none">remove border left</p>
<p className="border border-x:none">remove border top and bottom</p>
<p className="border border-y:none">remove border right and left</p>
```

#### **Colors**

Color utilities are used for changing text colors.
If color shading is active you can also add `-[100-900]`, `-[100-900]` to each color option for more customization.

###### Text Colors

```html preview
<p className="color">default color</p>
<p className="color:primary">primary color</p>
<p className="color:primary-contrast">primary contrast color</p>
<p className="color:secondary">secondary color</p>
<p className="color:secondary-contrast">secondary contrast color</p>
<p className="color:dark">dark color</p>
<p className="color:neutral">neutral color</p>
<p className="color:light">light color</p>
<p className="color:info">info color</p>
<p className="color:success">success color</p>
<p className="color:warning">warning color</p>
<p className="color:error">error color</p>
```

#### **Cursors**

Cursor utilities specify which mouse cursor to display when mouseover.

```html preview
<p className="cursor">cursor default</p>
<p className="cursor:pointer">cursor pointer</p>
<p className="cursor:move">cursor move</p>
<p className="cursor:zoom-in">cursor zoom-in</p>
<p className="cursor:zoom-out">cursor zoom-out</p>
<p className="cursor:not-allowed">cursor not-allowed</p>
<p className="cursor:help">cursor help</p>
<p className="cursor:auto">cursor auto</p>
```

#### **Displays**

Display utilities are used for display and hide elements.
Responsive design can be achieved by prefixing the class with `sm:`, `md:`, `lg:`, `xl:`, or `xxl:` to target specific screen sizes.

```html
<!-- display: block; -->
<div className="block"></div>
<!-- display: inline; -->
<div className="inline"></div>
<!-- display: inline-block; -->
<div className="inline-block"></div>
<!-- display: flex; -->
<div className="flex"></div>
<!-- display: inline-flex; -->
<div className="inline-flex"></div>
<!-- display: table; -->
<div className="table"></div>
<!-- display: inline-table; -->
<div className="inline-table"></div>
<!-- display: grid; -->
<div className="grid"></div>
<!-- display: inline-grid; -->
<div className="inline-grid"></div>
<!-- display: contents; -->
<div className="contents"></div>
<!-- display: list-item; -->
<div className="list-item"></div>
<!-- display: none; -->
<div className="hidden"></div>
```

#### **Dividers**

Divider is used to separate elements.
Responsive design can be achieved by prefixing the class with `sm:`, `md:`, `lg:`, `xl:`, or `xxl:` to target specific screen sizes.

```html preview
<div>
  <p>Section 1</p>
  <div className="divider"></div>
  <p>Section 2</p>
</div>
```

```html preview
<div>
  <p>Section 1</p>
  <div className="divider:horizontal" data-content="OR"></div>
  <p>Section 2</p>
</div>
```

```html preview
<div className="container gap-4">
  <p className="py-8">Section 1</p>
  <div className="divider:vertical" data-content="OR"></div>
  <p className="py-8">Section 2</p>
</div>
```

#### **Group**

Group is used to join elements.

```html preview
<div className="group">
  <input type="search" />
  <button className="raw action" data-icon="&#xe8b6;" />
  <button className="raw action" data-icon="&#xe88e;" />
</div>
```

#### **Highlights**

Highlight utilities are used to highlight a element.
You can combine both `highlight:primary`.
If color shading is active you can also add `-[100-900]`, `-[100-900]` to each color option for more customization.

###### Highlight Colors

```html preview
<p className="highlight">highlight default</p>
<p className="highlight:primary">highlight primary</p>
<p className="highlight:secondary">highlight secondary</p>
<p className="highlight:info">highlight info</p>
<p className="highlight:success">highlight success</p>
<p className="highlight:warning">highlight warning</p>
<p className="highlight:error">highlight error</p>
```

#### **Icons**

This project uses <a href="https://fonts.google.com/icons?selected=Material+Icons" target="_blank" rel="noreferrer">Google Fonts Material Icons</a>.
Use the attribute `data-icon` with the value `&#x«code point»;` (HTML) or `\u«code point»;` (JSX)

```html preview
<div className="container gap-4">
  <button className="action" data-icon="&#xe8b6;" />
  <button className="action" data-icon="&#xe88a;" />
  <button className="action" data-icon="&#xe853;" />
  <button className="action" data-icon="&#xe8b8;" />
  <button className="action" data-icon="&#xe876;" />
  <button className="action" data-icon="&#xe88e;" />
</div>
```

###### Icon Sizes

Use `.font-s`, `.font-large` classes to increase icon sizes. You can set `font-size` to have different icon sizes.

```html preview
<p className="font-s" data-icon="&#xe87e;"></p>
<p className="font-large" data-icon="&#xe87e;"></p>
```

#### **Layouts**

Layout includes auto flex/grid wrap based responsive layout system with 12 columns.
Add `container` to a container element and add any element you want with the `col` to take advantage of it.
For more sizes you can use `col:[1-12]`. You can also add `:auto` for automatic sizing.

```html preview
<div className="container">
  <div className="background:auto col:1">col 1</div>
  <div className="background:auto col:11">col 11</div>
  <div className="background:auto col:2">col 2</div>
  <div className="background:auto col:10">col 10</div>
  <div className="background:auto col:3">col 3</div>
  <div className="background:auto col:9">col 9</div>
  <div className="background:auto col:4">col 4</div>
  <div className="background:auto col:8">col 8</div>
  <div className="background:auto col:5">col 5</div>
  <div className="background:auto col:7">col 7</div>
  <div className="background:auto col:6">col 6</div>
  <div className="background:auto col:6">col 6</div>
  <div className="background:auto col:12">col 12</div>
</div>
```

You can also remove the wrap functionality by adding any overflow option.

```html preview
<div className="container overflow">
  <div className="col:8">col 8</div>
  <div className="col:8">col 8</div>
</div>
```

You can also control the gap size with `gap:[o/h/0-16]`.

```html preview
<div className="container gap:0">
  <div className="col:6 background:auto">col 6</div>
  <div className="col:6 background:auto">col 6</div>
</div>
<div className="container gap:6">
  <div className="col:6 background:auto">col 6</div>
  <div className="col:6 background:auto">col 6</div>
</div>
<div className="container gap:12">
  <div className="col:6 background:auto">col 6</div>
  <div className="col:6 background:auto">col 6</div>
</div>
```

You have multiple options for grid alignment using the `align:<horizontal>:<vertical>` class.
Horizontal alignment options include `top`, `center`, `bottom`, `space-around`, `space-between`, and `space-evenly`.
Vertical alignment options include `left`, `center`, `right`, `space-around`, `space-between`, and `space-evenly`.
Responsive design can be achieved by prefixing the class with `sm:`, `md:`, `lg:`, `xl:`, or `xxl:` to target specific screen sizes.

```html preview
<div className="container align:top:left background:auto" style="height: var(--unit-16);">
  <div class="col:auto background:primary p:1 rounded">top:left</div>
</div>
<div className="container align:center background:auto" style="height: var(--unit-16);">
  <div class="col:auto background:primary p:1 rounded">center</div>
</div>
<div className="container align:bottom:right background:auto" style="height: var(--unit-16);">
  <div class="col:auto background:primary p:1 rounded">bottom:right</div>
</div>
<div className="container align:space-evenly background:auto" style="height: var(--unit-16);">
  <div class="col:auto background:primary p:1 rounded">space</div>
  <div class="col:auto background:primary p:1 rounded">evenly</div>
</div>
```

#### **Loading**

Loading indicator is used for loading or updating. You can add the `loading` class to a container for loading status.
You can also add `:[small/large]` for more sizes.

```html preview
<div className="loading"></div>
<div className="loading:small"></div>
<div className="loading:large"></div>
```

#### **Overflow**

Overflow utilities are used for changing element overflow.

```html
<!-- auto overflow -->
<div className="overflow"></div>
<div className="overflow:auto"></div>
<!-- visible overflow -->
<div className="overflow:visible"></div>
<!-- no overflow -->
<div className="overflow:none"></div>
<div className="overflow:clip"></div>
<!-- scroll -->
<div className="scroll"></div>
<div className="overflow:scroll"></div>
```

You can also add `-x` or `-y` to control just one axis.

```html
<!-- visible overflow -->
<div className="overflow-x"></div>
<div className="overflow-y"></div>
<div className="overflow-x:visible"></div>
<div className="overflow-y:visible"></div>
<!-- auto overflow -->
<div className="overflow-x:auto"></div>
<div className="overflow-y:auto"></div>
<!-- no overflow -->
<div className="overflow-x:none"></div>
<div className="overflow-y:none"></div>
<div className="overflow-x:clip"></div>
<div className="overflow-y:clip"></div>
<!-- scroll -->
<div className="scroll-x"></div>
<div className="scroll-y"></div>
<div className="overflow-x:scroll"></div>
<div className="overflow-y:scroll"></div>
```

#### **Positions**

Position utilities are used for defining float, position and inset/top/right/bottom/left utilities.
You can add `:auto`, `:o`, `:h` and `:0` to `:16` for units on inset/top/right/bottom/left utilities.

```html
<!-- clear float -->
<div className="clearfix"></div>
<!-- float: left and right -->
<div className="float:start"></div>
<div className="float:end"></div>
<div className="float:left"></div>
<div className="float:right"></div>
<div className="float:center"></div>
<!-- position: relative, absolute, fixed and sticky -->
<div className="relative"></div>
<div className="absolute"></div>
<div className="fixed"></div>
<div className="sticky"></div>
<!-- inset/top/right/bottom/left -->
<div className="inset"></div>
<div className="inset:3"></div>
<div className="top"></div>
<div className="top:6"></div>
<div className="right"></div>
<div className="right:9"></div>
<div className="bottom"></div>
<div className="bottom:12"></div>
<div className="left"></div>
<div className="left:15"></div>
```

Responsive design can be achieved by prefixing the class with `sm:`, `md:`, `lg:`, `xl:`, or `xxl:` to target specific screen sizes.

```html
<div className="sm:clearfix"></div>
<div className="md:float:left"></div>
<div className="lg:relative"></div>
<div className="sm:inset"></div>
<div className="md:top:4"></div>
<div className="lg:right:8"></div>
<div className="xl:bottom:12"></div>
<div className="xxl:left:16"></div>
```

#### **Radius**

Radius utilities are used for changing element radius.

```html preview
<div>
  <div className="background:neutral edged">edged</div>
  <div className="background:neutral radius:edged">edged</div>
  <div className="background:neutral rounded">rounded</div>
  <div className="background:neutral radius:rounded">rounded</div>
  <div className="background:neutral circle">circle</div>
  <div className="background:neutral radius:circle">circle</div>
</div>
```

You can also use a more dynamic `radius:auto` which adjusts with use.

```html preview
<div className="background:neutral radius:auto">
  <div className="background:dark radius:auto">auto</div>
</div>
```

#### **Shadows**

Shadow utilities are used for adding shadow to elements.

```html preview
<div className="shadow">shadow</div>
<div className="shadow:inset">inset shadow</div>
```

#### **Spacing**

Spacing utilities are used for defining margin/padding spacing.
You can add `t`, `r`, `b`, `l`, `x` an `y` for directions and `:auto`, `:o`, `:h` and `:0` to `:16` for units.

```html
<!-- margin -->
<div className="m:auto"></div>
<div className="pt:o"></div>
<div className="mr:h"></div>
<div className="pl:3"></div>
<div className="mb:6"></div>
<div className="px:12"></div>
<div className="my:16"></div>
```

Responsive design can be achieved by prefixing the class with `sm:`, `md:`, `lg:`, `xl:`, or `xxl:` to target specific screen sizes.

```html
<div className="sm:mt:0"></div>
<div className="md:pr:4"></div>
<div className="lg:pb:8"></div>
<div className="xl:ml:12"></div>
<div className="xxl:mx:16"></div>
```

#### **Text**

Text utilities are used for text alignment, styles and overflow things.

###### Alignment

```html preview
<div className="text:left">left aligned text</div>
<div className="text:center">center aligned text</div>
<div className="text:right">right aligned text</div>
<div className="text:justify">justified text</div>
```

Responsive design can be achieved by prefixing the class with `sm:`, `md:`, `lg:`, `xl:`, or `xxl:` to target specific screen sizes.

###### Transformation

```html preview
<div className="text:lowercase">Lowercased text</div>
<div className="text:uppercase">Uppercased text</div>
<div className="text:capitalize">Capitalized text</div>
```

###### Size

```html preview
<div className="font:default">default font size</div>
<div className="font:large">Large font size</div>
<div className="font:small">Small font size</div>
```

Responsive design can be achieved by prefixing the class with `sm:`, `md:`, `lg:`, `xl:`, or `xxl:` to target specific screen sizes.

###### Weight/Style

```html preview
<div className="font:normal">Normal weight font</div>
<div className="font:lighter">Lighter weight font</div>
<div className="font:light">Light weight font</div>
<div className="font:regular">Regular weight font</div>
<div className="font:medium">Medium weight font</div>
<div className="font:bold">Bold weight font</div>
<div className="font:bolder">Bolder weight font</div>
<div className="font:italic">Italicized font</div>
<div className="font:muted">Muted font</div>
```

###### Other

```html preview
<div className="ellipsis">Text Ellipsis</div>
<div className="clip">Text Clip</div>
<div className="break">Text Break</div>
```

Responsive design can be achieved by prefixing the class with `sm:`, `md:`, `lg:`, `xl:`, or `xxl:` to target specific screen sizes.

#### **Tooltips**

Tooltips provide context information labels that appear on hover and focus. Tooltips component is built entirely in CSS.
Add the `data-tooltip` attribute with the text that you want to display.

```html preview
<button data-tooltip="Tooltip Text">tooltip</button>
```

Or for a different positioning you can add the `tooltip:top`, `tooltip:right`, `tooltip:bottom` or `tooltip:left` class to define the position of a tooltip.
By default, the tooltip appears above the element.

```html preview
<button className="tooltip:top" data-tooltip="Top Tooltip Text">
  top tooltip
</button>
<button className="tooltip:right" data-tooltip="Right Tooltip Text">
  right tooltip
</button>
<button className="tooltip:bottom" data-tooltip="Bottom Tooltip Text">
  bottom tooltip
</button>
<button className="tooltip:left" data-tooltip="Left Tooltip Text ">
  left tooltip
</button>
```

###### Multiline tooltips

Add the `\n` string between any text for multiline tooltips.

```html preview
<button
  data-tooltip="First Line Tooltip Text\nSecond Line Tooltip Text\nThird Line Tooltip Text"
>
  tooltip
</button>
```

#### **Visibility**

Display utilities are used for display and hide elements.

```html
<!-- visibility: visible; -->
<div className="visible"></div>
<!-- visibility: hidden; -->
<div className="invisible"></div>
<!-- visibility: collpase; -->
<div className="collpase"></div>
```

Responsive design can be achieved by prefixing the class with `sm:`, `md:`, `lg:`, `xl:`, or `xxl:` to target specific screen sizes.

```html
<div className="sm:visible"></div>
<div className="md:invisible"></div>
<div className="lg:collpase"></div>
<div className="xl:visible"></div>
<div className="xxl:invisible"></div>
```

## **License**

Attribution-NonCommercial-NoDerivatives 4.0 International

## **Contributing**

Thank you for your interest in contributing to this project! Please ensure that any contributions respect the licensing terms specified. If you encounter any issues or have suggestions, feel free to report them. All issues will be well received and addressed to the best of our ability. We appreciate your support and contributions!

### **Authors**

- [Tiago Terenas Almeida](https://github.com/tiagomta)
