## RedisTemplate常用API

- ValueOperations：简单K-V操作

- SetOperations：set类型数据操作

- ZSetOperations：zset类型数据操作

- HashOperations：针对map类型的数据操作

- ListOperations：针对list类型的数据操作

  

### 一、通过bound封装指定的key

指定后进行一系列的操作而无须“显式”的再次指定Key，即BoundKeyOperations：

* BoundValueOperations

* BoundSetOperations

* BoundListOperations

* BoundSetOperations

* BoundHashOperations

 

```java
//1、通过redisTemplate设置值
redisTemplate.boundValueOps("StringKey").set("StringValue");
redisTemplate.boundValueOps("StringKey").set("StringValue",1, TimeUnit.MINUTES);

//2、通过BoundValueOperations设置值
BoundValueOperations stringKey = redisTemplate.boundValueOps("StringKey");
stringKey.set("StringVaule");
stringKey.set("StringValue",1, TimeUnit.MINUTES);

//3、通过ValueOperations设置值
ValueOperations ops = redisTemplate.opsForValue();
ops.set("StringKey", "StringVaule");
ops.set("StringValue","StringVaule",1, TimeUnit.MINUTES);
```

 

```java
//1、通过redisTemplate获取值
String str1 = (String) redisTemplate.boundValueOps("StringKey").get();

//2、通过BoundValueOperations获取值
BoundValueOperations stringKey = redisTemplate.boundValueOps("StringKey");
String str2 = (String) stringKey.get();

//3、通过ValueOperations获取值
ValueOperations ops = redisTemplate.opsForValue();
String str3 = (String) ops.get("StringKey");
```



### 二、针对数据的“序列化/反序列化”，提供了多种可选择策略(RedisSerializer)

   **JdkSerializationRedisSerializer：** POJO对象的存取场景，使用JDK本身序列化机制，将pojo类通过ObjectInputStream/ObjectOutputStream进行序列化操作，最终redis-server中将存储字节序列。是目前最常用的序列化策略。



​    **StringRedisSerializer：**Key或者value为字符串的场景，根据指定的charset对数据的字节序列编码成string，是“new String(bytes, charset)”和“string.getBytes(charset)”的直接封装。是最轻量级和高效的策略。



​    **JacksonJsonRedisSerializer：**jackson-json工具提供了javabean与json之间的转换能力，可以将pojo实例序列化成json格式存储在redis中，也可以将json格式的数据转换成pojo实例。因为jackson工具在序列化和反序列化时，需要明确指定Class类型，因此此策略封装起来稍微复杂。【需要jackson-mapper-asl工具支持】



### 三、基本API

```java
//删除key
redisTemplate.delete(keys);
//指定key的失效时间
redisTemplate.expire(key,time,TimeUnit.MINUTES);
//根据key获取过期时间
Long expire = redisTemplate.getExpire(key);
//判断key是否存在
redisTemplate.hasKey(key);
//顺序递增
redisTemplate.boundValueOps("StringKey").increment(3L);
//顺序递减
redisTemplate.boundValueOps("StringKey").increment(-3L);
```

### 四、Hash类型相关操作

#### 4.1 设置值：

```java
//1、通过redisTemplate设置值
redisTemplate.boundHashOps("HashKey").put("SmallKey", "HashVaue");

//2、通过BoundValueOperations设置值
BoundHashOperations hashKey = redisTemplate.boundHashOps("HashKey");
hashKey.put("SmallKey", "HashVaue");

//3、通过ValueOperations设置值
HashOperations hashOps = redisTemplate.opsForHash();
hashOps.put("HashKey", "SmallKey", "HashVaue");
```

#### 4.2 设置过期时间(单独设置)

```java
redisTemplate.boundValueOps("HashKey").expire(1,TimeUnit.MINUTES);
redisTemplate.expire("HashKey",1,TimeUnit.MINUTES);
```

#### 4.3 添加一个Map集合

```java
HashMap<String, String> hashMap = new HashMap<>();
redisTemplate.boundHashOps("HashKey").putAll(hashMap);
```

#### 4.4 提取Hash中的小key

```java
//1、通过redisTemplate获取值
Set keys1 = redisTemplate.boundHashOps("HashKey").keys();

//2、通过BoundValueOperations获取值
BoundHashOperations hashKey = redisTemplate.boundHashOps("HashKey");
Set keys2 = hashKey.keys();

//3、通过ValueOperations获取值
HashOperations hashOps = redisTemplate.opsForHash();
Set keys3 = hashOps.keys("HashKey");
```

#### 4.5 提取所有的value值

```java
//1、通过redisTemplate获取值
List values1 = redisTemplate.boundHashOps("HashKey").values();

//2、通过BoundValueOperations获取值
BoundHashOperations hashKey = redisTemplate.boundHashOps("HashKey");
List values2 = hashKey.values();

//3、通过ValueOperations获取值
HashOperations hashOps = redisTemplate.opsForHash();
List values3 = hashOps.values("HashKey");
```

#### 4.6 根据Hash的key提取value值

```java
//1、通过redisTemplate获取
String value1 = (String) redisTemplate.boundHashOps("HashKey").get("SmallKey");

//2、通过BoundValueOperations获取值
BoundHashOperations hashKey = redisTemplate.boundHashOps("HashKey");
String value2 = (String) hashKey.get("SmallKey");

//3、通过ValueOperations获取值
HashOperations hashOps = redisTemplate.opsForHash();
String value3 = (String) hashOps.get("HashKey", "SmallKey");
```

#### 4.7 获取所有的键值对集合

```java
//1、通过redisTemplate获取
Map entries = redisTemplate.boundHashOps("HashKey").entries();

//2、通过BoundValueOperations获取值
BoundHashOperations hashKey = redisTemplate.boundHashOps("HashKey");
Map entries1 = hashKey.entries();

//3、通过ValueOperations获取值
HashOperations hashOps = redisTemplate.opsForHash();
Map entries2 = hashOps.entries("HashKey");
```

#### 4.8 删除

```java
//删除小key
redisTemplate.boundHashOps("HashKey").delete("SmallKey");
//删除大key
redisTemplate.delete("HashKey");
```

#### 4.9 判断Hash中是否含有该值

```java
Boolean isEmpty = redisTemplate.boundHashOps("HashKey").hasKey("SmallKey");
```

### 五、Set类型相关操作

#### 5.1 添加

```java
//1、通过redisTemplate设置值
redisTemplate.boundSetOps("setKey").add("setValue1", "setValue2", "setValue3");

//2、通过BoundValueOperations设置值
BoundSetOperations setKey = redisTemplate.boundSetOps("setKey");
setKey.add("setValue1", "setValue2", "setValue3");

//3、通过ValueOperations设置值
SetOperations setOps = redisTemplate.opsForSet();
setOps.add("setKey", "SetValue1", "setValue2", "setValue3");
```

#### 5.2 设置过期时间(单独设置)

```java
redisTemplate.boundValueOps("setKey").expire(1,TimeUnit.MINUTES);
redisTemplate.expire("setKey",1,TimeUnit.MINUTES);
```

#### 5.3 根据key获取Set中的所有值

```java
//1、通过redisTemplate获取值
Set set1 = redisTemplate.boundSetOps("setKey").members();

//2、通过BoundValueOperations获取值
BoundSetOperations setKey = redisTemplate.boundSetOps("setKey");
Set set2 = setKey.members();

//3、通过ValueOperations获取值
SetOperations setOps = redisTemplate.opsForSet();
Set set3 = setOps.members("setKey");
```

#### 5.4 查询value是否已存在

```java
Boolean isEmpty = redisTemplate.boundSetOps("setKey").isMember("setValue2");
```

#### 5.5 获取Set的长度

```java
Long size = redisTemplate.boundSetOps("setKey").size();
```

#### 5.6 移除指定的元素

```java
Long result1 = redisTemplate.boundSetOps("setKey").remove("setValue1");
```

#### 5.7 移除指定的key

```java
Boolean result2 = redisTemplate.delete("setKey");
```

### 六、LIST类型相关操作

#### 6.1 添加

```java
//1、通过redisTemplate设置值
redisTemplate.boundListOps("listKey").leftPush("listLeftValue1");
redisTemplate.boundListOps("listKey").rightPush("listRightValue2");

//2、通过BoundValueOperations设置值
BoundListOperations listKey = redisTemplate.boundListOps("listKey");
listKey.leftPush("listLeftValue3");
listKey.rightPush("listRightValue4");

//3、通过ValueOperations设置值
ListOperations opsList = redisTemplate.opsForList();
opsList.leftPush("listKey", "listLeftValue5");
opsList.rightPush("listKey", "listRightValue6");
```

#### 6.2 将Java的List集合放入List类型

```java
ArrayList<String> list = new ArrayList<>();
redisTemplate.boundListOps("listKey").rightPushAll(list);
redisTemplate.boundListOps("listKey").leftPushAll(list);
```

#### 6.3 设置过期时间(单独设置)

```java
redisTemplate.boundValueOps("listKey").expire(1,TimeUnit.MINUTES);
redisTemplate.expire("listKey",1,TimeUnit.MINUTES);
```

#### 6.4 获取List缓存全部内容（起始索引，结束索引）

```java
List listKey1 = redisTemplate.boundListOps("listKey").range(0, 10); 
```

#### 6.5 从左或从右弹出一个元素

```java
String listKey2 = (String) redisTemplate.boundListOps("listKey").leftPop();  //从左侧弹出一个元素
String listKey3 = (String) redisTemplate.boundListOps("listKey").rightPop(); //从右侧弹出一个元素
```

#### 6.6 根据索引查询元素

```java
String listKey4 = (String) redisTemplate.boundListOps("listKey").index(1);
```

#### 6.7 获取List缓存的长度

```java
Long size = redisTemplate.boundListOps("listKey").size();
```

#### 6.8 根据索引修改List中的某条数据(key，索引，值)

```java
redisTemplate.boundListOps("listKey").set(3L,"listLeftValue3");
```

#### 6.9 移除N个值为value(key,移除个数，值)

```java
redisTemplate.boundListOps("listKey").remove(3L,"value");
```

### 七、Zset类型的相关操作

#### 7.1 向集合中插入元素，并设置分数

```java
//1、通过redisTemplate设置值
redisTemplate.boundZSetOps("zSetKey").add("zSetVaule", 100D);

//2、通过BoundValueOperations设置值
BoundZSetOperations zSetKey = redisTemplate.boundZSetOps("zSetKey");
zSetKey.add("zSetVaule", 100D);

//3、通过ValueOperations设置值
ZSetOperations zSetOps = redisTemplate.opsForZSet();
zSetOps.add("zSetKey", "zSetVaule", 100D);
12345678910
```

#### 7.2 向集合中插入多个元素,并设置分数

```java
DefaultTypedTuple<String> p1 = new DefaultTypedTuple<>("zSetVaule1", 2.1D);
DefaultTypedTuple<String> p2 = new DefaultTypedTuple<>("zSetVaule2", 3.3D);
redisTemplate.boundZSetOps("zSetKey").add(new HashSet<>(Arrays.asList(p1,p2)));
```

#### 7.3 按照排名先后(从小到大)打印指定区间内的元素, -1为打印全部

```java
Set<String> range = redisTemplate.boundZSetOps("zSetKey").range(key, 0, -1);
```

#### 7.4 获得指定元素的分数

```java
Double score = redisTemplate.boundZSetOps("zSetKey").score("zSetVaule");
```

#### 7.5 返回集合内的成员个数

```java
Long size = redisTemplate.boundZSetOps("zSetKey").size();
```

#### 7.6 返回集合内指定分数范围的成员个数（Double类型）

```java
Long COUNT = redisTemplate.boundZSetOps("zSetKey").count(0D, 2.2D);
```

#### 7.7 返回集合内元素在指定分数范围内的排名（从小到大）

```java
Set byScore = redisTemplate.boundZSetOps("zSetKey").rangeByScore(0D, 2.2D);
```

#### 7.8 带偏移量和个数，(key，起始分数，最大分数，偏移量，个数)

```java
Set<String> ranking2 = redisTemplate.opsForZSet().rangeByScore("zSetKey", 0D, 2.2D 1, 3);
```

#### 7.9 返回集合内元素的排名，以及分数（从小到大）

```java
Set<TypedTuple<String>> tuples = redisTemplate.boundZSetOps("zSetKey").rangeWithScores(0L, 3L);
  for (TypedTuple<String> tuple : tuples) {
      System.out.println(tuple.getValue() + " : " + tuple.getScore());
  }ss
```

#### 7.10 返回指定成员的排名

```java
//从小到大
Long startRank = redisTemplate.boundZSetOps("zSetKey").rank("zSetVaule");
//从大到小
Long endRank = redisTemplate.boundZSetOps("zSetKey").reverseRank("zSetVaule");
1234
```

#### 7.11 从集合中删除指定元素

```java
redisTemplate.boundZSetOps("zSetKey").remove("zSetVaule");
```

#### 7.12 删除指定索引范围的元素（Long类型）

```java
redisTemplate.boundZSetOps("zSetKey").removeRange(0L,3L);
```

#### 7.13 删除指定分数范围内的元素（Double类型）

```java
redisTemplate.boundZSetOps("zSetKey").removeRangeByScorssse(0D,2.2D);
```

#### 7.14 为指定元素加分（Double类型）

```java
Double score = redisTemplate.boundZSetOps("zSetKey").incrementScore("zSetVaule",1.1D);
```