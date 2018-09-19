写了一段时间ts，在从头学习一遍，温故而之新


### ts的一些技巧
#### 1、巧用注释
通过/** */形式的注释可以给 TS 类型做标记，编辑器会有更好的提示：
```
/** A cool guy. */
interface Person {
  /** A cool name. */
  name: string,
}
```
#### 2、巧用注释 进阶
注释有很多规范的字段，基本和 JSDOC 一致。但不用着急翻文档，在 /** */ 里输入 @ 就可以看到丰富的选择
#### 3、巧用 typeof
```
我们一般先写类型，再使用：

interface Opt {
  timeout: number
}
const defaultOption: Opt = {
  timeout: 500
}
有时候可以反过来：

const defaultOption = {
  timeout: 500
}
type Opt = typeof defaultOption
当一个 interface 总有一个字面量初始值时，可以考虑这种写法以减少重复代码。
```

#### 4、巧用联合类型

```
// 🙁 Not good.
interface Dinner1 {
  fish?: number,
  bear?: number,
}

// 🙂 Awesome!
type Dinner2 = {
  fish: number,
} | {
  bear: number,
}
```

#### 5、巧用查找类型+泛型+keyo
```
interface API {
  '/user': { name: string },
  '/menu': { foods: Food[] },
}
const get = <URL extends keyof API>(url: URL): Promise<API[URL]> => {
  return fetch(url).then(res => res.json())
}
```

#### 6、巧用显式泛型
```
$('button') 是个 DOM 元素选择器，可是返回值的类型是运行时才能确定的，除了返回 any ，还可以

function $<T extends HTMLElement>(id: string):T {
  return document.getElementById(id)
}

// Tell me what element it is.
$<HTMLInputElement>('input').value
函数泛型不一定非得自动推导出类型，有时候显式指定类型就好。
```
#### 7、巧用 DeepReadonly
```
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
}

const a = { foo: { bar: 22 } }
const b = a as DeepReadonly<typeof a>
b.foo.bar = 33 // Hey, stop!
```

#### 8、巧用 Omit

```
import { Button, ButtonProps } from './components/button'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type BigButtonProps = Omit<ButtonProps, 'size'>

function BigButton(props: BigButtonProps) {
  return Button({ ...props, size: 'big' })
}
```
### 一些知识点
#### 1、交叉类型 (intersection types)与联合类型 (union types) 

TypeScript 1.6 引入了交叉类型作为联合类型 (union types) 逻辑上的补充. 联合类型 A | B 表示一个类型为 A 或 B 的实体, 而交叉类型 A & B 表示一个类型同时为 A 或 B 的实体.

```
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U> {};
    for (let id in first) {
        result[id] = first[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id];
        }
    }
    return result;
}

var x = extend({ a: "hello" }, { b: 42 });
var s = x.a;
var n = x.b;
```

```
type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
    name: string;
}

var people: LinkedList<Person>;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;
interface A { a: string }
interface B { b: string }
interface C { c: string }

var abc: A & B & C;
abc.a = "hello";
abc.b = "hello";
abc.c = "hello";
```

#### 2、abstract (抽象的) 类和方法
TypeScript 1.6 为类和它们的方法增加了 abstract 关键字. 一个抽象类允许没有被实现的方法, 并且不能被构造.

```
abstract class Base {
    abstract getThing(): string;
    getOtherThing() { return 'hello'; }
}

let x = new Base(); // 错误, 'Base' 是抽象的

// 错误, 必须也为抽象类, 或者实现 'getThing' 方法
class Derived1 extends Base { }

class Derived2 extends Base {
    getThing() { return 'hello'; }
    foo() {
        super.getThing();// 错误: 不能调用 'super' 的抽象方法
    }
}

var x = new Derived2(); // 正确
var y: Base = new Derived2(); // 同样正确
y.getThing(); // 正确
y.getOtherThing(); // 正确
```

#### 3、keyof和查找类型

在JavaScript中属性名称作为参数的API是相当普遍的，但是到目前为止还没有表达在那些API中出现的类型关系。
输入索引类型查询或keyof，索引类型查询keyof T产生的类型是T的属性名称。keyof T的类型被认为是string的子类型。

```
interface Person {
    name: string;
    age: number;
    location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[];  // "length" | "push" | "pop" | "concat" | ...
type K3 = keyof { [x: string]: Person };  // string
```

#### 4、索引访问类型，也称为查找类型

```
type P1 = Person["name"];  // string
type P2 = Person["name" | "age"];  // string | number
type P3 = string["charAt"];  // (pos: number) => string
type P4 = string[]["push"];  // (...items: string[]) => number
type P5 = string[][0];  // string
```

将这种模式和类型系统的其它部分一起使用，以获取类型安全的查找

```
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];  // 推断类型是T[K]
}

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
    obj[key] = value;
}

let x = { foo: 10, bar: "hello!" };

let foo = getProperty(x, "foo"); // number
let bar = getProperty(x, "bar"); // string

let oops = getProperty(x, "wargarbl"); // 错误！"wargarbl"不存在"foo" | "bar"中

setProperty(x, "foo", "string"); // 错误！, 类型是number而非string
```


#### 5、映射类型

使用现有类型并使其每个属性完全可选
```
interface Person {
    name: string;
    age: number;
    location: string;
}
```
Person的可选属性类型将是这样：
```
interface PartialPerson {
    name?: string;
    age?: number;
    location?: string;
}
```
使用映射类型，PartialPerson可以写成是Person类型的广义变换:
```
type Partial<T> = {
    [P in keyof T]?: T[P];
};

type PartialPerson = Partial<Person>;
```
映射类型可以表示许多有用的类型转换：
```
// 保持类型相同，但每个属性是只读的。
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

// 相同的属性名称，但使值是一个Promise，而不是一个具体的值
type Deferred<T> = {
    [P in keyof T]: Promise<T[P]>;
};

// 为T的属性添加代理
type Proxify<T> = {
    [P in keyof T]: { get(): T[P]; set(v: T[P]): void }
};
```

#### 6、Partial,Readonly,Record和Pick
Partial和Readonly，如前所述，是非常有用的结构。你可以使用它们来描述像一些常见的JS程序：
```
function assign<T>(obj: T, props: Partial<T>): void;
function freeze<T>(obj: T): Readonly<T>;
```
因此，它们现在默认包含在标准库中。
我们还包括两个其他实用程序类型：Record和Pick。
```
// 从T中选取一组属性K
declare function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K>;

const nameAndAgeOnly = pick(person, "name", "age");  // { name: string, age: number }
// 对于类型T的每个属性K，将其转换为U
function mapObject<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U>

const names = { foo: "hello", bar: "world", baz: "bye" };
const lengths = mapObject(names, s => s.length);  // { foo: number, bar: number, baz: number }
```

#### 其他不错的地址
weekly 2.0-2.9 精读
#### react的技巧

[TypeScript 2.8下的终极React组件模式](https://juejin.im/post/5b07caf16fb9a07aa83f2977)
[react-redux-typescript-guide](https://piotrwitek.github.io/react-redux-typescript-guide/)
[复杂 React 应用中的TypeScript 3.0实践](https://zhuanlan.zhihu.com/p/42141179)

库react-redux-typescript-guide
#### 其他一些知识点2.8
Deep Readonly
```
interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>
}

type DeepReadonly<T> =
    T extends (infer R)[]
      ? DeepReadonlyArray<R>
      : T extends Function
        ? T
        : T extends object
          ? DeepReadonlyObject<T>
          : T
```          
Mutable
```
type Mutable<T> = { -readonly [P in keyof T]: T[P] }
```
利用 ReturnType 直接拿 type 可以减少 boilerplate

还有两个很常见但一直没有被收进的
```
Diff
type Diff<T extends string, U extends string> = ({[P in T]: P } & {[P in U]: never } & { [x: string]: never })[T]
2.8 内置了 Exclude 作为官方版的 Diff
Omit
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>
```

#### TS 中的内置类型简述

##### Partial   局部的；偏爱的；不公平的  美  ['pɑrʃəl]

ts 中的实现
```
// node_modules/typescript/lib/lib.es5.d.ts

type Partial<T> = {
    [P in keyof T]?: T[P];
};
```
这个类型的用处就是可以将某个类型里的属性加上 ? 这个 modifier ，加了这个 modifier 之后那些属性就可以为 undefined 了。

```
举个例子，我有个接口 Person ，里面定义了两个必须的属性 name 和 age。

interface Person {
    name: string;
    age: number;
}

// error , property age is missing.
const axes: Person = {
    name: 'axes'
}
如果使用了 Partial

type NewPerson = Partial<Person>;

// correct, because age can be undefined.
const axes: NewPerson = {
    name: 'axes'
}
这个 NewPerson 就等同于

interface Person {
    name?: string;
    age?: number;
}
但是 Partial 有个局限性，就是只支持处理第一层的属性，如果我的接口定义是这样的

interface Person {
    name: string;
    age: number;
    child: {
      name: string;
      age: number;
    }
}

type NewPerson = Partial<Person>;

// error, property age in child is missing
const axes: NewPerson = {
  name: 'axes';
  child: {
    name: 'whx'
  }
}
可以看到，第二层以后的就不会处理了，如果要处理多层，就可以自己通过 Conditional Types 实现一个更强力的 Partial

export type PowerPartial<T> = {
     // 如果是 object，则递归类型
    [U in keyof T]?: T[U] extends object
      ? PowerPartial<T[U]>
      : T[U]
};

```

##### Required   必需的；（美）必修的   美  [rɪ'kwaɪrd]

```
// node_modules/typescript/lib/lib.es5.d.ts

type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

这个类型刚好跟 Partial 相反，Partial 是将所有属性改成不必须，Required 则是将所有类型改成必须。

其中 -? 是代表移除 ? 这个 modifier 的标识。再拓展一下，除了可以应用于 ? 这个 modifiers ，还有应用在 readonly ，比如 Readonly 这个类型
```
// node_modules/typescript/lib/lib.es5.d.ts

type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```
就可以给子属性添加 readonly 的标识，如果将上面的 readonly 改成 -readonly 就是移除子属性的 readonly 标识。



##### Pick  挑选；采摘；挖  美  [pɪk]
```
// node_modules/typescript/lib/lib.es5.d.ts

type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```
这个类型则可以将某个类型中的子属性挑出来，比如上面那个 Person 的类
```
type NewPerson = Pick<Person, 'name'>; // { name: string; }
```
可以看到 NewPerson 中就只有个 name 的属性了，这个类型还有更有用的地方，等讲到 Exclude 类型会说明。


##### Record 记录，记载；标明；将...录音  美  [(for v.) rɪˈkɔrd; (for n.) ˈrekərd;ˈrɛkɚd]

```
// node_modules/typescript/lib/lib.es5.d.ts

type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

可以获得根据 K 中的所有可能值来设置 key 以及 value 的类型

```
type T11 = Record<'a' | 'b' | 'c', Person>; // { a: Person; b: Person; c: Person; }
```


##### Exclude  排除；排斥；拒绝接纳；逐出   美  [ɪk'sklʊd]

```
// node_modules/typescript/lib/lib.es5.d.ts

type Exclude<T, U> = T extends U ? never : T;
```
个类型可以将 T 中的某些属于 U 的类型移除掉，举个例

```
type T00 = Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
可以看到 T 是 "a" | "b" | "c" | "d" ，然后 U 是 "a" | "c" | "f" ，返回的新类型就可以将 U 中的类型给移除掉，也就是 "b" | "d" 了。

那这个类型有什么用呢，在我看来，可以结合 Pick 类型使用。

在我们给 js 写声明的时候，经常会遇到我们需要 extend 某个接口，但是我们又需要在新接口中将某个属性给 overwrite 掉，但是这样经常会遇到类型兼容性问题。举个例子

interface Chicken {
    name: string;
    age: number;
    egg: number;
}
我需要继承上面这个接口

// error, Types of property 'name' are incompatible
interface NewChicken extends Chicken {
  name: number;
}
可以看到就会报错了，因为在 Chicken 中 name 是 string 类型，而 NewChicken 却想重载成 number 类型。很多时候可能有人就直接把 name 改成 any 就算了，但是不要忘了我们有个 Pick 的类型，可以把我们需要的类型挑出来，那就可以这样

// correct.
interface NewChicken extends Pick<Chicken, 'age' | 'egg'> {
  name: number;
}
可以看到，我们把 Person 中的类型做了挑选，只把 age 和 egg 类型挑出来 extend ，那么我复写 name 就没问题了。

不过再想一下，如果我要继承某个接口并且复写某一个属性，还得把他的所有属性都写出来么，当然不用，我们可以用 Exclude 就可以拿到除 name 之外的所有属性的 key 类型了。

type T01 = Exclude<keyof Chicken, 'name'>; // 'age' | 'egg'
然后把上面代码加到 extend 中就成了

// correct.
interface NewChicken extends Pick<Chicken, Exclude<keyof Chicken, 'name'>> {
  name: number;
}
然后还可以把这个处理封装成一个单独的类型

type FilterPick<T, U> = Pick<T, Exclude<keyof T, U>>;
然后上面的 extend 的代码就可以写成这样，就更简洁了

interface NewChicken extends FilterPick<Chicken, 'name'> {
  name: number;
}
这样一来，我们就可以愉快的进行属性 overwrite 了。
```


##### ReturnType

```
// node_modules/typescript/lib/lib.es5.d.ts

type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;
```

这个类型也非常好用，可以获取方法的返回类型，可能有些人看到这一长串就被绕晕了，但其实也是使用了 Conditional Types ，推论 ( infer ) 泛型 T 的返回类型 R 来拿到方法的返回类型

实际使用的话，就可以通过 ReturnType 拿到方法的返回类型，如下的示例

```
function TestFn() {
  return '123123';
}

type T01 = ReturnType<typeof TestFn>; // string
```

##### ThisType

```
// node_modules/typescript/lib/lib.es5.d.ts

interface ThisType<T> { }

可以看到声明中只有一个接口，没有任何的实现，说明这个类型是在 ts 源码层面支持的，而不是通过类型变换，那这个类型有啥用呢，是用于指定上下文对象类型的。

interface Person {
    name: string;
    age: number;
}

const obj: ThisType<Person> = {
  dosth() {
    this.name // string
  }
}
这样的话，就可以指定 obj 里的所有方法里的上下文对象改成 Person 这个类型了。跟

const obj = {
  dosth(this: Person) {
    this.name // string
  }
}
差不多效果。
```

##### NonNullable

```
// node_modules/typescript/lib/lib.es5.d.ts

type NonNullable<T> = T extends null | undefined ? never : T;
```

根据实现可以很简单的看出，这个类型可以用来过滤类型中的 null 及 undefined 类型

```
type T22 = '123' | '222' | null;
type T23 = NonNullable<T22>; // '123' | '222'

```

#####  其他常用

PromiseType
```
export type PromiseType<T extends Promise<any>> = T extends Promise<infer R>  ? R  : any;
```