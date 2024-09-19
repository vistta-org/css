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
import css from "@vistta/css";

export const config = {
  styles: [css],
};

// OR

import style from "@vistta/css/style";

export default class Page extends Component {
  render() {
    return <div {...style}>Hello World</div>;
  }
}
```

You can use other bundlers importing `@vistta/css/scss`

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

#### **Border**

Border utilities are used for setting border for specific sides and colors.
You can combine both `border-primary-left`.
You can also add `-light-[1-4]`, `-dark-[1-4]` to each color option for more customization.

###### Sides

```html preview
<p className="border">border all sides</p>
<p className="border-top">border top</p>
<p className="border-right">border right</p>
<p className="border-bottom">border bottom</p>
<p className="border-left">border left</p>
<p className="border-none">remove border</p>
```

###### Colors

```html preview
<p className="border-primary">border primary</p>
<p className="border-primary-contrast">border primary contrast</p>
<p className="border-secondary">border secondary</p>
<p className="border-secondary-contrast">border secondary contrast</p>
<p className="border-light">border light</p>
<p className="border-dark">border dark</p>
<p className="border-neutral">border neutral</p>
<p className="border-info">border info</p>
<p className="border-success">border success</p>
<p className="border-warning">border warning</p>
<p className="border-error">border error</p>
```

#### **Colors**

Color utilities are used for changing colors for text, link and background.
For the default color you can also add `-[1-4]` for more customization, to the other colors you can add `-light-[1-4]` or `-dark-[1-4]`.

###### Text Colors

```html preview
<p className="text-default">default color</p>
<p className="text-primary">primary color</p>
<p className="text-primary-contrast">primary contrast color</p>
<p className="text-secondary">secondary color</p>
<p className="text-secondary-contrast">secondary contrast color</p>
<p className="text-dark">dark color</p>
<p className="text-neutral">neutral color</p>
<p className="text-light">light color</p>
<p className="text-info">info color</p>
<p className="text-success">success color</p>
<p className="text-warning">warning color</p>
<p className="text-error">error color</p>
```

###### Background Colors

```html preview
<p className="back-default">default background</p>
<p className="back-primary">primary background</p>
<p className="back-primary-contrast">primary contrast background</p>
<p className="back-secondary">secondary background</p>
<p className="back-secondary-contrast">secondary contrast background</p>
<p className="back-dark">dark background</p>
<p className="back-neutral">neutral background</p>
<p className="back-light">light background</p>
<p className="back-info">info background</p>
<p className="back-success">success background</p>
<p className="back-warning">warning background</p>
<p className="back-error">error background</p>
```

#### **Cursors**

Cursor utilities specify which mouse cursor to display when mouseover.

```html preview
<p className="c-default">cursor default</p>
<p className="c-pointer">cursor pointer</p>
<p className="c-move">cursor move</p>
<p className="c-zoom-in">cursor zoom-in</p>
<p className="c-zoom-out">cursor zoom-out</p>
<p className="c-not-allowed">cursor not-allowed</p>
<p className="c-auto">cursor auto</p>
```

#### **Displays**

Display utilities are used for display and hide elements.

```html
<!-- display: block; -->
<div className="d-block"></div>
<!-- display: inline; -->
<div className="d-inline"></div>
<!-- display: inline-block; -->
<div className="d-inline-block"></div>
<!-- display: flex; -->
<div className="d-flex"></div>
<!-- display: inline-flex; -->
<div className="d-inline-flex"></div>
<!-- display: none; -->
<div className="d-none"></div>
<div className="d-hide"></div>
<!-- visibility: visible; -->
<div className="d-visible"></div>
<!-- visibility: hidden; -->
<div className="d-invisible"></div>
<!-- hide text contents -->
<div className="text-hide"></div>
<!-- assistive text for screen reader -->
<div className="text-assistive"></div>
```

#### **Dividers**

Divider is used to separate elements.

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
  <div className="divider-horizontal" data-content="OR"></div>
  <p>Section 2</p>
</div>
```

```html preview
<div className="grid gap-4">
  <p className="py-8">Section 1</p>
  <div className="divider-vertical" data-content="OR"></div>
  <p className="py-8">Section 2</p>
</div>
```

#### **Highlights**

Highlight utilities are used to highlight a element.
You can also add `-light-[1-4]`, `-dark-[1-4]` to each color option for more customization.

###### Highlight Colors

```html preview
<p className="highlight">highlight default</p>
<p className="highlight-primary">highlight primary</p>
<p className="highlight-primary-contrast">highlight primary contrast</p>
<p className="highlight-secondary">highlight secondary</p>
<p className="highlight-secondary-contrast">highlight secondary contrast</p>
<p className="highlight-light">highlight light</p>
<p className="highlight-dark">highlight dark</p>
<p className="highlight-neutral">highlight neutral</p>
<p className="highlight-info">highlight info</p>
<p className="highlight-success">highlight success</p>
<p className="highlight-warning">highlight warning</p>
<p className="highlight-error">highlight error</p>
```

#### **Icons**

This project uses <a href="https://fonts.google.com/icons?selected=Material+Icons" target="_blank" rel="noreferrer">Google Fonts Material Icons</a>.
Use the attribute `data-icon` with the value `&#x«code point»;` (HTML) or `\u«code point»;` (JSX)

```html preview
<button data-icon="&#xe8b6;" />
<button data-icon="&#xe88a;" />
<button data-icon="&#xe853;" />
<button data-icon="&#xe8b8;" />
<button data-icon="&#xe876;" />
<button data-icon="&#xe88e;" />
```

###### Icon Sizes

Use `.font-small`, `.font-large` classes to increase icon sizes. You can set `font-size` to have different icon sizes.

```html preview
<p className="font-small" data-icon="&#xe87e;"></p>
<p className="font-large" data-icon="&#xe87e;"></p>
```

#### **Layouts**

Layout includes flex wrap based responsive grid system with 12 columns.
Add `.grid` or `.columns` to a container element and add any element you want with the `col/column` to take advantage of it.
For more sizes you can use `.col-[1-12]` or `.column-[1-12]`. You can also add `-auto` for automatic sizing.

```html preview
<div className="grid">
  <div className="col-1">col 1</div>
  <div className="col-11">col 11</div>
  <div className="col-2">col 2</div>
  <div className="col-10">col 10</div>
  <div className="col-3">col 3</div>
  <div className="col-9">col 9</div>
  <div className="col-4">col 4</div>
  <div className="col-8">col 8</div>
  <div className="col-5">col 5</div>
  <div className="col-7">col 7</div>
  <div className="col-6">col 6</div>
  <div className="col-6">col 6</div>
  <div className="col-12">col 12</div>
</div>
```

You can also use `.rows` to you layout with every child as a full column.

```html preview
<div className="rows">
  <div>full column</div>
  <div>full column</div>
</div>
```

You can also remove the wrap functionality by adding `.oneline`.

```html preview
<div className="grid oneline">
  <div className="col-8">col 8</div>
  <div className="col-8">col 8</div>
</div>
```

You can also control the gap size with `.gap-[1-16]` or `.gapless` for no gap.

```html preview
<div className="grid gapless">
  <div className="col-6">col 6</div>
  <div className="col-6">col 6</div>
</div>
<div className="grid gap-6">
  <div className="col-6">col 6</div>
  <div className="col-6">col 6</div>
</div>
<div className="grid gap-12">
  <div className="col-6">col 6</div>
  <div className="col-6">col 6</div>
</div>
```

You also have multiple options for the grid alignment.

```html preview
<div className="grid space-around">...</div>
<div className="grid space-between">...</div>
<div className="grid space-evenly">...</div>
<div className="grid top">...</div>
<div className="grid bottom">...</div>
<div className="grid center">...</div>
<div className="grid left">...</div>
<div className="grid right">...</div>
<div className="grid top-left">...</div>
<div className="grid top-right">...</div>
<div className="grid center-right">...</div>
<div className="grid bottom-right">...</div>
<div className="grid bottom-left">...</div>
<div className="grid center-left">...</div>
```

#### **Loading**

Loading indicator is used for loading or updating. You can add the `loading` class to a container for loading status.
You can also add `-[1-4]` for more sizes.

```html preview
<div className="loading"></div>
<div className="loading-2"></div>
<div className="loading-4"></div>
```

```html preview
<div className="p-relative p-16">
  <div className="loading loading-screen"></div>
</div>
```

#### **Overflow**

Overflow utilities are used for changing element overflow.

```html
<!-- visible overflow -->
<div className="overflow"></div>
<div className="overflow-visible"></div>
<!-- auto overflow -->
<div className="overflow-auto"></div>
<!-- no overflow -->
<div className="no-overflow"></div>
<div className="overflow-clip"></div>
<!-- scroll -->
<div className="scroll"></div>
<div className="overflow-scroll"></div>
```

You can also add `-x` or `-y` to control just one axis.

```html
<!-- visible overflow -->
<div className="overflow-x"></div>
<div className="overflow-y"></div>
<div className="overflow-x-visible"></div>
<div className="overflow-y-visible"></div>
<!-- auto overflow -->
<div className="overflow-x-auto"></div>
<div className="overflow-y-auto"></div>
<!-- no overflow -->
<div className="no-x-overflow"></div>
<div className="no-y-overflow"></div>
<div className="overflow-x-clip"></div>
<div className="overflow-y-clip"></div>
<!-- scroll -->
<div className="scroll-x"></div>
<div className="scroll-y"></div>
<div className="overflow-x-scroll"></div>
<div className="overflow-y-scroll"></div>
```

#### **Positions**

Position utilities are used for useful layout and position things, including clearfix, float, position and margin/padding utilities.

```html
<!-- clear float -->
<div className="clearfix"></div>
<!-- float: left and right -->
<div className="float-left"></div>
<div className="float-right"></div>
<!-- position: relative, absolute, fixed and sticky -->
<div className="p-relative"></div>
<div className="p-absolute"></div>
<div className="p-fixed"></div>
<div className="p-sticky"></div>
<!-- centered block -->
<div className="p-centered"></div>
<!-- occupy full screen -->
<div className="p-fullscreen"></div>
<!-- Occupy full relative space -->
<div className="p-fullspace"></div>

<!-- m-[0-12] margin in all 4 directions -->
<div className="m-2"></div>
<div className="m-8"></div>
<!-- m[t|b|l|r]-[0-12] margin in 1 of 4 directions. [(t)op, (b)ottom, (l)eft, (r)ight] -->
<div className="mt-2"></div>
<div className="mt-8"></div>
<!-- mx-[0-12] margin vertically or my-[0-12] margin horizontally -->
<div className="mx-2"></div>
<div className="mx-8"></div>
<div className="my-2"></div>
<div className="my-8"></div>
<!-- p-[0-12] padding in all 4 directions -->
<div className="p-2"></div>
<div className="p-8"></div>
<!-- p[t|b|l|r]-[0-12] padding in 1 of 4 directions. [(t)op, (b)ottom, (l)eft, (r)ight] -->
<div className="pt-2"></div>
<div className="pt-8"></div>
<!-- px-[0-12] padding vertically or py-[0-12] padding horizontally -->
<div className="px-2"></div>
<div className="px-9"></div>
<div className="py-2"></div>
<div className="py-8"></div>
```

You can also add responsiveness by adding `-sm`, `-md` and `-lg` to the class for small screens, medium screens or large screens respectively.

```html
<div className="clearfix-sm"></div>
<div className="float-left-md"></div>
<div className="p-relative-lg"></div>

<div className="m-sm-2"></div>
<div className="mt-md-2"></div>

<div className="p-md-2"></div>
<div className="py-lg-2"></div>
```

#### **Shadows**

Shadow utilities are used for adding shadow to elements.
You can also add `inset-` for inset shadow and `-[1-4]` for more customization.

```html preview
<div className="shadow">shadow</div>
<div className="shadow-4">shadow 4</div>
<div className="inset-shadow">inset shadow</div>
<div className="inset-shadow-4">inset shadow 4</div>
```

#### **Shapes**

Shape utilities are used for changing element shapes.

```html preview
<div className="shape-edged">edged</div>
<div className="shape-rounded">rounded</div>
<div className="shape-circle">circle</div>
```

#### **Text**

Text utilities are used for text alignment, styles and overflow things.

###### Alignment

```html preview
<div className="text-left">left aligned text</div>
<div className="text-center">center aligned text</div>
<div className="text-right">right aligned text</div>
<div className="justify-right">justified text</div>
```

###### Transformation

```html preview
<div className="text-lowercase">Lowercased text</div>
<div className="text-uppercase">Uppercased text</div>
<div className="text-capitalize">Capitalized text</div>
```

###### Weight/Style

```html preview
<div className="font-normal">Normal weight font</div>
<div className="font-lighter">Lighter weight font</div>
<div className="font-light">Light weight font</div>
<div className="font-regular">Regular weight font</div>
<div className="font-medium">Medium weight font</div>
<div className="font-bold">Bold weight font</div>
<div className="font-bolder">Bolder weight font</div>
<div className="font-italic">Italicized font</div>
<div className="font-muted">Muted font</div>
```

###### Size

```html preview
<div className="font-default">default font size</div>
<div className="font-large">Large font size</div>
<div className="font-small">Small font size</div>
```

###### Other

```html preview
<div className="text-ellipsis">Text Ellipsis</div>
<div className="text-clip">Text Clip</div>
<div className="text-break">Text Break</div>
```

#### **Tooltips**

Tooltips provide context information labels that appear on hover and focus. Tooltips component is built entirely in CSS.
Add the `data-tooltip` attribute with the text that you want to display.

```html preview
<button data-tooltip="Tooltip Text">tooltip</button>
```

Or for a different positioning you can add the `tooltip-top`, `tooltip-right`, `tooltip-bottom` or `tooltip-left` class to define the position of a tooltip.
By default, the tooltip appears above the element.

```html preview
<button className="tooltip-top" data-tooltip="Top Tooltip Text">
  top tooltip
</button>
<button className="tooltip-right" data-tooltip="Right Tooltip Text">
  right tooltip
</button>
<button className="tooltip-bottom" data-tooltip="Bottom Tooltip Text">
  bottom tooltip
</button>
<button className="tooltip-left" data-tooltip="Left Tooltip Text ">
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
<a className="button-raw">a.button</a>
```

###### Outlined

```html preview
<button className="outlined">outlined</button>
<button className="outlined" disabled>disabled</button>
<a className="button-outlined">a.button</a>
```

###### Size Variants

```html preview
<button className="small">small</button>
<button className="large">large</button>
```

###### Style Variants

```html preview
<button className="primary">primary</button>
<a className="button-primary">a.primary</a>
<button className="secondary">secondary</button>
<a className="button-secondary">a.secondary</a>
<button className="info">info</button>
<a className="button-info">a.info</a>
<button className="success">success</button>
<a className="button-success">a.success</a>
<button className="warning">error</button>
<a className="button-warning">a.error</a>
<button className="error">error</button>
<a className="button-error">a.error</a>
```

###### Raw Style Variants

```html preview
<button className="raw primary">primary</button>
<a className="button-raw-primary">a.primary</a>
<button className="raw secondary">secondary</button>
<a className="button-raw-secondary">a.secondary</a>
<button className="raw info">info</button>
<a className="button-raw-info">a.info</a>
<button className="raw success">success</button>
<a className="button-raw-success">a.success</a>
<button className="raw warning">error</button>
<a className="button-raw-warning">a.error</a>
<button className="raw error">error</button>
<a className="button-raw-error">a.error</a>
```

###### Outlined Style Variants

```html preview
<button className="outlined primary">primary</button>
<a className="button-outlined-primary">a.primary</a>
<button className="outlined secondary">outlined</button>
<a className="button-outlined-secondary">a.secondary</a>
<button className="info outlined">info</button>
<a className="button-outlined-info">a.info</a>
<button className="success outlined">success</button>
<a className="button-outlined-success">a.success</a>
<button className="warning outlined">error</button>
<a className="button-outlined-warning">a.error</a>
<button className="error outlined">error</button>
<a className="button-outlined-error">a.error</a>
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
<div className="grid gap-6">
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

## **License**

Attribution-NonCommercial-NoDerivatives 4.0 International

## **Contributing**

Thank you for your interest in contributing to this project! Please ensure that any contributions respect the licensing terms specified. If you encounter any issues or have suggestions, feel free to report them. All issues will be well received and addressed to the best of our ability. We appreciate your support and contributions!

### **Authors**

- [Tiago Terenas Almeida](https://github.com/tiagomta)
