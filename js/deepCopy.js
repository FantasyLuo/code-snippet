/*
    数组中常见的 slice、concat 都是浅拷贝，如果内部有对象的话，只会拷贝引用
    对象中的 Object.assign 和 {...obj}，如果有嵌套的对象的话，对内部的对象只是浅拷贝，也就是说只能深拷贝一层
    数组和对象的深拷贝最常用的就是 JSON.parse(JSON.stringify(arr))，不仅适用于数组还适用于对象，但是会有一些问题：
    不能拷贝函数，正则和 Symbol 类型，且循环引用时会报错
    真正的深拷贝只能通过递归遍历的方式实现
*/

var deepCopy = function (obj, map = new Map()) {
    if (typeof obj !== 'object') return obj;
    if (obj === null) return null; // 避免 null 被赋值为 {}
    var newObj = obj instanceof Array ? [] : {};
    if (map.get(obj)) { // 使用 map 解决循环引用的问题
        return map.get(obj);
    }
    map.set(obj, newObj);
    for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepCopy(obj[key], map);
    }
    }
    return newObj;
}
