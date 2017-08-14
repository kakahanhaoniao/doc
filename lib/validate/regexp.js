/**
 * 常用正则表达库
 * 解决表单校验中，相同或类似校验，开发人员均定义不同的jquery.method方法
 */
const regexp = {
    /**
     * 正则范围匹配
     * @method regexpRange
     * @param startLen  最小长度 如值为null，则不存在最小长度
     * @param endLen  最大长度 如不传值，则不存在最大长度
     * @description 两个参数不传，为默认为匹配中文，长度不限制
            endLen=='totalCount',为限制固定长度为startLen
     * @retun string
     * @example
         regex.regexpRange(3,5) //return '{3,5}'
         regex.regexpRange(3,null) //return '{3}' 最小长度为startLen
         regex.regexpRange(3,3) //return '{3}' 最小长度为startLen
         regex.regexpRange(3,-1) //return '{3,}' 最大长度endLen
     */
    regexpRange: function(startLen, endLen) {
        var range = '*';
        if ((typeof startLen != 'undefined' && (startLen > 0 || startLen === 0)) && (endLen && endLen > startLen)) {
            range = '{' + startLen + ',' + endLen + '}';
        } else if (startLen && endLen == -1) {
            range = '{' + startLen + ',}';
        } else if (startLen && ((!endLen && endLen !== 0) || startLen == endLen)) {
            range = '{' + startLen + '}';
        }
        return range;
    },

    /**
     * @property posInt 正整数
     */
    posInt: /^[1-9]\d*$/,

    /**
     * 正整数正则方法
     * @method posIntFn
     * @return regexp
     */
    posIntFn: function(startLen, endLen) {
        if (startLen >= 1) {
            var range = regex.regexpRange(startLen - 1, endLen - 1);
            return new RegExp('^[1-9]\\d' + range + '$');
        }
        return false;
    },

    /**
     * @property negInt 负整数
     */
    negInt: /^-[1-9]\d*$/,

    /**
     * @method negIntFn 负整数正则方法
     * @return regexp
     */
    negIntFn: function(startLen, endLen) {
        if (startLen >= 1) {
            var range = regex.regexpRange(startLen - 1, endLen - 1);
            return new RegExp('^-[1-9]\\d' + range + '$');
        }
        return false;
    },

    /**
     * @property int 整数
     */
    int: /^(-?)[1-9]\d*$/,

    /**
     * @method intFn 整数正则方法
     * @return regexp
     */
    intFn: function(startLen, endLen) {
        if (startLen >= 1) {
            var range = regex.regexpRange(startLen - 1, endLen - 1);
            return new RegExp('^(-?)[1-9]\\d' + range + '$');
        }
        return false;
    },

    /**
     * @property geqZero 非负整数 >=0
     */
    geqZero: /^([1-9]\d*|0)$/,

    /**
     * @method geqZeroFn 非负整数正则方法
     * @return regexp
     */
    geqZeroFn: function(startLen, endLen) {
        if (startLen >= 1) {
            var range = regex.regexpRange(startLen - 1, endLen - 1);
            return new RegExp('^([1-9]\\d' + range + '|0)$');
        }
        return false;
    },

    /**
     * @property leqZero 非正整数 <=0
     */
    leqZero: /^(-[1-9]\d*|0)$/,

    /**
     * @method leqZeroFn 非负整数正则方法
     * @return regexp
     */
    leqZeroFn: function(startLen, endLen) {
        if (startLen >= 1) {
            var range = regex.regexpRange(startLen - 1, endLen - 1);
            return new RegExp('^(-[1-9]\\d' + range + '|0)$');
        }
        return false;
    },

    /**
     * @property posFloat 正浮点数(小数点后两位)
     */
    posFloat: /^(([1-9]\d*|0)(\.\d{1,2})?)$/,

    /**
     * @method posFloatFn 正浮点数正则方法
     * @intLenArr 整数部分数组 [startLen,endLen]
     * @floatLenArr 浮点数量部分数组[startLen,endLen]
     * @return regexp
     */
    posFloatFn: function(intLenArr, floatLenArr) {
        var intRange = "*",
            floatRange = '*';
        if (intLenArr[0] >= 1) {
            intLenArr[0]--;
            if (intLenArr[1]) {
                intLenArr[1]--;
            }
            intRange = regex.regexpRange.apply(this, intLenArr);
        }
        floatRange = regex.regexpRange.apply(this, floatLenArr);
        return new RegExp('^(([1-9]\\d' + intRange + '|0)(\\.\\d' + floatRange + ')?)$');
    },

    /**
     * @property negFloat 负浮点数
     */
    negFloat: /^(-(([1-9]\d*|0)(\.\d{1,2})?))$/,

    /**
     * @method negFloatFn 负浮点数正则方法
     * @intLenArr 整数部分数组 [startLen,endLen]
     * @floatLenArr 浮点数量部分数组[startLen,endLen]
     * @return regexp
     */
    negFloatFn: function(intLenArr, floatLenArr) {
        var intRange = "*",
            floatRange = '*';
        if (intLenArr[0] >= 1) {
            intRange = regex.regexpRange.apply(this, intLenArr);
        }
        floatRange = regex.regexpRange.apply(this, floatLenArr);
        return new RegExp('^(-(([1-9]\\d' + intLenArr + '|0)(\\.\\d' + floatRange + ')?))$');
    },

    /**
     * @property float 浮点数
     */
    float: /^((-?)(([1-9]\d?|0)(\.\d{1,2})?|100(\.0{1,2})?))$/,

    /**
     * @method floatFn 浮点数正则方法
     * @intLenArr 整数部分数组 [startLen,endLen]
     * @floatLenArr 浮点数量部分数组[startLen,endLen]
     * @return regexp
     */
    floatFn: function(intLenArr, floatLenArr) {
        var intRange = "*",
            floatRange = '*';
        if (intLenArr[0] >= 1) {
            intRange = regex.regexpRange.apply(this, intLenArr);
        }
        floatRange = regex.regexpRange.apply(this, floatLenArr);
        return new RegExp('^((-)?(([1-9]\\d' + intLenArr + '|0)(\\.\\d' + floatRange + ')?))$');
    },

    /**
     * @property space 空格
     */
    space: /\s+/,

    /**
     * @property english 英文字母
     */
    english: /^[A-Za-z]+$/,

    /**
     * @method englishFn 英文字母正则方法
     * @return regexp
     */
    englishFn: function(startLen, endLen) {
        var range = regex.regexpRange.apply(this, arguments);
        return new RegExp('^[A-Za-z]' + range + '$');
    },

    /**
     * @property englishUpper 英文大写字母
     */
    englishUpper: /^[A-Z]+$/,

    /**
     * @method englishUpperFn 英文大写字母正则方法
     * @return regexp
     */
    englishUpperFn: function(startLen, endLen) {
        var range = regex.regexpRange.apply(this, arguments);
        return new RegExp('^[A-Z]' + range + '$');
    },

    /**
     * @property  englishLower 英文小写字母
     */
    englishLower: /^[a-z]+$/,

    /**
     * @method englishLowerFn 英文小写字母正则方法
     * @return regexp
     */
    englishLowerFn: function(startLen, endLen) {
        var range = regex.regexpRange.apply(this, arguments);
        return new RegExp('^[a-z]' + range + '$');
    },

    /**
     *  @property englishOrNumber 英文字母+数字组合
     */
    englishOrNumber: /^[A-Za-z0-9]+$/,

    /**
     * @method englishOrNumberFn 英文字母+数字组合正则方法
     * @return regexp
     */
    englishOrNumberFn: function(startLen, endLen) {
        var range = regex.regexpRange.apply(this, arguments);
        return new RegExp('^[A-Za-z0-9]' + range + '$');
    },

    /**
     * @property englishOrNumberOrUnderlineNotFir 英文字母+数字+下划线组合,下划线以不能开头
     */
    englishOrNumberOrUnderlineNotFir: /^[a-zA-Z0-9]\w*$/,

    /**
     * @method englishOrNumberOrUnderlineNotFirFn 英文字母+数字+下划线组合,下划线以不能开头 正则方法
     * @return regexp
     */
    englishOrNumberOrUnderlineNotFirFn: function(startLen, endLen) {
        if (startLen >= 1) {
            var range = regex.regexpRange(startLen - 1, endLen - 1);
            return new RegExp('^[a-zA-Z0-9]\\w' + range + '$');
        }
    },


    /**
     * @property englishOrNumberOrUnderline 英文字母+数字+下划线组合
     */
    englishOrNumberOrUnderline: /^\w+$/,


    /**
     * @method englishOrNumberOrUnderlineFn 英文字母+数字+下划线组合正则方法
     * @return regexp
     */
    englishOrNumberOrUnderlineFn: function(startLen, endLen) {
        var range = regex.regexpRange.apply(this, arguments);
        return new RegExp('^\\w' + range + '$');
    },

    englishOrNumberWithSpecialsFn: function(specials) {
        var reg = '^[A-Za-z0-9';
        if (specials && specials.length) {
            $.each(specials, function(i, word) {
                reg += '\\' + word;
            });
        }
        reg += ']+$';
        return new RegExp(reg);
    },



    expectArrStrAndLengthFn: function(expArr, range) {
        var expArr = expArr || [];
        var range = range || [0, 999999999999999];
        var expArrStr = expArr.length > 0 ? '(' + expArr.join('|') + ')' : '';
        var rangeStr = range.length > 0 ? '{' + range.join(',') + '}' : '';
        return new RegExp('(?!.*' + expArrStr + ')^.' + rangeStr + '$');
    },


    /**
     * @property common 匹配中文、英文、数字及下划线
     */
    common: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,

    /**
     * @method commonFn 英文字母+数字+下划线组合正则方法
     * @return regexp
     */
    commonFn: function(startLen, endLen) {
        var range = regex.regexpRange.apply(this, arguments);
        return new RegExp('^[\\u4e00-\\u9fa5_a-zA-Z0-9]' + range + '$');
    },

    /**
     * @property email email地址 邮箱
     */
    email: /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/,

    /**
     * @property url url地址
     */
    url: /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,

    /**
     * @property xbnUri 匹配小笨鸟域名链接
     */
    xbnUri: /^(https?|s?ftp):\/\/[\w\.]+(?=xbniao\.com\/?).*/,

    /**
     * @property dateYMD 年/月/日（年-月-日、年.月.日）
     */
    dateYMD: /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/,

    /**
     * @property chinese 匹配中文
     */
    chinese: /^[\u4e00-\u9fa5]+$/,


    /**
     * @method chineseFn 匹配中文正则方法
     * @retun RegExp
     */
    chineseFn: function(startLen, endLen) {

        var range = regex.regexpRange.apply(this, arguments);

        return new RegExp('^[\\u4e00-\\u9fa5]' + range + '$');
    },

    /**
     * @property 匹配常用 全字符,允许的特殊字符：()<>-_""''./&︒空格
     */
    regularCnCharWithSpecials: /^[\w\u4e00-\u9fa5\)\(\>\<\-\"\'\.\/\&\°\︒\s)]+$/,

    /**
     * @property 匹配常用 全字符,允许的特殊字符在传入数组中
     */
    regularCnCharWithSpecialsFn: function(specials) {
        var reg = '^[\\w\\u4e00-\\u9fa5';
        if (specials && specials.length) {
            $.each(specials, function(i, word) {
                reg += '\\' + word;
            });
        }
        reg += ']+$';
        return new RegExp(reg);
    },

    /**
     * @property 匹配常用 字母数字,允许的特殊字符：()<>-_""''./&︒空格
     */
    regularCharWithSpecials: /^[a-zA-Z0-9\)\(\>\<\-\_\"\'\.\/\&\°\︒\s)]+$/,

    /**
     * @property 匹配常用 字母数字,允许的特殊字符在传入数组中
     */
    regularCharWithSpecialsFn: function(specials) {
        var reg = '^[a-zA-Z0-9';
        if (specials && specials.length) {
            $.each(specials, function(i, word) {
                reg += '\\' + word;
            });
        }
        reg += ']+$';
        return new RegExp(reg);
    },


    /**
     * @property 匹配常用 全字符,允许的特殊字符：()<>-_""''./&︒空格
     */
    regularCnCharWithSpecials: /^[\w\u4e00-\u9fa5\)\(\>\<\-\"\'\.\/\&\°\︒\s)]+$/,

    /**
     * @property 匹配常用 全字符,允许的特殊字符在传入数组中
     */
    regularCnCharWithSpecialsFn: function(specials) {
        var reg = '^[\\w\\u4e00-\\u9fa5';
        if (specials && specials.length) {
            $.each(specials, function(i, word) {
                reg += '\\' + word;
            });
        }
        reg += ']+$';
        return new RegExp(reg);
    },


    /**
     * @property 匹配常用 字母数字,允许的特殊字符：()<>-_""''./&︒空格
     */
    regularCharWithSpecials: /^[a-zA-Z0-9\)\(\>\<\-\"\'\.\/\&\°\︒\s)]+$/,

    /**
     * @property 匹配常用 字母数字,允许的特殊字符在传入数组中
     */
    regularCharWithSpecialsFn: function(specials) {
        var reg = '^[a-zA-Z0-9';
        if (specials && specials.length) {
            $.each(specials, function(i, word) {
                reg += '\\' + word;
            });
        }
        reg += ']+$';
        return new RegExp(reg);
    },


    /**
     * @property dbChar 匹配双字节字符(包括汉字在内)：评注：可以用来计算字符串的长度（一个双字节字符长度计2，ASCII字符计1）
     */
    dbChar: /^[^\x00-\xff]+$/,

    /**
     * @property BlankLine 匹配空白行
     */
    BlankLine: /\n\s*\r/,

    /**
     * @property zipCode 匹配中国邮政编码 邮编
     */
    zipCode: /^[1-9]\d{5}(?!\d)$/,

    /**
     * @property ipCard 匹配身份证
     */
    ipCard: /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/,

    /**
     * @property telNum 匹配国内电话号码
     */
    telNum: /^(\d{3}-|\d{4}-)?(\d{8}|\d{7})?$/,

    /**
     * @property ip 匹配IP地址
     */
    ip: /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/,

    /**
     * @property html 匹配html
     */
    html: /^<(.*)>.*<\/\1>|<(.*) \/>$/, //待验证 /<([^<>]+)>/

    /**
     * @property sql 匹配首尾空白字符的正则表达式
     */
    blank: /^\s*|\s*$/,

    /**
     * @property sql sql语句匹配
     */
    sql: /^(select|drop|delete|create|update|insert).*$/,

    /**
     * @property link 提取信息中的网络链接
     */
    link: /^(h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?$/,

    /**
     * @property img 提取信息中的图片链接
     */
    img: /^(s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?$/,

    /**
     * @property phone 取信息中的中国手机号码
     */
    phone: /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/,

    /**
     * @property chineTel 中国电话号码验证 匹配形式如:0511-4405222 或者021-87888822 或者 021-44055520-555 或者 (0511)4405222
     */
    chineTel: /^((\d{3,4})|\d{3,4}-)?\d{7,8}(-\d{3})*$/,

    /*
     * @property worldTel 模糊匹配电话，兼容国际
     */
    worldTel: /^[\d\+\-\(\)\s]*$/,

    /**
     * @property unPassword 匹配最少一个大写字母，一个小写字母，一个数字，一个特殊字符组成的字符串
     */
    unPassword: /^.*(?=.{6,})(?=.*d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,

    /**
     * @property specialChar 中英文特殊字符,包含空格，除英文"-_"字符外
     */
    specialChar: /[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/,

    /**
     * @property specialCharNotSpace 中英文特殊字符，除英文"-_"字符以及空格外
     */
    specialCharNotSpace: /[(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/,

    /**
     * @method dbCharLen 获取双字节文本长度
     * @param value 要获取双字节的文本
     * @return 长度
     */
    dbCharLen: function(value) {
        return value.replace(regex.dbChar, "**").length;
    },

    /**
     * 包含 键盘上可输入的特殊字符(除0-9a-zA-Z之外的字符)
     * 也可以写为 /((?=[\x21-\x7e]+)[^A-Za-z0-9])/
     */
    containKeyboardSpecial: /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]-]/,

    /**
     * 包含 字符串0-9
     */
    containNumber: /[0-9]/,

    /**
     * 包含 字符串[a-z]
     */
    containEnglishLower: /[a-z]/,

    /**
     * 包含 字符串[A-Z]
     */
    containEnglishUpper: /[A-Z]/
}
module.exports = regexp;
