/**
 * 定义了表单相关的通用处理，包括获取Post数据等
 */

/**
 * 获取要提交的数据。 获取表单内部所有input、textarea的值，并拼接为一个Object。 <br>
 * 拼接规则如下  <br>
 *  <pre>
 * <code>
 * 普通输入框 input[name="abc"]  ->  object.abc <br>
 * 子对象输入框 input[name="commodityPkg[pkgWeight]"]  -> object.commodityPkg.pkgWeight <br>
 * 子列表输入框 input[name="commodityPkg[0][size]"]    -> object.commodityPkg[0].size <br>
 * </code></pre>
 *
 * 另外，优先采用 [post-name="abc"] 属性作为Object key <br>
 * 不拼接Object的元素添加class: noPost
 * @method getPostData
 * @param {string} form  表单元素选择器
 * @example
 *      var postData = form-util.getPostData($('#formid'));
 * @return {Object} 表单拼装对象
 */
function getPostData(form, dom) {
    var validDom = dom || $('input[type!=radio][type!=checkbox][type!=button]input[type!=file],[post-name],input:checked,textarea', form).not('.noPost');
    var postObj = {};

    validDom.each(function () {
        var prop = $(this).attr('name') || $(this).attr('post-name');
        //判断是否有name属性值
        if (!prop) {
            return true;
        }
        var lastProp = postObj,
            propArr = prop.match(/^\w+|\[\w*\]/g);
        var len = propArr.length;
        $.each(propArr, function (i, pro) {
            if (i < propArr.length - 1) {
                pro = pro == '[]' ? 0 : pro.match(/\w+/)[0];
                if (propArr[i + 1].match(/^\[\d*\]$/)) {
                    if (typeof lastProp[pro] == 'undefined') {
                        lastProp[pro] = [];
                    }
                } else {
                    if (typeof lastProp[pro] == 'undefined') {
                        lastProp[pro] = {};
                    }
                }
                lastProp = lastProp[pro];
            }
        });
        //判断是否[]结束
        var lastp = propArr[len - 1],
            lastMatchNum = lastp.match(/^\[(\d*)\]$/);

        var val = $(this).attr('post-value') || $(this).data('post-value');
        if (val == null) {
            if ($(this).is('input') || $(this).is('textarea')) {
                val = $(this).attr('index-data') || $(this).val();
            } else {
                val = $(this).text();
            }
        }
        if (_xbn.isString(val)) {
            val = $.trim(val);
        }

        if (lastMatchNum) {
            if (lastMatchNum[1]) {
                lastProp[lastMatchNum[1]] = val ? val : '';
            } else {
                lastProp.push(val);
            }
        } else {
            lastProp[lastp.match(/\w+/)[0]] = val ? val : '';
        }
    });
    return postObj;
}


/**
 * 分布式加载验证规则: 默认dom长度大于200 进行分布式加载
 * @method delayAddAllRuleWithDom
 * @param {jQuery} jqueryEles
 * @example
 *      productUtil.delayAddAllRuleWithDom($('[class*=valid-]', opts.form));
 */
function delayAddAllRuleWithDom(jqueryEles) {
    if (!jqueryEles) {
        return;
    }
    if (jqueryEles.length < 200) {
        addValidRules(jqueryEles);
    } else {
        delayLoading(jqueryEles, 200, 200, function (doms, isEnd) {
            addValidRules(doms);
            return !isEnd;
        });
    }
}


module.exports = {
    getPostData,
    delayAddAllRuleWithDom
};
