# Java常用API

###  ArrayList

**底层实现**：动态数组（基于`Object[]`），允许 null 元素，**非线程安全**。

核心方法：

- `add(E e)`：尾部添加元素（时间复杂度 O (1)）。
- `add(int index, E element)`：指定位置插入元素（O (n)，需移动后续元素）。
- `get(int index)`：根据索引获取元素（O (1)）。
- `set(int index, E element)`：替换指定位置元素（O (1)）。
- `remove(int index)`/`remove(Object o)`：删除元素（O (n)，需移动元素）。
- `size()`：获取元素个数。
- `toArray()`：转为数组（常用`Integer[] arr = list.toArray(new Integer[0]);`）。

### LinkedList

**底层实现**：双向链表，每个节点包含`prev`和`next`指针，**非线程安全**。

核心方法：

- `addFirst(E e)`/`addLast(E e)`：头尾插入元素（O (1)）。
- `getFirst()`/`getLast()`：获取头尾元素（空集合抛异常，需先用`isEmpty()`判断）。
- `pollFirst()`/`pollLast()`：获取并移除头尾元素（空集合返回 null）。
- `removeFirst()`/`removeLast()`：移除头尾元素（空集合抛异常）。
- `iterator()`：链表迭代器，支持双向遍历（`hasPrevious()`/`previous()`）。

### PriorityQueue（优先队列）

**底层实现**：基于堆（二叉堆，默认小根堆）。

核心方法：

- `add(E e)`/`offer(E e)`：添加元素（自动调整堆结构，O (logn)）。
- `poll()`：取出并移除最小元素（堆顶，O (logn)）。
- `peek()`：查看最小元素。

###  HashMap

**底层实现**：JDK1.8 后采用 “数组 + 链表 + 红黑树”（链表长度≥8 且容量≥64 时转为红黑树），**非线程安全**。

核心方法：

- `put(K key, V value)`：插入键值对（若 key 存在则覆盖 value）。
- `get(Object key)`：根据 key 获取 value（key 不存在返回 null）。
- `containsKey(Object key)`：判断是否存在 key（比`get!=null`更高效）。
- `keySet()`：获取所有 key 的 Set 集合。
- `values()`：获取所有 value 的 Collection 集合。
- `entrySet()`：获取所有键值对的 Set<Map.Entry<K,V>>（遍历推荐）。
- `remove(Object key)`：删除键值对。

### TreeMap

**底层实现**：红黑树，按键的自然顺序或自定义 Comparator 排序，**非线程安全**。

核心方法：

- `put(K key, V value)`：插入键值对（自动排序，key 需可比较）。
- `get(Object key)`：根据 key 获取 value。
- `firstKey()`/`lastKey()`：获取最小 / 最大 key。
- `subMap(K fromKey, K toKey)`：获取 [fromKey, toKey) 范围的子映射。
- `floorKey(K key)`：≤key 的最大 key；`ceilingKey(K key)`：≥key 的最小 key。

### String（不可变字符串）

**特性**：字符串常量池，每次修改会生成新对象。

核心方法：

- `charAt(int index)`：获取指定位置字符（索引从 0 开始）。
- `substring(int beginIndex)`/`substring(int begin, int end)`：截取子串（左闭右开）。
- `split(String regex)`：按正则表达式分割字符串（结果可能包含空字符串，需注意）。
- `trim()`：去除首尾空格（中间空格保留）。
- `equals(Object obj)`：判断内容相等（区分大小写）；`equalsIgnoreCase(String another)`：忽略大小写。
- `compareTo(String anotherString)`：按字典序比较（返回负数 / 0 / 正数）。
- `getBytes()`：转为字节数组（处理编码问题，如 UTF-8）。

### StringBuilder & StringBuffer

**特性**：可变字符串，`StringBuilder`非线程安全（性能更高），`StringBuffer`线程安全（方法加锁）。

核心方法：

- `append(String str)`：拼接字符串（支持链式调用，如`sb.append(a).append(b)`）。
- `reverse()`：反转字符串。
- `toString()`：转为 String 对象。
- `delete(int start, int end)`：删除 [start, end) 区间的字符。
- `insert(int offset, String str)`：在指定位置插入字符串。

### BigInteger（大整数）

**作用**：处理超过`long`范围（±9e18）的整数运算，避免溢出。

核心方法：

- **构造方法**：`new BigInteger(String val)`（推荐），避免`new BigInteger(int[])`等复杂方式。
- `add(BigInteger val)`/`subtract()`/`multiply()`/`divide()`：加减乘除。
- `mod(BigInteger m)`：取模运算。
- `compareTo(BigInteger val)`：比较大小（返回 - 1/0/1）。
- `toString()`：转为字符串（可指定进制，如`toString(2)`转二进制）。

###  BigDecimal（高精度小数）

**作用**：处理浮点数精度问题（如金融计算），避免`double`的精度丢失。

核心方法：

- **构造方法**：`new BigDecimal(String val)`（避免使用`double`构造，如`new BigDecimal("0.1")`而非`new BigDecimal(0.1)`）。

  - ```
    setScale(int newScale, RoundingMode roundingMode)
    ```

  ：设置小数位数，指定舍入模式（必须参数，否则抛异常）。

  - 常用舍入模式：`RoundingMode.HALF_UP`（四舍五入）、`RoundingMode.DOWN`（直接截断）。

- `add()`/`subtract()`/`multiply()`/`divide()`：运算方法（除法需指定 scale 和舍入模式，如`divide(b, 2, RoundingMode.HALF_UP)`）。

| 方法                                        | 功能                                | 示例               | 注意事项                                  |
| ------------------------------------------- | ----------------------------------- | ------------------ | ----------------------------------------- |
| `add(BigInteger val)`                       | 加法：this + val                    | `a.add(b)`         | 结果为新的 BigInteger 对象（不可变）      |
| `subtract(BigInteger val)`                  | 减法：this - val                    | `a.subtract(b)`    | 结果可能为负数                            |
| `multiply(BigInteger val)`                  | 乘法：this × val                    | `a.multiply(b)`    | 大数乘法性能较低，避免多层循环中使用      |
| `divide(BigInteger val)`                    | 除法：this ÷ val（取整）            | `a.divide(b)`      | 除数为 0 时抛`ArithmeticException`        |
| `mod(BigInteger m)`                         | 取模：this % m（结果符号与 m 一致） | `a.mod(m)`         | `m`必须为正，否则抛`ArithmeticException`  |
| `modPow(BigInteger exponent, BigInteger m)` | 模幂：(this^exponent) mod m         | `a.modPow(exp, m)` | 高效计算大指数模，竞赛高频（如 RSA 加密） |
| `pow(int exponent)`                         | 幂运算：this^exponent               | `a.pow(5)`         | `exponent`≥0，负数抛`ArithmeticException` |
| `abs()`                                     | 绝对值                              | `a.abs()`          | 符号为负时返回正数                        |

| 方法                        | 功能                                   | 示例             | 注意事项                               |
| --------------------------- | -------------------------------------- | ---------------- | -------------------------------------- |
| `compareTo(BigInteger val)` | 比较大小：<0（小）、=0（等）、>0（大） | `a.compareTo(b)` | 替代`>`/`<`运算符（BigInteger 是对象） |
| `equals(Object obj)`        | 判断值相等                             | `a.equals(b)`    | 必须用`equals`，`==`比较对象地址       |
| `longValue()`               | 转为`long`（截断）                     | `a.longValue()`  | 超出`long`范围时结果错误（竞赛慎用）   |
| `toString()`                | 转为十进制字符串                       | `a.toString()`   | 大整数输出时使用，避免科学计数法       |
| `toString(int radix)`       | 转为指定进制字符串（2-36）             | `a.toString(2)`  | 输出二进制、十六进制等场景             |